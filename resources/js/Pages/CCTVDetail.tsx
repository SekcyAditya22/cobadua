import { type SharedData } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import {
  ArrowLeftIcon,
  CheckIcon,
  Camera,
  Shield,
  Monitor,
  Wifi,
  Eye,
  Clock,
  Star,
  Phone,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { Navigation } from '@/components/ui/navigation';
import { ConsultationModal } from '@/components/ui/consultation-modal';
import { LiveChatWidget, LiveChatWidgetRef } from '@/components/LiveChat/LiveChatWidget';
import { useState, useEffect, useRef } from 'react';

interface CCTVPackage {
  id: number;
  title: string;
  price: string;
  period: string;
  cameras: number;
  features: string[];
  description: string;
  specifications: {
    resolution: string;
    storage: string;
    nightVision: string;
    warranty: string;
    installation: string;
  };
  images: string[];
  badge?: string;
  badgeColor?: string;
}

interface Props {
  package: CCTVPackage;
}

export default function CCTVDetail({ package: cctvPackage }: Props) {
  const { auth } = usePage<SharedData>().props;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const chatWidgetRef = useRef<LiveChatWidgetRef>(null);

  const handleOpenChat = () => {
    chatWidgetRef.current?.openChat();
  };

  const handleOrder = () => {
    // Show consultation modal when ordering
    setIsConsultationModalOpen(true);
  };

  const handleConsultationClick = () => {
    setIsConsultationModalOpen(true);
  };

  const handleContact = (method: string) => {
    switch (method) {
      case 'whatsapp':
        window.open(
          'https://wa.me/6281234567890?text=Halo, saya tertarik dengan paket ' +
            cctvPackage.title,
          '_blank',
        );
        break;
      case 'phone':
        window.location.href = 'tel:+6281234567890';
        break;
      case 'email':
        window.location.href =
          'mailto:info@metanetaccess.com?subject=Inquiry tentang ' +
          cctvPackage.title;
        break;
    }
  };

  return (
    <>
      <Head title={`${cctvPackage.title} - Detail Paket CCTV`} />

      <Navigation onConsultationClick={handleConsultationClick} />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link
            href="/cctv-packages"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Kembali ke Beranda
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Images */}
            <div className="space-y-6">
              <div className="relative">
                {cctvPackage.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`bg-gradient-to-r ${cctvPackage.badgeColor} text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg`}
                    >
                      {cctvPackage.badge}
                    </span>
                  </div>
                )}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-xl overflow-hidden">
                  {cctvPackage.images && cctvPackage.images.length > 0 ? (
                    <img
                      src={cctvPackage.images[selectedImage] || cctvPackage.images[0]}
                      alt={`${cctvPackage.title} - Image ${selectedImage + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to camera icon if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="w-full h-full flex items-center justify-center" style={{ display: cctvPackage.images && cctvPackage.images.length > 0 ? 'none' : 'flex' }}>
                    <Camera className="w-24 h-24 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {cctvPackage.images && cctvPackage.images.length > 0 ? (
                  cctvPackage.images.map((image, index) => (
                    <div
                      key={index}
                      className={`aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg cursor-pointer transition-all duration-300 overflow-hidden ${
                        selectedImage === index
                          ? 'ring-2 ring-blue-500'
                          : 'hover:ring-2 hover:ring-blue-300'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${cctvPackage.title} - Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to camera icon if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full flex items-center justify-center" style={{ display: 'none' }}>
                        <Camera className="w-8 h-8 text-gray-500" />
                      </div>
                    </div>
                  ))
                ) : (
                  // Fallback when no images available
                  [1, 2, 3, 4].map(index => (
                    <div
                      key={index}
                      className={`aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg cursor-pointer transition-all duration-300 ${
                        selectedImage === index - 1
                          ? 'ring-2 ring-blue-500'
                          : 'hover:ring-2 hover:ring-blue-300'
                      }`}
                      onClick={() => setSelectedImage(index - 1)}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-500" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {cctvPackage.title}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {cctvPackage.price}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {cctvPackage.period}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-lg text-gray-700 dark:text-gray-300">
                  <Eye className="w-5 h-5" />
                  <span>{cctvPackage.cameras} Kamera</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Deskripsi Paket
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {cctvPackage.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Fitur Lengkap
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cctvPackage.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Spesifikasi Teknis
                </h3>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4 shadow-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Resolusi
                      </span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {cctvPackage.specifications.resolution}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Penyimpanan
                      </span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {cctvPackage.specifications.storage}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Night Vision
                      </span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {cctvPackage.specifications.nightVision}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Garansi
                      </span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {cctvPackage.specifications.warranty}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Instalasi
                    </span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {cctvPackage.specifications.installation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleOrder}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Pesan Sekarang
                </button>

                
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Garansi Resmi
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Garansi resmi dengan layanan purna jual terpercaya
              </p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <Monitor className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Instalasi Profesional
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Tim teknisi berpengalaman dan bersertifikat
              </p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Support 24/7
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Dukungan teknis tersedia kapan saja Anda butuhkan
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        onOpenChat={handleOpenChat}
      />

      {/* Chat Widget */}
      <LiveChatWidget ref={chatWidgetRef} />
    </>
  );
}
