import { CheckIcon, Sparkles, Camera, Shield, Monitor, Wifi, Eye, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

// Add CSS animations for CCTV cards
const cctvAnimationStyles = `
  @keyframes cctvPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
  @keyframes cctvGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
    50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
  }
  @keyframes cctvBorderGlow {
    0%, 100% { border-color: rgba(34, 197, 94, 0.5); }
    50% { border-color: rgba(34, 197, 94, 0.8); }
  }
  @keyframes cctvBackgroundShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes cctvFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes cctvRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes cctvBounce {
    0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
    40%, 43% { transform: translateY(-5px); }
    70% { transform: translateY(-2px); }
  }
  
  .cctv-card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .cctv-card:hover {
    transform: translateY(-8px) scale(1.02);
  }
  .animate-cctv-pulse {
    animation: cctvPulse 3s ease-in-out infinite;
  }
  .animate-cctv-glow {
    animation: cctvGlow 2s ease-in-out infinite;
  }
  .animate-cctv-border-glow {
    animation: cctvBorderGlow 2s ease-in-out infinite;
  }
  .animate-cctv-background-shift {
    background-size: 200% 200%;
    animation: cctvBackgroundShift 4s ease infinite;
  }
  .animate-cctv-float {
    animation: cctvFloat 3s ease-in-out infinite;
  }
  .animate-cctv-rotate {
    animation: cctvRotate 20s linear infinite;
  }
  .animate-cctv-bounce {
    animation: cctvBounce 2s infinite;
  }
`;

// Inject styles into document head
if (typeof document !== 'undefined' && !document.getElementById('cctv-animations')) {
  const styleElement = document.createElement('style');
  styleElement.id = 'cctv-animations';
  styleElement.textContent = cctvAnimationStyles;
  document.head.appendChild(styleElement);
}

interface CCTVPackageCardProps {
  id: number;
  title: string;
  price: string;
  period: string;
  cameras: number;
  brand?: string;
  image?: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  gradient?: boolean;
  badge?: string;
  badgeColor?: string;
  onSelect?: () => void;
  onViewDetail?: (id?: number) => void;
  delay?: number;
  detailButtonText?: string;
}

export function CCTVPackageCard({
  id,
  title,
  price,
  period,
  cameras,
  brand,
  image,
  features,
  buttonText,
  isPopular = false,
  gradient = false,
  badge,
  badgeColor = 'from-blue-400 to-blue-600',
  onSelect,
  onViewDetail,
  delay = 0,
  detailButtonText = 'Lihat Detail',
}: CCTVPackageCardProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setShowRipple(true);

    setTimeout(() => {
      setIsClicked(false);
      setShowRipple(false);
    }, 600);

    setTimeout(() => {
      onSelect?.();
    }, 200);
  };

  // Check if price is above 5 million (premium package)
  const isPremiumPackage = () => {
    const priceNumber = parseInt(price.replace(/[^\d]/g, ''));
    return priceNumber >= 5000000;
  };

  const cardClasses = `
    cctv-card relative p-6 rounded-xl shadow-lg border-2 transition-all duration-500 transform overflow-visible h-full flex flex-col min-h-[580px]
    ${badge ? 'mt-6' : 'mt-0'}
    ${gradient || isPremiumPackage()
      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white border-transparent animate-cctv-glow'
      : `bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-800
         ${isHovered ? 'from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-900 dark:via-purple-900 dark:to-indigo-900 animate-cctv-background-shift border-blue-400 dark:border-purple-400 animate-cctv-border-glow' : 'border-gray-200 dark:border-gray-700'}`
    }
    ${isClicked ? 'animate-cctv-pulse' : ''}
    ${isHovered ? 'shadow-2xl animate-cctv-glow' : 'shadow-lg'}
    cursor-pointer group
  `;

  return (
    <div
      className={`${cardClasses} ${mounted ? 'animate-cctv-float' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ 
        animationDelay: `${delay}ms`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 animate-cctv-bounce z-10">
          <span className={`bg-gradient-to-r ${badgeColor} text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg flex items-center gap-1 ${isHovered ? 'animate-pulse scale-110' : ''} transition-all duration-300`}>
            {isPopular && <Sparkles className="w-4 h-4" />}
            {badge}
          </span>
        </div>
      )}

      {/* CCTV Icon Background */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <Camera className={`w-16 h-16 ${gradient || isPremiumPackage() ? 'text-white' : 'text-blue-600'} ${isHovered ? 'animate-cctv-rotate' : ''}`} />
      </div>

      <div className="text-center relative z-10 flex flex-col h-full">
        {/* CCTV Product Image */}
        {image && (
          <div className="mb-4 relative">
            <div className="w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-inner">
              <img
                src={image}
                alt={`${brand} CCTV Package`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                onError={(e) => {
                  // Fallback to camera icon if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                <Camera className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        )}

        {/* Camera Count Display */}
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 ${gradient || isPremiumPackage() ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'} transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium">{cameras} Kamera</span>
        </div>

        <h3 className={`text-xl font-semibold mb-2 transition-all duration-300 ${isHovered ? 'scale-105' : ''} ${gradient || isPremiumPackage() ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
          {title}
        </h3>

        <div className={`text-4xl font-bold mb-1 transition-all duration-300 ${isHovered ? 'scale-125 animate-pulse' : ''} ${gradient || isPremiumPackage() ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
          {price}
        </div>

        <div className={`mb-6 transition-all duration-300 ${isHovered ? 'scale-105' : ''} ${gradient || isPremiumPackage() ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}>
          {period}
        </div>

        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <li
              key={index}
              className={`flex items-center text-sm transition-all duration-300 ${isHovered ? 'translate-x-2' : ''} ${gradient || isPremiumPackage() ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <CheckIcon className={`w-4 h-4 mr-3 flex-shrink-0 transition-all duration-300 ${isHovered ? 'scale-125' : ''} ${gradient || isPremiumPackage() ? 'text-green-300' : 'text-green-500'}`} />
              {feature}
            </li>
          ))}
        </ul>

        <div className="space-y-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetail?.(id);
            }}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 transform border-2 ${
              gradient || isPremiumPackage()
                ? 'border-white text-white hover:bg-white hover:text-blue-600'
                : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white'
            } hover:scale-105 shadow-md hover:shadow-lg`}
          >
            {detailButtonText}
          </button>
          <button
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform ${
              gradient || isPremiumPackage()
                ? 'bg-white text-blue-600 hover:bg-gray-100 hover:scale-105'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105'
            } ${isClicked ? 'scale-95' : ''} shadow-lg hover:shadow-xl`}
          >
            {buttonText}
          </button>
        </div>
      </div>

      {/* Ripple effect */}
      {showRipple && (
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 animate-ping rounded-xl" />
        </div>
      )}

      {/* Decorative elements */}
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500 ${isHovered ? 'animate-cctv-rotate' : ''}`} />
      <div className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full translate-y-8 -translate-x-8 group-hover:scale-150 transition-transform duration-500 ${isHovered ? 'animate-cctv-rotate' : ''}`} />
      
      {/* Security icons floating */}
      <div className="absolute inset-0 pointer-events-none">
        <Shield className={`absolute top-6 left-6 w-4 h-4 opacity-20 ${gradient ? 'text-white' : 'text-blue-500'} ${isHovered ? 'animate-cctv-bounce' : ''}`} style={{ animationDelay: '0.5s' }} />
        <Monitor className={`absolute bottom-6 right-6 w-4 h-4 opacity-20 ${gradient ? 'text-white' : 'text-purple-500'} ${isHovered ? 'animate-cctv-bounce' : ''}`} style={{ animationDelay: '1s' }} />
        <Wifi className={`absolute top-1/2 left-4 w-3 h-3 opacity-20 ${gradient ? 'text-white' : 'text-green-500'} ${isHovered ? 'animate-cctv-bounce' : ''}`} style={{ animationDelay: '1.5s' }} />
        <Clock className={`absolute top-1/3 right-4 w-3 h-3 opacity-20 ${gradient ? 'text-white' : 'text-orange-500'} ${isHovered ? 'animate-cctv-bounce' : ''}`} style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}
