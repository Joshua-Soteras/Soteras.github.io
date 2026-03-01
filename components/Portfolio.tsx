'use client';

import { motion } from 'motion/react';
import { ExternalLink, GitBranch, Linkedin } from 'lucide-react';
import { useEffect, useState } from 'react';
import GlitchReveal from './GlitchReveal';

// ─── Name animation constants ────────────────────────────────────────────────
const NAME_L1 = 'JOSHUA';
const NAME_L2 = 'SOTERAS';

// Binary encoding — lower 2 bits of each letter's ASCII value, space-separated.
// Same character length as the names' hex equivalents so the container doesn't shift.
// J=10 O=11 S=11 H=00 U=01 A=01
const BIN_L1 = '10 11 11 00 01 01';    // 17 chars
// S=11 O=11 T=00 E=01 R=10 A=01 S=11
const BIN_L2 = '11 11 00 01 10 01 11'; // 20 chars

const BACKSPACE_NAME_MS = 50;
const TYPE_BIN_MS       = 80;
const BACKSPACE_BIN_MS  = 40;
const TYPE_NAME_MS      = 80;
const BIN_PAUSE_MS      = 800;

// Bar fills over the duration of the longer binary line
const BAR_DURATION_MS = BIN_L2.length * TYPE_BIN_MS; // 20 × 80 = 1600ms

// ─── AnimatedName ─────────────────────────────────────────────────────────────
function AnimatedName() {
  const [l1, setL1] = useState(NAME_L1);
  const [l2, setL2] = useState(NAME_L2);
  const [showBar, setShowBar] = useState(false);
  const [barProgress, setBarProgress] = useState(0);

  useEffect(() => {
    let ivId: ReturnType<typeof setInterval> | null = null;
    let tId:  ReturnType<typeof setTimeout>  | null = null;

    const clear = () => {
      if (ivId) { clearInterval(ivId); ivId = null; }
      if (tId)  { clearTimeout(tId);   tId  = null; }
    };

    // ── helpers ──────────────────────────────────────────────────────────────
    const backspaceBoth = (
      s1: string, s2: string,
      speed: number,
      onDone: () => void
    ) => {
      let i1 = s1.length, i2 = s2.length;
      ivId = setInterval(() => {
        if (i1 > 0) setL1(s1.slice(0, --i1));
        if (i2 > 0) setL2(s2.slice(0, --i2));
        if (i1 === 0 && i2 === 0) { clearInterval(ivId!); ivId = null; onDone(); }
      }, speed);
    };

    const typeBoth = (
      t1: string, t2: string,
      speed: number,
      onDone: () => void
    ) => {
      let j1 = 0, j2 = 0;
      ivId = setInterval(() => {
        if (j1 < t1.length) setL1(t1.slice(0, ++j1));
        if (j2 < t2.length) setL2(t2.slice(0, ++j2));
        if (j1 >= t1.length && j2 >= t2.length) { clearInterval(ivId!); ivId = null; onDone(); }
      }, speed);
    };

    // ── cycle ─────────────────────────────────────────────────────────────────
    const runCycle = () => {
      // 1. Backspace real names
      backspaceBoth(NAME_L1, NAME_L2, BACKSPACE_NAME_MS, () => {

        // 2. Type binary + start loading bar
        setShowBar(true);
        tId = setTimeout(() => setBarProgress(100), 50); // trigger CSS transition

        typeBoth(BIN_L1, BIN_L2, TYPE_BIN_MS, () => {

          // 3. Pause while full binary is shown
          tId = setTimeout(() => {
            setShowBar(false);
            setBarProgress(0);

            // 4. Backspace binary
            backspaceBoth(BIN_L1, BIN_L2, BACKSPACE_BIN_MS, () => {

              // 5. Retype names
              typeBoth(NAME_L1, NAME_L2, TYPE_NAME_MS, () => {

                // 6. Wait, then repeat
                tId = setTimeout(runCycle, 2000 + Math.random() * 1000);
              });
            });
          }, BIN_PAUSE_MS);
        });
      });
    };

    tId = setTimeout(runCycle, 2000 + Math.random() * 1000);
    return clear;
  }, []);

  return (
    <div>
      {/* overflow-hidden + whitespace-nowrap prevents binary text from wrapping
          and changing the h1 height, which would cause layout shift */}
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter overflow-hidden whitespace-nowrap">
        {l1 || '\u00A0'}
        <br />
        {l2 || '\u00A0'}
      </h1>

      {/* Always rendered so it doesn't add/remove height — opacity controls visibility */}
      <div
        className="mt-3 h-1 w-full max-w-sm bg-foreground/10 overflow-hidden relative"
        style={{ opacity: showBar ? 1 : 0 }}
      >
        <div
          className="h-full bg-foreground relative"
          style={{
            width: `${barProgress}%`,
            transition: `width ${BAR_DURATION_MS}ms linear`,
          }}
        >
          <div className="absolute inset-0 bg-foreground animate-glitch opacity-50" />
        </div>
      </div>
    </div>
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
              {"// IDENTITY_PROFILE"}
            </h2>
            <AnimatedName />
          </div>

          {/* Bio restored with inline span */}
          <p className="text-lg text-foreground/80 max-w-md leading-relaxed">
            Software Engineer specializing in building{' '}
            <span className="font-bold underline decoration-wavy">distorted digital experiences</span>
            {' '}and high-performance systems. I bridge the gap between raw data and human interaction.
          </p>

          <div className="flex gap-4">
            <a
              href="/assets/docs/resume.pdf"
              download="Joshua_Soteras_Resume.pdf"
              className="px-6 py-3 bg-foreground text-background font-bold text-sm tracking-widest hover:scale-105 transition-transform active:scale-95 inline-block"
            >
              DOWNLOAD RESUME
            </a>
            <div className="flex items-center gap-4 px-4">
              <a href="https://github.com/Joshua-Soteras" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitBranch className="w-5 h-5 hover:text-foreground/60" />
              </a>
              <a href="https://www.linkedin.com/in/joshua-soteras/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 hover:text-foreground/60" />
              </a>
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
            {/* aspect-ratio: 1/1 creates a square without layout-shift hacks */}
            <div style={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/profile.png"
                alt="Joshua Soteras"
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'top',
                  filter: 'grayscale(100%) contrast(1.1) brightness(0.9)',
                  transition: 'transform 700ms',
                }}
                className="group-hover:scale-110"
              />
              {/* Glitch colour overlays — no animate-glitch here to avoid GPU compositing conflicts */}
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
            <ProjectCard key={i} {...p} index={i} />
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
