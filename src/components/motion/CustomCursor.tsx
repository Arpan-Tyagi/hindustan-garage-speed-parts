import React, { useEffect, useRef, useState } from 'react';

type CursorMode = 'default' | 'pointer' | 'drag' | 'inspect' | 'cobalt';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Direct mutable coords for 60fps RAF loop
  const mouseCoords = useRef({ x: -100, y: -100 });
  const ringCoords = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Strictly gate behind fine pointer / mouse device
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Instant update for center dot (zero lag)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Context detection via event target / data attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const mode = cursorTarget.getAttribute('data-cursor') as CursorMode;
        setCursorMode(mode || 'pointer');
        return;
      }

      // Drag slider detection
      if (target.closest('.cursor-ew-resize') || target.closest('[role="slider"]')) {
        setCursorMode('drag');
        return;
      }

      // Clickable elements detection
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('select')
      ) {
        setCursorMode('pointer');
        return;
      }

      setCursorMode('default');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Damped 60fps Lerp loop for the trailing reticle ring
    let rafId: number;
    const lerpFactor = 0.18;

    const render = () => {
      const rx = ringCoords.current.x;
      const ry = ringCoords.current.y;
      const mx = mouseCoords.current.x;
      const my = mouseCoords.current.y;

      ringCoords.current.x = rx + (mx - rx) * lerpFactor;
      ringCoords.current.y = ry + (my - ry) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 01. Instant Hardware Center Point (4px Carbon Ink) */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -ml-[2px] -mt-[2px] w-1 h-1 rounded-full bg-ink-carbon pointer-events-none transition-colors duration-150 will-change-transform"
      />

      {/* 02. Trailing Calibrated Drafting Reticle */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 pointer-events-none will-change-transform"
      >
        {cursorMode === 'default' && (
          <div className="relative -ml-3.5 -mt-3.5 w-7 h-7 rounded-full border border-ink-carbon/30 bg-ink-carbon/[0.02] transition-all duration-200" />
        )}

        {cursorMode === 'pointer' && (
          <div className="relative -ml-6 -mt-6 w-12 h-12 rounded-full border border-crimson/50 bg-crimson/[0.04] backdrop-blur-[0.5px] scale-100 transition-all duration-200 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
          </div>
        )}

        {cursorMode === 'drag' && (
          <div className="relative -ml-12 -mt-4 w-24 h-8 rounded-full border-2 border-crimson bg-surface-white/95 text-crimson shadow-lg flex items-center justify-center px-2 font-mono text-[9px] font-bold tracking-widest uppercase transition-all duration-200">
            <span>◄ DRAG ►</span>
          </div>
        )}

        {cursorMode === 'inspect' && (
          <div className="relative -ml-6 -mt-6 w-12 h-12 rounded-full border border-crimson border-dashed bg-crimson/[0.05] flex items-center justify-center transition-all duration-200">
            {/* Viewfinder corner crosshair ticks */}
            <span className="absolute -top-1 w-2 h-0.5 bg-crimson" />
            <span className="absolute -bottom-1 w-2 h-0.5 bg-crimson" />
            <span className="absolute -left-1 h-2 w-0.5 bg-crimson" />
            <span className="absolute -right-1 h-2 w-0.5 bg-crimson" />
          </div>
        )}

        {cursorMode === 'cobalt' && (
          <div className="relative -ml-6 -mt-6 w-12 h-12 rounded-full border border-cobalt/60 bg-cobalt/[0.05] transition-all duration-200 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
          </div>
        )}
      </div>
    </div>
  );
};
