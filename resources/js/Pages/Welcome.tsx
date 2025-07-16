import { type SharedData } from '@/types';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { LiveChatWidget, LiveChatWidgetRef } from '@/components/LiveChat/LiveChatWidget';
import {
  StarIcon,
  ArrowRightIcon,
  PlayIcon,
  WifiIcon,
  ShieldIcon,
  Shield,
  Wrench,
  MonitorIcon,
  HeadphonesIcon,
  Eye,
  MapPin,
  Phone,
  Mail,
  Camera,
} from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { FloatingElements } from '@/components/ui/floating-elements';
import { GradientText } from '@/components/ui/gradient-text';
import { FeatureCard } from '@/components/ui/feature-card';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { SmoothScrollLink } from '@/components/ui/smooth-scroll-link';
import { TestimonialCard } from '@/components/ui/testimonial-card';
import { FAQSection } from '@/components/ui/faq-item';
import { PricingCard } from '@/components/ui/pricing-card';
import { CCTVPackageCard } from '@/components/ui/cctv-package-card';
import { Navigation } from '@/components/ui/navigation';
import { ConsultationModal } from '@/components/ui/consultation-modal';
import { CoverageAreaModal } from '@/components/ui/coverage-area-modal';


// Add confetti animation styles
const confettiStyles = `
  @keyframes confetti-fall {
    0% { transform: translateY(-10px) rotateZ(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotateZ(720deg); opacity: 0; }
  }
`;

// Inject confetti styles
if (
  typeof document !== 'undefined' &&
  !document.getElementById('confetti-animations')
) {
  const styleElement = document.createElement('style');
  styleElement.id = 'confetti-animations';
  styleElement.textContent = confettiStyles;
  document.head.appendChild(styleElement);
}

export default function Welcome() {
  const { auth } = usePage<SharedData>().props;
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isCoverageAreaModalOpen, setIsCoverageAreaModalOpen] = useState(false);
  const chatWidgetRef = useRef<LiveChatWidgetRef>(null);

  const handleOpenChat = () => {
    chatWidgetRef.current?.openChat();
  };

  const handleInternetPackagesClick = () => {
    console.log('Internet packages button clicked!');
    alert('Navigating to Internet Packages...');
    router.visit('/internet-packages');
  };

  const handleConsultationClick = () => {
    setIsConsultationModalOpen(true);
  };

  const handleSubscribeClick = () => {
    if (!auth.user) {
      // Show consultation modal for non-authenticated users
      setIsConsultationModalOpen(true);
      return;
    }

    // User is authenticated, redirect to dashboard
    window.location.href = '/dashboard';
  };

  const pricingPlans = [
    {
      title: 'METANET 10 Mbps',
      price: 'Rp 150.000',
      period: 'per bulan',
      features: [
        'Kecepatan 10 Mbps',
        'Unlimited / Tanpa Kuota',
        'GRATIS Instalasi',
        'Tidak Ada Biaya Sewa Alat',
        'Sistem Prabayar',
        'Pelayanan 24/7',
      ],
      buttonText: 'Pilih Paket',
      isPopular: false,
      gradient: false,
      badge: 'Hemat',
      badgeColor: 'from-green-400 to-green-600',
    },
    {
      title: 'METANET 20 Mbps',
      price: 'Rp 200.000',
      period: 'per bulan',
      features: [
        'Kecepatan 20 Mbps',
        'Unlimited / Tanpa Kuota',
        'GRATIS Instalasi',
        'Tidak Ada Biaya Sewa Alat',
        'Sistem Prabayar',
        'Pelayanan 24/7',
      ],
      buttonText: 'Pilih Paket',
      isPopular: true,
      gradient: true,
      badge: 'Paling Populer',
      badgeColor: 'from-yellow-400 to-orange-400',
    },
    {
      title: 'METANET 30 Mbps',
      price: 'Rp 250.000',
      period: 'per bulan',
      features: [
        'Kecepatan 30 Mbps',
        'Unlimited / Tanpa Kuota',
        'GRATIS Instalasi',
        'Tidak Ada Biaya Sewa Alat',
        'Sistem Prabayar',
        'Pelayanan 24/7',
      ],
      buttonText: 'Pilih Paket',
      isPopular: true,
      gradient: true,
      badge: 'Terbaik',
      badgeColor: 'from-purple-400 to-purple-600',
    },
  ];

  const cctvPackages = [
    {
      id: 1,
      title: 'DAHUA 2 Kamera',
      price: 'Rp 2.100.000',
      period: 'paket lengkap',
      cameras: 2,
      brand: 'DAHUA',

      features: [
        '2 Kamera Indoor/Outdoor',
        'DVR 4 Channel + adaptor',
        'HDD 500GB (bisa request)',
        'Power Supply',
        'Kabel Coaxial Rg59 + power',
        '5m Kabel UTP / LAN',
        'Konektor BNC dan DC',
        '2 Pelindung Kabel / Duck Cabel',
        'FREE: Mouse & Kabel HDMI/RCA',
        'Monitoring On TV dan HP'
      ],
      buttonText: 'Pilih Paket DAHUA',
      isPopular: false,
      gradient: false,
      badge: 'DAHUA',
      badgeColor: 'from-red-400 to-red-600',
    },
    {
      id: 6,
      title: 'HILOOK 4 Kamera',
      price: 'Rp 2.770.000',
      period: 'paket lengkap',
      cameras: 4,
      brand: 'HILOOK',

      features: [
        '4 Kamera Indoor/Outdoor',
        'DVR 4 Channel + adaptor',
        'HDD 1TB (bisa request)',
        'Power Supply',
        'Kabel Coaxial Rg59 + Power',
        '5m Kabel UTP / LAN',
        'Konektor BNC dan DC',
        '4 Pelindung Kabel / Duck Cabel',
        'FREE: Mouse & Kabel HDMI/RCA',
        'Monitoring On TV dan HP'
      ],
      buttonText: 'Pilih Paket HILOOK',
      isPopular: true,
      gradient: false,
      badge: 'HILOOK',
      badgeColor: 'from-blue-400 to-blue-600',
    },
    {
      id: 12,
      title: 'HIKVISION 8 Kamera',
      price: 'Rp 6.250.000',
      period: 'paket lengkap',
      cameras: 8,
      brand: 'HIKVISION',

      features: [
        '8 Kamera Indoor/Outdoor',
        'DVR 8 Channel + adaptor',
        'HDD 2TB (bisa request)',
        'Power Supply',
        '240m Kabel Coaxial Rg59 + power',
        '5m Kabel UTP / LAN',
        'Konektor BNC dan DC',
        '5 Pelindung Kabel / Duck Cabel',
        'FREE: Mouse & Kabel HDMI/RCA',
        'Monitoring On TV dan HP'
      ],
      buttonText: 'Pilih Paket HIKVISION',
      isPopular: true,
      gradient: true,
      badge: 'HIKVISION',
      badgeColor: 'from-green-400 to-green-600',
    },
  ];

  const handlePlanSelect = (planTitle: string) => {
    // Show consultation modal when selecting a plan
    setIsConsultationModalOpen(true);
    console.log(`Selected plan: ${planTitle}`);
  };



  const handleCCTVSelect = (packageTitle: string) => {
    // Show consultation modal when selecting a CCTV package
    setIsConsultationModalOpen(true);
    console.log(`Selected CCTV package: ${packageTitle}`);
  };

  const handleCCTVDetail = () => {
    // Redirect to CCTV packages page
    window.location.href = '/cctv-packages';
  };



  const features = [
    {
      icon: WifiIcon,
      title: 'Akses internet oleh Bombas ISP',
      description:
        'Solusi konektivitas internet berkecepatan tinggi dan andal untuk bisnis dan rumah dengan jaminan uptime and kinerja.',
    },
    {
      icon: ShieldIcon,
      title: 'Pemantauan jaringan',
      description:
        'Pemantauan jaringan 24/7 untuk mendeteksi dan menyelesaikan masalah sebelum berdampak pada operasi bisnis Anda.',
    },
    {
      icon: Wrench,
      title: 'Instalasi jaringan',
      description:
        'Instalasi profesional jaringan LAN, Nirkabel, dan Fiber termasuk solusi FTTH untuk konektivitas modern serta antena PTP.',
    },
    {
      icon: HeadphonesIcon,
      title: 'Support 24/7',
      description:
        'Layanan pelanggan siap membantu Anda kapan saja melalui WhatsApp, telepon, atau kunjungan langsung.',
    },
    {
      icon: MonitorIcon,
      title: 'Manajemen Router/Modem',
      description:
        'Pantau penggunaan internet dan kualitas koneksi Anda secara real-time melalui aplikasi mobile.',
    },
    {
      icon: Camera,
      title: 'Layanan CCTV',
      description:
        'Sistem keamanan CCTV terintegrasi dengan monitoring 24/7 untuk melindungi rumah dan bisnis Anda.',
    },
  ];

  const testimonials = [
    {
      name: 'Budi Santoso',
      role: 'Warga RT 05/RW 03',
      content:
        'Internet Metanetaccess sangat stabil dan cepat. Anak-anak bisa belajar online dengan lancar, dan saya bisa work from home tanpa masalah. Harga juga sangat terjangkau!',
      avatar: '�‍💼',
      rating: 5,
    },
    {
      name: 'Siti Nurhaliza',
      role: 'Ibu Rumah Tangga',
      content:
        'Pelayanan teknisinya sangat ramah dan profesional. Pemasangan cepat, dan kalau ada masalah langsung ditangani. Streaming Netflix jadi lancar jaya!',
      avatar: '�‍🏠',
      rating: 5,
    },
    {
      name: 'Ahmad Rizki',
      role: 'Mahasiswa',
      content:
        'Sebagai mahasiswa, paket internet Metanetaccess sangat membantu untuk kuliah online dan mengerjakan tugas. Ping rendah, cocok untuk gaming juga!',
      avatar: '�‍🎓',
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: 'Berapa lama proses pemasangan internet?',
      answer:
        'Proses pemasangan biasanya memakan waktu 1-3 hari kerja setelah pendaftaran. Tim teknisi kami akan menghubungi Anda untuk mengatur jadwal pemasangan yang sesuai dengan waktu Anda.',
    },
    {
      question: 'Apakah ada biaya pemasangan?',
      answer:
        'Untuk paket berlangganan 12 bulan, pemasangan GRATIS! Untuk paket bulanan, dikenakan biaya pemasangan Rp 150.000 yang sudah termasuk kabel, router, dan konfigurasi.',
    },
    {
      question: 'Bagaimana jika internet bermasalah?',
      answer:
        'Kami menyediakan layanan support 24/7 melalui WhatsApp di 0812-3456-7890. Tim teknisi siap datang ke lokasi jika diperlukan perbaikan perangkat atau jaringan.',
    },
    {
      question: 'Apakah bisa ganti paket internet?',
      answer:
        'Tentu saja! Anda bisa upgrade atau downgrade paket kapan saja. Perubahan akan berlaku pada periode billing berikutnya tanpa biaya tambahan.',
    },
    {
      question: 'Area mana saja yang sudah terjangkau?',
      answer:
        'Saat ini kami melayani wilayah Sleman, Yogyakarta, dan Kulonprogo. Kami terus memperluas jangkauan ke area lain. Hubungi kami untuk cek ketersediaan di area Anda.',
    },
    {
      question: 'Apakah ada kontrak minimal berlangganan?',
      answer:
        'Tidak ada kontrak minimal! Anda bisa berlangganan bulanan atau tahunan. Paket tahunan mendapat diskon dan pemasangan gratis.',
    },
  ];

  return (
    <>
      <Head title="Metanetaccess - Internet Cepat & Terjangkau">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=inter:400,500,600,700&family=space-grotesk:400,500,600,700"
          rel="stylesheet"
        />
      </Head>

      {/* Navigation */}
      <Navigation onConsultationClick={handleConsultationClick} />

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900">
        {/* Hero Section */}
        <section className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <FloatingElements />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-8 dark:bg-green-900/30 dark:text-green-300 animate-fade-in-up">
                <StarIcon className="w-4 h-4 mr-2" />
                Dipercaya oleh 450+ keluarga di Daerah Istimewa Yogyakarta & sekitarnya
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up animation-delay-200">
                Internet Cepat & Terjangkau untuk{' '}
                <GradientText className="font-bold">
                  Keluarga Indonesia
                </GradientText>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Nikmati koneksi internet fiber optik dan antena berkecepatan tinggi dengan
                harga terjangkau. Cocok untuk work from home, sekolah online,
                streaming, dan gaming.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <button
                  onClick={() => handleSubscribeClick()}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center"
                >
                  {auth.user ? 'Ke Dashboard' : 'Berlangganan Sekarang'}
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
                <button
                  onClick={() => setIsCoverageAreaModalOpen(true)}
                  className="flex items-center px-8 py-4 text-gray-700 dark:text-gray-300 font-semibold text-lg hover:text-gray-900 dark:hover:text-white transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Lihat Coverage Area
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-600">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    <AnimatedCounter end={450} suffix="+" />
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Pelanggan Aktif
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    <AnimatedCounter end={99.8} suffix="%" />
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    <AnimatedCounter end={50} suffix=" Mbps" />
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Kecepatan Max
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    24/7
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Mengapa Memilih Metanetaccess ?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Fitur-fitur unggulan yang membuat Metanetaccess menjadi pilihan
                terbaik untuk kebutuhan internet keluarga Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 100}
                  className="animate-fade-in-up"
                />
              ))}
            </div>
          </div>
        </section>



        {/* Pricing Section */}
        <section
          id="pricing"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-indigo-900/20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-8 dark:bg-green-900/30 dark:text-green-300 animate-fade-in-up">
                <WifiIcon className="w-4 h-4 mr-2" />
                Internet Berkecepatan Tinggi
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                <GradientText gradient="green-blue">
                  METANET ACCESS - Paket Internet
                </GradientText>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              
                Pilih paket Metanetaccess by Boombas ISP yang sesuai dengan kebutuhan Anda.
                Sistem prabayar dengan pelayanan 24/7 standby.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-4">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <PricingCard
                    title={plan.title}
                    price={plan.price}
                    period={plan.period}
                    features={plan.features}
                    buttonText={plan.buttonText}
                    isPopular={plan.isPopular}
                    gradient={plan.gradient}
                    badge={plan.badge}
                    badgeColor={plan.badgeColor}
                    onSelect={() => handlePlanSelect(plan.title)}
                  />
                </div>
              ))}
            </div>

            {/* View All Packages Button */}
            <div className="text-center mt-12">
              <div className="space-y-4">
                {/* Primary Button */}
                <Link
                  href="/internet-packages"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative z-10 cursor-pointer"
                >
                  <WifiIcon className="w-6 h-6" />
                  Lihat Semua 6 Paket METANET ACCESS
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>


              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-3 animate-fade-in-up animation-delay-900">
                Temukan paket METANET ACCESS yang sesuai dengan kebutuhan Anda dari 6 pilihan tersedia
              </p>
            </div>

            {/* Internet Features Highlight */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center animate-fade-in-up animation-delay-800">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                  <WifiIcon className="w-8 h-8 text-white" />
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
                  <ShieldIcon className="w-8 h-8 text-white" />
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
                  <MonitorIcon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Sistem Prabayar
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Bayar di awal baru digunakan
                </p>
              </div>
              <div className="text-center animate-fade-in-up animation-delay-1100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                  <HeadphonesIcon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Pelayanan 24/7
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  24 Jam standby siap membantu Anda
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CCTV Packages Section */}
        <section
          id="cctv"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8 dark:bg-blue-900/30 dark:text-blue-300 animate-fade-in-up animate-security-pulse">
                <Camera className="w-4 h-4 mr-2 animate-cctv-blink" />
                Sistem Keamanan Terdepan
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                <GradientText gradient="blue-purple">
                  Paket CCTV Profesional
                </GradientText>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Lindungi properti Anda dengan sistem CCTV berkualitas tinggi.
                Tersedia 13 paket lengkap dengan instalasi profesional dan
                garansi resmi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch pt-4">
              {cctvPackages.slice(0, 3).map((cctvPackage, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up h-full"
                  style={{ animationDelay: `${index * 200}ms` }}
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
                    onViewDetail={() => handleCCTVDetail()}
                    delay={index * 100}
                    detailButtonText="Lihat Semua Paket"
                  />
                </div>
              ))}
            </div>

            {/* View All Packages Button */}
            <div className="text-center mt-12">
              <Link
                href="/cctv-packages"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-fade-in-up animation-delay-800 relative z-10 cursor-pointer"
              >
                <Camera className="w-6 h-6" />
                Lihat Semua 16 Paket CCTV
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <p className="text-gray-600 dark:text-gray-400 mt-3 animate-fade-in-up animation-delay-900">
                Temukan paket CCTV yang sesuai dengan kebutuhan Anda
              </p>
            </div>

            {/* CCTV Features Highlight */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center animate-fade-in-up animation-delay-800">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 animate-security-pulse">
                  <Eye className="w-8 h-8 text-white animate-cctv-zoom" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  HD Quality
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Rekaman jernih hingga 4K Ultra HD
                </p>
              </div>
              <div className="text-center animate-fade-in-up animation-delay-900">
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
              <div className="text-center animate-fade-in-up animation-delay-1000">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 hover:animate-security-pulse">
                  <MonitorIcon className="w-8 h-8 text-white animate-cctv-scan" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Remote Access
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Pantau dari smartphone Anda
                </p>
              </div>
              <div className="text-center animate-fade-in-up animation-delay-1100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                  <WifiIcon className="w-8 h-8 text-white" />
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
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Kata Pelanggan Kami
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Jangan hanya percaya kata kami. Dengarkan langsung pengalaman
                nyata dari pelanggan Metanetaccess.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  name={testimonial.name}
                  role={testimonial.role}
                  content={testimonial.content}
                  avatar={testimonial.avatar}
                  rating={testimonial.rating}
                  delay={index * 100}
                  className="animate-fade-in-up"
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Siap Beralih ke Internet yang Lebih Baik?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan keluarga yang sudah merasakan internet
              cepat dan stabil dari Metanetaccess.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleSubscribeClick()}
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg flex items-center justify-center"
              >
                {auth.user ? 'Ke Dashboard' : 'Berlangganan Sekarang'}
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
              <SmoothScrollLink
                href="#contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors flex items-center justify-center"
              >
                Hubungi Kami
              </SmoothScrollLink>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Pertanyaan yang Sering Diajukan
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Ada pertanyaan? Kami punya jawabannya. Jika tidak menemukan yang
                Anda cari, hubungi tim support kami.
              </p>
            </div>

            <FAQSection faqs={faqs} />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">
              Hubungi Kami
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 animate-fade-in-up animation-delay-200">
              Siap membantu Anda terhubung dengan masa depan
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center animate-fade-in-up animation-delay-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Alamat
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Jl. Bolo Selomartani Kalasan Sleman
                  <br />
                  55571
                </p>
              </div>

              <div className="text-center animate-fade-in-up animation-delay-400">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Telepon
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  +62 878 0575 2834
                  <br />
                  
                </p>
              </div>

              <div className="text-center animate-fade-in-up animation-delay-500">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Email
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  adhitiarangga07@gmail.com
                  <br />
                  
                </p>
              </div>
            </div>

            <div className="animate-fade-in-up animation-delay-600">
              <button
                onClick={() => handleSubscribeClick()}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center"
              >
                {auth.user ? 'Ke Dashboard' : 'Mulai Berlangganan'}
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <WifiIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-xl bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Metanetaccess
                  </span>
                </div>
                <p className="text-gray-400 mb-6 max-w-md">
                  Solusi jaringan profesional untuk bisnis dan individu.
                  Menghubungkan anda ke masa depan.
                </p>
                <div className="flex space-x-4">
                  

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/metamorfosamediainternet/"
                    className="text-gray-400 hover:text-pink-500 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                  Product
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#features"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Internet
                    </a>
                  </li>
                  <li>
                    <a
                      href="#cctv"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      CCTV
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      About
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                  Company
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/about"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://boombas.net.id/"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Boombas
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 Metanetaccess. Seluruh hak cipta dilindungi.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />



      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        onOpenChat={handleOpenChat}
      />

      {/* Coverage Area Modal */}
      <CoverageAreaModal
        isOpen={isCoverageAreaModalOpen}
        onClose={() => setIsCoverageAreaModalOpen(false)}
      />

      {/* Chat Widget */}
      <LiveChatWidget ref={chatWidgetRef} />
    </>
  );
}
