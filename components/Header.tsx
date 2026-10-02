import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface HeaderProps {
  onNavigate?: (view: 'home' | 'works') => void;
  currentView?: 'home' | 'works';
}

export default function Header({ onNavigate, currentView = 'home' }: HeaderProps) {
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

  const handleNavClick = (item: { name: string; href: string; isExternal?: boolean }, e: React.MouseEvent) => {
    if (item.isExternal) return; // Opens external link (WhatsApp)

    if (item.name === 'Work') {
      e.preventDefault();
      if (onNavigate) {
        onNavigate('works');
      } else {
        window.location.hash = '#work';
      }
      setMobileMenuOpen(false);
      return;
    }

    // For other sections (About, Services, Process):
    if (currentView === 'works' && onNavigate) {
      e.preventDefault();
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(item.href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { name: 'Work', href: '#work', isExternal: false },
    { name: 'Services', href: '#services', isExternal: false },
    { name: 'About', href: '#about', isExternal: false },
    { name: 'Process', href: '#process', isExternal: false },
    { name: 'Contact', href: 'https://wa.me/917762945392', isExternal: true },
  ];

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center py-4 md:py-5 px-6 sm:px-8 md:px-12 mix-blend-difference text-white"
      >
        <a 
          ref={logoRef} 
          href="#" 
          onClick={handleLogoClick}
          className="text-lg sm:text-xl md:text-2xl font-bold font-[Syne] tracking-tight uppercase relative z-50 cursor-pointer"
        >
          <span className="sm:hidden">SE</span>
          <img src="/logo.svg" alt="Logo" className="h-8 w-auto hidden sm:block" />
        </a>

        <nav className="hidden md:block">
          <ul ref={linksRef} className="flex space-x-6 lg:space-x-8 text-xs lg:text-sm font-medium tracking-wide uppercase">
            {navItems.map((item) => (
              <li key={item.name} className="overflow-hidden group">
                <a 
                  href={item.href} 
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  onClick={(e) => handleNavClick(item, e)}
                  className={`block relative cursor-pointer ${currentView === 'works' && item.name === 'Work' ? 'text-white font-bold underline decoration-white/60 decoration-2 underline-offset-8' : 'text-gray-300'}`}
                >
                  <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                    {item.name}
                  </span>
                  <span className="absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full text-white font-semibold">
                    {item.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden relative z-50 w-11 h-11 flex flex-col items-center justify-center gap-1.5 cursor-pointer rounded-lg bg-black/30 backdrop-blur-sm border border-white/10"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#080808]/98 backdrop-blur-2xl z-40 md:hidden flex flex-col justify-between p-6 sm:p-10 pt-24 pb-12 transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-start justify-center flex-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-6">
            ( Navigation )
          </span>
          <nav className="w-full">
            <ul className="flex flex-col space-y-5 text-3xl sm:text-4xl font-heading font-extrabold tracking-tight uppercase text-white">
              {navItems.map((item, i) => (
                <li 
                  key={item.name} 
                  style={{ transitionDelay: `${i * 60}ms` }}
                  className={`transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
                >
                  <a 
                    href={item.href} 
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    onClick={(e) => handleNavClick(item, e)}
                    className={`inline-block hover:text-white transition-colors cursor-pointer ${
                      currentView === 'works' && item.name === 'Work' 
                        ? 'text-white border-b-2 border-white' 
                        : 'text-gray-400'
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Menu Footer: Contacts & Socials */}
        <div className="border-t border-white/10 pt-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Connect</span>
            <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              Available for work
            </span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <a 
              href="https://wa.me/917762945392" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black transition-colors"
            >
              WhatsApp
            </a>
            <a 
              href="https://www.instagram.com/stromz.ae?stkn=MWo0dmx2Nnh2YzNvaA==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://discordapp.com/users/976513344355852328" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black transition-colors"
            >
              Discord
            </a>
            <a 
              href="https://t.me/Shashwat989" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black transition-colors"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>
    </>
  );
}