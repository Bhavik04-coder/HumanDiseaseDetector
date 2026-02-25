# Dhanvantari AI - Cinematic Healthcare Landing Page

A premium, cinematic healthcare landing page featuring scroll-driven animations, canvas-based image sequences, and smooth interactions with a beautiful sky blue and white theme.

## Features

- Responsive navigation bar with "Dhanvantari AI" branding
- Full-screen hero video background with animated text
- Features section showcasing 6 key capabilities
- How It Works section with 4-step process
- Canvas-based scroll animation (128 frames)
- About section with statistics
- Call-to-action section with metrics
- Footer with links and social media
- Smooth scroll with Lenis
- Sky blue and white color theme
- Framer Motion animations throughout

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lenis (Smooth Scroll)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Lenis provider
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar with Dhanvantari AI branding
│   ├── HeroVideo.tsx       # Hero section with video background
│   ├── FeaturesSection.tsx # Features grid with 6 cards
│   ├── HowItWorks.tsx      # 4-step process section
│   ├── HealthScroll.tsx    # Canvas scroll animation
│   ├── ScrollOverlayText.tsx # Overlay text during scroll
│   ├── AboutSection.tsx    # About section with stats
│   ├── CTASection.tsx      # Call-to-action with metrics
│   ├── Footer.tsx          # Footer with links
│   ├── Button.tsx          # Reusable button component
│   └── LenisProvider.tsx   # Smooth scroll provider
├── hooks/
│   └── useImagePreloader.ts # Image preloading hook
└── public/
    ├── herosection.mp4     # Hero video
    └── scroll-sequence/    # 128 frame images
```

## Build

```bash
npm run build
npm start
```

## Performance

- Image preloading with progress indicator
- Canvas rendering optimization
- Smooth 60fps scroll animations
- Responsive design for all devices
