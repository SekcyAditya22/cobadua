import { useState, useEffect } from 'react';
import { X, MessageCircle, Phone, Sparkles, Zap } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat?: () => void;
}

export function ConsultationModal({ isOpen, onClose, onOpenChat }: ConsultationModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleWhatsAppClick = () => {
    const phoneNumber = '6287805752834'; // Nomor WhatsApp Metanetaccess
    const message = encodeURIComponent('Halo! Saya tertarik untuk konsultasi mengenai layanan internet dan CCTV dari Metanetaccess.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    onClose();
  };

  const handleChatClick = () => {
    // Buka chat widget jika callback tersedia
    if (onOpenChat) {
      onOpenChat();
    }
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Header */}
        <div className="text-center pt-8 pb-6 px-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4 animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Konsultasi Gratis!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Pilih cara konsultasi yang paling nyaman untuk Anda
          </p>
        </div>

        {/* Options */}
        <div className="px-6 pb-8 space-y-4">
          {/* WhatsApp Option */}
          <button
            onClick={handleWhatsAppClick}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">WhatsApp</h3>
                <p className="text-sm opacity-90">Chat langsung via WhatsApp</p>
              </div>
            </div>
            <div className="absolute top-2 right-2">
              <Zap className="w-4 h-4 opacity-60" />
            </div>
          </button>

          {/* Internal Chat Option */}
          <button
            onClick={handleChatClick}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                <Phone className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Chat Disini</h3>
                <p className="text-sm opacity-90">Konsultasi melalui website</p>
              </div>
            </div>
            <div className="absolute top-2 right-2">
              <Sparkles className="w-4 h-4 opacity-60" />
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-b-3xl px-6 py-4">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Tim kami siap membantu Anda 24/7
          </p>
        </div>
      </div>
    </div>
  );
}
