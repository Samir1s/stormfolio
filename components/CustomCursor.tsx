import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let isVisible = false;

    // Center the anchor point and start hidden until mouse moves
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to(cursor, { opacity: 1, duration: 0.15 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor-hover], .group')) {
        cursor.classList.add('hovered');
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor-hover], .group')) {
        cursor.classList.remove('hovered');
      }
    };

    const onMouseLeaveDoc = () => {
      isVisible = false;
      gsap.to(cursor, { opacity: 0, duration: 0.15 });
    };

    const onMouseEnterDoc = () => {
      isVisible = true;
      gsap.to(cursor, { opacity: 1, duration: 0.15 });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeaveDoc);
    document.documentElement.addEventListener('mouseenter', onMouseEnterDoc);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.removeEventListener('mouseleave', onMouseLeaveDoc);
      document.documentElement.removeEventListener('mouseenter', onMouseEnterDoc);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="custom-cursor hidden md:block" 
      aria-hidden="true" 
    />
  );
}