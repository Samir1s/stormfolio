# Stormfolio - Samir's Portfolio

A high-end, neo-brutalist animated portfolio website built with React, TypeScript, and GSAP. This project emphasizes bold typography, smooth motion, and interactive elements to create a unique digital presence.

## 🚀 Features

- **Smooth Scrolling**: Powered by Lenis for a cinematic browsing experience.
- **Advanced Animations**: GSAP and ScrollTrigger for high-performance, scroll-synced interactions.
- **Interactive Elements**: 
  - Custom cursor interactions and laser-cursor effects.
  - Integrated Oneko cat animation system.
  - Dynamic video modals and a dedicated showreel.
- **Neo-Brutalist Design**: Bold layout, sharp borders, and high-contrast typography using Manrope, Syne, and Playfair Display.
- **Responsive & Optimized**: Fully responsive layout built with Tailwind CSS.

## 🛠 Tech Stack

- **Core**: React 19, TypeScript, Vite
- **Animation**: GSAP (GreenSock), Lenis
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Netlify

## 📂 Project Structure

```
├── components/          # UI Components
│   ├── ui/              # Low-level design primitives
│   ├── About.tsx        # About section
│   ├── CatLayer.tsx     # Oneko animation layer
│   ├── Hero.tsx         # Landing section
│   ├── WorkGallery.tsx   # Portfolio showcase
│   └── ...              # Other interactive components
├── data/                # Project metadata and content
├── docs/                # Documentation (e.g., Oneko skins)
├── hooks/               # Custom React hooks for animations
├── lib/                 # Core logic and Oneko animation engine
├── public/              # Static assets
├── worksvids/           # High-quality project videos and thumbnails
├── App.tsx              # Main application component
├── index.html           # HTML entry point
└── styles.css           # Global styles and Tailwind imports
```

## 🏁 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📜 License

Private project.
