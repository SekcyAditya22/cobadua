import { CheckIcon, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

// Add CSS animations as a style tag
const pricingAnimationStyles = `
  @keyframes cardPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }

  @keyframes ripple {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(4); opacity: 0; }
  }

  @keyframes slideInUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes shimmer {
    0% { background-position: -200px 0; }
    100% { background-position: calc(200px + 100%) 0; }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3), 0 0 40px rgba(59, 130, 246, 0.2); }
    50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.6), 0 0 80px rgba(59, 130, 246, 0.4); }
  }

  @keyframes floatUp {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  @keyframes borderGlow {
    0%, 100% { border-color: rgba(34, 197, 94, 0.3); }
    50% { border-color: rgba(59, 130, 246, 0.8); }
  }

  @keyframes backgroundShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-slide-in-up { animation: slideInUp 0.6s ease-out; }
  .animate-shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    background-size: 200px 100%;
    animation: shimmer 2s infinite;
  }
  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
  .animate-float {
    animation: floatUp 3s ease-in-out infinite;
  }
  .animate-border-glow {
    animation: borderGlow 2s ease-in-out infinite;
  }
  .animate-background-shift {
    background-size: 200% 200%;
    animation: backgroundShift 4s ease infinite;
  }
`;

// Inject styles into document head
if (typeof document !== 'undefined' && !document.getElementById('pricing-animations')) {
  const styleElement = document.createElement('style');
  styleElement.id = 'pricing-animations';
  styleElement.textContent = pricingAnimationStyles;
  document.head.appendChild(styleElement);
}

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  gradient?: boolean;
  badge?: string;
  badgeColor?: string;
  onSelect?: () => void;
}

export function PricingCard({
  title,
  price,
  period,
  features,
  buttonText,
  isPopular = false,
  gradient = false,
  badge,
  badgeColor = 'from-blue-400 to-blue-600',
  onSelect,
}: PricingCardProps) {
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

    // Add a small delay before calling onSelect for better UX
    setTimeout(() => {
      onSelect?.();
    }, 200);
  };

  const cardClasses = `
    pricing-card relative p-8 rounded-xl shadow-lg border-2 transition-all duration-500 transform overflow-visible
    ${badge ? 'mt-6' : 'mt-0'}
    ${gradient
      ? 'bg-gradient-to-br from-green-600 to-blue-600 text-white border-transparent'
      : `bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-800
         ${isHovered ? 'from-blue-50 via-green-50 to-purple-50 dark:from-blue-900 dark:via-green-900 dark:to-purple-900 animate-background-shift border-green-400 dark:border-blue-400 animate-border-glow' : 'border-gray-200 dark:border-gray-700'}`
    }
    ${isHovered ? 'scale-110 shadow-2xl -translate-y-4' : 'hover:scale-110 hover:shadow-2xl hover:-translate-y-4'}
    ${isClicked ? 'scale-95' : ''}
    ${mounted ? 'animate-slide-in-up' : ''}
    ${isHovered ? 'animate-glow' : ''}
    cursor-pointer group
  `;

  const buttonClasses = `
    w-full py-3 rounded-lg font-medium transition-all duration-300 transform relative overflow-hidden
    ${gradient
      ? 'bg-white text-green-600 hover:bg-gray-50 hover:scale-110 hover:shadow-xl'
      : 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-green-100 hover:to-blue-100 dark:from-gray-700 dark:to-gray-600 dark:hover:from-green-800 dark:hover:to-blue-800 text-gray-900 dark:text-white hover:scale-110 hover:shadow-xl'
    }
    ${isClicked ? 'scale-95' : ''}
    ${isHovered ? 'animate-shimmer' : ''}
    active:scale-95
  `;

  return (
    <div
      className={`${cardClasses} ${mounted ? 'animate-float' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ animationDelay: `${Math.random() * 2}s` }}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <span className={`bg-gradient-to-r ${badgeColor} text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg flex items-center gap-1 ${isHovered ? 'animate-pulse scale-110' : ''} transition-all duration-300`}>
            {isPopular && <Sparkles className="w-4 h-4" />}
            {badge}
          </span>
        </div>
      )}

      <div className="text-center relative z-10">
        <h3 className={`text-xl font-semibold mb-2 transition-all duration-300 ${isHovered ? 'scale-105' : ''} ${gradient ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
          {title}
        </h3>

        <div className={`price-text text-4xl font-bold mb-1 transition-all duration-300 ${isHovered ? 'scale-125 animate-pulse' : ''} ${gradient ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
          {price}
        </div>

        <div className={`mb-6 transition-all duration-300 ${isHovered ? 'scale-105' : ''} ${gradient ? 'text-green-100' : 'text-gray-600 dark:text-gray-400'}`}>
          {period}
        </div>

        <ul className="space-y-3 mb-8 text-left">
          {features.map((feature, index) => (
            <li
              key={index}
              className={`feature-item flex items-center transition-all duration-300 ${isHovered ? 'translate-x-2 scale-105' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CheckIcon className={`w-5 h-5 mr-3 transition-all duration-300 ${isHovered ? 'scale-125 rotate-12' : ''} ${gradient ? 'text-white' : 'text-green-500'}`} />
              <span className={`transition-all duration-300 font-medium ${isHovered ? 'text-gray-900 dark:text-white' : ''} ${gradient ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <button className={buttonClasses}>
          <span className="relative z-10">{buttonText}</span>
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          )}
        </button>
      </div>

      {/* Multiple ripple effects */}
      {showRipple && (
        <>
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-white opacity-20 animate-ping rounded-xl"></div>
          </div>
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-blue-400/30 animate-pulse rounded-xl" style={{ animationDelay: '0.1s' }}></div>
          </div>
        </>
      )}

      {/* Enhanced glow effect for all cards when hovered */}
      {isHovered && (
        <>
          <div className={`absolute -inset-1 rounded-xl blur opacity-30 animate-pulse ${
            gradient
              ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
              : 'bg-gradient-to-r from-green-400 to-blue-400'
          }`}></div>
          <div className={`absolute -inset-2 rounded-xl blur-lg opacity-20 animate-pulse ${
            gradient
              ? 'bg-gradient-to-r from-orange-400 to-red-400'
              : 'bg-gradient-to-r from-blue-400 to-purple-400'
          }`} style={{ animationDelay: '0.5s' }}></div>
        </>
      )}

      {/* Floating particles effect for all cards */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full animate-bounce opacity-60 ${
                gradient
                  ? 'bg-yellow-300'
                  : i % 2 === 0 ? 'bg-green-300' : 'bg-blue-300'
              }`}
              style={{
                left: `${15 + i * 12}%`,
                top: `${25 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.15}s`,
                animationDuration: `${1.5 + (i % 3) * 0.5}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Extra sparkle effect for popular card */}
      {isPopular && isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute w-2 h-2 bg-yellow-200 rounded-full animate-ping opacity-80"
              style={{
                left: `${10 + i * 25}%`,
                top: `${20 + i * 20}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
