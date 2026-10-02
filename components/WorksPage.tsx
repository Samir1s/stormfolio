import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ExternalLink, Filter, Sparkles } from 'lucide-react';
import { PROJECTS, Project } from '../data/projects';
import VideoCard from './VideoCard';
import VideoModal from './VideoModal';

gsap.registerPlugin(ScrollTrigger);

interface WorksPageProps {
  onBack: () => void;
}

const CATEGORIES = ['All', 'Visual / VFX', 'Motion Graphics', 'Cinematic', 'AI Workflow', 'AMV'] as const;
const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1mrSNC6kNDEKEv6nl4XgtwJHHsjIk4oJV";

export default function WorksPage({ onBack }: WorksPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  // Page entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Breadcrumb slide in
      tl.from(".works-breadcrumb", {
        x: -60,
        opacity: 0,
        duration: 0.8,
      }, 0);

      tl.from(".works-archive-label", {
        x: 60,
        opacity: 0,
        duration: 0.8,
      }, 0.1);

      // Badge clip-path reveal
      tl.from(".works-badge", {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        duration: 0.6,
      }, 0.3);

      // Heading words — staggered clip reveal
      tl.from(".works-heading-word", {
        yPercent: 120,
        rotateZ: 8,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
      }, 0.35);

      // Description line fade
      tl.from(".works-description", {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, 0.7);

      // Filter pills — staggered morph entrance
      tl.from(".works-filter-pill", {
        scale: 0.7,
        opacity: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: "back.out(1.7)",
      }, 0.8);

    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Grid card entrance animations — re-trigger on filter change
  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current!.querySelectorAll('.works-card-wrapper');

      gsap.fromTo(cards, 
        { 
          y: 60, 
          opacity: 0, 
          scale: 0.92,
          rotateX: 8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [activeCategory]);

  // Scroll-triggered CTA banner
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".works-cta-banner", {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".works-cta-banner",
          start: "top 85%",
        }
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#050505] text-[#e1e1e1] pt-24 sm:pt-30 md:pt-36 pb-20 sm:pb-32 px-4 sm:px-6 md:px-12">
      {/* Container */}
      <div className="container max-w-7xl mx-auto">
        {/* Top Navigation / Breadcrumb */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12 border-b border-white/10 pb-5 sm:pb-6">
          <button
            onClick={onBack}
            className="works-breadcrumb btn-ripple inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 border border-white/20 hover:border-white rounded-full text-xs font-mono uppercase tracking-widest text-white transition-all duration-300 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="works-archive-label flex items-center gap-3">
            <span className="text-[11px] sm:text-xs font-mono text-gray-500 uppercase">
              Shashwat Ekka Archive
            </span>
            <a
              href={DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-white/60 hover:text-white hover:underline transition-colors"
            >
              <span>Drive Source</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Page Hero Header */}
        <div ref={headerRef} className="mb-10 sm:mb-14" style={{ perspective: '1000px' }}>
          <div className="works-badge inline-block text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/70 border border-white/15 bg-white/[0.04] px-3.5 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            ( Video Archive &bull; {PROJECTS.length} Projects )
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-heading font-black uppercase tracking-tight leading-[0.92] overflow-hidden">
            <span className="works-heading-word inline-block origin-bottom will-change-transform text-white">Selected</span>
            <br />
            <span className="works-heading-word inline-block origin-bottom will-change-transform stroke-text text-transparent">Works</span>{' '}
            <span className="works-heading-word inline-block origin-bottom will-change-transform text-white">&amp; Clips</span>
          </h1>
          <p className="works-description mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-gray-400 font-light leading-relaxed">
            Every frame is a choice. Explore original edits spanning cinematic cuts, VFX compositing, kinetic motion graphics, AI pipelines, and anime syncs.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 md:gap-3 mb-8 sm:mb-12">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' 
              ? PROJECTS.length 
              : PROJECTS.filter(p => p.category === cat).length;
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`works-filter-pill category-pill px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
                  isActive 
                    ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                    : 'border border-white/15 text-gray-400 hover:text-white hover:border-white/40'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-black/20 text-black font-semibold' : 'bg-white/10 text-gray-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Video Grid - 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10" style={{ perspective: '1200px' }}>
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="works-card-wrapper"
              style={{ transformOrigin: 'center bottom' }}
            >
              <VideoCard 
                project={project} 
                onSelect={setSelectedProject}
                aspect="aspect-[16/10]"
              />
            </div>
          ))}
        </div>

        {/* Empty state fallback if none match */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl animate-fadeInUp">
            <p className="text-gray-500 font-mono text-sm uppercase">No works found in this category.</p>
          </div>
        )}

        {/* Bottom Banner CTA */}
        <div className="works-cta-banner mt-16 sm:mt-24 p-6 sm:p-8 md:p-12 border border-white/15 rounded-2xl bg-gradient-to-br from-[#0e0e0e] via-[#050505] to-[#121212] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          {/* Ambient shimmer */}
          <div className="absolute inset-0 animate-shimmer pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="text-[10px] sm:text-xs font-mono uppercase text-white/50 tracking-widest mb-1.5 sm:mb-2">( Start A Project )</div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">Need High-End Post-Production?</h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-lg">
              Available for commercial films, motion graphics packages, YouTube cinematic edits, and AI video workflows.
            </p>
          </div>
          <a
            href="https://wa.me/917762945392"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ripple relative z-10 w-full sm:w-auto text-center px-6 sm:px-8 py-3.5 sm:py-4 bg-white hover:bg-white/90 text-black font-semibold rounded-full uppercase text-xs font-mono tracking-widest transition-all duration-300 shrink-0 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Video Modal Player */}
      <VideoModal
        project={selectedProject}
        projects={filteredProjects}
        onClose={() => setSelectedProject(null)}
        onSelectProject={setSelectedProject}
      />
    </div>
  );
}
