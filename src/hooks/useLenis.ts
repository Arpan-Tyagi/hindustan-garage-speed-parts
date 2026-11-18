import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseLenisOptions {
  lerp?: number;
  duration?: number;
  smoothWheel?: boolean;
}

export function useLenis(options: UseLenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // If user prefers reduced motion or window is undefined, don't run momentum smoothing
    if (typeof window === 'undefined' || prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: options.duration ?? 1.2,
      lerp: options.lerp ?? 0.1,
      smoothWheel: options.smoothWheel ?? true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion, options.duration, options.lerp, options.smoothWheel]);

  return lenisRef;
}
