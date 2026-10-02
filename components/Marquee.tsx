import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-inner", {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={marqueeRef} className="py-12 md:py-24 overflow-hidden bg-[#e1e1e1] text-[#050505] border-y border-gray-300">
      <div className="marquee-inner flex whitespace-nowrap w-fit">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 px-6">
            <span className="text-[8vw] font-heading font-bold uppercase leading-none text-transparent stroke-text hover:text-[#050505] transition-colors duration-500 cursor-default" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.3)' }}>
              VFX
            </span>
            <span className="w-4 h-4 rounded-full bg-[#050505]"></span>
            <span className="text-[8vw] font-heading font-bold uppercase leading-none">
              Motion
            </span>
            <span className="w-4 h-4 rounded-full bg-[#050505]"></span>
            <span className="text-[8vw] font-heading font-bold uppercase leading-none text-transparent stroke-text hover:text-[#050505] transition-colors duration-500 cursor-default" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.3)' }}>
              Editing
            </span>
            <span className="w-4 h-4 rounded-full bg-[#050505]"></span>
            <span className="text-[8vw] font-heading font-bold uppercase leading-none">
              AI
            </span>
            <span className="w-4 h-4 rounded-full bg-[#050505]"></span>
          </div>
        ))}
      </div>
    </div>
  );
}