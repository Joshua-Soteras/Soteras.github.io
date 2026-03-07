'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * TerminalContact Component
 * A terminal-style input field for the contact section.
 */
export default function TerminalContact() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to the Terminal Contact System.',
    'Type "help" for available commands.',
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    setHistory((prev) => [...prev, `guest@dev_os:~$ ${input}`]);

    if (cmd === 'help') {
      setHistory((prev) => [
        ...prev,
        'Available commands:',
        '  - email    Send a message via email',
        '  - github   View my GitHub profile',
        '  - ls       List projects',
        '  - status   Check system status',
        '  - clear    Clear the terminal',
      ]);
    } else if (cmd === 'clear') {
      setHistory([]);
    } else if (cmd === 'status') {
      setHistory((prev) => [...prev, 'SYSTEM STATUS: OPERATIONAL', 'LATENCY: 12ms', 'UPTIME: 99.9%']);
    } else if (cmd.startsWith('email')) {
      setHistory((prev) => [...prev, 'Redirecting to mail client...', 'Opening: mailto:soterasjoshua@gmail.com']);
      window.location.href = 'mailto:soterasjoshua@gmail.com';
    } else if (cmd === 'github') {
      setHistory((prev) => [...prev, 'Opening GitHub profile...', '→ https://github.com/Joshua-Soteras']);
      window.open('https://github.com/Joshua-Soteras', '_blank');
    } else if (cmd === 'ls') {
      setHistory((prev) => [
        ...prev,
        'VISIO_MEMORIA',
        'END-TO-END_DIFFERENTIABLE_3D_RECONSTRUCTION',
        'AGENT-BAY',
        'CONSTELLATION_TRACKER',
        'SIGHT',
        'CIBI  [ENCRYPTED]',
      ]);
    } else if (cmd === 'ffxv') {
      const isActive = document.documentElement.hasAttribute('data-theme');
      if (isActive) {
        document.documentElement.removeAttribute('data-theme');
        setHistory((prev) => [...prev, '> THEME REVERTED']);
      } else {
        document.documentElement.setAttribute('data-theme', 'ffxv');
        setHistory((prev) => [...prev, '> ACCESSING RESTRICTED PARTITION...', '> THEME OVERRIDE: FFXV_PROTOCOL ENGAGED']);
      }
    } else {
      setHistory((prev) => [...prev, `Command not found: ${cmd}. Type "help" for assistance.`]);
    }

    setInput('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto border border-foreground/20 rounded-lg overflow-hidden bg-black text-green-500 font-mono shadow-2xl">
      {/* Terminal Header */}
      <div className="bg-foreground/10 px-4 py-2 flex items-center justify-between border-b border-foreground/20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <span className="text-[10px] opacity-50 uppercase tracking-widest">Contact_Terminal_v1.0</span>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="p-4 h-64 overflow-y-auto text-sm space-y-1 scrollbar-hide"
      >
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-all">
            {line}
          </div>
        ))}
        
        <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
          <span className="text-white shrink-0">guest@dev_os:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 text-green-400"
          />
        </form>
      </div>
    </div>
  );
}
