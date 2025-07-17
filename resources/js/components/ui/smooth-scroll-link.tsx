import { MouseEvent } from 'react';
import { router } from '@inertiajs/react';

interface SmoothScrollLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function SmoothScrollLink({
  href,
  children,
  className = '',
  onClick
}: SmoothScrollLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Element exists on current page, scroll to it
      const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    } else {
      // Element doesn't exist on current page, navigate to home page with hash
      router.visit(`/${href}`);
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
