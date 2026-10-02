import React, { useRef, useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Maximize2 } from 'lucide-react';
import { Project } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface VideoCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  aspect?: string;
}

export default function VideoCard({ project, onSelect, aspect = "aspect-[16/10]" }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Internal media scroll parallax
  useEffect(() => {
    const video = videoRef.current;
    const card = cardRef.current;
    if (!video || !card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(video,
        { yPercent: -6, scale: 1.08 },
        {
          yPercent: 6,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          }
        }
      );
    }, card);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    setIsPlaying(true);
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    setIsPlaying(false);
    video.pause();
    video.currentTime = 0;
    // Reset tilt
    setTilt({ x: 0, y: 0 });
  };

  // 3D tilt on mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = innerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ x: rotateX, y: rotateY });
  }, []);

  return (
    <div 
      ref={cardRef}
      className="group cursor-pointer block text-left video-card-glow will-change-transform"
      onClick={() => onSelect(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ perspective: '800px' }}
    >
      <div 
        ref={innerRef}
        className={`video-card-inner relative overflow-hidden ${aspect} mb-5 rounded-lg border border-white/10 bg-[#0d0d0d] transition-all duration-500 group-hover:border-white/50`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isPlaying 
            ? 'transform 0.15s ease-out, border-color 0.5s, box-shadow 0.5s' 
            : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.5s, box-shadow 0.5s',
          boxShadow: isPlaying 
            ? '0 20px 60px rgba(255,255,255,0.08), 0 0 30px rgba(255,255,255,0.05)' 
            : '0 10px 30px rgba(0,0,0,0.3)',
        }}
      >
        {/* Video Element with Scroll Parallax & Poster Thumbnail */}
        <video 
          ref={videoRef}
          src={project.video}
          poster={project.thumbnail}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-115"
        />

        {/* Ambient Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-40 pointer-events-none"></div>

        {/* Scanning line effect on hover */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'linear-gradient(to bottom, transparent 45%, rgba(255,255,255,0.06) 50%, transparent 55%)',
            backgroundSize: '100% 200%',
            animation: isPlaying ? 'scanLine 2s linear infinite' : 'none',
          }}
        ></div>

        {/* Center Play Icon Trigger */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className={`w-14 h-14 md:w-16 md:h-16 rounded-full border flex items-center justify-center transition-all duration-500 ${
              isPlaying 
                ? 'scale-0 opacity-0 border-white bg-white/20 text-white' 
                : 'scale-100 opacity-100 border-white/30 bg-black/40 text-white group-hover:scale-110 group-hover:border-white group-hover:bg-white group-hover:text-black'
            }`}
          >
            <Play className="w-6 h-6 ml-0.5 fill-current" />
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
          <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-black/70 border border-white/15 text-white/90 backdrop-blur-sm">
            {project.category}
          </span>
          <span className="text-[10px] font-mono text-gray-400 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm">
            {project.year}
          </span>
        </div>

        {/* Bottom Hover Preview Status */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {isPlaying ? (
            <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white bg-black/80 px-2.5 py-1 rounded backdrop-blur-sm border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              Playing Preview
            </span>
          ) : (
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 px-2.5 py-1 rounded backdrop-blur-sm flex items-center gap-1">
              <Maximize2 className="w-3 h-3" /> Click for Full Player
            </span>
          )}
        </div>

        {/* Corner accent lines on hover */}
        <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/80 transition-all duration-500 pointer-events-none ${isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
        <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/80 transition-all duration-500 pointer-events-none ${isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
      </div>

      {/* Meta info below thumbnail */}
      <div className="flex justify-between items-start border-b border-white/10 pb-4 transition-all duration-300 group-hover:border-white/30">
        <div>
          <h3 className="text-xl md:text-2xl font-heading font-bold text-white group-hover:text-white transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-xs font-mono text-gray-400 mt-1 line-clamp-1 transition-colors duration-300 group-hover:text-gray-300">
            {project.tools}
          </p>
        </div>
        <span className="text-xs font-mono text-white/50 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 shrink-0 mt-1">
          ↗
        </span>
      </div>

      {/* Inline scan line keyframe */}
      <style>{`
        @keyframes scanLine {
          0% { background-position: 0 -100%; }
          100% { background-position: 0 200%; }
        }
      `}</style>
    </div>
  );
}
