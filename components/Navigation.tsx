'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

/**
 * Navigation Component
 * Handles the top bar with tabs and the theme toggle.
 */
export default function Navigation() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until mounted to avoid hydration mismatch with theme
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const tabs = [
    { name: 'ABOUT', id: 'about' },
    { name: 'CHECKPOINTS', id: 'projects' },
    { name: 'LOGS', id: 'experience' },
    { name: 'TERMINAL', id: 'contact' },
  ];

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-foreground/10 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2 font-bold tracking-tighter">
          <Terminal className="w-5 h-5" />
          <span className="hidden sm:inline">DEV_OS // PORTFOLIO</span>
        </div>

        {/* Tabs & Theme Toggle */}
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="flex gap-4 sm:gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-bold hover:text-foreground/60 transition-colors hover-glitch"
              >
                [{tab.name}]
              </button>
            ))}
          </div>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 border border-foreground/20 rounded-md hover:bg-foreground/5 transition-all active:scale-95"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
