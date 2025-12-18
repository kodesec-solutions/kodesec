# Kodesec Solutions Ltd — Corporate Website

Professional corporate website for Kodesec Solutions Ltd, showcasing enterprise technology services including web & application development, cyber security solutions, and quality assurance testing.

## Overview

Modern, trustworthy corporate website with comprehensive service presentation, case studies, client portfolio, and contact functionality. Built with Next.js 16 and designed for professional B2B engagement.

## Features

### Pages & Sections
- **Hero Section**: Value proposition with dual CTAs and key statistics
- **Services Overview**: Three-column service cards with benefits
- **Detailed Services**: Alternating image/text blocks with capabilities lists
- **Case Studies**: Success stories with metrics and client testimonials
- **About Section**: Company mission, values, and team highlights
- **Contact Form**: Full contact form with validation and info panel
- **Sticky Navigation**: Smooth scroll navigation with mobile menu
- **Professional Footer**: Multi-column with company info, links, and social

### Design Features
- Navy/teal corporate color scheme
- Responsive design (mobile-first)
- Smooth scroll navigation
- Hover animations and micro-interactions
- Clean typography with clear hierarchy
- Custom scrollbar styling
- SEO-optimized metadata

## Tech Stack

- **Framework**: Next.js 16.0.5 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4
- **Fonts**: Geist Sans & Mono (next/font)

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Visit http://localhost:3000 to view the site.

## Available Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Create production build
- `npm start`: Run production server
- `npm run lint`: Run ESLint checks

## Project Structure

```
app/
├── components/
│   ├── Header.tsx        # Sticky navigation with smooth scroll
│   └── Footer.tsx        # Multi-column footer with links
├── layout.tsx            # Root layout with metadata & fonts
├── page.tsx              # Main homepage with all sections
└── globals.css           # Global styles & custom properties
```

## Key Components

### Header
- Sticky navigation with scroll detection
- Smooth scroll to section anchors
- Mobile-responsive hamburger menu
- "Get in Touch" CTA button

### Services
- Three service cards with hover effects
- Benefits list for each service
- Detailed service sections with capabilities
- Alternating left-right image layouts

### Contact Form
- Full form validation (name, email, company, project type, message)
- Success state feedback
- Contact information panel
- Social media links

### Footer
- Company branding and description
- Quick links navigation
- Services list
- Contact details
- Social media icons
- Legal links (Privacy, Terms)

## SEO & Metadata

Comprehensive SEO setup in `app/layout.tsx`:

```typescript
export const metadata = {
  title: "Kodesec Solutions Ltd - Enterprise Technology Services",
  description: "Professional web development, cyber security, and QA testing...",
  keywords: [...],
  openGraph: { ... },
  twitter: { ... }
};
```

## Color Scheme

```css
--background: #020617 (slate-950)
--foreground: #f1f5f9 (slate-100)
--primary: #14b8a6 (teal-500)
--secondary: #06b6d4 (cyan-500)
```

## Customization

### Update Services
Edit the `services` and `detailedServices` arrays in `app/page.tsx`.

### Modify Colors
Update Tailwind classes or CSS variables in `app/globals.css`.

### Change Content
All text content is in `app/page.tsx` - update headings, descriptions, stats, and case studies.

### Contact Email
Update `kodesec13@gmail.com` in Footer.tsx and page.tsx contact sections.

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Other Platforms
The site is a standard Next.js app and works on any platform supporting Node.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Self-hosted with Docker

See Next.js deployment docs: https://nextjs.org/docs/app/building-your-application/deploying

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Server-side rendering for instant page loads
- Optimized fonts with next/font
- Responsive images and lazy loading
- Minimal JavaScript bundle
- Smooth 60fps animations

## License

© 2025 Kodesec Solutions Ltd. All rights reserved.