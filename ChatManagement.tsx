import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { MessageCircle, Users, Clock, Send, X } from 'lucide-react';
import { usePusher } from '@/hooks/usePusher';
import axios from '@/lib/axios';
import AppLayout from '@/layouts/app-layout';

interface ChatMessage {
  id: number;
  message: string;
  sender_type: 'guest' | 'admin';
  sender_name: string;
  created_at: string;
  is_read: boolean;
}

interface ChatSession {
  id: number;
  session_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  status: 'active' | 'closed';
  last_activity_at: string;
  unread_messages_count: number;
  messages?: ChatMessage[];
}

interface ChatStats {
  total_sessions: number;
  active_sessions: number;
  closed_sessions: number;
  total_messages: number;
  unread_messages: number;
  today_sessions: number;
  this_week_sessions: number;
}

export default function ChatManagement() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [stats, setStats] = useState<ChatStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Pusher integration for admin
  usePusher({
    channelName: 'admin-chat',
    eventName: 'message.sent',
    onMessage: (data: any) => {
      console.log('Admin received message via Pusher:', data);

      // Update sessions list for any new message
      fetchSessions();

      // If this message is for the currently selected session, add it to messages
      if (selectedSession && data.session_id === selectedSession.session_id) {
        setMessages(prev => {
          // Check if message already exists to prevent duplicates
          const exists = prev.some(msg => msg.id === data.id);
          if (!exists) {
            return [...prev, data];
          }
          return prev;
        });
      }
    },
    enabled: true,
  });

  useEffect(() => {
    fetchSessions();
    fetchStats();
  }, []);

  // Polling for real-time updates
  useEffect(() => {
    let isActive = true;

    const pollUpdates = async () => {
      if (!isActive) return;

      try {
        await fetchSessions();
        if (selectedSession && isActive) {
          await fetchMessages(selectedSession.session_id);
        }
      } catch (error) {
        if (isActive) {
          console.error('Error polling updates:', error);
        }
      }
    };

    // Poll every 15 seconds (reduced frequency)
    const interval = setInterval(pollUpdates, 15000);

    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, [selectedSession?.session_id]); // Only depend on session_id

  const fetchSessions = async () => {
    try {
      const response = await axios.get('/admin/chat/api/sessions');
      const sessionsData = response.data?.data?.data;
      setSessions(Array.isArray(sessionsData) ? sessionsData : []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setSessions([]);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/admin/chat/api/statistics');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (sessionId: string) => {
    try {
      const response = await axios.get(`/admin/chat/api/sessions/${sessionId}/messages`);
      const messagesData = response.data?.data?.messages?.data;
      setMessages(Array.isArray(messagesData) ? messagesData : []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    }
  };

  const selectSession = async (session: ChatSession) => {
    setSelectedSession(session);
    await fetchMessages(session.session_id);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedSession) return;

    const messageText = newMessage;
    setNewMessage('');

    try {
      const response = await axios.post('/admin/chat/api/send-message', {
        session_id: selectedSession.session_id,
        message: messageText,
        sender_type: 'admin',
      });

      if (response.data.success) {
        // Add message to local state for immediate feedback
        setMessages(prev => [...prev, response.data.data]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const closeSession = async (sessionId: string) => {
    try {
      await axios.post(`/admin/chat/api/sessions/${sessionId}/close`);
      fetchSessions();
      if (selectedSession?.session_id === sessionId) {
        setSelectedSession(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error closing session:', error);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID');
  };

  if (isLoading) {
    return (
      <AppLayout>
        <Head title="Chat Management" />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Head title="Chat Management" />
      
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Chat Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Kelola percakapan dengan pelanggan</p>
          </div>

          {/* Statistics */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <MessageCircle className="h-8 w-8 text-blue-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Sessions</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_sessions}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-green-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Sessions</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active_sessions}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-orange-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Unread Messages</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.unread_messages}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <MessageCircle className="h-8 w-8 text-purple-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Today Sessions</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.today_sessions}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chat Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sessions List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chat Sessions</h2>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {sessions.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    Tidak ada chat session
                  </div>
                ) : (
                  Array.isArray(sessions) ? sessions.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => selectSession(session)}
                      className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        selectedSession?.id === session.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{session.guest_name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{session.guest_email}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {formatTime(session.last_activity_at)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {session.unread_messages_count > 0 && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              {session.unread_messages_count}
                            </span>
                          )}
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            session.status === 'active'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                          }`}>
                            {session.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  )) : null
                )}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow">
              {selectedSession ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{selectedSession.guest_name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{selectedSession.guest_email}</p>
                    </div>
                    <button
                      onClick={() => closeSession(selectedSession.session_id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {Array.isArray(messages) ? messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender_type === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender_type === 'admin'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                          }`}
                        >
                          <div>{message.message}</div>
                          <div className={`text-xs mt-1 ${
                            message.sender_type === 'admin' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {formatTime(message.created_at)}
                          </div>
                        </div>
                      </div>
                    )) : null}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <form onSubmit={sendMessage} className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Ketik balasan..."
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors disabled:opacity-50"
                      >
                        <Send size={16} />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <MessageCircle size={48} className="mx-auto mb-4" />
                    <p>Pilih chat session untuk memulai percakapan</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
