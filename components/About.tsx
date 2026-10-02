import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ───────── Data ───────── */
const skills = [
  { name: "After Effects", level: 95 },
  { name: "Premiere Pro", level: 90 },
  { name: "Motion Design", level: 90 },
  { name: "DaVinci Resolve", level: 85 },
  { name: "Blender / 3D", level: 80 },
  { name: "Runway / Sora", level: 75 },
  { name: "ComfyUI", level: 70 },
  { name: "React / Three.js", level: 65 },
];

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 24, suffix: "/7", label: "Creative Mode" },
];

const toolRows = [
  "PREMIERE PRO • AFTER EFFECTS • DAVINCI RESOLVE • BLENDER • NUKE • HOUDINI",
  "RUNWAY ML • SORA • COMFYUI • STABLE DIFFUSION • REACT • THREE.JS • GSAP • WEBGL",
];

/* ───────── Text Scramble Hook ───────── */
const CHARS = "!<>-_\\/[]{}—=+*^?#_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function useTextScramble(finalText: string, trigger: boolean, duration = 1200) {
  const [display, setDisplay] = useState("");
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) { setDisplay(""); return; }
    const length = finalText.length;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const revealed = Math.floor(progress * length);

      let result = "";
      for (let i = 0; i < length; i++) {
        if (finalText[i] === " ") { result += " "; continue; }
        if (i < revealed) {
          result += finalText[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(result);
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [trigger, finalText, duration]);

  return display;
}

/* ───────── Animated Counter ───────── */
function AnimatedCounter({ value, suffix, trigger }: { value: number; suffix: string; trigger: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = Math.max(1, Math.floor(value / 40));
    const interval = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(interval); }
      else setCount(start);
    }, 30);
    return () => clearInterval(interval);
  }, [trigger, value]);

  return <>{trigger ? count : 0}{suffix}</>;
}

/* ═══════════════════════════════════════════════
   ABOUT — Complete Redesign
   ═══════════════════════════════════════════════ */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrambleTriggered, setScrambleTriggered] = useState(false);
  const [countersTriggered, setCountersTriggered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Giant title clip-path reveal ── */
      gsap.fromTo(".about-giant-title span", {
        yPercent: 120,
        rotateX: -40,
      }, {
        yPercent: 0,
        rotateX: 0,
        stagger: 0.08,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".about-giant-title",
          start: "top 80%",
        }
      });

      /* ── 2. Scramble trigger for tagline ── */
      ScrollTrigger.create({
        trigger: ".about-scramble-trigger",
        start: "top 75%",
        onEnter: () => setScrambleTriggered(true),
      });

      /* ── 3. Staggered block reveals for bio paragraphs ── */
      gsap.fromTo(".about-block-reveal", {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
      }, {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".about-bio-section",
          start: "top 70%",
        }
      });

      /* ── 4. Stats counter trigger ── */
      ScrollTrigger.create({
        trigger: ".about-stats-row",
        start: "top 80%",
        onEnter: () => setCountersTriggered(true),
      });

      /* ── 5. Stats boxes scale + fade ── */
      gsap.fromTo(".stat-box", {
        scale: 0.6,
        opacity: 0,
        y: 40,
      }, {
        scale: 1,
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".about-stats-row",
          start: "top 80%",
        }
      });

      /* ── 6. Skill bars — draw-on reveal ── */
      gsap.utils.toArray('.about-skill-row').forEach((row: any, i: number) => {
        gsap.fromTo(row, {
          x: i % 2 === 0 ? -60 : 60,
          opacity: 0,
        }, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
          }
        });

        const fill = row.querySelector('.skill-bar-fill');
        if (fill) {
          gsap.fromTo(fill, { scaleX: 0 }, {
            scaleX: 1,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: row, start: "top 88%" }
          });
        }
      });

      /* ── 7. Tool marquee infinite scroll ── */
      gsap.utils.toArray('.tool-marquee-track').forEach((track: any, i: number) => {
        const direction = i % 2 === 0 ? -1 : 1;
        gsap.to(track, {
          xPercent: direction * -50,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-tools-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          }
        });
      });

      /* ── 8. Parallax columns (preserved from before) ── */
      if (window.innerWidth > 768) {
        gsap.to(".about-photo-wrap", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          }
        });

        gsap.to(".about-skills-wrap", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          }
        });
      }

      /* ── 9. CTA button entrance ── */
      gsap.fromTo(".about-cta-btn", {
        scale: 0.8,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".about-cta-btn",
          start: "top 90%",
        }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding bg-[#050505] text-[#e1e1e1] overflow-hidden">
      <div className="container">

        {/* ═══════════════════════════════════════
            ROW 1 — Giant Typographic Title
            ═══════════════════════════════════════ */}
        <div className="about-giant-title mb-6 md:mb-10" style={{ perspective: "600px" }}>
          <div className="overflow-hidden">
            <span className="block text-5xl sm:text-7xl md:text-[10vw] lg:text-[8vw] font-heading font-extrabold uppercase leading-[0.85] tracking-tighter text-white" style={{ willChange: "transform" }}>
              About
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="block text-5xl sm:text-7xl md:text-[10vw] lg:text-[8vw] font-heading font-extrabold uppercase leading-[0.85] tracking-tighter stroke-text text-transparent" style={{ willChange: "transform" }}>
              Shashwat
            </span>
          </div>
        </div>

        {/* Scramble tagline */}
        <div className="about-scramble-trigger mb-12 sm:mb-16 md:mb-24">
          <p className="font-mono text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.3em] uppercase text-white/60 min-h-[1.5rem] break-words">
            {useTextScramble("VIDEO EDITOR  ·  VFX ARTIST  ·  MOTION DESIGNER", scrambleTriggered, 1500)}
          </p>
        </div>

        {/* ═══════════════════════════════════════
            ROW 2 — Bio + Stats (Asymmetric Grid)
            ═══════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20 mb-16 sm:mb-20 md:mb-32">

          {/* Bio Column (spans 7) */}
          <div className="about-photo-wrap about-bio-section lg:col-span-7 will-change-transform">
            <div className="mb-6 sm:mb-8">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/30 border-b border-white/10 pb-2 inline-block">
                [ 001 — WHO I AM ]
              </span>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <p className="about-block-reveal text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/90 leading-[1.5]">
                I'm <span className="font-semibold text-white">Shashwat Ekka</span> — a video editor,
                VFX artist, and motion graphics designer from{" "}
                <span className="font-serif italic font-normal text-white/70">Jharkhand, India.</span>
              </p>

              <p className="about-block-reveal text-base sm:text-lg md:text-xl text-white/50 leading-relaxed">
                My workflow blends traditional post-production mastery with AI-driven
                production pipelines. From cinematic edits to generative visuals — I push
                every project beyond the expected.
              </p>

              {/* Quote block */}
              <div className="about-block-reveal border-l-[3px] border-white/20 pl-4 sm:pl-6 py-2">
                <p className="text-sm sm:text-base md:text-lg font-serif italic text-white/40 leading-relaxed">
                  "Every frame is a decision. Every cut is a conversation.
                  I don't make content — I engineer feelings."
                </p>
              </div>
            </div>
          </div>

          {/* Stats Column (spans 5) */}
          <div className="about-skills-wrap lg:col-span-5 will-change-transform">
            <div className="mb-6 sm:mb-8">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/30 border-b border-white/10 pb-2 inline-block">
                [ 002 — BY THE NUMBERS ]
              </span>
            </div>

            <div className="about-stats-row grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="stat-box border border-white/10 p-5 sm:p-6 md:p-8 hover:border-white/30 transition-all duration-500 group"
                  style={{ willChange: "transform, opacity" }}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white tabular-nums tracking-tight">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} trigger={countersTriggered} />
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 group-hover:text-white/60 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-2 sm:mt-3 text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/40">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            ROW 3 — Skill Matrix (Full-width bars)
            ═══════════════════════════════════════ */}
        <div className="mb-16 sm:mb-20 md:mb-32">
          <div className="mb-8 sm:mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/30 border-b border-white/10 pb-2 inline-block">
              [ 003 — SKILL MATRIX ]
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {skills.map((skill, i) => (
              <div key={i} className="about-skill-row group" style={{ willChange: "transform, opacity" }}>
                <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
                  {/* Index */}
                  <span className="text-[10px] font-mono text-white/20 w-5 sm:w-6 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Name */}
                  <span className="text-xs sm:text-sm md:text-lg font-medium uppercase tracking-[0.1em] sm:tracking-[0.15em] text-white/70 group-hover:text-white transition-colors duration-300 w-32 sm:w-44 md:w-64 shrink-0 truncate">
                    {skill.name}
                  </span>

                  {/* Bar */}
                  <div className="flex-1 h-[2px] bg-white/8 relative overflow-hidden">
                    <div
                      className="skill-bar-fill h-full origin-left bg-gradient-to-r from-white/80 to-white/20"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  {/* Percentage */}
                  <span className="text-[10px] sm:text-xs font-mono text-white/30 w-8 sm:w-10 text-right shrink-0">
                    {skill.level}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════
            ROW 4 — Tool Arsenal Marquee
            ═══════════════════════════════════════ */}
        <div className="about-tools-section mb-16 sm:mb-20 md:mb-32 overflow-hidden">
          <div className="mb-8 sm:mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/30 border-b border-white/10 pb-2 inline-block">
              [ 004 — TOOL ARSENAL ]
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {toolRows.map((row, i) => (
              <div key={i} className="overflow-hidden py-1 sm:py-2">
                <div
                  className="tool-marquee-track flex gap-6 sm:gap-8 whitespace-nowrap will-change-transform w-fit"
                >
                  {[0, 1, 2].map((dup) => (
                    <span
                      key={dup}
                      className="text-base sm:text-xl md:text-2xl lg:text-3xl font-heading font-bold uppercase tracking-wider text-white/[0.08] select-none shrink-0"
                    >
                      {row}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════
            ROW 5 — CTA
            ═══════════════════════════════════════ */}
        <div className="text-center px-4">
          <a
            href="mailto:shashwatekka987@gmail.com"
            className="about-cta-btn inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-10 py-4 sm:py-5 border border-white/20 rounded-full uppercase text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-500 group btn-ripple"
            style={{ willChange: "transform, opacity" }}
          >
            <span>Let's Work Together</span>
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
