import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statements = [
  "Editing is not cutting.",
  "It is sculpting time.",
  "I reject the template.",
  "Motion is my language.",
  "Frames into feelings."
];

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${statements.length * 100}%`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          // Calculate which index should be active based on progress
          const index = Math.floor(self.progress * (statements.length - 1));
          
          textRefs.current.forEach((el, i) => {
             if (el) {
               if (i === index) {
                 gsap.to(el, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5 });
               } else {
                 gsap.to(el, { opacity: 0, scale: 0.9, filter: 'blur(10px)', duration: 0.5 });
               }
             }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-[100dvh] min-h-[500px] bg-[#050505] text-[#e1e1e1] overflow-hidden relative flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] sm:w-[60vw] h-[80vw] sm:h-[60vw] bg-white rounded-full blur-[100px] sm:blur-[150px] animate-pulse"></div>
      </div>

      <div className="relative z-10 container text-center px-4">
         {statements.map((text, i) => (
           <h2 
             key={i}
             ref={el => textRefs.current[i] = el}
             className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-3xl sm:text-5xl md:text-[5vw] px-4 font-heading font-bold uppercase leading-tight text-white ${i === 0 ? 'opacity-100' : 'opacity-0 scale-90 blur-sm'}`}
           >
             {text}
           </h2>
         ))}
      </div>
      
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-mono tracking-[0.2em] opacity-50 whitespace-nowrap">
        ( THE MANIFESTO )
      </div>
    </section>
  );
}