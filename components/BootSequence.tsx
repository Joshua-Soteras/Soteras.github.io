'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * BootSequence Component
 * This handles the "Booting up..." animation when the page first loads.
 * It uses a progress bar and fake terminal logs.
 */
export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Simulate progress bar loading
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random jumps for a "glitchy" feel
        const jump = Math.random() > 0.8 ? 15 : 2;
        return Math.min(prev + jump, 100);
      });
    }, 100);

    const bootLogs = [
      "> INITIALIZING KERNEL...",
      "> LOADING SYSTEM MODULES...",
      "> ESTABLISHING NEURAL LINK...",
      "> DECRYPTING PORTFOLIO DATA...",
      "> BYPASSING FIREWALLS...",
      "> ACCESS GRANTED.",
    ];

    // Add logs over time
    bootLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
      }, index * 600);
    });

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsFinished(true);
        setTimeout(onComplete, 1000); // Final delay before showing main content
      }, 500);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center p-4 font-mono"
        >
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tighter animate-pulse">
                SYSTEM BOOT v2.0.26
              </h1>
              <div className="h-1 w-full bg-white/20 overflow-hidden relative">
                {/* The Glitchy Load Bar */}
                <motion.div
                  className="h-full bg-white relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: 'spring', bounce: 0 }}
                >
                  {/* Glitch overlay on the bar */}
                  <div className="absolute inset-0 bg-white animate-glitch opacity-50" />
                </motion.div>
              </div>
              <div className="flex justify-between text-xs opacity-70">
                <span>PROGRESS: {Math.round(progress)}%</span>
                <span>STATUS: {progress < 100 ? 'LOADING' : 'READY'}</span>
              </div>
            </div>

            {/* Terminal Logs */}
            <div className="h-40 overflow-hidden text-sm space-y-1">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={log.includes('GRANTED') ? 'text-green-400 font-bold' : ''}
                >
                  {log}
                </motion.div>
              ))}
            </div>

            {/* ASCII Art Placeholder */}
            <pre className="text-[8px] leading-[8px] opacity-30 select-none">
              {`
   _____ _      _____ _______ _____ _    _ 
  / ____| |    |_   _|__   __/ ____| |  | |
 | |  __| |      | |    | | | |    | |__| |
 | | |_ | |      | |    | | | |    |  __  |
 | |__| | |____ _| |_   | | | |____| |  | |
  \\_____|______|_____|  |_|  \\_____|_|  |_|
              `}
            </pre>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
