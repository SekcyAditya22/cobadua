# SaaS Landing Page Components

This document describes all the custom components created for the modern SaaS landing page.

## Overview

The landing page has been completely redesigned with modern SaaS aesthetics, featuring:
- Hero section with animated elements
- Feature showcase with interactive cards
- Pricing section with highlighted popular plan
- Customer testimonials with ratings
- FAQ section with expandable items
- Responsive mobile navigation
- Smooth scrolling navigation
- Animated counters and visual effects

## Components

### 1. AnimatedCounter (`resources/js/components/ui/animated-counter.tsx`)
Animates numbers from 0 to target value with smooth easing.

**Props:**
- `end: number` - Target number to count to
- `duration?: number` - Animation duration in ms (default: 2000)
- `suffix?: string` - Text to append after number
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
<AnimatedCounter end={10} suffix="K+" />
```

### 2. FloatingElements (`resources/js/components/ui/floating-elements.tsx`)
Creates animated floating background elements for visual appeal.

**Features:**
- Generates random floating circles
- Smooth floating animation
- Responsive to reduced motion preferences

### 3. GradientText (`resources/js/components/ui/gradient-text.tsx`)
Renders text with gradient colors.

**Props:**
- `children: React.ReactNode` - Text content
- `className?: string` - Additional CSS classes
- `gradient?: 'blue-purple' | 'pink-orange' | 'green-blue' | 'purple-pink'` - Gradient variant

**Usage:**
```tsx
<GradientText gradient="blue-purple">Modern SaaS</GradientText>
```

### 4. FeatureCard (`resources/js/components/ui/feature-card.tsx`)
Interactive card component for displaying features.

**Props:**
- `icon: LucideIcon` - Icon component
- `title: string` - Feature title
- `description: string` - Feature description
- `className?: string` - Additional CSS classes
- `delay?: number` - Animation delay in ms

**Features:**
- Hover effects with scale and translation
- Background gradient on hover
- Animated decorative elements

### 5. MobileMenu (`resources/js/components/ui/mobile-menu.tsx`)
Responsive mobile navigation menu.

**Props:**
- `isAuthenticated: boolean` - Whether user is logged in

**Features:**
- Slide-in animation
- Overlay backdrop
- Smooth scroll navigation links
- Authentication-aware buttons

### 6. ScrollToTop (`resources/js/components/ui/scroll-to-top.tsx`)
Floating button to scroll back to top of page.

**Features:**
- Appears after scrolling 300px
- Smooth scroll animation
- Gradient background with hover effects

### 7. SmoothScrollLink (`resources/js/components/ui/smooth-scroll-link.tsx`)
Navigation links with smooth scrolling behavior.

**Props:**
- `href: string` - Target anchor link
- `children: React.ReactNode` - Link content
- `className?: string` - Additional CSS classes
- `onClick?: () => void` - Optional click handler

### 8. TestimonialCard (`resources/js/components/ui/testimonial-card.tsx`)
Enhanced testimonial display with ratings and animations.

**Props:**
- `name: string` - Customer name
- `role: string` - Customer role/title
- `content: string` - Testimonial text
- `avatar: string` - Avatar emoji/image
- `rating: number` - Star rating (1-5)
- `className?: string` - Additional CSS classes
- `delay?: number` - Animation delay in ms

**Features:**
- Hover effects with scale and translation
- Star rating display
- Quote mark decoration
- Animated decorative elements

### 9. FAQSection & FAQItem (`resources/js/components/ui/faq-item.tsx`)
Expandable FAQ section with smooth animations.

**FAQItem Props:**
- `question: string` - FAQ question
- `answer: string` - FAQ answer
- `defaultOpen?: boolean` - Whether item starts expanded
- `className?: string` - Additional CSS classes

**FAQSection Props:**
- `faqs: Array<{question: string, answer: string}>` - Array of FAQ items
- `className?: string` - Additional CSS classes

### 10. LoadingSpinner (`resources/js/components/ui/loading-spinner.tsx`)
Various loading indicators for better UX.

**Components:**
- `LoadingSpinner` - Spinning circle loader
- `LoadingDots` - Bouncing dots animation
- `LoadingPulse` - Pulsing circles animation

### 11. Notification (`resources/js/components/ui/notification.tsx`)
Toast notification system for user feedback.

**Props:**
- `type: 'success' | 'error' | 'info' | 'warning'` - Notification type
- `title: string` - Notification title
- `message?: string` - Optional message
- `duration?: number` - Auto-dismiss duration in ms
- `onClose?: () => void` - Close callback

## Animations

Custom animations are defined in `resources/css/animations.css`:

- `animate-fade-in-up` - Fade in from bottom
- `animate-fade-in-down` - Fade in from top
- `animate-fade-in-left` - Fade in from left
- `animate-fade-in-right` - Fade in from right
- `animate-scale-in` - Scale in animation
- `animate-float` - Floating animation
- `animate-pulse-glow` - Pulsing glow effect
- `animate-gradient` - Animated gradient background

Animation delays are available from `animation-delay-100` to `animation-delay-800`.

## Responsive Design

All components are fully responsive and include:
- Mobile-first design approach
- Dark mode support
- Reduced motion preferences
- Touch-friendly interactions
- Accessible keyboard navigation

## Usage in Welcome.tsx

The main landing page (`resources/js/Pages/Welcome.tsx`) demonstrates how all components work together to create a cohesive, modern SaaS landing page experience.

Key sections:
1. **Hero** - FloatingElements, GradientText, AnimatedCounter
2. **Features** - FeatureCard with staggered animations
3. **Pricing** - Responsive pricing cards with highlighted popular plan
4. **Testimonials** - TestimonialCard with ratings and hover effects
5. **FAQ** - FAQSection with expandable items
6. **Navigation** - MobileMenu and SmoothScrollLink
7. **Utilities** - ScrollToTop button

## Performance Considerations

- All animations respect `prefers-reduced-motion`
- Components use CSS transforms for smooth animations
- Lazy loading and code splitting ready
- Optimized for Core Web Vitals
- Minimal JavaScript bundle impact
