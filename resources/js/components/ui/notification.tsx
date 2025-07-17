import { useState, useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, InfoIcon, AlertTriangleIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationProps {
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

const typeConfig = {
  success: {
    icon: CheckCircleIcon,
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-600 dark:text-green-400',
    titleColor: 'text-green-800 dark:text-green-200',
    messageColor: 'text-green-700 dark:text-green-300',
  },
  error: {
    icon: XCircleIcon,
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    iconColor: 'text-red-600 dark:text-red-400',
    titleColor: 'text-red-800 dark:text-red-200',
    messageColor: 'text-red-700 dark:text-red-300',
  },
  info: {
    icon: InfoIcon,
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-400',
    titleColor: 'text-blue-800 dark:text-blue-200',
    messageColor: 'text-blue-700 dark:text-blue-300',
  },
  warning: {
    icon: AlertTriangleIcon,
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    titleColor: 'text-yellow-800 dark:text-yellow-200',
    messageColor: 'text-yellow-700 dark:text-yellow-300',
  },
};

export function Notification({
  type,
  title,
  message,
  duration = 5000,
  onClose,
  className,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const config = typeConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300); // Wait for animation to complete
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 max-w-sm w-full transition-all duration-300 ease-in-out',
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full',
        className
      )}
    >
      <div
        className={cn(
          'p-4 rounded-lg border shadow-lg',
          config.bgColor,
          config.borderColor
        )}
      >
        <div className="flex items-start">
          <Icon className={cn('w-5 h-5 mt-0.5 mr-3 flex-shrink-0', config.iconColor)} />
          <div className="flex-1 min-w-0">
            <h4 className={cn('text-sm font-medium', config.titleColor)}>
              {title}
            </h4>
            {message && (
              <p className={cn('mt-1 text-sm', config.messageColor)}>
                {message}
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className={cn(
              'ml-3 flex-shrink-0 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors',
              config.iconColor
            )}
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
