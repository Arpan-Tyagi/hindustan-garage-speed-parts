import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface TechnicalDecryptedTextProps {
  text: string;
  className?: string;
  speed?: number; // ms per shuffle tick (default: 25ms)
  duration?: number; // total decode duration (default: 320ms)
  chars?: string;
  delay?: number; // ms
}

const DEFAULT_CHARS = '0123456789ABCDEF/·_-[*]#';

export const TechnicalDecryptedText: React.FC<TechnicalDecryptedTextProps> = ({
  text,
  className = '',
  speed = 25,
  duration = 320,
  chars = DEFAULT_CHARS,
  delay = 0
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [hasDecoded, setHasDecoded] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      setHasDecoded(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasDecoded) {
          setHasDecoded(true);

          const startTimer = setTimeout(() => {
            const startTime = performance.now();
            const textLength = text.length;

            const interval = setInterval(() => {
              const elapsed = performance.now() - startTime;
              const progress = Math.min(1, elapsed / duration);

              // Calculate how many characters from the left should be permanently resolved
              const resolvedCount = Math.floor(progress * textLength);

              let result = '';
              for (let i = 0; i < textLength; i++) {
                // Keep spaces, hyphens, and slashes intact
                if (text[i] === ' ' || text[i] === '-' || text[i] === '/') {
                  result += text[i];
                } else if (i < resolvedCount) {
                  result += text[i];
                } else {
                  const randomChar = chars[Math.floor(Math.random() * chars.length)];
                  result += randomChar;
                }
              }

              setDisplayText(result);

              if (progress >= 1) {
                clearInterval(interval);
                setDisplayText(text);
              }
            }, speed);

            return () => clearInterval(interval);
          }, delay);

          return () => clearTimeout(startTimer);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [text, speed, duration, chars, delay, hasDecoded, prefersReducedMotion]);

  // When text changes dynamically (e.g. search query or selection), sync immediately
  useEffect(() => {
    if (hasDecoded) {
      setDisplayText(text);
    }
  }, [text, hasDecoded]);

  return (
    <span
      ref={containerRef}
      className={`font-mono tabular-nums inline-block select-none ${className}`}
      aria-label={text}
    >
      <span aria-hidden="true">{displayText}</span>
    </span>
  );
};
