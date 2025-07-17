# Modern SaaS Landing Page

A beautiful, responsive, and feature-rich landing page built with Laravel, Inertia.js, React, and Tailwind CSS.

## ✨ Features

### 🎨 Modern Design
- Clean, professional SaaS aesthetic
- Gradient backgrounds and modern typography
- Dark mode support with smooth transitions
- Responsive design for all devices

### 🚀 Interactive Elements
- Animated counters for statistics
- Floating background elements
- Smooth scrolling navigation
- Hover effects and micro-interactions
- Mobile-friendly navigation menu

### 📱 Responsive Components
- **Hero Section** - Eye-catching introduction with animated elements
- **Features Grid** - Interactive cards showcasing key features
- **Pricing Plans** - Clear pricing with highlighted popular option
- **Customer Testimonials** - Social proof with ratings and avatars
- **FAQ Section** - Expandable questions and answers
- **Contact Footer** - Complete footer with links and social media

### ⚡ Performance Optimized
- CSS animations with hardware acceleration
- Respects user's motion preferences
- Optimized for Core Web Vitals
- Minimal JavaScript bundle size

## 🛠️ Technology Stack

- **Backend**: Laravel 12.x
- **Frontend**: React 18 with TypeScript
- **Routing**: Inertia.js
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Authentication**: Laravel Jetstream

## 🚀 Getting Started

### Prerequisites
- PHP 8.2+
- Node.js 18+
- Composer
- MySQL/PostgreSQL

### Installation

1. **Clone and setup the project**
   ```bash
   git clone <your-repo>
   cd laravel-jetstream-react-shadcn
   ```

2. **Install dependencies**
   ```bash
   composer install
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database setup**
   ```bash
   # Configure your database in .env
   php artisan migrate
   ```

5. **Start development servers**
   ```bash
   # Terminal 1: Laravel server
   php artisan serve

   # Terminal 2: Vite dev server
   npm run dev
   ```

6. **Visit your application**
   Open `http://127.0.0.1:8000` in your browser

## 📁 Project Structure

```
resources/
├── js/
│   ├── Pages/
│   │   └── Welcome.tsx          # Main landing page
│   ├── components/
│   │   └── ui/                  # Reusable UI components
│   │       ├── animated-counter.tsx
│   │       ├── feature-card.tsx
│   │       ├── floating-elements.tsx
│   │       ├── gradient-text.tsx
│   │       ├── mobile-menu.tsx
│   │       ├── scroll-to-top.tsx
│   │       ├── smooth-scroll-link.tsx
│   │       ├── testimonial-card.tsx
│   │       ├── faq-item.tsx
│   │       ├── loading-spinner.tsx
│   │       └── notification.tsx
│   └── app.tsx                  # Main app component
├── css/
│   ├── app.css                  # Main styles
│   └── animations.css           # Custom animations
└── views/
    └── app.blade.php            # Main layout
```

## 🎨 Customization

### Colors and Branding
The landing page uses a blue-to-purple gradient theme. To customize:

1. **Update gradient colors** in components:
   ```tsx
   // Change from blue-purple to your brand colors
   className="bg-gradient-to-r from-blue-600 to-purple-600"
   ```

2. **Update brand name** in `Welcome.tsx`:
   ```tsx
   // Change "SaasApp" to your brand name
   <span className="font-bold text-xl">YourBrand</span>
   ```

3. **Customize content** in `Welcome.tsx`:
   - Update hero section text
   - Modify features array
   - Change pricing plans
   - Update testimonials
   - Customize FAQ content

### Adding New Sections
To add new sections to the landing page:

1. Create the section in `Welcome.tsx`
2. Add navigation link if needed
3. Update smooth scrolling targets
4. Add to mobile menu if applicable

### Styling
- All styles use Tailwind CSS classes
- Custom animations are in `resources/css/animations.css`
- Dark mode is supported throughout
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`

## 🔧 Configuration

### Environment Variables
Key variables in `.env`:
```env
APP_NAME=YourSaasApp
APP_URL=http://127.0.0.1:8000
VITE_APP_NAME="${APP_NAME}"
```

### Vite Configuration
The `vite.config.ts` includes:
- React plugin
- Tailwind CSS plugin
- Laravel plugin for asset compilation
- Path aliases for clean imports

## 📱 Mobile Experience

The landing page is fully optimized for mobile:
- Touch-friendly navigation
- Responsive grid layouts
- Optimized font sizes
- Mobile-specific interactions
- Hamburger menu for navigation

## ♿ Accessibility

Built with accessibility in mind:
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Respects motion preferences

## 🚀 Deployment

### Production Build
```bash
npm run build
php artisan optimize
```

### Environment Setup
- Set `APP_ENV=production`
- Configure proper database
- Set up SSL certificates
- Configure caching

### Performance Tips
- Enable Laravel caching
- Use CDN for assets
- Optimize images
- Enable gzip compression

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 🆘 Support

If you encounter any issues:
1. Check the documentation
2. Review component examples
3. Check browser console for errors
4. Ensure all dependencies are installed
5. Verify environment configuration

## 🎯 Next Steps

Consider adding:
- Blog section
- Contact form
- Newsletter signup
- Live chat integration
- Analytics tracking
- SEO optimization
- Performance monitoring

---

**Happy coding! 🚀**
