import React, { useEffect, useRef, useState } from 'react';
import { TechnicalDecryptedText } from '../motion/TechnicalDecryptedText';

interface HairlineDividerProps {
  label?: string;
  sublabel?: string;
  className?: string;
}

export const HairlineDivider: React.FC<HairlineDividerProps> = ({
  label,
  sublabel,
  className = ''
}) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (lineRef.current) {
      observer.observe(lineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={lineRef} className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden my-8 sm:my-12 ${className}`}>
      {label && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 text-[10px] font-mono uppercase tracking-spec text-ink-graphite">
          <span className="flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 bg-crimson shrink-0 inline-block rounded-[1px]" />
            <span className="truncate">
              {isVisible ? <TechnicalDecryptedText text={label} duration={260} /> : label}
            </span>
          </span>
          {sublabel && (
            <span className="text-ink-muted hidden sm:inline text-right shrink-0">
              {isVisible ? <TechnicalDecryptedText text={sublabel} duration={260} delay={80} /> : sublabel}
            </span>
          )}
        </div>
      )}
      <div 
        className="h-[1px] w-full bg-hairline-grid origin-left transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: isVisible ? 'scaleX(1)' : 'scaleX(0)' }}
      />
    </div>
  );
};
