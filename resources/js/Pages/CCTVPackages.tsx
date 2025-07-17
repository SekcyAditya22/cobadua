import { type SharedData } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import {
  ArrowLeftIcon,
  Camera,
  Shield,
  Monitor,
  Wifi,
  Eye,
  Clock,
  Star,
  Filter,
  Search,
} from 'lucide-react';
import { Navigation } from '@/components/ui/navigation';
import { ConsultationModal } from '@/components/ui/consultation-modal';
import { CCTVPackageCard } from '@/components/ui/cctv-package-card';
import { GradientText } from '@/components/ui/gradient-text';
import { LiveChatWidget, LiveChatWidgetRef } from '@/components/LiveChat/LiveChatWidget';
import { useState, useEffect, useRef } from 'react';

interface CCTVPackage {
  id: number;
  title: string;
  price: string;
  period: string;
  cameras: number;
  brand?: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  gradient?: boolean;
  badge?: string;
  badgeColor?: string;
}

interface Props {
  packages: CCTVPackage[];
}

export default function CCTVPackages({ packages }: Props) {
  const { auth } = usePage<SharedData>().props;
  const [filteredPackages, setFilteredPackages] = useState(packages);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [cameraFilter, setCameraFilter] = useState('all');
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const chatWidgetRef = useRef<LiveChatWidgetRef>(null);

  const handleOpenChat = () => {
    chatWidgetRef.current?.openChat();
  };

  useEffect(() => {
    let filtered = packages;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        pkg =>
          pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.features.some(feature =>
            feature.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    // Price filter
    if (priceFilter !== 'all') {
      filtered = filtered.filter(pkg => {
        // Extract numeric value from price string like "Rp 1.8 Juta"
        const priceMatch = pkg.price.match(/(\d+\.?\d*)/);
        const price = priceMatch ? parseFloat(priceMatch[1]) : 0;

        switch (priceFilter) {
          case 'under-5':
            return price < 5;
          case '5-10':
            return price >= 5 && price <= 10;
          case 'over-10':
            return price > 10;
          default:
            return true;
        }
      });
    }

    // Camera filter
    if (cameraFilter !== 'all') {
      filtered = filtered.filter(pkg => {
        switch (cameraFilter) {
          case 'small':
            return pkg.cameras <= 4;
          case 'medium':
            return pkg.cameras > 4 && pkg.cameras <= 12;
          case 'large':
            return pkg.cameras > 12;
          default:
            return true;
        }
      });
    }

    setFilteredPackages(filtered);
  }, [searchTerm, priceFilter, cameraFilter, packages]);

  const handleCCTVSelect = (packageTitle: string) => {
    // Show consultation modal when selecting a CCTV package
    setIsConsultationModalOpen(true);
    console.log(`Selected CCTV package: ${packageTitle}`);
  };

  const handleCCTVDetail = (packageId: number) => {
    // Navigate to individual package detail
    window.location.href = `/cctv-detail/${packageId}`;
  };

  const handleConsultationClick = () => {
    setIsConsultationModalOpen(true);
  };

  return (
    <>
      <Head title="Semua Paket CCTV - Metanetaccess" />

      <Navigation onConsultationClick={handleConsultationClick} />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/#cctv"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Kembali ke Beranda
            </Link>
          </div>

          <div className="text-center mb-12">

            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8 dark:bg-blue-900/30 dark:text-blue-300 animate-fade-in-up">
              <Camera className="w-4 h-4 mr-2" />
              Sistem Keamanan Terdepan
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <GradientText gradient="blue-purple">
                Semua Paket CCTV Profesional
              </GradientText>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Pilih dari 16 paket CCTV yang tersedia dengan 3 brand terpercaya: DAHUA, HILOOK, dan HIKVISION.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari paket CCTV..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Price Filter */}
              <select
                value={priceFilter}
                onChange={e => setPriceFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Semua Harga</option>
                <option value="under-5">Di bawah 5 Juta</option>
                <option value="5-10">5 - 10 Juta</option>
                <option value="over-10">Di atas 10 Juta</option>
              </select>

              {/* Camera Filter */}
              <select
                value={cameraFilter}
                onChange={e => setCameraFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Semua Kamera</option>
                <option value="small">1-4 Kamera</option>
                <option value="medium">5-12 Kamera</option>
                <option value="large">13+ Kamera</option>
              </select>

              {/* Results Count */}
              <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {filteredPackages.length} paket ditemukan
                </span>
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch pt-4">
            {filteredPackages.map((cctvPackage, index) => (
              <div
                key={cctvPackage.id}
                className="animate-fade-in-up h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CCTVPackageCard
                  id={cctvPackage.id}
                  title={cctvPackage.title}
                  price={cctvPackage.price}
                  period={cctvPackage.period}
                  cameras={cctvPackage.cameras}
                  brand={cctvPackage.brand}
                  features={cctvPackage.features}
                  buttonText={cctvPackage.buttonText}
                  isPopular={cctvPackage.isPopular}
                  gradient={cctvPackage.gradient}
                  badge={cctvPackage.badge}
                  badgeColor={cctvPackage.badgeColor}
                  onSelect={() => handleCCTVSelect(cctvPackage.title)}
                  onViewDetail={() => handleCCTVDetail(cctvPackage.id)}
                  delay={index * 50}
                />
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Tidak ada paket yang ditemukan
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Coba ubah filter pencarian Anda
              </p>
            </div>
          )}

          {/* Features Highlight */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                HD Quality
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Rekaman jernih hingga 4K Ultra HD
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Night Vision
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Monitoring 24/7 dengan infrared
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Remote Access
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Pantau dari smartphone Anda
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Smart Analytics
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                AI detection & motion alerts
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
