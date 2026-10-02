import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Giant Background Name Parallax Scrub
      if (bigTextRef.current) {
        gsap.fromTo(bigTextRef.current,
          { yPercent: 40 },
          {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1.2,
            }
          }
        );
      }

      // 2. CTA Float Parallax
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { yPercent: 15, opacity: 0.8 },
          {
            yPercent: -10,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 80%",
              end: "bottom bottom",
              scrub: 1,
            }
          }
        );
      }

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#050505] text-[#e1e1e1] relative overflow-hidden">
      <div className="section-padding container relative z-10">
        
        {/* Call to Action with Scroll Parallax */}
        <div ref={ctaRef} className="mb-16 sm:mb-24 md:mb-32 flex flex-col items-center text-center will-change-transform px-4">
            <h2 className="text-2xl sm:text-4xl md:text-[5vw] leading-none mb-4 sm:mb-8 font-serif-italic">Have an idea?</h2>
            <a 
              href="https://wa.me/917762945392" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-5xl sm:text-7xl md:text-[10vw] font-bold leading-none hover:text-white transition-colors duration-300 stroke-text hover:stroke-0 border-b-2 border-transparent hover:border-white inline-block"
            >
              LET'S TALK
            </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 border-t border-white/10 pt-12 sm:pt-16">
          <div className="col-span-1 sm:col-span-2">
            <span className="text-xl sm:text-2xl font-[Syne] font-bold block mb-4 sm:mb-6">Shashwat Ekka</span>
            <p className="max-w-sm text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed">
              Video Editor • VFX Artist • Motion Graphics • AI Production. Crafting digital experiences with cutting-edge creative technology.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 sm:mb-8">Sitemap</h4>
            <ul className="space-y-3 sm:space-y-4 text-gray-400">
              {[
                { name: 'Work', href: '#work' },
                { name: 'Services', href: '#services' },
                { name: 'About', href: '#about' },
                { name: 'Process', href: '#process' },
              ].map(item => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-white transition-colors text-base sm:text-lg">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 sm:mb-8">Connect</h4>
            <ul className="space-y-3 sm:space-y-4 text-gray-400">
              <li>
                <a href="https://wa.me/917762945392" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors text-base sm:text-lg font-medium flex items-center gap-2">
                  <span>WhatsApp</span>
                  <span className="text-xs font-mono text-gray-500">(Instant)</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/stromz.ae?stkn=MWo0dmx2Nnh2YzNvaA==" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-base sm:text-lg">Instagram</a>
              </li>
              <li>
                <a href="https://discordapp.com/users/976513344355852328" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-base sm:text-lg">Discord</a>
              </li>
              <li>
                <a href="https://t.me/Shashwat989" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-base sm:text-lg">Telegram</a>
              </li>
              <li>
                <a href="tel:+917762945392" className="hover:text-white transition-colors text-base sm:text-lg">+91 7762945392</a>
              </li>
              <li>
                <a href="mailto:shashwatekka987@gmail.com" className="hover:text-white transition-colors text-base sm:text-lg">Email</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 sm:mt-24 md:mt-32 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-widest text-center md:text-left gap-4 md:gap-0">
          <span>© 2026 Shashwat Ekka • Jharkhand, India</span>
          <div className="flex gap-6 sm:gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Giant Background Text with Scrub Parallax */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-5">
        <h1 
          ref={bigTextRef} 
          className="text-[30vw] leading-[0.7] font-black text-center will-change-transform"
        >
          SHASHWAT
        </h1>
      </div>
    </footer>
  );
}