'use client';

import { useEffect, useRef, useState } from 'react';

const GLITCH_CHARS = '01!@#$%&ABCDEFxyz|[]{}+-=_<>';
const GLITCH_FRAMES = 10;
const FRAME_INTERVAL_MS = 50;

function scramble(text: string): string {
  return text
    .split('')
    .map((c) => (c === ' ' ? ' ' : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]))
    .join('');
}

type GlitchRevealProps = {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
};

export default function GlitchReveal({ children, className, as: Tag = 'span' }: GlitchRevealProps) {
  const elRef = useRef<HTMLElement>(null);
  const triggeredRef = useRef(false);
  const [displayText, setDisplayText] = useState(children);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    let ivId: ReturnType<typeof setInterval> | null = null;
    let loopId: ReturnType<typeof setTimeout> | null = null;

    const runGlitch = () => {
      let frame = 0;
      ivId = setInterval(() => {
        frame++;
        if (frame < GLITCH_FRAMES) {
          setDisplayText(scramble(children));
        } else {
          clearInterval(ivId!);
          ivId = null;
          setDisplayText(children);
          // Schedule next loop iteration (4–6s)
          loopId = setTimeout(runGlitch, 4000 + Math.random() * 2000);
        }
      }, FRAME_INTERVAL_MS);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggeredRef.current) {
          triggeredRef.current = true;
          setVisible(true);
          runGlitch();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (ivId) clearInterval(ivId);
      if (loopId) clearTimeout(loopId);
    };
  }, [children]);

  const TagName = Tag as React.ElementType;

  return (
    <TagName
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={elRef as any}
      className={className}
      style={{ opacity: visible ? 1 : 0 }}
    >
      {displayText}
    </TagName>
  );
}
