import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import Intro from './components/Intro';
import WorkGallery from './components/WorkGallery';
import WorksPage from './components/WorksPage';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Manifesto from './components/Manifesto';
import Marquee from './components/Marquee';
import Footer from './components/Footer';
import CatLayer from './components/CatLayer';

import Preloader from './components/Preloader';

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [view, setView] = useState<'home' | 'works'>('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#/works') {
        setView('works');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setView('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [view]);

  const navigateTo = (target: 'home' | 'works') => {
    if (target === 'works') {
      window.location.hash = '#/works';
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#e1e1e1]">
      {/* Cinematic Neo-Brutalist Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <CustomCursor />
      <div className="noise-overlay"></div>
      <Header onNavigate={navigateTo} currentView={view} />
      <CatLayer />

      {view === 'works' ? (
        <WorksPage onBack={() => navigateTo('home')} />
      ) : (
        <main>
          <Hero ready={!loading} />
          <Intro />
          <WorkGallery onNavigateToWorks={() => navigateTo('works')} />
          <About />
          <Services />
          <Process />
          <Manifesto />
          <Marquee />
        </main>
      )}

      <Footer />
    </div>
  );
}