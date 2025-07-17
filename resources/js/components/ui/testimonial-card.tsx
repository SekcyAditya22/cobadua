import { StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
  className?: string;
  delay?: number;
}

export function TestimonialCard({
  name,
  role,
  content,
  avatar,
  rating,
  className = '',
  delay = 0,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 relative overflow-hidden',
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Quote mark */}
      <div className="absolute top-4 right-4 text-6xl text-blue-100 dark:text-blue-900/30 font-serif leading-none">
        "
      </div>
      
      <div className="relative">
        {/* Header with avatar and info */}
        <div className="flex items-center mb-6">
          <div className="text-4xl mr-4 group-hover:scale-110 transition-transform duration-300">
            {avatar}
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {name}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              {role}
            </div>
          </div>
        </div>

        {/* Content */}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 relative z-10">
          "{content}"
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={cn(
                'w-5 h-5 transition-colors duration-300',
                i < rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300 dark:text-gray-600'
              )}
            />
          ))}
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            {rating}.0
          </span>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
    </div>
  );
}
