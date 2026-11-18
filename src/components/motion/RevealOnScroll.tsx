import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number; // ms
  duration?: number; // ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number; // px
  className?: string;
  threshold?: number;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  delay = 0,
  duration = 600,
  direction = 'up',
  distance = 24,
  className = '',
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Fire once and disconnect
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, prefersReducedMotion]);

  let initialTransform = 'translate3d(0, 0, 0)';
  if (!prefersReducedMotion) {
    if (direction === 'up') initialTransform = `translate3d(0, ${distance}px, 0)`;
    if (direction === 'down') initialTransform = `translate3d(0, -${distance}px, 0)`;
    if (direction === 'left') initialTransform = `translate3d(${distance}px, 0, 0)`;
    if (direction === 'right') initialTransform = `translate3d(-${distance}px, 0, 0)`;
  }

  return (
    <div
      ref={elementRef}
      className={`will-change-[transform,opacity] ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : initialTransform,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {children}
    </div>
  );
};
