import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { usePusher } from '@/hooks/usePusher';
import axios from '@/lib/axios';

interface ChatMessage {
  id: number;
  message: string;
  sender_type: 'guest' | 'admin';
  sender_name: string;
  created_at: string;
}

interface ChatSession {
  id: number;
  session_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  status: 'active' | 'closed';
  messages: ChatMessage[];
}

export interface LiveChatWidgetRef {
  openChat: () => void;
  closeChat: () => void;
}

export const LiveChatWidget = forwardRef<LiveChatWidgetRef>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showStartForm, setShowStartForm] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    openChat: () => setIsOpen(true),
    closeChat: () => setIsOpen(false),
  }));

  // Check for existing session on mount
  useEffect(() => {
    checkExistingSession();
  }, []);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto scroll when widget is opened and has messages
  useEffect(() => {
    if (isOpen && !showStartForm && messages.length > 0) {
      setTimeout(() => {
        scrollToBottom();
      }, 300);
    }
  }, [isOpen, showStartForm]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Pusher integration - handle realtime messages
  usePusher({
    channelName: chatSession ? `chat-session.${chatSession.session_id}` : '',
    eventName: 'message.sent',
    onMessage: (data: any) => {
      console.log('Received message via Pusher:', data);

      // Only add admin messages to prevent duplicates (guest messages are added locally)
      if (data.sender_type === 'admin') {
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
    enabled: !!chatSession,
  });

  // Polling fallback for messages
  useEffect(() => {
    if (!chatSession) return;

    const pollMessages = async () => {
      try {
        const response = await axios.get(`/api/chat/session/${chatSession.session_id}/messages`);
        if (response.data.success) {
          const messagesData = response.data.data;
          setMessages(Array.isArray(messagesData) ? messagesData : []);
        }
      } catch (error) {
        console.error('Error polling messages:', error);
      }
    };

    // Poll every 5 seconds
    const interval = setInterval(pollMessages, 5000);

    return () => clearInterval(interval);
  }, [chatSession]);

  const checkExistingSession = async () => {
    try {
      const response = await axios.get('/api/chat/session-from-cookie');
      if (response.data.success) {
        setChatSession(response.data.data);
        setMessages(response.data.data.messages || []);
        setShowStartForm(false);
      }
    } catch (error) {
      // No existing session, show start form
      setShowStartForm(true);
    }
  };

  const startChatSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat/start-session', formData);
      if (response.data.success) {
        setChatSession(response.data.data.chat_session);
        setShowStartForm(false);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error starting chat session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatSession || isSending) return;

    const messageText = newMessage.trim();
    setNewMessage('');
    setIsSending(true);

    try {
      const response = await axios.post('/api/chat/send-message', {
        session_id: chatSession.session_id,
        message: messageText,
        sender_type: 'guest',
      });

      if (response.data.success) {
        // Add message to local state for immediate feedback
        setMessages(prev => [...prev, response.data.data]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Floating animation ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 animate-ping opacity-75"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse opacity-50"></div>

          {/* Main chat button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full p-5 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-blue-500/25 group"
          >
            <MessageCircle size={28} className="group-hover:rotate-12 transition-transform duration-300" />

            {/* Notification badge */}
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce">
              !
            </div>
          </button>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              💬 Chat dengan kami!
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-0 transition-all duration-300 transform ${
        isMinimized ? 'w-96 h-16 scale-95' : 'w-96 h-[600px] scale-100'
      } backdrop-blur-sm`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white p-4 rounded-t-2xl flex items-center justify-between relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
          </div>

          <div className="relative flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <MessageCircle size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Live Chat</h3>
              <p className="text-blue-100 text-sm">💬 Kami siap membantu Anda!</p>
            </div>
          </div>

          <div className="relative flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="hover:bg-white/20 p-2 rounded-full transition-all duration-200 hover:scale-110"
            >
              <Minimize2 size={18} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition-all duration-200 hover:scale-110"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {showStartForm ? (
              /* Start Chat Form */
              <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 h-full">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <MessageCircle size={32} className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Mulai Percakapan</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Isi data di bawah untuk memulai chat dengan tim kami</p>
                </div>

                <form onSubmit={startChatSession} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      👤 Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white shadow-sm hover:shadow-md placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      📧 Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white shadow-sm hover:shadow-md placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="contoh@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      📱 No. WhatsApp (Opsional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white shadow-sm hover:shadow-md placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Memulai Chat...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <MessageCircle size={20} />
                        <span>🚀 Mulai Chat Sekarang</span>
                      </div>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    🔒 Data Anda aman dan tidak akan dibagikan kepada pihak ketiga
                  </p>
                </div>
              </div>
            ) : (
              /* Chat Interface */
              <>
                {/* Chat Status */}
                <div className="px-6 py-3 bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-800">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">Tim support online</span>
                    <span className="text-xs text-green-600 dark:text-green-500">• Biasanya membalas dalam beberapa menit</span>
                  </div>
                </div>

                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-700 dark:to-gray-800">
                  {messages.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle size={40} className="text-blue-500" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Selamat datang! 👋</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
                        Halo <span className="font-semibold text-blue-600">{chatSession?.guest_name}</span>! 🎉<br/>
                        Tim support kami siap membantu Anda. Silakan kirim pesan untuk memulai percakapan! 💬
                      </p>
                    </div>
                  ) : (
                    Array.isArray(messages) ? messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender_type === 'guest' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-end space-x-2 max-w-xs ${
                          message.sender_type === 'guest' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          {/* Avatar */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                            message.sender_type === 'guest'
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                              : 'bg-gradient-to-r from-green-500 to-teal-600'
                          }`}>
                            {message.sender_type === 'guest' ? '👤' : '🎧'}
                          </div>

                          {/* Message bubble */}
                          <div
                            className={`px-4 py-3 rounded-2xl shadow-sm ${
                              message.sender_type === 'guest'
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                                : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-bl-md'
                            }`}
                          >
                            <div className="text-sm leading-relaxed">{message.message}</div>
                            <div className={`text-xs mt-2 ${
                              message.sender_type === 'guest' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {formatTime(message.created_at)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )) : null
                  )}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-end space-x-2 max-w-xs">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold bg-gradient-to-r from-green-500 to-teal-600">
                          🎧
                        </div>
                        <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="border-t border-gray-200 dark:border-gray-600 p-4 bg-white dark:bg-gray-800">
                  <form onSubmit={sendMessage} className="flex space-x-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage(e);
                          }
                        }}
                        disabled={isSending}
                        placeholder="Ketik pesan Anda di sini..."
                        className="w-full px-4 py-3 pr-12 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                        💬
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={!newMessage.trim() || isSending}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center"
                    >
                      {isSending ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <Send size={20} />
                      )}
                    </button>
                  </form>

                  {/* Quick Reply Buttons */}
                  {messages.length === 0 && (
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 mb-2">💡 Pertanyaan populer:</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Halo, saya butuh info paket internet 📶",
                          "Ada promo CCTV tidak? 📹",
                          "Berapa harga instalasi? 💰"
                        ].map((quickReply, index) => (
                          <button
                            key={index}
                            onClick={() => setNewMessage(quickReply)}
                            className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-full border border-blue-200 transition-all duration-200 hover:scale-105"
                          >
                            {quickReply}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-3 text-center">
                    <p className="text-xs text-gray-400">
                      Tekan Enter untuk mengirim • Metanetaccess ✨
                    </p>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
});
