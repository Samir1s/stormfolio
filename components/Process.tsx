import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Direction & Storyboard",
    desc: "Every cut begins with intention. I analyze raw footage, dissect the creative brief, and define the emotional rhythm and visual language before setting the first keyframe."
  },
  {
    num: "02",
    title: "Rough Cut & Pacing",
    desc: "Timing is everything. I construct the narrative arc, locking in music sync, sonic beats, and visual momentum until the sequence flows effortlessly."
  },
  {
    num: "03",
    title: "VFX & Motion Design",
    desc: "Where imagination takes over. Dynamic typography, green screen keying, 3D element integration, and generative AI production passes fuse seamlessly into the footage."
  },
  {
    num: "04",
    title: "Color Grade & Master",
    desc: "Final cinematic polish. Professional color grading, audio cleanup, sound design accents, and crisp 4K exports optimized for any platform."
  }
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="section-padding bg-[#e1e1e1] text-[#050505]">
      <div className="container">
        <div className="flex flex-col md:flex-row mb-12 sm:mb-16 md:mb-24 justify-between items-start md:items-end">
          <h2 className="text-5xl sm:text-7xl md:text-[8vw] leading-[0.85] tracking-tighter process-title">
            THE<br/>PROCESS
          </h2>
          <p className="max-w-md text-sm sm:text-base md:text-lg mt-4 sm:mt-6 md:mt-0 font-medium">
            My methodology blends cinematic intuition with high-end creative technology.
          </p>
        </div>

        <div className="border-t border-black">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="border-b border-black cursor-pointer group"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="py-5 sm:py-8 md:py-12 flex justify-between items-center pr-2 sm:pr-4">
                <div className="flex items-baseline gap-3 sm:gap-6 md:gap-16">
                  <span className="font-mono text-xs sm:text-sm md:text-base opacity-50 shrink-0">({step.num})</span>
                  <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-normal group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-500 font-serif-italic">
                    {step.title}
                  </h3>
                </div>
                <div className="relative w-5 h-5 sm:w-6 sm:h-6 shrink-0 ml-2">
                  <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                    {openIndex === index ? <Minus className="w-5 h-5 sm:w-6 sm:h-6" /> : <Plus className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </div>
                </div>
              </div>
              
              <div 
                className={`overflow-hidden transition-all duration-700 ease-out-expo ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="pb-6 sm:pb-12 pl-6 sm:pl-10 md:pl-[120px] max-w-2xl pr-4">
                  <p className="text-sm sm:text-base md:text-xl lg:text-2xl leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}