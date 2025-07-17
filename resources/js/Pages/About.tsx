import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { LiveChatWidget, LiveChatWidgetRef } from '@/components/LiveChat/LiveChatWidget';
import { useRef } from 'react';
import {
  StarIcon,
  Target,
  Eye,
  Heart,
  Award,
  Calendar,
  TrendingUp,
  Users,
  Globe,
  ShieldIcon,
} from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { GradientText } from '@/components/ui/gradient-text';
import { Navigation } from '@/components/ui/navigation';
import { ScrollToTop } from '@/components/ui/scroll-to-top';

export default function About() {
  const { auth } = usePage<SharedData>().props;
  const chatWidgetRef = useRef<LiveChatWidgetRef>(null);

  return (
    <>
      <Head title="Tentang Kami - Metanetaccess">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=inter:400,500,600,700&family=space-grotesk:400,500,600,700"
          rel="stylesheet"
        />
      </Head>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900">
        {/* About Section */}
        <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto">
            {/* About Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-8 dark:bg-green-900/30 dark:text-green-300 animate-fade-in-up">
                <StarIcon className="w-4 h-4 mr-2" />
                Menghubungkan Indonesia ke Masa Depan
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up animation-delay-200">
                Tentang{' '}
                <GradientText className="font-bold">Metanetaccess</GradientText>
              </h1>
              <div className="max-w-4xl mx-auto animate-fade-in-up animation-delay-400">
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Metanetaccess
                  </span>{' '}
                  adalah
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent font-semibold">
                    {' '}
                    penyedia terkemuka
                  </span>{' '}
                  solusi jaringan profesional, berdedikasi untuk memberikan
                  layanan yang
                  <span className="font-semibold text-green-600">
                    andal
                  </span>{' '}
                  dan
                  <span className="font-semibold text-blue-600">
                    inovatif
                  </span>{' '}
                  untuk bisnis dan individu.
                </p>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg transform rotate-1"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      Dengan{' '}
                      <span className="font-bold text-green-600">
                        pengalaman bertahun-tahun
                      </span>{' '}
                      di industri,
                      <span className="font-semibold text-blue-600">
                        {' '}
                        tim profesional bersertifikat
                      </span>{' '}
                      kami berkomitmen untuk memastikan infrastruktur jaringan
                      Anda beroperasi pada
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-bold">
                        {' '}
                        kinerja puncak
                      </span>
                      .
                    </p>

                    <div className="flex items-center justify-center mt-4 space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-600">
                          Andal
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
                        <span className="text-sm font-medium text-blue-600">
                          Inovatif
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse animation-delay-400"></div>
                        <span className="text-sm font-medium text-purple-600">
                          Profesional
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              <div className="text-center animate-fade-in-up animation-delay-600">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  <AnimatedCounter end={450} suffix="+" />
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Pelanggan Aktif
                </div>
              </div>
              <div className="text-center animate-fade-in-up animation-delay-700">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  <AnimatedCounter end={15} suffix=" Kecamatan" />
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Area Coverage
                </div>
              </div>
              <div className="text-center animate-fade-in-up animation-delay-800">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  <AnimatedCounter end={99.8} suffix="%" />
                </div>
                <div className="text-gray-600 dark:text-gray-400">Uptime</div>
              </div>
              <div className="text-center animate-fade-in-up animation-delay-900">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  <AnimatedCounter end={5} suffix="+" />
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Tahun Pengalaman
                </div>
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <div className="animate-fade-in-up">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Visi Kami
                  </h2>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Menjadi penyedia solusi jaringan terdepan di Indonesia yang
                  menghubungkan setiap individu dan bisnis dengan teknologi
                  digital terbaik, menciptakan ekosistem digital yang inklusif
                  dan berkelanjutan.
                </p>
              </div>

              <div className="animate-fade-in-up animation-delay-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Misi Kami
                  </h2>
                </div>
                <ul className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
                  <li>
                    • Menyediakan layanan internet berkualitas tinggi dengan
                    harga terjangkau
                  </li>
                  <li>
                    • Membangun infrastruktur jaringan yang handal dan aman
                  </li>
                  <li>
                    • Memberikan pelayanan pelanggan yang responsif dan
                    profesional
                  </li>
                  <li>
                    • Mendukung transformasi digital Indonesia melalui inovasi
                    teknologi
                  </li>
                </ul>
              </div>
            </div>

            {/* Values */}
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">
                Nilai-Nilai Kami
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 animate-fade-in-up animation-delay-200">
                Prinsip yang memandu setiap langkah kami
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Inovasi
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Selalu menghadirkan teknologi terdepan untuk memberikan
                  layanan internet terbaik bagi pelanggan.
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Kepedulian
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Mengutamakan kepuasan pelanggan dengan layanan yang ramah,
                  responsif, dan solusi yang tepat.
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-400">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Kualitas
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Berkomitmen memberikan layanan berkualitas tinggi dengan
                  standar internasional.
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-600">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                  <ShieldIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Kepercayaan
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Membangun hubungan jangka panjang berdasarkan transparansi dan
                  integritas.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Scroll to Top */}
      <ScrollToTop />

      {/* Chat Widget */}
      <LiveChatWidget ref={chatWidgetRef} />
    </>
  );
}
