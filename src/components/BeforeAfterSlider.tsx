import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeftRight, CheckCircle2, Paintbrush } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [hasNudged, setHasNudged] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Subtle interactive discovery nudge on initial viewport intersection
  useEffect(() => {
    if (hasNudged || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasNudged) {
          setHasNudged(true);
          const startTime = performance.now();
          const duration = 900;

          const nudgeAnimation = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Sinuous nudge wave: 50% -> 55% -> 47% -> 50%
            const offset = Math.sin(progress * Math.PI * 2) * 5 * (1 - progress);
            setSliderPosition(50 + offset);

            if (progress < 1) {
              requestAnimationFrame(nudgeAnimation);
            } else {
              setSliderPosition(50);
            }
          };

          // Delay slightly so user has settled on section
          const timer = setTimeout(() => {
            requestAnimationFrame(nudgeAnimation);
          }, 300);

          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasNudged]);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    if (e.cancelable) e.preventDefault();
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('touchcancel', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchcancel', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className="w-full double-bezel p-4 sm:p-6 bg-surface-white rounded-spec shadow-elevated">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-hairline-grid">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-spec bg-crimson text-white flex items-center justify-center shrink-0">
            <Paintbrush className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-ink-carbon uppercase tracking-tight">
              INTERACTIVE REPAIR BENCH // CASHLESS BODY & PAINT BOOTH
            </h4>
            <span className="text-[10px] font-mono text-ink-graphite uppercase tracking-spec">
              CASE REF: MERCEDES-BENZ E-CLASS (W213) · SELENITE GREY METALLIC
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-ink-muted shrink-0">
          <span className="hidden sm:inline">DRAG DIVIDER TO INSPECT RESTORATION</span>
          <ArrowLeftRight className="w-3.5 h-3.5 text-crimson" />
        </div>
      </div>

      {/* Interactive Visual Comparison Stage */}
      <div
        ref={containerRef}
        data-cursor="drag"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] rounded-spec overflow-hidden select-none cursor-ew-resize border border-hairline-grid bg-canvas-alabaster touch-none"
      >
        {/* RIGHT (AFTER) LAYER — Full Canvas */}
        <div className="absolute inset-0 w-full h-full bg-[#E8E8E6] flex items-center justify-center overflow-hidden">
          <img 
            src="/images/after_mercedes_quarter_panel.jpg" 
            alt="Mercedes-Benz E-Class After 60°C Booth Restoration"
            className="w-full h-full object-cover select-none"
            loading="eager"
          />

          {/* Floating After Badge - compact on mobile to prevent collision with handle */}
          <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-10 px-2 py-1 sm:px-3 sm:py-1.5 bg-surface-white/95 backdrop-blur-sm border border-hairline-grid rounded-spec text-[9px] sm:text-[10px] font-mono uppercase tracking-spec text-ink-carbon shadow-sm flex items-center gap-1.5 pointer-events-none">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="font-bold hidden xs:inline">AFTER: 60°C BOOTH</span>
            <span className="font-bold xs:hidden">AFTER</span>
          </div>
        </div>

        {/* LEFT (BEFORE) LAYER — Clipped to sliderPosition, identically scaled */}
        <div
          className="absolute inset-0 h-full overflow-hidden select-none pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <div 
            className="absolute top-0 left-0 h-full bg-[#B0B5BA] flex items-center justify-center overflow-hidden"
            style={{ width: containerWidth ? `${containerWidth}px` : '100%' }}
          >
            <img 
              src="/images/before_mercedes_quarter_panel.jpg" 
              alt="Mercedes-Benz E-Class Before Collision Damage"
              className="w-full h-full object-cover select-none"
              loading="eager"
            />

            {/* Floating Before Badge - compact on mobile to prevent collision with handle */}
            <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-10 px-2 py-1 sm:px-3 sm:py-1.5 bg-ink-carbon/95 backdrop-blur-sm border border-black rounded-spec text-[9px] sm:text-[10px] font-mono uppercase tracking-spec text-white shadow-sm flex items-center gap-1.5 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-crimson shrink-0" />
              <span className="font-bold hidden xs:inline">BEFORE: CRUSHED ARCH</span>
              <span className="font-bold xs:hidden">BEFORE</span>
            </div>
          </div>
        </div>

        {/* DRAGGABLE VERTICAL HAIRLINE DIVIDER */}
        <div
          className="absolute top-0 bottom-0 z-30 w-0.5 bg-crimson shadow-md pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Center Machined Knurled Handle - min 44x44px accessible touch target */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-surface-white border-2 border-crimson shadow-lg flex items-center justify-center pointer-events-auto cursor-ew-resize touch-none active:scale-105 transition-transform"
            aria-label="Drag to inspect repair comparison"
            role="slider"
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') setSliderPosition(p => Math.max(0, p - 5));
              if (e.key === 'ArrowRight') setSliderPosition(p => Math.min(100, p + 5));
            }}
          >
            <ArrowLeftRight className="w-4 h-4 text-crimson pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Technical Telemetry Metadata Footer */}
      <div className="mt-4 pt-3 border-t border-hairline-grid grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-[9px] sm:text-[10px] font-mono tracking-spec">
        <div>
          <span className="text-ink-muted block uppercase truncate">INSURANCE CARRIER</span>
          <span className="text-ink-carbon font-semibold break-words block">ICICI LOMBARD CASHLESS</span>
        </div>
        <div>
          <span className="text-ink-muted block uppercase truncate">CLEARCOAT SPEC</span>
          <span className="text-ink-carbon font-semibold break-words block">CROMAX HIGH-SOLID (EU)</span>
        </div>
        <div>
          <span className="text-ink-muted block uppercase truncate">BAKE CYCLE</span>
          <span className="text-crimson font-semibold break-words block">60°C CONSTANT // 45 MINS</span>
        </div>
        <div>
          <span className="text-ink-muted block uppercase truncate">TOTAL TURNAROUND</span>
          <span className="text-emerald-700 font-semibold break-words block">48 HOURS SETTLED</span>
        </div>
      </div>
    </div>
  );
};
