import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Play } from 'lucide-react';
import { PROJECTS, Project } from '../data/projects';
import VideoModal from './VideoModal';

gsap.registerPlugin(ScrollTrigger);

interface ServiceData {
  id: number;
  title: string;
  category: string;
  desc: string;
  tools: string;
  video: string;
  thumbnail: string;
  projectId: string;
}

const services: ServiceData[] = [
  { 
    id: 1, 
    title: 'Visual & Commercial VFX', 
    category: 'Commercials & Visuals', 
    desc: 'Luxury commercial product showcases, Terry Dubrow promotional cuts, and high-retention performance edits with surgical sound design accents and compositing.',
    tools: 'After Effects • Premiere Pro • DaVinci Resolve • SFX Design',
    video: '/worksvids/Visual/Lv Sandals Sfx Final.mp4',
    thumbnail: '/worksvids/Visual/thumbLv Sandals Sfx Final.png',
    projectId: 'lv-sandals'
  },
  { 
    id: 2, 
    title: 'Motion Graphics', 
    category: 'Kinetic Typography', 
    desc: 'Dynamic comic-book halftone sequences (Miles Morales), brand identity animations (Claude Motion), and fluid typographic transformations with precision easing.',
    tools: 'After Effects • Kinetic Typography • Flow • Illustrator',
    video: '/worksvids/Motion graphic/Mileage spider man.mp4',
    thumbnail: '/worksvids/Motion graphic/thumbMileage spider man.png',
    projectId: 'mileage-spiderman'
  },
  { 
    id: 3, 
    title: 'AI Production Workflows', 
    category: 'Generative Synthesis', 
    desc: 'Next-generation generative AI video pipelines — synthetic camera motion, custom diffusion workflows, and generative post-production finishing.',
    tools: 'Runway Gen-2 • OpenAI Sora • ComfyUI • Stable Diffusion',
    video: '/worksvids/Ai workflow/Phoebe.mp4',
    thumbnail: '/worksvids/Ai workflow/thumbphoebe.png',
    projectId: 'phoebe-ai'
  },
  { 
    id: 4, 
    title: 'Cinematic Editing', 
    category: 'Post-Production & Grading', 
    desc: 'Atmospheric lighting, orchestral pacing, and narrative storytelling flow. Color grading and sound design that engineers true emotional depth.',
    tools: 'Premiere Pro • DaVinci Resolve • Sound Sync • Color Grading',
    video: '/worksvids/Cinematic/Beauty and a beast.mp4',
    thumbnail: '/worksvids/Cinematic/thumbBeauty and a beast.png',
    projectId: 'beauty-beast'
  },
  { 
    id: 5, 
    title: 'AMV & Velocity Editing', 
    category: 'Audio Sync & Speed Ramping', 
    desc: 'Precision beat-synced anime music videos with seamless frame blends, speed ramps, customized glitch transitions, and hardstyle audio sync.',
    tools: 'After Effects • Twixtor • Sapphire • Boris FX',
    video: '/worksvids/AMV/Need all of yaa.mp4',
    thumbnail: '/worksvids/AMV/thumbNeed all of yaa.png',
    projectId: 'need-all-of-yaa'
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const floatingVideoRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState(services[0].video);
  const [activeThumbnail, setActiveThumbnail] = useState(services[0].thumbnail);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(revealRef.current, { xPercent: -50, yPercent: -50 });

      const items = listRef.current?.children;
      if (items) {
        Array.from(items).forEach((item: Element) => {
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

      if (revealRef.current) {
        const xSet = gsap.quickTo(revealRef.current, "x", { duration: 0.35, ease: "power2.out" });
        const ySet = gsap.quickTo(revealRef.current, "y", { duration: 0.35, ease: "power2.out" });

        const moveReveal = (e: MouseEvent) => {
          xSet(e.clientX);
          ySet(e.clientY);
        };

        const section = sectionRef.current;
        if (section) {
          section.addEventListener('mousemove', moveReveal, { passive: true });
          return () => section.removeEventListener('mousemove', moveReveal);
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (videoUrl: string, thumbnailUrl: string) => {
    setActiveVideo(videoUrl);
    setActiveThumbnail(thumbnailUrl);
    if (floatingVideoRef.current) {
      floatingVideoRef.current.currentTime = 0;
      floatingVideoRef.current.play().catch(() => {});
    }
    gsap.to(revealRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    if (floatingVideoRef.current) {
      floatingVideoRef.current.pause();
    }
    gsap.to(revealRef.current, { scale: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
  };

  const handleItemClick = (projectId: string) => {
    const proj = PROJECTS.find(p => p.id === projectId) || null;
    setSelectedProject(proj);
  };

  return (
    <section ref={sectionRef} id="services" className="section-padding bg-[#0a0a0a] text-[#f4f4f4] relative z-10 overflow-hidden border-t border-white/5">
      
      {/* Floating Reveal Video Preview Card */}
      <div 
        ref={revealRef} 
        className="fixed top-0 left-0 w-[340px] md:w-[420px] aspect-video pointer-events-none z-50 opacity-0 scale-0 hidden md:block rounded-xl overflow-hidden border border-white/20 bg-black/90 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-md"
        style={{ willChange: 'transform, opacity' }}
      >
        <video 
          ref={floatingVideoRef}
          src={activeVideo}
          poster={activeThumbnail}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
          <div className="flex items-center justify-between w-full">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Live Preview
            </span>
            <span className="text-[9px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/10 flex items-center gap-1">
              <Play className="w-2.5 h-2.5 fill-white" />
              Click to Open
            </span>
          </div>
        </div>
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 sm:mb-16 md:mb-20">
          <div>
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-white/40 block mb-3 sm:mb-4">
              [ 005 — CORE DISCIPLINES ]
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-heading font-extrabold uppercase tracking-tight mb-2 text-white">
              What I<br />
              <span className="stroke-text text-transparent">Do Best</span>
            </h2>
          </div>
          <p className="max-w-xs text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-mono pt-4 mt-6 md:mt-0 leading-relaxed border-l border-white/15 pl-4">
            End-to-end post-production mastery — video editing, VFX compositing, motion design, AI workflows, and precision velocity cutting.
          </p>
        </div>

        <ul ref={listRef} className="border-t border-white/10">
          {services.map((service) => (
            <li 
              key={service.id} 
              className="group border-b border-white/10 relative overflow-hidden cursor-pointer hover:bg-white/[0.02] transition-colors duration-500"
              onMouseEnter={() => handleMouseEnter(service.video, service.thumbnail)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleItemClick(service.projectId)}
            >
              <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center py-6 sm:py-8 md:py-12 px-2 sm:px-4 group-hover:px-3 md:group-hover:px-8 transition-all duration-500">
                <div className="flex items-start sm:items-baseline gap-4 sm:gap-6 md:gap-8 mb-3 md:mb-0">
                  <span className="text-xs font-mono text-gray-600 group-hover:text-white transition-colors duration-300 mt-1 sm:mt-0 shrink-0">
                    0{service.id}
                  </span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold uppercase tracking-tight group-hover:text-white transition-colors group-hover:translate-x-2 md:group-hover:translate-x-4 duration-500 text-white/90">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl group-hover:text-gray-200 transition-colors duration-500 line-clamp-2 md:line-clamp-none font-light leading-relaxed">
                      {service.desc}
                    </p>
                    <div className="lg:hidden mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                        {service.category}
                      </span>
                      <span className="text-[10px] font-mono text-white/30">
                        {service.tools}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 mt-3 sm:mt-0 pt-2 sm:pt-0 border-t border-white/5 sm:border-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 md:hidden flex items-center gap-1.5">
                    <Play className="w-2.5 h-2.5 fill-white/40" />
                    Tap to Watch
                  </span>
                  <div className="hidden lg:block text-right">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50 block mb-1">
                      {service.category}
                    </span>
                    <span className="text-[10px] font-mono text-white/30 group-hover:text-white/60 transition-colors">
                      {service.tools}
                    </span>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500 shrink-0">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Video Modal Player when a service project is clicked */}
      <VideoModal
        project={selectedProject}
        projects={PROJECTS}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
      />
    </section>
  );
}