import React, { useEffect, useState, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface OdometerProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const Odometer: React.FC<OdometerProps> = ({
  value,
  suffix = '',
  prefix = '',
  duration = 1600,
  className = ''
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      hasAnimated.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          const startTime = performance.now();
          const startVal = 0;
          const endVal = value;

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // High-precision mechanical roll ease: 1 - Math.pow(1 - progress, 5)
            const easeProgress = 1 - Math.pow(1 - progress, 5);
            const current = Math.floor(startVal + (endVal - startVal) * easeProgress);

            setDisplayValue(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(endVal);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration, prefersReducedMotion]);

  return (
    <div ref={elementRef} className={`font-mono tabular-nums tracking-tight font-semibold ${className}`}>
      {prefix}
      {displayValue.toLocaleString('en-IN')}
      {suffix}
    </div>
  );
};
