# Stormfolio — Shashwat Ekka Portfolio

A premium, cinematic portfolio website for **Shashwat Ekka** — Video Editor, VFX Artist & Motion Designer. Built with React 19, TypeScript, Vite, Tailwind CSS, GSAP, and Lenis smooth scrolling.

---

## 🌐 Live Preview

**Deploy:** [https://stormfolio.vercel.app](https://stormfolio.vercel.app) *(add your deployment URL)*

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Custom Cursor** | Exclusion-blend cursor with hover states, hidden on touch devices |
| **GSAP Scroll Animations** | Multi-layer parallax, staggered reveals, clip-path text animations |
| **Lenis Smooth Scroll** | Buttery-smooth scrolling with ScrollTrigger sync |
| **Wave Grid Background** | WebGL-powered animated grid with vignette (Hero section) |
| **Storm Image Effect** | B&W filter with subtle hover glow (About section) |
| **Video Gallery** | Category-grouped projects with hover preview playback |
| **Cinematic Video Modal** | Full-screen player with keyboard nav, project switching |
| **Mobile-First Responsive** | Breakpoints at 768px, 480px, and landscape mobile |
| **Performance Optimized** | Storm image resized from 8192×8192 (3.4MB) → 1200×1200 (89KB) via Sharp |

---

## 🛠 Tech Stack

- **Framework:** React 19 + TypeScript + Vite 6
- **Styling:** Tailwind CSS + Custom CSS (CSS Variables, Keyframes)
- **Animation:** GSAP 3.14 + ScrollTrigger
- **Smooth Scroll:** Lenis 1.0
- **Icons:** Lucide React + UXWing SVG icons
- **Fonts:** Syne (heading), Manrope (body), Playfair Display (serif)
- **Image Optimization:** Sharp CLI

---

## 📁 Project Structure

```
stormfolio/
├── public/
│   ├── image/
│   │   └── storm-2.jpeg        # Optimized storm image (1200×1200, 89KB)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── About.tsx           # Storm image, stats, skills, tools marquee
│   │   ├── CustomCursor.tsx    # Exclusion-blend custom cursor
│   │   ├── Hero.tsx            # Wave grid bg, animated name, parallax layers
│   │   ├── VideoCard.tsx       # 3D tilt, hover preview, scroll parallax
│   │   ├── VideoModal.tsx      # Full-screen player, keyboard nav
│   │   ├── WorksPage.tsx       # Category-grouped gallery
│   │   ├── Header.tsx, Footer.tsx, Intro.tsx, etc.
│   │   └── ui/
│   │       ├── wave-grid-background.tsx
│   │       ├── ascii-glitch-ripple.tsx
│   │       └── interactive-particles.tsx
│   ├── data/
│   │   └── projects.ts         # Project data (title, category, video, thumb, etc.)
│   ├── hooks/
│   │   └── useScrollTrigger.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx                 # Root, view routing (home/works), Lenis init
│   ├── index.tsx               # Entry point
│   └── styles.css              # Global styles, animations, responsive overrides
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── netlify.toml
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / pnpm / yarn

### Install & Run
```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3001)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Environment Variables
None required for local development.

---

## 📱 Responsive Breakpoints

```css
/* Tablet & below */
@media (max-width: 768px) { ... }

/* Mobile */
@media (max-width: 480px) { ... }

/* Landscape mobile */
@media (max-height: 500px) and (orientation: landscape) { ... }

/* Touch devices (disable custom cursor) */
@media (hover: none) and (pointer: coarse) { ... }
```

---

## ⚡ Performance Notes

| Asset | Before | After | Savings |
|-------|--------|-------|---------|
| storm-2.jpeg | 8192×8192, 3.4 MB | 1200×1200, 89 KB | **97.4%** |

**Optimization command used:**
```bash
npx sharp -i public/image/storm-2.jpeg -o public/image/storm-2.jpeg resize 1200 1200 jpeg quality 80
```

---

## 🎨 Customization

### Colors (CSS Variables)
```css
:root {
  --bg-color: #050505;
  --text-color: #e1e1e1;
  --accent-color: #333;
  --font-heading: 'Syne', sans-serif;
  --font-body: 'Manrope', sans-serif;
  --font-serif: 'Playfair Display', serif;
}
```

### Adding Projects
Edit `src/data/projects.ts`:
```ts
export const PROJECTS: Project[] = [
  {
    id: 'unique-id',
    title: 'Project Name',
    category: 'Visual / VFX', // or 'Motion Graphics', 'Cinematic', 'AI Workflow', 'AMV'
    year: '2024',
    tools: 'After Effects • Blender',
    video: '/videos/project.mp4',      // local or remote URL
    thumbnail: '/images/project.jpg',  // poster image
    description: 'Project description...',
  },
];
```

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag dist/ folder to Netlify, or connect repo
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ via GitHub Actions or gh-pages
```

---

## 📄 License

MIT License — feel free to use as inspiration for your own portfolio.

---

## 🙋‍♂️ Contact

**Shashwat Ekka**
- 📧 Email: shashwatekka987@gmail.com
- 💼 Instagram: [@stromz.ae](https://www.instagram.com/stromz.ae)
- 💬 Discord: [stromz.ae](https://discordapp.com/users/976513344355852328)
- ✈️ Telegram: [@Shashwat989](https://t.me/Shashwat989)
- 💚 WhatsApp: [+91 77629 45392](https://wa.me/917762945392)

---

Built with precision, caffeine, and a lot of `gsap.to()` calls.