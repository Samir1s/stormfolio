import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Film, Sparkles } from 'lucide-react';
import { PROJECTS, Project } from '../data/projects';
import VideoCard from './VideoCard';
import VideoModal from './VideoModal';

gsap.registerPlugin(ScrollTrigger);

const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1mrSNC6kNDEKEv6nl4XgtwJHHsjIk4oJV";

interface WorkGalleryProps {
  onNavigateToWorks?: () => void;
}

export default function WorkGallery({ onNavigateToWorks }: WorkGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Take the 6 featured projects for the home page showcase
  const displayProjects = PROJECTS.slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Section header entrance ──
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".gallery-header",
          start: "top 80%",
        }
      });

      headerTl.from(".gallery-badge", {
        scale: 0.6,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      });

      headerTl.from(".gallery-title-line", {
        yPercent: 120,
        rotateZ: 5,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
      }, 0.1);

      headerTl.from(".gallery-description", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      }, 0.5);

      headerTl.from(".gallery-cta-button", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.4)",
      }, 0.6);

      // ── Asymmetric column parallax (desktop only) ──
      if (window.innerWidth > 768) {
        gsap.to(leftColRef.current, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        gsap.to(rightColRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // ── Card entrance reveals ──
      gsap.utils.toArray('.gallery-card-wrap').forEach((card: any, i: number) => {
        gsap.fromTo(card, 
          { 
            y: 80, 
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // ── Divider line draw ──
      gsap.utils.toArray('.gallery-divider').forEach((line: any) => {
        gsap.fromTo(line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: line,
              start: "top 90%",
            }
          }
        );
      });

      // ── Bottom archive CTA ──
      gsap.from(".gallery-archive-cta", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-archive-cta",
          start: "top 90%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative bg-[#050505] text-white py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <div className="gallery-header mb-12 sm:mb-16 md:mb-24 flex flex-col items-center text-center px-4">
          <div className="gallery-badge inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-white/70 border border-white/15 bg-white/[0.04] px-4 py-2 rounded-full mb-6 sm:mb-8 backdrop-blur-sm">
            <Film className="w-3.5 h-3.5 text-white/70" />
            <span>Featured Works &bull; 01</span>
          </div>

          <div className="overflow-hidden">
            <h2 className="gallery-title-line text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter uppercase leading-[0.88] text-white origin-bottom will-change-transform">
              Selected
            </h2>
          </div>
          <div className="overflow-hidden -mt-1 sm:-mt-2 md:-mt-4">
            <h2 className="gallery-title-line text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter uppercase leading-[0.88] text-transparent stroke-text origin-bottom will-change-transform">
              Works
            </h2>
          </div>

          <p className="gallery-description mt-6 sm:mt-8 max-w-xl text-xs sm:text-sm md:text-base text-gray-400 font-light leading-relaxed">
            Hover over any clip to preview it in real time, or tap to open the full cinematic player.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4">
            {onNavigateToWorks && (
              <button 
                onClick={onNavigateToWorks}
                className="gallery-cta-button btn-ripple inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white hover:bg-white/90 text-black font-semibold rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer hover:scale-105"
              >
                <span>View All {PROJECTS.length} Works</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
            <a 
              href={DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer" 
              className="gallery-cta-button btn-ripple inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 border border-white/20 hover:border-white rounded-full text-xs font-mono uppercase tracking-widest text-gray-300 hover:text-white transition-all duration-300"
            >
              <span>Drive Folder</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="gallery-divider h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12 sm:mb-16 md:mb-24 origin-left"></div>

        {/* 2-Column Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 px-2 sm:px-4 md:px-8">
          {/* Left Column */}
          <div ref={leftColRef} className="flex flex-col gap-10 sm:gap-14 md:gap-24">
            {displayProjects.filter((_, i) => i % 2 === 0).map((project) => (
              <div key={project.id} className="gallery-card-wrap">
                <VideoCard 
                  project={project} 
                  onSelect={setSelectedProject}
                  aspect="aspect-[16/10]"
                />
              </div>
            ))}
          </div>

          {/* Right Column (offset) */}
          <div ref={rightColRef} className="flex flex-col gap-10 sm:gap-14 md:gap-24 md:translate-y-20">
            {displayProjects.filter((_, i) => i % 2 !== 0).map((project) => (
              <div key={project.id} className="gallery-card-wrap">
                <VideoCard 
                  project={project} 
                  onSelect={setSelectedProject}
                  aspect="aspect-[16/10]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Archive CTA */}
        {onNavigateToWorks && (
          <div className="gallery-archive-cta mt-16 sm:mt-24 text-center px-4">
            <button
              onClick={onNavigateToWorks}
              className="btn-ripple inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 border border-white/25 hover:border-white rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 max-w-full text-center"
            >
              <span>Explore Complete Archive ({PROJECTS.length} Projects)</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        )}
      </div>

      {/* Video Modal Player */}
      <VideoModal
        project={selectedProject}
        projects={displayProjects}
        onClose={() => setSelectedProject(null)}
        onSelectProject={setSelectedProject}
      />
    </section>
  );
}