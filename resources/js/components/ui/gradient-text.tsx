import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: 'blue-purple' | 'pink-orange' | 'green-blue' | 'purple-pink';
}

const gradients = {
  'blue-purple': 'bg-gradient-to-r from-blue-600 to-purple-600',
  'pink-orange': 'bg-gradient-to-r from-pink-500 to-orange-500',
  'green-blue': 'bg-gradient-to-r from-green-500 to-blue-500',
  'purple-pink': 'bg-gradient-to-r from-purple-600 to-pink-600',
};

export function GradientText({ 
  children, 
  className = '', 
  gradient = 'blue-purple' 
}: GradientTextProps) {
  return (
    <span 
      className={cn(
        gradients[gradient],
        'bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </span>
  );
}
