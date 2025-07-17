import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { MenuIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isAuthenticated: boolean;
  onConsultationClick?: () => void;
}

export function MobileMenu({ isAuthenticated, onConsultationClick }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = ['features', 'pricing', 'cctv', 'testimonials', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(sectionId);
              }
            });
          },
          {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px',
          }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const getLinkClassName = (sectionId: string) => {
    const baseClasses = "block text-lg font-medium transition-colors duration-200";
    const activeClasses = "text-green-600 font-bold bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg border-l-4 border-green-600";
    const inactiveClasses = "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-4 py-2";

    return `${baseClasses} ${activeSection === sectionId ? activeClasses : inactiveClasses}`;
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? (
          <XIcon className="w-6 h-6" />
        ) : (
          <MenuIcon className="w-6 h-6" />
        )}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                MetaNetAccess
              </span>
            </div>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 px-6 py-8">
            <div className="space-y-4">
              <a
                href="#features"
                onClick={closeMenu}
                className={getLinkClassName('features')}
              >
                Features
              </a>
              <a
                href="#pricing"
                onClick={closeMenu}
                className={getLinkClassName('pricing')}
              >
                Internet
              </a>
              <a
                href="#cctv"
                onClick={closeMenu}
                className={getLinkClassName('cctv')}
              >
                CCTV
              </a>
              <a
                href="#testimonials"
                onClick={closeMenu}
                className={getLinkClassName('testimonials')}
              >
                Testimonials
              </a>
              <a
                href="#contact"
                onClick={closeMenu}
                className={getLinkClassName('contact')}
              >
                Contact
              </a>
              <Link
                href="/about"
                onClick={closeMenu}
                className="block text-lg font-medium transition-colors duration-200 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-4 py-2"
              >
                About
              </Link>
            </div>
          </nav>

          {/* Auth buttons */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              {isAuthenticated ? (
                <Link
                  href={route('dashboard')}
                  onClick={closeMenu}
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Dashboard
                </Link>
              ) : (
                <button
                  onClick={() => {
                    onConsultationClick?.();
                    closeMenu();
                  }}
                  className="block w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Konsultasi?
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
