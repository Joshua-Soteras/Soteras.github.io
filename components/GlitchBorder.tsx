'use client';

import { useState, useCallback } from 'react';

const CORNER_SIZES = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
} as const;

interface GlitchBorderProps {
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof CORNER_SIZES;
}

export default function GlitchBorder({ children, className = '', size = 'md' }: GlitchBorderProps) {
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);

  const handleMouseDown = useCallback(() => {
    if (clicking) return;
    setClicking(true);
    setTimeout(() => setClicking(false), 650);
  }, [clicking]);

  const s = CORNER_SIZES[size];

  // Click takes priority over hover; idle = invisible
  const cornerAnim = clicking
    ? 'animate-corner-spin'
    : hovered
    ? 'animate-border-flicker'
    : 'opacity-0';

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={handleMouseDown}
    >
      {children}
      {/* Corner brackets — rotate as one unit on click, flicker on hover */}
      <div className={`absolute inset-0 pointer-events-none ${cornerAnim}`}>
        <div className={`absolute -top-1 -left-1 ${s} border-t-2 border-l-2 border-foreground`} />
        <div className={`absolute -top-1 -right-1 ${s} border-t-2 border-r-2 border-foreground`} />
        <div className={`absolute -bottom-1 -left-1 ${s} border-b-2 border-l-2 border-foreground`} />
        <div className={`absolute -bottom-1 -right-1 ${s} border-b-2 border-r-2 border-foreground`} />
      </div>
    </div>
  );
}
