  import { useEffect, useRef } from 'react';
  import Pusher from 'pusher-js';
  import axios from '@/lib/axios';

  interface UsePusherOptions {
    channelName: string;
    eventName: string;
    onMessage: (data: any) => void;
    enabled?: boolean;
  }

  export const usePusher = ({ channelName, eventName, onMessage, enabled = true }: UsePusherOptions) => {
    const pusherRef = useRef<Pusher | null>(null);
    const channelRef = useRef<any>(null);

    useEffect(() => {
      if (!enabled || !channelName) return;

      // Get fresh CSRF token
      const getCsrfToken = () => {
        return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
      };

      // Initialize Pusher with authentication
      pusherRef.current = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        forceTLS: true,
        authEndpoint: '/broadcasting/auth',
        auth: {
          headers: {
            'X-CSRF-TOKEN': getCsrfToken(),
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
          }
        },
        enabledTransports: ['ws', 'wss'],
        disabledTransports: [],
        activityTimeout: 120000,
        pongTimeout: 30000,
        unavailableTimeout: 10000,
        authorizer: (channel: any) => {
          return {
            authorize: (socketId: string, callback: Function) => {
              console.log('Authorizing channel:', channel.name, 'with socket:', socketId);

              // Use axios with fresh CSRF token for each authorization
              axios.post('/broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name
              }, {
                headers: {
                  'X-CSRF-TOKEN': getCsrfToken(),
                  'X-Requested-With': 'XMLHttpRequest',
                  'Accept': 'application/json',
                }
              })
              .then(response => {
                console.log('Authorization successful for channel:', channel.name, response.data);
                callback(null, response.data);
              })
              .catch(error => {
                console.error('Authorization failed for channel:', channel.name, error);

                // Retry once with fresh token if CSRF error
                if (error.response?.status === 419) {
                  console.log('CSRF error, retrying with fresh token...');
                  setTimeout(() => {
                    axios.post('/broadcasting/auth', {
                      socket_id: socketId,
                      channel_name: channel.name
                    }, {
                      headers: {
                        'X-CSRF-TOKEN': getCsrfToken(),
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json',
                      }
                    })
                    .then(response => {
                      console.log('Authorization successful on retry for channel:', channel.name);
                      callback(null, response.data);
                    })
                    .catch(retryError => {
                      console.error('Authorization failed on retry for channel:', channel.name, retryError);
                      callback(retryError, null);
                    });
                  }, 1000);
                } else {
                  callback(error, null);
                }
              });
            }
          };
        }
      });

      // Add connection state logging with better error handling
      pusherRef.current.connection.bind('connected', () => {
        console.log('Pusher connected successfully');
      });

      pusherRef.current.connection.bind('error', (error: any) => {
        console.error('Pusher connection error:', error);

        // Handle specific error types
        if (error.type === 'AuthError') {
          console.error('Pusher authentication error - check CSRF token and session');
        } else if (error.type === 'TransportUnavailable') {
          console.error('Pusher transport unavailable - check network connection');
        } else if (error.type === 'PusherError') {
          console.error('Pusher error:', error.data);
        }
      });

      pusherRef.current.connection.bind('disconnected', () => {
        console.log('Pusher disconnected');
        // Don't auto-reconnect to prevent reload loops
      });

      pusherRef.current.connection.bind('unavailable', () => {
        console.warn('Pusher connection unavailable');
      });

      pusherRef.current.connection.bind('failed', () => {
        console.error('Pusher connection failed');
      });

      // Subscribe to channel
      channelRef.current = pusherRef.current.subscribe(channelName);

      // Handle subscription events with better error handling
      channelRef.current.bind('pusher:subscription_succeeded', () => {
        console.log('Successfully subscribed to channel:', channelName);
      });

      channelRef.current.bind('pusher:subscription_error', (error: any) => {
        console.error('Subscription error for channel:', channelName, error);

        // Handle specific subscription errors
        if (error.status === 403) {
          console.error('Authorization failed for channel:', channelName);
          if (channelName.includes('chat-session')) {
            console.error('Guest session may be invalid or expired');
          } else if (channelName === 'admin-chat') {
            console.error('Admin authentication required');
          }
        } else if (error.status === 419) {
          console.error('CSRF token error for channel subscription');
        }
      });

      channelRef.current.bind('pusher:member_added', (member: any) => {
        console.log('Member added to channel:', channelName, member);
      });

      channelRef.current.bind('pusher:member_removed', (member: any) => {
        console.log('Member removed from channel:', channelName, member);
      });

      // Bind to event
      channelRef.current.bind(eventName, (data: any) => {
        console.log(`Received event ${eventName} on channel ${channelName}:`, data);
        onMessage(data);
      });

      return () => {
        if (channelRef.current) {
          try {
            channelRef.current.unbind(eventName);
            channelRef.current.unbind('pusher:subscription_succeeded');
            channelRef.current.unbind('pusher:subscription_error');
          } catch (error) {
            console.warn('Error unbinding channel events:', error);
          }
        }

        if (pusherRef.current) {
          try {
            pusherRef.current.connection.unbind('connected');
            pusherRef.current.connection.unbind('error');
            pusherRef.current.connection.unbind('disconnected');

            if (channelRef.current) {
              pusherRef.current.unsubscribe(channelName);
            }

            pusherRef.current.disconnect();
          } catch (error) {
            console.warn('Error disconnecting Pusher:', error);
          }
        }

        pusherRef.current = null;
        channelRef.current = null;
      };
    }, [channelName, eventName, enabled]);

    return {
      pusher: pusherRef.current,
      channel: channelRef.current,
    };
  };
