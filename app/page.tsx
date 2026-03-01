'use client';

import { useState } from 'react';
import BootSequence from '@/components/BootSequence';
import Navigation from '@/components/Navigation';
import Portfolio from '@/components/Portfolio';
import TerminalContact from '@/components/TerminalContact';
import GlitchReveal from '@/components/GlitchReveal';
import { motion } from 'motion/react';
import { GitBranch, Linkedin } from 'lucide-react';

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

            <div className="flex justify-center gap-6 mt-8">
              <a href="https://github.com/Joshua-Soteras" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-foreground/60 transition-colors">
                <GitBranch className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/joshua-soteras/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-foreground/60 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
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
