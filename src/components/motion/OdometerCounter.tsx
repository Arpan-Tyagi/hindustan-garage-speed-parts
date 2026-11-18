import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface OdometerCounterProps {
  target: number;
  start?: number;
  duration?: number; // ms
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const OdometerCounter: React.FC<OdometerCounterProps> = ({
  target,
  start = 0,
  duration = 1400,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = ''
}) => {
  const [currentValue, setCurrentValue] = useState<number>(start);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrentValue(target);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = performance.now();
          const startVal = start;
          const endVal = target;

          const easeOutQuint = (x: number): number => {
            return 1 - Math.pow(1 - x, 5);
          };

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(1, elapsed / duration);
            const easedProgress = easeOutQuint(progress);

            const interpolated = startVal + (endVal - startVal) * easedProgress;
            setCurrentValue(interpolated);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCurrentValue(endVal);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [target, start, duration, hasAnimated, prefersReducedMotion]);

  const formatted = decimals > 0 
    ? currentValue.toFixed(decimals) 
    : Math.round(currentValue).toLocaleString('en-IN');

  return (
    <span ref={containerRef} className={`tabular-nums inline-block font-mono ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
};
