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
function ProjectCard({ title, desc, tags, index, image, href }: {
  title: string; desc: string; tags: string[]; index: number;
  image?: string; href?: string;
}) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative border border-foreground/10 p-6 hover:border-foreground/40 transition-all cursor-pointer overflow-hidden h-full"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity bg-[repeating-linear-gradient(90deg,rgba(255,0,0,0.03)_0px,rgba(255,0,0,0.03)_1px,transparent_1px,transparent_4px)] mix-blend-overlay" />

      <div className="relative z-10 space-y-4">
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {image && (
              <div className="w-9 h-9 shrink-0 overflow-hidden border border-foreground/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <h3 className="text-xl font-bold tracking-tighter group-hover:animate-glitch group-hover:glitch-text">
              {title}
            </h3>
          </div>
          {href
            ? <ExternalLink className="w-4 h-4 opacity-50 shrink-0" />
            : <span className="text-[8px] font-mono border border-foreground/30 px-1.5 py-0.5 text-foreground/40 shrink-0">LOCKED</span>
          }
        </div>
        <p className="text-sm text-foreground/70 leading-relaxed">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-1 border border-foreground/20 font-mono uppercase">
              {tag}
            </span>
          ))}
        </div>
        {/* Decrypt / Encrypt bar */}
        <div className="space-y-1 pt-1">
          <div className={`text-[8px] font-mono tracking-widest ${href ? 'text-foreground/30' : 'text-foreground/25'}`}>
            {href ? 'DECRYPTED' : 'ENCRYPTED'}
          </div>
          <div className="h-px bg-foreground/10 relative overflow-hidden">
            {href
              ? <div className="absolute inset-y-0 left-0 bg-foreground/50" style={{ width: '100%' }} />
              : <div className="absolute inset-y-0 left-0 bg-foreground/30 animate-pulse" style={{ width: '0%' }} />
            }
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">{card}</a>;
  }
  return card;
}

// ─── VictusCard ───────────────────────────────────────────────────────────────
function VictusCard({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="animate-victus-border relative border p-6 overflow-hidden h-full cursor-default"
    >
      {/* Scan line */}
      <div className="animate-scan-line absolute inset-x-0 h-px bg-foreground/40 pointer-events-none" />

      {/* Incoming signal label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-block w-1.5 h-1.5 bg-foreground/70 animate-border-flicker shrink-0" />
        <span className="text-[8px] font-mono text-foreground/40 tracking-widest">INCOMING_SIGNAL ░░░░░░░░░░░░</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 shrink-0 border border-foreground/20 flex items-center justify-center bg-foreground/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/projects/anon.svg" alt="" className="w-6 h-6 opacity-60 animate-border-flicker" />
          </div>
          <h3 className="text-xl font-bold tracking-tighter animate-glitch-slow glitch-text">
            CIBI
          </h3>
        </div>
        <span className="text-[8px] font-mono border border-foreground/30 px-1.5 py-0.5 text-foreground/40 shrink-0">
          LOCKED
        </span>
      </div>

      {/* Redacted description */}
      <div className="space-y-1.5 mb-4 text-sm font-mono text-foreground/20 select-none leading-relaxed">
        <div>██████████ ████████ ██████</div>
        <div>████ ████████ █████ ████</div>
        <div>███ ██████████ ████ ██</div>
      </div>

      {/* Status fields */}
      <div className="space-y-1 text-[10px] font-mono mb-4">
        <div className="flex gap-3">
          <span className="text-foreground/30 w-14 shrink-0">STATUS</span>
          <span className="text-foreground/90 animate-border-flicker">▶ INCOMING</span>
        </div>
        <div className="flex gap-3">
          <span className="text-foreground/30 w-14 shrink-0">ETA</span>
          <span className="text-foreground/60">MAR_2026</span>
        </div>
      </div>

      {/* Decrypt progress bar */}
      <div className="space-y-1">
        <div className="text-[8px] font-mono text-foreground/25 tracking-widest">DECRYPTING...</div>
        <div className="h-px bg-foreground/10 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-foreground/50 animate-pulse" style={{ width: '67%' }} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const projects = [
    {
      title: "VISIO_MEMORIA",
      desc: "A real-time facial recognition pipeline combining YOLOv8-Face detection with DINOv3 ViT-B/16 embeddings, running locally on Apple Silicon with a planned FAISS + SQLite identity database.",
      tags: ["Python", "PyTorch", "DINOv3", "YOLOv8", "RAG", "FAISS", "SQLite3"],
      image: "/assets/images/projects/vm_cropped.png",
      href: "https://github.com/Joshua-Soteras/Visio_Memoria",
    },
    {
      title: "END-TO-END DIFFERENTIABLE 3D RECONSTRUCTION",
      desc: "Building a unified, end-to-end differentiable pipeline that addresses current constraints in Structure from Motion (SfM) for more robust, context-aware 3D spatial models.",
      tags: ["Python", "PyTorch", "NumPy & SciPy", "COLMAP", "DINOv3"],
      image: "/assets/images/projects/thesis-logo.png",
    },
    {
      title: "AGENT-BAY",
      desc: "An intelligent e-commerce platform using Google ADK's Agent-to-Agent protocol to automatically create, manage, and negotiate product listings across eBay and Etsy with AI-powered pricing strategies.",
      tags: ["Google ADK", "Python", "React", "FastAPI"],
      image: "/assets/images/projects/agentbay-logo.png",
      href: "https://github.com/sskarz/AgentBay",
    },
    {
      title: "CONSTELLATION TRACKER",
      desc: "A web app that turns daily habits into constellations in the night sky. Each completed day lights up a star — connect them all to complete the constellation. 3rd place at FullyHacks 2025.",
      tags: ["React", "OpenAI", "Cerebras"],
      image: "/assets/images/projects/constellation-tracker.png",
      href: "https://github.com/sskarz/constellation-tracker",
    },
    {
      title: "SIGHT",
      desc: "A React web app for the visually impaired featuring YOLOv5 object detection with 92% accuracy across 80 object classes and sub-200ms inference time for real-time awareness.",
      tags: ["YOLOv5", "JavaScript", "React", "Node.js"],
      image: "/assets/images/projects/sightIcon.svg",
      href: "https://github.com/jasonly027/Sight",
    },
  ];

  const experiences = [
    {
      company: "LEIDOS_QTC_MGMT",
      role: "Software Engineer Intern",
      location: "Los Angeles, CA",
      period: "AUG 2024 — MAY 2025",
      bullets: [
        "Collaborated cross-functionally with a 10+ person team developing a KPI dashboard that cut weekly data analysis time from 6 to 2.4 hours, boosting team efficiency by 40%.",
        "Engineered a RESTful data processing pipeline in ASP .NET Core + Azure Services to automate survey ingestion and dashboard analytics, with CI/CD practices.",
        "Optimized a Sentiment Analysis model's accuracy from 75% to 95% using a trained LLM, automating manual review and enabling faster responses to critical feedback.",
      ],
    },
    {
      company: "AERY_LLC",
      role: "Software Engineer",
      location: "Los Angeles, CA",
      period: "JAN 2025 — JUN 2025",
      bullets: [
        "Launched a cross-platform React Native email client with a swipe-card UI and on-device LLMs for summarize/categorize/smart-reply; shipped to 100+ TestFlight users.",
        "Achieved 3x on-device inference speed by embedding ExecuTorch and tuning model/memory trade-offs, enabling minimal latency for real-time AI-powered features.",
        "Implemented OAuth 2.0 + JWT with secure keystore token storage for robust auth/session management.",
      ],
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
              {/* Scan line */}
              <div className="animate-scan-line absolute inset-x-0 h-px bg-foreground/50 pointer-events-none" />
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <GlitchBorder key={i} size="sm" className="block">
              <ProjectCard {...p} index={i} />
            </GlitchBorder>
          ))}
          <VictusCard index={projects.length} />
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
              EXPERIENCE
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
                <p className="text-sm font-bold text-foreground/60 mb-4">
                  {exp.role}
                  <span className="font-normal text-foreground/40"> · {exp.location}</span>
                </p>
                <ul className="space-y-2">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-sm text-foreground/70 leading-relaxed">
                      <span className="text-foreground/30 select-none mt-0.5 shrink-0">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
