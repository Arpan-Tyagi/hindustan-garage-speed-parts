import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface MaskedHeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  delay?: number; // ms
  duration?: number; // ms
}

export const MaskedHeading: React.FC<MaskedHeadingProps> = ({
  children,
  as: Component = 'h2',
  className = '',
  delay = 0,
  duration = 650
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <Component
        className={`will-change-transform ${className}`}
        style={{
          transform: isRevealed || prefersReducedMotion ? 'translate3d(0, 0, 0)' : 'translate3d(0, 105%, 0)',
          transitionProperty: 'transform',
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {children}
      </Component>
    </div>
  );
};
