import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Center the anchor point
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const onHoverStart = () => cursor?.classList.add('hovered');
    const onHoverEnd = () => cursor?.classList.remove('hovered');

    window.addEventListener('mousemove', onMouseMove);
    
    // Add hover listeners to all clickable elements
    const clickables = document.querySelectorAll('a, button, .cursor-pointer');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', onHoverStart);
      el.addEventListener('mouseleave', onHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', onHoverStart);
        el.removeEventListener('mouseleave', onHoverEnd);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor hidden md:block" />;
}