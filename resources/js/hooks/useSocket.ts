import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketOptions {
  channelName: string;
  eventName: string;
  onMessage: (data: any) => void;
  enabled?: boolean;
}

export const useSocket = ({ channelName, eventName, onMessage, enabled = true }: UseSocketOptions) => {
  const socketRef = useRef<Socket | null>(null);
  const isConnectedRef = useRef(false);

  useEffect(() => {
    if (!enabled || !channelName) return;

    // Get Socket.IO server URL from environment
    const serverUrl = import.meta.env.VITE_SOCKETIO_SERVER_URL || 'http://localhost:3001';
    
    console.log('Connecting to Socket.IO server:', serverUrl);

    // Create socket connection
    const socket = io(serverUrl, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: true,
    });

    socketRef.current = socket;

    // Connection event handlers
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server:', socket.id);
      isConnectedRef.current = true;
      
      // Join appropriate room based on channel name
      if (channelName.startsWith('chat-session.')) {
        const sessionId = channelName.replace('chat-session.', '');
        socket.emit('join-session', { sessionId, userType: 'guest' });
        console.log('Joining session:', sessionId);
      } else if (channelName === 'admin-chat') {
        socket.emit('join-admin');
        console.log('Joining admin room');
      }
    });

    socket.on('disconnect', (reason) => {
      console.log('Disconnected from Socket.IO server:', reason);
      isConnectedRef.current = false;
    });

    socket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
    });

    // Listen for the specific event
    socket.on(eventName, (data) => {
      console.log(`Received ${eventName} via Socket.IO:`, data);
      onMessage(data);
    });

    // Listen for join confirmations
    socket.on('joined-session', (data) => {
      console.log('Successfully joined session:', data);
    });

    socket.on('joined-admin', (data) => {
      console.log('Successfully joined admin room:', data);
    });

    socket.on('error', (error) => {
      console.error('Socket.IO error:', error);
    });

    // Cleanup function
    return () => {
      if (socket) {
        console.log('Cleaning up socket connection');
        
        // Leave room before disconnecting
        if (channelName.startsWith('chat-session.')) {
          const sessionId = channelName.replace('chat-session.', '');
          socket.emit('leave-session', { sessionId });
        }
        
        socket.disconnect();
        socketRef.current = null;
        isConnectedRef.current = false;
      }
    };
  }, [enabled, channelName, eventName, onMessage]);

  // Return socket instance and connection status for debugging
  return {
    socket: socketRef.current,
    isConnected: isConnectedRef.current,
  };
};
