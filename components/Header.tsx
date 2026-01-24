import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      });

      gsap.from(linksRef.current?.children || [], {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.4
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center py-6 px-8 mix-blend-difference text-white"
      >
        <a ref={logoRef} href="#" className="text-xl md:text-2xl font-bold font-[Syne] tracking-tight uppercase relative z-50">
          <span className="md:hidden">AM</span>
          <span className="hidden md:inline">Abhay Mallick</span>
        </a>

        <nav className="hidden md:block">
          <ul ref={linksRef} className="flex space-x-8 text-sm font-medium tracking-wide uppercase">
            {['Work', 'Services', 'About', 'Blog', 'Contact'].map((item) => (
              <li key={item} className="overflow-hidden group">
                <a href={`#${item.toLowerCase()}`} className="block relative">
                  <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                    {item}
                  </span>
                  <span className="absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full text-gray-400">
                    {item}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-40 md:hidden transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <nav className="flex items-center justify-center h-full">
          <ul className="flex flex-col items-center space-y-8 text-2xl font-medium tracking-wide uppercase text-white">
            {['Work', 'Services', 'About', 'Blog', 'Contact'].map((item, i) => (
              <li key={item} className={`transition-all duration-500 delay-${i * 100} ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-gray-400 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}