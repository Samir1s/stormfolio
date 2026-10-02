import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Char Reveal on Enter
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current];
      lines.forEach((line) => {
        if (!line) return;
        gsap.fromTo(line.querySelectorAll('.char'), 
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.02,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
            }
          }
        );
      });

      // 2. Parallax Horizontal Scrub for Kinetic Typography Lines
      const isMobile = window.innerWidth <= 768;
      const xMult = isMobile ? 0.35 : 1;

      if (line1Ref.current) {
        gsap.to(line1Ref.current, {
          xPercent: -6 * xMult,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          }
        });
      }

      if (line2Ref.current) {
        gsap.to(line2Ref.current, {
          xPercent: 8 * xMult,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          }
        });
      }

      if (line3Ref.current) {
        gsap.to(line3Ref.current, {
          xPercent: -8 * xMult,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          }
        });
      }

      // 3. Vertical Parallax Float on Quote Block
      if (quoteRef.current) {
        gsap.fromTo(quoteRef.current,
          { yPercent: isMobile ? 10 : 20, opacity: 0.7 },
          {
            yPercent: isMobile ? -5 : -15,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom top",
              scrub: 1.5,
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-28 md:py-48 bg-[#0a0a0a] text-[#f4f4f4] overflow-hidden px-4 sm:px-6">
      <div className="container mx-auto">
        
        <div className="flex flex-col text-3xl sm:text-5xl md:text-4xl leading-[1.1] font-heading uppercase font-bold tracking-tight will-change-transform">
          
          <div ref={line1Ref} className="intro-line-wrap overflow-hidden flex flex-wrap items-baseline gap-2 sm:gap-4 will-change-transform">
             <span className="char">I</span>
             <span className="char font-serif italic font-light text-gray-400 lowercase">don't just</span>
             <span className="char">edit</span>
          </div>

          <div ref={line2Ref} className="intro-line-wrap overflow-hidden flex flex-wrap items-baseline gap-2 sm:gap-4 pl-2 sm:pl-[5vw] will-change-transform">
             <span className="char stroke-text text-transparent">Videos.</span>
             <span className="char">I craft</span>
          </div>

          <div ref={line3Ref} className="intro-line-wrap overflow-hidden flex flex-wrap items-baseline gap-2 sm:gap-4 will-change-transform">
             <span className="char font-serif italic font-light text-white lowercase">digital</span>
             <span className="char">Realities.</span>
          </div>

        </div>

        <div className="mt-12 sm:mt-20 md:mt-32 w-full flex justify-end">
          <div ref={quoteRef} className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 text-base sm:text-lg md:text-xl font-light text-gray-400 font-mono leading-relaxed border-l border-white/20 pl-4 sm:pl-6 md:pl-8 will-change-transform">
            <p>
              In the age of AI and infinite content, <span className="text-white italic font-serif">vision is the only currency</span>. I combine raw creative instinct with cutting-edge tools to turn pixels into emotions and frames into experiences.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}