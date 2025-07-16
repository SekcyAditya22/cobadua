import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

import { SmoothScrollLink } from '@/components/ui/smooth-scroll-link';
import { MobileMenu } from '@/components/ui/mobile-menu';
import { useState, useEffect } from 'react';

interface NavigationProps {
  className?: string;
  onConsultationClick?: () => void;
}

export function Navigation({ className = '', onConsultationClick }: NavigationProps) {
  const { auth } = usePage<SharedData>().props;
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
            threshold: 0.3, // Section is considered active when 30% is visible
            rootMargin: '-80px 0px -80px 0px', // Account for fixed navbar height
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

  const getLinkClassName = (section: string) => {
    return `text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 ${
      activeSection === section ? 'text-blue-600 dark:text-blue-400' : ''
    }`;
  };



  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 dark:bg-gray-900/80 dark:border-gray-800/50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/images/logo/metanetlogo.png"
              alt="MetaNet Access Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Metanetaccess
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <SmoothScrollLink
              href="#features"
              className={getLinkClassName('features')}
            >
              Features
            </SmoothScrollLink>
            <SmoothScrollLink
              href="#pricing"
              className={getLinkClassName('pricing')}
            >
              Internet
            </SmoothScrollLink>
            <SmoothScrollLink
              href="#cctv"
              className={getLinkClassName('cctv')}
            >
              CCTV
            </SmoothScrollLink>
            <SmoothScrollLink
              href="#testimonials"
              className={getLinkClassName('testimonials')}
            >
              Testimonials
            </SmoothScrollLink>
            <SmoothScrollLink
              href="#contact"
              className={getLinkClassName('contact')}
            >
              Contact
            </SmoothScrollLink>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
            >
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {auth.user ? (
                <Link
                  href={route('dashboard')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Dashboard
                </Link>
              ) : (
                <button
                  onClick={onConsultationClick}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Konsultasi?
                </button>
              )}
            </div>

            {/* Mobile Menu */}
            <MobileMenu isAuthenticated={!!auth.user} onConsultationClick={onConsultationClick} />
          </div>
        </div>
      </div>
    </nav>
  );
}
