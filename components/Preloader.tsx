import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const statusMessages = [
  'INITIALIZING SYSTEM CORE...',
  'LOADING 4K TIMELINES & ASSETS...',
  'CALIBRATING VFX & MOTION NODES...',
  'COMPOSITING COLOR SCIENCE...',
  'SYSTEM READY // SHASHWAT EKKA',
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(statusMessages[0]);
  const slabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll during preloader
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      // Counter animation from 0 to 100
      const counter = { val: 0 };
      
      gsap.to(counter, {
        val: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          const rounded = Math.floor(counter.val);
          setProgress(rounded);

          // Update status message based on progress
          if (rounded < 25) {
            setStatusText(statusMessages[0]);
          } else if (rounded < 50) {
            setStatusText(statusMessages[1]);
          } else if (rounded < 75) {
            setStatusText(statusMessages[2]);
          } else if (rounded < 98) {
            setStatusText(statusMessages[3]);
          } else {
            setStatusText(statusMessages[4]);
          }
        },
        onComplete: () => {
          // Exit curtain animation
          const exitTl = gsap.timeline({
            onComplete: () => {
              document.body.style.overflow = prevOverflow;
              onComplete();
            },
          });

          // Fade out texts and progress bar
          exitTl.to('.preloader-content', {
            opacity: 0,
            y: -20,
            duration: 0.35,
            ease: 'power3.in',
          });

          // Shutter slabs slide up with staggered wave
          exitTl.to('.preloader-slab', {
            yPercent: -100,
            duration: 0.85,
            stagger: 0.05,
            ease: 'power4.inOut',
          }, '-=0.1');
        },
      });

      // Ambient pulse on coordinate markers
      gsap.fromTo('.preloader-fade-in', 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }, containerRef);

    return () => {
      document.body.style.overflow = prevOverflow;
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[999999] pointer-events-auto flex flex-col justify-between overflow-hidden"
    >
      {/* 5 Vertical Shutter Slabs for dramatic brutalist reveal */}
      <div ref={slabsRef} className="absolute inset-0 flex pointer-events-none z-0">
        {[0, 1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className="preloader-slab h-full flex-1 bg-[#050505] border-r border-white/[0.04] last:border-r-0 will-change-transform"
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Preloader Content */}
      <div className="preloader-content relative z-20 w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 text-white">
        
        {/* Top Header Bar */}
        <div className="preloader-fade-in flex justify-between items-start text-xs font-mono uppercase tracking-widest text-white/60">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-white tracking-wider">SHASHWAT EKKA</span>
            <span className="text-[10px] text-white/40">POST-PRODUCTION • VFX • MOTION</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-white/80">LAT: 23.34° N // LON: 85.31° E</span>
          </div>
        </div>

        {/* Center: Massive Brutalist Percentage */}
        <div className="flex flex-col items-center justify-center my-auto text-center">
          <div className="overflow-hidden mb-2">
            <h1 className="text-8xl sm:text-9xl md:text-[14vw] font-heading font-black tracking-tighter leading-none text-white tabular-nums select-none">
              {String(progress).padStart(3, '0')}
              <span className="text-3xl sm:text-5xl md:text-[4vw] font-serif italic text-white/40 ml-2">%</span>
            </h1>
          </div>
          
          <div className="h-6 flex items-center justify-center">
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-white/70">
              {statusText}
            </p>
          </div>
        </div>

        {/* Bottom Bar: Progress meter & Tech specs */}
        <div className="preloader-fade-in flex flex-col gap-4">
          {/* Progress bar container */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-white/60 via-white to-white transition-all duration-75 ease-out rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-white/40">
            <span>[ SYSTEM: ACTIVE ]</span>
            <span>FPS: 60 // RES: 4K UHD</span>
            <span>EST. 2026</span>
          </div>
        </div>

      </div>
    </div>
  );
}
