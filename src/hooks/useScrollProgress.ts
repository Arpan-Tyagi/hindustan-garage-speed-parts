import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          
          if (totalHeight > 0) {
            setScrollProgress(Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100)));
          }
          setIsScrolled(currentScroll > 40);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress, isScrolled };
}
