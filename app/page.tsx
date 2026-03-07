'use client';

import { useState } from 'react';
import BootSequence from '@/components/BootSequence';
import Navigation from '@/components/Navigation';
import Portfolio from '@/components/Portfolio';
import TerminalContact from '@/components/TerminalContact';
import GlitchReveal from '@/components/GlitchReveal';
import { motion } from 'motion/react';
import { Linkedin, Mail } from 'lucide-react';

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
  </svg>
);
import GlitchBorder from '@/components/GlitchBorder';

/**
 * Main Page Component
 * This is the entry point for our portfolio.
 * It manages the "Boot" state and renders the main sections.
 */
export default function Home() {
  // We use state to track if the "Booting up" sequence is finished.
  const [isBooted, setIsBooted] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* 
        The BootSequence component covers the screen until it's done.
        Once it calls onComplete, we set isBooted to true.
      */}
      <BootSequence onComplete={() => setIsBooted(true)} />

      {/* 
        We only show the main content once the boot sequence is finished.
        We use motion.div for a smooth fade-in effect.
      */}
      {isBooted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          {/* Navigation stays at the top */}
          <Navigation />

          {/* Main sections of the portfolio */}
          <Portfolio />

          {/* Contact Section with the Terminal Input */}
          <section id="contact" className="max-w-7xl mx-auto px-4 py-24 border-t border-foreground/5">
            <div className="text-center space-y-4 mb-12">
              <GlitchReveal as="h2" className="text-sm font-mono text-foreground/50 uppercase tracking-[0.3em]">
                {"// TERMINAL"}
              </GlitchReveal>
              <GlitchReveal as="h3" className="text-4xl font-bold tracking-tighter">
                ESTABLISH_CONNECTION
              </GlitchReveal>
              <GlitchReveal as="p" className="text-foreground/60 max-w-md mx-auto text-sm">
                Execute commands in the terminal below to reach out or explore my digital footprint.
              </GlitchReveal>
            </div>
            
            <TerminalContact />

            <div className="flex justify-center gap-8 mt-8">
              <GlitchBorder size="sm" idlePulse>
                <a href="https://github.com/Joshua-Soteras" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="block p-1 hover:text-foreground/60 transition-colors">
                  <GitHubIcon className="w-6 h-6 icon-glitch" />
                </a>
              </GlitchBorder>
              <GlitchBorder size="sm" idlePulse>
                <a href="https://www.linkedin.com/in/joshua-soteras/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="block p-1 hover:text-foreground/60 transition-colors">
                  <Linkedin className="w-6 h-6 icon-glitch" />
                </a>
              </GlitchBorder>
              <GlitchBorder size="sm" idlePulse>
                <a href="mailto:soterasjoshua@gmail.com" aria-label="Email" className="block p-1 hover:text-foreground/60 transition-colors">
                  <Mail className="w-6 h-6 icon-glitch" />
                </a>
              </GlitchBorder>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 border-t border-foreground/5 text-center">
            <p className="text-[10px] font-mono opacity-30 uppercase tracking-[0.5em]">
              © 2026 JOSHUA_SOTERAS // ALL_RIGHTS_RESERVED // SYSTEM_STABLE
            </p>
          </footer>
        </motion.div>
      )}

      {/* 
        Background Data Overlay
        This adds that "data-heavy" look with static code-like text in the background.
      */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] font-mono text-[10px] overflow-hidden select-none z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap animate-pulse" style={{ animationDelay: `${i * 0.5}s` }}>
            {`0x${(i * 12345).toString(16)} >> MOV EAX, EBX >> PUSH 0x${(i * 99).toString(16)} >> CALL 0x${(i * 888).toString(16)} >> RET`}
          </div>
        ))}
      </div>
    </div>
  );
}
