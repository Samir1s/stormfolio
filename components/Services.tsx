import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: 1, title: 'Brand Identity', category: 'Strategy', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000' },
  { id: 2, title: 'Art Direction', category: 'Design', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000' },
  { id: 3, title: 'Film Production', category: 'Content', img: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000' },
  { id: 4, title: 'Immersive Web', category: 'Development', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000' },
  { id: 5, title: 'Campaigns', category: 'Marketing', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000' },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(services[0].img);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup reveal element centering
      gsap.set(revealRef.current, { xPercent: -50, yPercent: -50 });

      // List Item Reveal
      const items = listRef.current?.children;
      if (items) {
        Array.from(items).forEach((item) => {
          gsap.fromTo(item, 
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              scrollTrigger: {
                trigger: item,
                start: "top 95%",
              }
            }
          );
        });
      }

      // Mouse Move Effect for Image Reveal
      const moveReveal = (e: MouseEvent) => {
        if (!revealRef.current) return;
        
        gsap.to(revealRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      };

      window.addEventListener('mousemove', moveReveal);
      return () => window.removeEventListener('mousemove', moveReveal);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (img: string) => {
    setActiveImage(img);
    gsap.to(revealRef.current, { scale: 1, opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(revealRef.current, { scale: 0, opacity: 0, duration: 0.3 });
  };

  return (
    <section ref={sectionRef} id="services" className="section-padding bg-[#111] text-[#f4f4f4] relative z-10 overflow-hidden">
      
      {/* Floating Reveal Image - Fixed position relative to viewport */}
      <div 
        ref={revealRef} 
        className="fixed top-0 left-0 w-[300px] h-[400px] pointer-events-none z-50 opacity-0 scale-0 hidden md:block rounded-lg overflow-hidden mix-blend-exclusion"
        style={{ willChange: 'transform' }}
      >
        <img src={activeImage} alt="Service Preview" className="w-full h-full object-cover" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20">
          <h2 className="text-6xl md:text-8xl font-bold mb-8 md:mb-0">Our<br />Expertise</h2>
          <p className="max-w-xs text-sm uppercase tracking-wide text-gray-400 pt-4">
            Comprehensive design solutions for forward-thinking brands.
          </p>
        </div>

        <ul ref={listRef} className="border-t border-gray-700">
          {services.map((service) => (
            <li 
              key={service.id} 
              className="group border-b border-gray-700 relative overflow-hidden cursor-pointer"
              onMouseEnter={() => handleMouseEnter(service.img)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative z-10 flex justify-between items-center py-12 px-4 group-hover:px-8 transition-all duration-500">
                <div className="flex items-baseline gap-8">
                  <span className="text-xs font-mono text-gray-500 group-hover:text-white transition-colors">0{service.id}</span>
                  <h3 className="text-3xl md:text-5xl group-hover:text-white transition-colors group-hover:translate-x-4 duration-500">{service.title}</h3>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-xs uppercase tracking-widest opacity-0 md:opacity-100 group-hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75">
                    {service.category}
                  </span>
                  <ArrowUpRight className="w-8 h-8 text-gray-500 group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}