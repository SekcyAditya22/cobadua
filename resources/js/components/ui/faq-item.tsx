import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
  className?: string;
}

export function FAQItem({ 
  question, 
  answer, 
  defaultOpen = false, 
  className = '' 
}: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn('border border-gray-200 dark:border-gray-700 rounded-lg', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-lg"
      >
        <span className="font-medium text-gray-900 dark:text-white pr-4">
          {question}
        </span>
        <ChevronDownIcon
          className={cn(
            'w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 flex-shrink-0',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-6 pb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

interface FAQSectionProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  className?: string;
}

export function FAQSection({ faqs, className = '' }: FAQSectionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
