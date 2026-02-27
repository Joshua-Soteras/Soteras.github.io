'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { ExternalLink, Github, Code2, Layers, Cpu } from 'lucide-react';

/**
 * ProjectCard Component
 * Displays a project with the "RGB split" and "shake" hover effects.
 */
function ProjectCard({ title, desc, tags, index }: { title: string; desc: string; tags: string[]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative border border-foreground/10 p-6 hover:border-foreground/40 transition-all cursor-pointer overflow-hidden"
    >
      {/* Background Glitch Texture (Visible on hover) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 pointer-events-none bg-[url('https://picsum.photos/seed/glitch/400/400')] bg-cover mix-blend-overlay transition-opacity" />

      <div className="relative z-10 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold tracking-tighter group-hover:animate-glitch group-hover:text-shadow-[2px_0_#ff0000,-2px_0_#00ffff]">
            {title}
          </h3>
          <ExternalLink className="w-4 h-4 opacity-50" />
        </div>
        
        <p className="text-sm text-foreground/70 leading-relaxed">
          {desc}
        </p>

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
    }
  ];

  const experiences = [
    {
      company: "CYBER_DYNE SYSTEMS",
      role: "Lead Systems Architect",
      period: "2024 - PRESENT",
      desc: "Architecting scalable cloud infrastructure for autonomous systems."
    },
    {
      company: "VOID_TECH INC",
      role: "Senior Frontend Engineer",
      period: "2022 - 2024",
      desc: "Developed immersive web experiences using advanced React patterns and shaders."
    },
    {
      company: "GRID_WORKS",
      role: "Software Engineer",
      period: "2020 - 2022",
      desc: "Built real-time data pipelines and monitoring dashboards."
    }
  ];

  return (
    <main className="min-h-screen pb-20">
      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-sm font-mono text-foreground/50 uppercase tracking-[0.3em]">
              {"// IDENTITY_PROFILE"}
            </h2>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter animate-glitch">
              JOSHUA<br />SOTERAS
            </h1>
          </div>
          <p className="text-lg text-foreground/80 max-w-md leading-relaxed">
            Software Engineer specializing in building <span className="font-bold underline decoration-wavy">distorted digital experiences</span> and high-performance systems. I bridge the gap between raw data and human interaction.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-foreground text-background font-bold text-sm tracking-widest hover:scale-105 transition-transform active:scale-95">
              DOWNLOAD_CV.PDF
            </button>
            <div className="flex items-center gap-4 px-4">
              <Github className="w-5 h-5 cursor-pointer hover:text-foreground/60" />
              <Code2 className="w-5 h-5 cursor-pointer hover:text-foreground/60" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square max-w-md mx-auto"
        >
          {/* Profile Image with Glitch Overlays */}
          <div className="relative w-full h-full border-2 border-foreground p-2 group">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="https://picsum.photos/seed/joshua/800/800"
                alt="Joshua Soteras"
                fill
                className="object-cover grayscale contrast-125 brightness-75 group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Animated Glitch Layers */}
              <div className="absolute inset-0 bg-red-500/10 mix-blend-screen animate-glitch opacity-0 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-cyan-500/10 mix-blend-screen animate-glitch opacity-0 group-hover:opacity-100 [animation-delay:0.1s]" />
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/noise/200/200')] opacity-10 pointer-events-none" />
            </div>
            {/* Decorative Corners */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-foreground" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-foreground" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-foreground" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-foreground" />
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-7xl mx-auto px-4 py-24 border-t border-foreground/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-sm font-mono text-foreground/50 uppercase tracking-[0.3em]">
              {"// CHECKPOINTS"}
            </h2>
            <h3 className="text-4xl font-bold tracking-tighter">PROJECT_LOGS</h3>
          </div>
          <p className="text-xs font-mono text-foreground/40 max-w-xs">
            A collection of experimental builds and production-ready systems.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={i} {...p} index={i} />
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="max-w-7xl mx-auto px-4 py-24 border-t border-foreground/5">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-2">
            <h2 className="text-sm font-mono text-foreground/50 uppercase tracking-[0.3em]">
              {"// LOGS"}
            </h2>
            <h3 className="text-4xl font-bold tracking-tighter">HISTORY_TRACE</h3>
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
