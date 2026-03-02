'use client';

import { motion } from 'motion/react';
import { ExternalLink, GitBranch, Linkedin } from 'lucide-react';
import { useEffect, useState } from 'react';
import GlitchReveal from './GlitchReveal';
import GlitchBorder from './GlitchBorder';

// ─── Name glitch-cycle constants ─────────────────────────────────────────────
const PHRASES = [
  { l1: 'JOSHUA JOAL', l2: 'SOTERAS'      },
  { l1: 'KING OF',     l2: 'ADAPTABILITY' },
] as const;

const GLITCH_CHARS    = '!<>-_\\/[]{}—=+*^?#$@%&';
const HOLD_MS         = 2500; // time each phrase is visible
const SCRAMBLE_FRAMES = 10;   // number of scramble frames
const FRAME_MS        = 40;   // ms per scramble frame (~400ms total)

const scramble = (s: string) =>
  s.split('').map(c => (c === ' ' ? ' ' : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)])).join('');

// ─── AnimatedName ─────────────────────────────────────────────────────────────
function AnimatedName() {
  const [l1, setL1] = useState<string>(PHRASES[0].l1);
  const [l2, setL2] = useState<string>(PHRASES[0].l2);

  useEffect(() => {
    let holdId: ReturnType<typeof setTimeout>  | null = null;
    let ivId:   ReturnType<typeof setInterval> | null = null;
    let currentIdx = 0;

    const runCycle = () => {
      const nextIdx = (currentIdx + 1) % PHRASES.length;

      setL1(PHRASES[currentIdx].l1);
      setL2(PHRASES[currentIdx].l2);

      holdId = setTimeout(() => {
        let frame = 0;
        ivId = setInterval(() => {
          frame++;
          setL1(scramble(PHRASES[nextIdx].l1));
          setL2(scramble(PHRASES[nextIdx].l2));
          if (frame >= SCRAMBLE_FRAMES) {
            clearInterval(ivId!);
            ivId = null;
            currentIdx = nextIdx;
            runCycle();
          }
        }, FRAME_MS);
      }, HOLD_MS);
    };

    runCycle();

    return () => {
      if (holdId) clearTimeout(holdId);
      if (ivId)   clearInterval(ivId);
    };
  }, []);

  return (
    <h1 className="text-5xl md:text-7xl font-black tracking-tighter overflow-hidden whitespace-nowrap">
      {l1 || '\u00A0'}
      <br />
      {l2 || '\u00A0'}
    </h1>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────
function ProjectCard({ title, desc, tags, index }: { title: string; desc: string; tags: string[]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative border border-foreground/10 p-6 hover:border-foreground/40 transition-all cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity bg-[repeating-linear-gradient(90deg,rgba(255,0,0,0.03)_0px,rgba(255,0,0,0.03)_1px,transparent_1px,transparent_4px)] mix-blend-overlay" />

      <div className="relative z-10 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold tracking-tighter group-hover:animate-glitch group-hover:glitch-text">
            {title}
          </h3>
          <ExternalLink className="w-4 h-4 opacity-50" />
        </div>
        <p className="text-sm text-foreground/70 leading-relaxed">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-1 border border-foreground/20 font-mono uppercase">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const projects = [
    {
      title: "NEURAL_NET_VISUALIZER",
      desc: "A real-time 3D visualization of neural network weights and activations using WebGL and React.",
      tags: ["React", "Three.js", "TensorFlow"],
    },
    {
      title: "CRYPTO_TERMINAL_OS",
      desc: "A custom operating system shell for managing decentralized assets with a focus on security and speed.",
      tags: ["Rust", "Wasm", "TypeScript"],
    },
    {
      title: "GLITCH_ENGINE_V1",
      desc: "A lightweight CSS/JS library for creating high-performance digital distortion effects.",
      tags: ["JavaScript", "CSS3", "Canvas"],
    },
    {
      title: "DATA_OVERLAY_HUD",
      desc: "An augmented reality interface for monitoring server health across distributed clusters.",
      tags: ["Next.js", "D3.js", "WebSockets"],
    },
  ];

  const experiences = [
    {
      company: "CYBER_DYNE SYSTEMS",
      role: "Lead Systems Architect",
      period: "2024 - PRESENT",
      desc: "Architecting scalable cloud infrastructure for autonomous systems.",
    },
    {
      company: "VOID_TECH INC",
      role: "Senior Frontend Engineer",
      period: "2022 - 2024",
      desc: "Developed immersive web experiences using advanced React patterns and shaders.",
    },
    {
      company: "GRID_WORKS",
      role: "Software Engineer",
      period: "2020 - 2022",
      desc: "Built real-time data pipelines and monitoring dashboards.",
    },
  ];

  return (
    <main className="min-h-screen pb-20">

      {/* ── About ──────────────────────────────────────────────────────────── */}
      <section id="about" className="max-w-7xl mx-auto px-4 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="space-y-2">
            {/* Static label — about section is the landing view, no scroll trigger needed */}
            <h2 className="text-sm font-mono text-foreground/50 uppercase tracking-[0.3em]">
              {"// Computer Vision / Software Engineer"}
            </h2>
            <AnimatedName />
          </div>

          <div className="max-w-md space-y-4">
            <p className="text-lg text-foreground/80 leading-relaxed">
              Specializing in the intersection of{' '}
              <span className="font-bold">Spatial Intelligence</span> and{' '}
              <span className="font-bold">Scalable Engineering.</span>
            </p>
            <ul className="space-y-3 text-sm text-foreground/70 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-foreground/30 select-none mt-0.5">▸</span>
                <span>
                  <span className="font-bold text-foreground">3D Computer Vision</span>
                  {' — '}Expertise in 3D Reconstruction, Image Processing, and spatial data.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground/30 select-none mt-0.5">▸</span>
                <span>
                  <span className="font-bold text-foreground">Edge &amp; On-Device ML</span>
                  {' — '}Optimizing high-performance AI models for local execution.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground/30 select-none mt-0.5">▸</span>
                <span>
                  <span className="font-bold text-foreground">Full-Stack &amp; Cloud</span>
                  {' — '}Architecting end-to-end AI applications on modern cloud infrastructure.
                </span>
              </li>
            </ul>
          </div>

          <div className="flex gap-4 items-center">
            <GlitchBorder>
              <a
                href="/assets/docs/resume.pdf"
                download="Joshua_Soteras_Resume.pdf"
                className="px-6 py-3 bg-foreground text-background font-bold text-sm tracking-widest hover:scale-105 transition-transform active:scale-95 inline-block"
              >
                DOWNLOAD RESUME
              </a>
            </GlitchBorder>
            <div className="flex items-center gap-6 px-4">
              <GlitchBorder size="sm">
                <a href="https://github.com/Joshua-Soteras" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="block p-1">
                  <GitBranch className="w-5 h-5" />
                </a>
              </GlitchBorder>
              <GlitchBorder size="sm">
                <a href="https://www.linkedin.com/in/joshua-soteras/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="block p-1">
                  <Linkedin className="w-5 h-5" />
                </a>
              </GlitchBorder>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-md mx-auto"
        >
          <div className="relative border-2 border-foreground p-2 group">
            {/* aspect-ratio on the img itself — simplest, no absolute positioning needed */}
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/profile.png"
                alt="Joshua Soteras"
                style={{
                  display: 'block',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  filter: 'grayscale(100%) contrast(1.1) brightness(0.9)',
                  transition: 'transform 700ms',
                }}
                className="group-hover:scale-110"
              />
              {/* Glitch colour overlays */}
              <div className="absolute inset-0 bg-red-500/10 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-cyan-500/10 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]" />
            </div>
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-foreground" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-foreground" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-foreground" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-foreground" />
          </div>
        </motion.div>
      </section>

      {/* ── Projects ───────────────────────────────────────────────────────── */}
      <section id="projects" className="max-w-7xl mx-auto px-4 py-24 border-t border-foreground/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <GlitchReveal as="h2" className="text-sm font-mono text-foreground/50 uppercase tracking-[0.3em]">
              {"// CHECKPOINTS"}
            </GlitchReveal>
            <GlitchReveal as="h3" className="text-4xl font-bold tracking-tighter">
              PROJECT_LOGS
            </GlitchReveal>
          </div>
          <GlitchReveal as="p" className="text-xs font-mono text-foreground/40 max-w-xs">
            A collection of experimental builds and production-ready systems.
          </GlitchReveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((p, i) => (
            <GlitchBorder key={i} size="sm" className="block">
              <ProjectCard {...p} index={i} />
            </GlitchBorder>
          ))}
        </div>
      </section>

      {/* ── Experience ─────────────────────────────────────────────────────── */}
      <section id="experience" className="max-w-7xl mx-auto px-4 py-24 border-t border-foreground/5">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-2">
            <GlitchReveal as="h2" className="text-sm font-mono text-foreground/50 uppercase tracking-[0.3em]">
              {"// LOGS"}
            </GlitchReveal>
            <GlitchReveal as="h3" className="text-4xl font-bold tracking-tighter">
              HISTORY_TRACE
            </GlitchReveal>
          </div>
          <div className="md:col-span-2 space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative pl-8 border-l border-foreground/20"
              >
                <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-foreground rounded-full group-hover:animate-ping" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <h4 className="text-xl font-bold tracking-tight">{exp.company}</h4>
                  <span className="text-xs font-mono bg-foreground/5 px-2 py-1">{exp.period}</span>
                </div>
                <p className="text-sm font-bold text-foreground/60 mb-4">{exp.role}</p>
                <p className="text-sm text-foreground/70 leading-relaxed">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
