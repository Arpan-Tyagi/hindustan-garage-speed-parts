import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const ScrollProgress: React.FC = () => {
  const { scrollProgress } = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] pointer-events-none bg-hairline-grid/30"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-crimson via-crimson to-cobalt origin-left will-change-transform transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
    </div>
  );
};
