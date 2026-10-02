import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1mrSNC6kNDEKEv6nl4XgtwJHHsjIk4oJV";

export default function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".showreel-reveal", {
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        }
      });

      // Parallax on the video container
      gsap.to(".showreel-visual", {
        yPercent: -10,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="showreel" className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vw] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="showreel-reveal text-xs font-mono uppercase tracking-widest text-cyan-400/60 border border-cyan-400/20 px-4 py-2 rounded-full inline-block mb-8">
            ( Showreel )
          </span>
          <h2 className="showreel-reveal text-[8vw] md:text-[6vw] font-heading font-black uppercase leading-[0.9] tracking-tight">
            See the<br/>
            <span className="stroke-text text-transparent">Work</span> in Motion
          </h2>
        </div>

        {/* Video / Portfolio CTA Container */}
        <div className="showreel-reveal showreel-visual relative max-w-5xl mx-auto">
          <a
            href={DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Video Thumbnail Area */}
            <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-[#0a0a0a] to-purple-900/20">
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>

              {/* Center Play Button */}
              <div className={`absolute inset-0 flex items-center justify-center z-10 transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                <div className={`relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border-2 transition-all duration-500 ${isHovered ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/30 bg-white/5'}`}>
                  <Play className={`w-8 h-8 md:w-10 md:h-10 transition-colors duration-300 ${isHovered ? 'text-cyan-400' : 'text-white'}`} fill="currentColor" />
                  {/* Pulsing ring */}
                  <div className={`absolute inset-0 rounded-full border transition-all duration-500 animate-ping ${isHovered ? 'border-cyan-400/30' : 'border-white/10'}`} style={{ animationDuration: '2s' }}></div>
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 flex flex-col gap-1 text-xs font-mono text-white/30">
                <span>STROMZ.AE</span>
                <span className="text-cyan-400/40">Portfolio Clips</span>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2 text-xs font-mono text-white/30">
                <span className="hidden md:inline">OPEN IN DRIVE</span>
                <ExternalLink className="w-3 h-3" />
              </div>
              <div className="absolute bottom-4 left-4 text-xs font-mono text-white/20">
                VFX • MOTION • EDITING • AI
              </div>
              <div className="absolute bottom-4 right-4 text-xs font-mono text-white/20">
                2023 — PRESENT
              </div>

              {/* Scanline effect */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
              }}></div>
            </div>

            {/* Bottom info bar */}
            <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-white/10 pt-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold group-hover:text-cyan-400 transition-colors">
                  Portfolio Clips Collection
                </h3>
                <p className="text-sm text-gray-500 mt-1 font-mono">
                  A curated selection of my best work across video editing, VFX, and motion graphics
                </p>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-xs font-mono uppercase tracking-widest group-hover:bg-cyan-400 group-hover:text-black group-hover:border-cyan-400 transition-all duration-300 shrink-0">
                <span>Watch Now</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </a>
        </div>

        {/* Feature highlights below */}
        <div className="showreel-reveal grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-24 max-w-4xl mx-auto">
          {[
            { num: "01", label: "Cinematic Editing", detail: "Pacing & Storytelling" },
            { num: "02", label: "Visual Effects", detail: "Compositing & VFX" },
            { num: "03", label: "Motion Design", detail: "Typography & Animation" },
            { num: "04", label: "AI Workflows", detail: "Generative Production" },
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <div className="text-xs font-mono text-cyan-400/40 mb-2">({item.num})</div>
              <div className="text-sm md:text-base font-medium uppercase tracking-wider group-hover:text-cyan-400 transition-colors">{item.label}</div>
              <div className="text-[10px] font-mono text-gray-600 mt-1">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
