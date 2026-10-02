import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { X, ChevronLeft, ChevronRight, ExternalLink, Film, Sparkles } from 'lucide-react';
import { Project } from '../data/projects';

interface VideoModalProps {
  project: Project | null;
  projects: Project[];
  onClose: () => void;
  onSelectProject: (p: Project) => void;
}

const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1mrSNC6kNDEKEv6nl4XgtwJHHsjIk4oJV";

export default function VideoModal({ project, projects, onClose, onSelectProject }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  const currentIndex = project ? projects.findIndex(p => p.id === project.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < projects.length - 1;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (hasPrev) {
      animateSwitch('left', () => onSelectProject(projects[currentIndex - 1]));
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (hasNext) {
      animateSwitch('right', () => onSelectProject(projects[currentIndex + 1]));
    }
  };

  // Animate the card when switching projects
  const animateSwitch = (direction: 'left' | 'right', callback: () => void) => {
    const card = cardRef.current;
    if (!card) return callback();

    const xOut = direction === 'left' ? 40 : -40;

    gsap.to(card, {
      x: xOut,
      opacity: 0.5,
      scale: 0.97,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        callback();
        gsap.fromTo(card, 
          { x: -xOut, opacity: 0.5, scale: 0.97 },
          { x: 0, opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" }
        );
      }
    });
  };

  // Cinematic close with animation
  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    
    const tl = gsap.timeline({
      onComplete: () => {
        setIsClosing(false);
        onClose();
      }
    });

    if (cardRef.current) {
      tl.to(cardRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 30,
        filter: "blur(6px)",
        duration: 0.3,
        ease: "power2.in",
      }, 0);
    }

    if (backdropRef.current) {
      tl.to(backdropRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power1.in",
      }, 0.05);
    }
  };

  useEffect(() => {
    if (!project) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Entrance animation
    if (backdropRef.current && cardRef.current) {
      gsap.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );

      gsap.fromTo(cardRef.current,
        { scale: 0.88, opacity: 0, y: 40, filter: "blur(10px)" },
        { scale: 1, opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power4.out", delay: 0.1 }
      );

      // Stagger internal elements
      gsap.from(".modal-header-content", {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.35,
      });

      gsap.from(".modal-footer-content", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.4,
      });
    }

    // Key handlers
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      else if (e.key === 'ArrowLeft' && hasPrev) handlePrev();
      else if (e.key === 'ArrowRight' && hasNext) handleNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, currentIndex]);

  if (!project) return null;

  return (
    <div 
      ref={backdropRef}
      className="fixed inset-0 z-[100000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-10"
      onClick={handleClose}
    >
      {/* Modal Dialog Card */}
      <div 
        ref={cardRef}
        className="relative w-full max-w-5xl bg-[#0d0d0d] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        style={{ willChange: 'transform, opacity, filter' }}
      >
        {/* Header Bar */}
        <div className="modal-header-content flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-white/10 bg-[#121212]">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white animate-pulse"></div>
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/80">
              {project.category}
            </span>
            <span className="text-white/20">•</span>
            <span className="text-[10px] sm:text-xs font-mono text-gray-400">
              {currentIndex + 1} / {projects.length}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:inline text-[11px] font-mono text-gray-500 uppercase">
              ESC to close
            </span>
            <button 
              onClick={handleClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
              aria-label="Close video player"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Container */}
        <div className="relative bg-black flex items-center justify-center overflow-hidden aspect-video max-h-[40vh] sm:max-h-[55vh]">
          <video
            ref={videoRef}
            key={project.video}
            src={project.video}
            poster={project.thumbnail}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />

          {/* Navigation Arrows inside player */}
          {hasPrev && (
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 border border-white/15 z-10 backdrop-blur-sm cursor-pointer hover:scale-110"
              aria-label="Previous video"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          )}

          {hasNext && (
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 border border-white/15 z-10 backdrop-blur-sm cursor-pointer hover:scale-110"
              aria-label="Next video"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          )}
        </div>

        {/* Info & Metadata Footer */}
        <div className="modal-footer-content p-4 sm:p-5 md:p-6 bg-[#0d0d0d] overflow-y-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 border-b border-white/10 pb-4 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white">
                {project.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-1.5 sm:mt-2">
                <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 sm:py-1 rounded bg-white/10 text-gray-300">
                  {project.year}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-white/50">
                  {project.tools}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-0">
              <a
                href={DRIVE_FOLDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ripple flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 border border-white/20 hover:border-white rounded-full text-xs font-mono uppercase tracking-wider text-gray-300 hover:text-white transition-all duration-300 text-center"
              >
                <span>Drive Clips</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://wa.me/917762945392"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ripple flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white hover:bg-white/90 text-black font-semibold rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-105 text-center"
              >
                <span>Hire</span>
              </a>
            </div>
          </div>

          <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed font-light">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}
