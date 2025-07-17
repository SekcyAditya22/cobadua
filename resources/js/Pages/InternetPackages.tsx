import { type SharedData } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import {
  ArrowLeftIcon,
  WifiIcon,
  Shield,
  Monitor,
  Wifi,
  Clock,
  Star,
  Filter,
  Search,
  Zap,
  Download,
  Upload,
} from 'lucide-react';
import { Navigation } from '@/components/ui/navigation';
import { ConsultationModal } from '@/components/ui/consultation-modal';
import { PricingCard } from '@/components/ui/pricing-card';
import { GradientText } from '@/components/ui/gradient-text';
import { LiveChatWidget, LiveChatWidgetRef } from '@/components/LiveChat/LiveChatWidget';
import { useState, useEffect, useRef } from 'react';

interface InternetPackage {
  id: number;
  title: string;
  price: string;
  period: string;
  speed: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  gradient?: boolean;
  badge?: string;
  badgeColor?: string;
}

export default function InternetPackages() {
  const { auth } = usePage<SharedData>().props;

  // Debug log to confirm page loads
  console.log('InternetPackages page loaded successfully!');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredPackages, setFilteredPackages] = useState<InternetPackage[]>([]);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const chatWidgetRef = useRef<LiveChatWidgetRef>(null);

  const handleOpenChat = () => {
    chatWidgetRef.current?.openChat();
  };

  const internetPackages: InternetPackage[] = [
    {
      id: 1,
      title: 'METANET 10 Mbps',
      price: 'Rp 150.000',
      period: 'per bulan',
      speed: '10 Mbps',
      features: [
        'Kecepatan 10 Mbps',
        'Unlimited / Tanpa Kuota',
        'GRATIS Instalasi',
        'Tidak Ada Biaya Sewa Alat',
        'Sistem Prabayar',
        'Pelayanan 24/7 (24 Jam Standby)',
      ],
      buttonText: 'Pilih Paket',
      isPopular: false,
      gradient: false,
      badge: 'Hemat',
      badgeColor: 'from-green-400 to-green-600',
    },
    {
      id: 2,
      title: 'METANET 15 Mbps',
      price: 'Rp 176.000',
      period: 'per bulan',
      speed: '15 Mbps',
      features: [
        'Kecepatan 15 Mbps',
        'Unlimited / Tanpa Kuota',
        'GRATIS Instalasi',
        'Tidak Ada Biaya Sewa Alat',
        'Sistem Prabayar',
        'Pelayanan 24/7 (24 Jam Standby)',
      ],
      buttonText: 'Pilih Paket',
      isPopular: false,
      gradient: false,
      badge: 'Populer',
      badgeColor: 'from-blue-400 to-blue-600',
    },
    {
      id: 3,
      title: 'METANET 20 Mbps',
      price: 'Rp 200.000',
      period: 'per bulan',
      speed: '20 Mbps',
      features: [
        'Kecepatan 20 Mbps',
        'Unlimited / Tanpa Kuota',
        'GRATIS Instalasi',
        'Tidak Ada Biaya Sewa Alat',
        'Sistem Prabayar',
        'Pelayanan 24/7 (24 Jam Standby)',
      ],
      buttonText: 'Pilih Paket',
      isPopular: true,
      gradient: true,
      badge: 'Paling Populer',
      badgeColor: 'from-yellow-400 to-orange-400',
    },
    {
      id: 4,
      title: 'METANET 25 Mbps',
      price: 'Rp 225.000',
      period: 'per bulan',
      speed: '25 Mbps',
      features: [
        'Kecepatan 25 Mbps',
        'Unlimited / Tanpa Kuota',
        'GRATIS Instalasi',
        'Tidak Ada Biaya Sewa Alat',
        'Sistem Prabayar',
        'Pelayanan 24/7 (24 Jam Standby)',
      ],
      buttonText: 'Pilih Paket',
      isPopular: false,
      gradient: false,
      badge: 'Recommended',
      badgeColor: 'from-purple-400 to-purple-600',
    },
    {
      id: 5,
      title: 'METANET 30 Mbps',
      price: 'Rp 250.000',
      period: 'per bulan',
      speed: '30 Mbps',
      features: [
        'Kecepatan 30 Mbps',
        'Unlimited / Tanpa Kuota',
        'GRATIS Instalasi',
        'Tidak Ada Biaya Sewa Alat',
        'Sistem Prabayar',
        'Pelayanan 24/7 (24 Jam Standby)',
      ],
      buttonText: 'Pilih Paket',
      isPopular: true,
      gradient: true,
      badge: 'Terbaik',
      badgeColor: 'from-green-400 to-green-600',
    },
    {
      id: 6,
      title: 'METANET 50 Mbps',
      price: 'Rp 276.000',
      period: 'per bulan',
      speed: '50 Mbps',
      features: [
        'Kecepatan 50 Mbps',
        'Unlimited / Tanpa Kuota',
        'GRATIS Instalasi',
        'Tidak Ada Biaya Sewa Alat',
        'Sistem Prabayar',
        'Pelayanan 24/7 (24 Jam Standby)',
      ],
      buttonText: 'Pilih Paket',
      isPopular: false,
      gradient: true,
      badge: 'Premium',
      badgeColor: 'from-indigo-400 to-indigo-600',
    },

  ];

  useEffect(() => {
    let filtered = internetPackages;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(pkg =>
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.features.some(feature => 
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by category
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(pkg => {
        switch (selectedFilter) {
          case 'popular':
            return pkg.isPopular;
          case 'basic':
            return parseInt(pkg.speed) <= 30;
          case 'premium':
            return parseInt(pkg.speed) > 30 && parseInt(pkg.speed) <= 100;
          case 'enterprise':
            return parseInt(pkg.speed) > 100;
          case 'student':
            return pkg.badge === 'Student' || pkg.badge === 'Education';
          case 'business':
            return pkg.badge === 'Business' || pkg.badge === 'Enterprise' || pkg.badge === 'Startup' || pkg.badge === 'WFH';
          case 'special':
            return pkg.badge === 'Gaming' || pkg.badge === 'Streaming' || pkg.badge === 'Creator' || pkg.badge === 'Smart Home' || pkg.badge === 'Ultra Speed';
          default:
            return true;
        }
      });
    }

    setFilteredPackages(filtered);
  }, [searchTerm, selectedFilter]);

  const handlePackageSelect = (packageTitle: string) => {
    // Show consultation modal when selecting an internet package
    setIsConsultationModalOpen(true);
    console.log(`Selected internet package: ${packageTitle}`);
  };

  const handleConsultationClick = () => {
    setIsConsultationModalOpen(true);
  };

  return (
    <>
      <Head title="Paket Internet - Metanetaccess">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=inter:400,500,600,700&family=space-grotesk:400,500,600,700"
          rel="stylesheet"
        />
      </Head>

      {/* Navigation */}
      <Navigation onConsultationClick={handleConsultationClick} />

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-green-900">
        {/* Header Section */}
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <div className="mb-8">
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                Kembali ke Beranda
              </Link>
            </div>

            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-8 dark:bg-green-900/30 dark:text-green-300 animate-fade-in-up">
                <WifiIcon className="w-4 h-4 mr-2" />
                Internet Berkecepatan Tinggi
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                <GradientText gradient="green-blue">
                  METANET ACCESS - Paket Internet
                </GradientText>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                <strong>HARGA YANG PASS KECEPATAN TANPA BATAS</strong><br/>
                Pilih paket internet METANET ACCESS by BOOMBAS ISP yang sesuai dengan kebutuhan Anda. Sistem prabayar dengan pelayanan 24/7.
              </p>

              {/* Package Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">6</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Pilihan Paket</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Mbps Max</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">150K</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Mulai Dari</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">24/7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari paket internet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white appearance-none bg-white"
                >
                  <option value="all">Semua Paket</option>
                  <option value="popular">Paling Populer</option>
                  <option value="basic">Basic (≤30 Mbps)</option>
                  <option value="premium">Premium (31-100 Mbps)</option>
                  <option value="enterprise">Enterprise (&gt;100 Mbps)</option>
                  <option value="student">Student & Education</option>
                  <option value="business">Business & Work</option>
                  <option value="special">Special Purpose</option>
                </select>
              </div>
            </div>

            {/* Results Info */}
            {(searchTerm || selectedFilter !== 'all') && (
              <div className="text-center mb-8">
                <p className="text-gray-600 dark:text-gray-400">
                  Menampilkan <span className="font-semibold text-green-600">{filteredPackages.length}</span> dari <span className="font-semibold">{internetPackages.length}</span> paket internet
                  {searchTerm && (
                    <span> untuk "<span className="font-semibold text-blue-600">{searchTerm}</span>"</span>
                  )}
                </p>
              </div>
            )}

            {/* Internet Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto pt-4">
              {filteredPackages.map((internetPackage, index) => (
                <div
                  key={internetPackage.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <PricingCard
                    title={internetPackage.title}
                    price={internetPackage.price}
                    period={internetPackage.period}
                    features={internetPackage.features}
                    buttonText={internetPackage.buttonText}
                    isPopular={internetPackage.isPopular}
                    gradient={internetPackage.gradient}
                    badge={internetPackage.badge}
                    badgeColor={internetPackage.badgeColor}
                    onSelect={() => handlePackageSelect(internetPackage.title)}
                  />
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredPackages.length === 0 && (
              <div className="text-center py-12">
                <WifiIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Tidak ada paket yang ditemukan
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Coba ubah kata kunci pencarian atau filter yang Anda gunakan.
                </p>
              </div>
            )}

            {/* METANET ACCESS Features Highlight */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center animate-fade-in-up animation-delay-800">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Unlimited / Tanpa Kuota
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Tidak ada pembatasan kuota internet
                </p>
              </div>
              <div className="text-center animate-fade-in-up animation-delay-900">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  GRATIS Instalasi
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Pemasangan gratis tanpa biaya tambahan
                </p>
              </div>
              <div className="text-center animate-fade-in-up animation-delay-1000">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Pelayanan 24/7
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  24 Jam standby siap membantu Anda
                </p>
              </div>
              <div className="text-center animate-fade-in-up animation-delay-1100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                  <Wifi className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Tidak Ada Biaya Sewa Alat
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Perangkat dipinjamkan tanpa biaya sewa
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Langganan Sekarang!</h3>
              <p className="text-lg mb-6">Hubungi kami untuk berlangganan METANET ACCESS</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    📍
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Alamat</div>
                    <div className="text-sm opacity-90">Jl. Bolo Selomartani Kalasan</div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    📞
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Telepon</div>
                    <div className="text-sm opacity-90">0878 0575 2834</div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    📩
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Email</div>
                    <div className="text-sm opacity-90">adhitiarangga07@gmail.com</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-sm opacity-75">
                <p><strong>PT. Metamorfosa Media</strong> - Best Regard Metamorfosa Media Internet</p>
                <p className="mt-2">Support by <strong>BOOMBAS</strong> Internet Service Provider</p>
              </div>
            </div>
          </div>
        </section>
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
