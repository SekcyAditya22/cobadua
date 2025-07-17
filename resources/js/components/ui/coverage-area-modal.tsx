import { useState, useEffect } from 'react';
import { X, MapPin, Globe, ExternalLink } from 'lucide-react';

interface CoverageAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CoverageAreaModal({ isOpen, onClose }: CoverageAreaModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
          </div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <MapPin size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Coverage Area MetanetAccess</h2>
                <p className="text-blue-100 text-sm">Jangkauan layanan internet dan CCTV kami</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white/20 p-2 rounded-full transition-all duration-200 hover:scale-110"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Coverage Info */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-green-600" />
              Area Layanan Kami
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">🌐 Internet Coverage:</h4>
                <ul className="space-y-1">
                  <li>• Sleman, Kulonprogo, dan sekitarnya</li>
                  <li>• DIY (area tertentu)</li>
                  <li>• Klaten (area tertentu)</li>
                  <li>• Antena ready</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">📹 CCTV Installation:</h4>
                <ul className="space-y-1">
                  <li>• Seluruh area DIY dan sekitarnya</li>
                  
                  <li>• Area khusus (konsultasi)</li>
                  <li>• Remote monitoring tersedia</li>
                  <li>• Tersedia Paket</li> 
                </ul>
              </div>
            </div>
          </div>

          {/* Google Earth Option */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Lihat Coverage Area:</h3>

            <div className="flex justify-center">
              <a
                href="https://earth.google.com/earth/d/1W18d52JzbLSYjXnfzH5Fg6puEkOOxwVB?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-xl border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-200 hover:scale-105 max-w-md w-full"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe size={32} className="text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Google Earth</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">3D Interactive View</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Lihat coverage area dalam tampilan 3D yang interaktif dengan detail tinggi.
                  </p>
                  <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700">
                    <ExternalLink size={16} className="mr-2" />
                    Buka Google Earth
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">📍 Informasi Penting:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Coverage area dapat berubah sesuai pengembangan infrastruktur</li>
              <li>• Untuk area di luar coverage, silakan konsultasi dengan tim kami</li>
              <li>• Survey lokasi gratis untuk memastikan kualitas sinyal</li>
              <li>• Instalasi tersedia dengan jadwal yang fleksibel</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
