"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WaveGridBackground } from '@/components/ui/wave-grid-background';
import { AsciiGlitchRipple } from '@/components/ui/ascii-glitch-ripple';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  ready?: boolean;
}

export default function Hero({ ready = true }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial clear state
      gsap.set(".hero-char", { yPercent: 120, rotateZ: 10 });

      // Chaotic text entry
      tl.to(".hero-char", {
        yPercent: 0,
        rotateZ: 0,
        stagger: 0.05,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      });

      gsap.fromTo(".hero-fade",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          delay: 0.5
        }
      );

      // Multi-layer Parallax on Scroll
      // 1. Foreground Content (Name + Taglines)
      gsap.to(".hero-content", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      // 2. Background Wave Grid Layer
      gsap.to(".hero-bg-layer", {
        yPercent: 10,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      });

      // 3. Technical Coordinate Markers
      gsap.to(".hero-decor-markers", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const firstName = "SHASHWAT";
  const lastName = "EKKA";

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] h-auto md:h-screen w-full overflow-hidden bg-[#050505] text-[#e1e1e1]">
      {/* Wave Grid Background with Parallax Container */}
      <div className="hero-bg-layer absolute inset-0 z-0 will-change-transform">
        <WaveGridBackground
          colorBase="#0a0a0a"
          colorHigh="#ffffff"
          waveAmplitude={0.35}
          waveSpeed={5.0}
          waveFrequency={1.0}
          waveWidth={2.5}
          waveMaxHeight={0.35}
          waveJitter={0.15}
          gridSize={32}
          autoAnimate={true}
          vignette={true}
          className="w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/60"></div>
        </WaveGridBackground>
      </div>

      <div className="relative z-10 w-full min-h-[100dvh] md:h-full flex flex-col justify-between px-6 sm:px-8 md:px-12 pt-20 md:pt-[92px] pb-6 sm:pb-8 md:pb-10">
        <div className="flex justify-between items-start hero-fade">
          <div className="flex flex-col gap-1.5 md:gap-2">
            <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-60">
              ( Est. 2026 )
            </div>
            <div className="text-[11px] sm:text-xs font-mono uppercase tracking-wider opacity-60 md:opacity-40 max-w-[240px] leading-relaxed">
              Video Editor • VFX Artist<br />
              <span className="text-white/70">Motion Graphics • AI Production</span>
            </div>
          </div>

          {/* Desktop status and socials */}
          <div className="hidden md:flex text-right flex-col items-end gap-1.5 md:gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider opacity-60">Available for work</span>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            </div>
            <div className="text-xs font-mono uppercase tracking-wider opacity-40">
              Jharkhand, India
            </div>
            <div className="flex gap-2 mt-1">
              <a href="https://www.instagram.com/stromz.ae?stkn=MWo0dmx2Nnh2YzNvaA==" target="_blank" rel="noopener noreferrer" className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors text-xs" title="Instagram">
                IG
              </a>
              <a href="https://discordapp.com/users/976513344355852328" target="_blank" rel="noopener noreferrer" className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors text-xs" title="Discord">
                DC
              </a>
              <a href="https://t.me/Shashwat989" target="_blank" rel="noopener noreferrer" className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors text-xs" title="Telegram">
                TG
              </a>
              <a href="https://wa.me/917762945392" target="_blank" rel="noopener noreferrer" className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center hover:bg-green-500 hover:border-green-500 hover:text-black transition-colors text-xs" title="WhatsApp">
                WA
              </a>
            </div>
          </div>

          {/* Mobile compact availability badge */}
          <div className="flex md:hidden items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/70">Available</span>
          </div>
        </div>

        {/* Decorative elements on right side - hidden on mobile */}
        <div className="hero-decor-markers will-change-transform hidden lg:flex absolute right-12 top-1/3 flex-col gap-8 opacity-30 hero-fade pointer-events-none">
          <div className="flex flex-col items-end gap-2 text-xs font-mono">
            <div className="w-12 h-[1px] bg-white/40"></div>
            <span className="text-white/60">001</span>
          </div>
          <div className="flex flex-col items-end gap-2 text-xs font-mono">
            <div className="w-8 h-[1px] bg-white/40"></div>
            <span className="text-white/60">002</span>
          </div>
          <div className="flex flex-col items-end gap-2 text-xs font-mono">
            <div className="w-16 h-[1px] bg-white/40"></div>
            <span className="text-white/60">003</span>
          </div>
        </div>

        <div className="hero-content relative mb-4 sm:mb-8 md:mb-12 mt-auto">
          <h1 className="text-6xl sm:text-7xl md:text-5xl lg:text-[5.4vw] leading-[0.88] font-heading font-black tracking-tight text-white">
            <div className="flex flex-col sm:flex-row sm:flex-nowrap items-start sm:items-baseline gap-1 sm:gap-[1.5vw] md:gap-[2vw]">
              <span className="inline-flex">
                {firstName.split("").map((char, i) => (
                  <span key={i} className="hero-char inline-block origin-bottom will-change-transform">{char}</span>
                ))}
              </span>
              <span className="inline-flex">
                {lastName.split("").map((char, i) => (
                  <span key={i} className="hero-char inline-block origin-bottom will-change-transform">{char}</span>
                ))}
              </span>
            </div>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between mt-4 sm:mt-6 md:mt-12 border-t border-white/20 pt-3 sm:pt-4 md:pt-8 hero-fade gap-3 sm:gap-4 md:gap-6">
            <div className="flex-1 max-w-2xl">
              <AsciiGlitchRipple
                as="p"
                dur={1200}
                spread={1.5}
                className="text-xs sm:text-base md:text-xl lg:text-2xl font-serif italic text-gray-300 leading-snug mb-3 sm:mb-4 md:mb-6 hover:text-white"
              >
                Building digital experiences that push boundaries and redefine possibilities.
              </AsciiGlitchRipple>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 text-[10px] md:text-xs font-mono uppercase tracking-wider opacity-70">
                <div>
                  <div className="text-white/40 mb-0.5 sm:mb-1">Stack</div>
                  <div>After Effects • Blender</div>
                </div>
                <div>
                  <div className="text-white/40 mb-0.5 sm:mb-1">Focus</div>
                  <div>VFX • Motion</div>
                </div>
                <div>
                  <div className="text-white/40 mb-0.5 sm:mb-1">AI Tools</div>
                  <div>Runway • Sora • ComfyUI</div>
                </div>
                <div>
                  <div className="text-white/40 mb-0.5 sm:mb-1">Code</div>
                  <div>React • Three.js</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}