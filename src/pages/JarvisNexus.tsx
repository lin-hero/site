// ============================================================
// JARVIS-NEXUS — Redesigned Landing Page v2
// Rebuilt by (laude) — User-first, dev-ready
// New: Tools Arsenal · Run Scenario Spotlight · Persona Studio
// ============================================================

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Download, Github, ChevronRight, Copy, Check, HardDrive,
  Terminal, CheckCircle2, Mic
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';

import { WIN_SCRIPT_TPL, LIN_SCRIPT_TPL, PERSONA_TPL, CAT_META, TOOL_DATA, RELEASES } from '../data/jarvisData';
// ─────────────────────────────────────────────
// V-BASED VISUAL TIER ENGINE
// ─────────────────────────────────────────────
const getVisualTier = (v: number) => {
  if (v < 1) return {
    theme: 'slate', particleCount: 20, baseSpeed: 0.1,
    color: 'rgba(100,116,139,0.25)', connectionRadius: 50, bgStyle: '#050505',
    glow: 'drop-shadow-[0_0_6px_rgba(100,116,139,0.2)]',
    gradient: 'from-slate-400 via-slate-500 to-slate-600',
    border: 'border-slate-500/30 hover:border-slate-400/50',
    bg: 'bg-slate-500/10 hover:bg-white/[0.03]',
    accent: 'text-slate-400', divider: 'via-slate-500/20',
  };
  return {
    theme: 'amber', particleCount: 85, baseSpeed: 0.6,
    color: 'rgba(255,176,0,0.85)', connectionRadius: 150, bgStyle: '#050B14',
    glow: 'drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]',
    gradient: 'from-amber-300 via-amber-500 to-amber-600',
    border: 'border-amber-500/30 hover:border-amber-500/60',
    bg: 'bg-amber-500/10 hover:bg-white/[0.04]',
    accent: 'text-amber-400', divider: 'via-amber-500/20',
  };
};

// ─────────────────────────────────────────────
// CANVAS BACKGROUND
// ─────────────────────────────────────────────
const AiCoreBackground = ({ version }: { version: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    let rafId: number;
    const tier = getVisualTier(version);
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? Math.floor(tier.particleCount * 0.4) : tier.particleCount;
    const radius = isMobile ? tier.connectionRadius * 0.65 : tier.connectionRadius;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];

    const init = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * tier.baseSpeed, vy: (Math.random() - 0.5) * tier.baseSpeed,
      }));
    };
    const resize = () => {
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
      ctx.fillStyle = tier.bgStyle; ctx.fillRect(0, 0, canvas.width, canvas.height);
      init();
    };
    window.addEventListener('resize', resize);
    resize();
    const draw = () => {
      ctx.fillStyle = tier.bgStyle;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 0.6;
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = tier.color; ctx.fill();
        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x, dy = p.y - p2.y, dSq = dx * dx + dy * dy;
          if (dSq < radius * radius) {
            const alpha = 1 - Math.sqrt(dSq) / radius;
            ctx.beginPath();
            ctx.strokeStyle = tier.color.replace(/[\d.]+\)$/, `${alpha})`);
            ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(rafId); };
  }, [version]);
  return (
    <canvas ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ transform: 'translateZ(0)', backgroundColor: getVisualTier(version).bgStyle }}
    />
  );
};

// ─────────────────────────────────────────────
// REUSABLE COMPONENTS
// ─────────────────────────────────────────────
const SectionLabel = ({ tier, children }: { tier: ReturnType<typeof getVisualTier>; children: React.ReactNode }) => (
  <span className={`font-mono text-xs tracking-[0.22em] uppercase mb-4 block ${tier.accent}`}>// {children}</span>
);

const Divider = ({ tier }: { tier: ReturnType<typeof getVisualTier> }) => (
  <div className={`w-full h-px bg-gradient-to-r from-transparent ${tier.divider} to-transparent my-24`} />
);

const CopyButton = ({
  text, id, copiedId, onCopy, label, sublabel
}: {
  text: string; id: string; copiedId: string | null;
  onCopy: (t: string, id: string) => void; label: string; sublabel: string;
}) => {
  const isCopied = copiedId === id;
  return (
    <button
      onClick={() => onCopy(text, id)}
      className={`
        flex items-center gap-3 px-5 py-3.5 rounded-xl border
        transition-all duration-300 text-left w-full sm:w-auto
        ${isCopied
          ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
          : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300'}
      `}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isCopied ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
        {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </div>
      <div>
        <p className="text-sm font-semibold leading-tight">{isCopied ? 'Copied!' : label}</p>
        <p className="text-xs text-slate-400 mt-0.5">{sublabel}</p>
      </div>
    </button>
  );
};

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, filter: 'blur(5px)', transition: { duration: 0.25 } },
};

// ─────────────────────────────────────────────
// ANIMATED TOOL EXAMPLE COMPONENT
// ─────────────────────────────────────────────
const AnimatedExample = ({ tool }: { tool: any }) => {
  const [index, setIndex] = useState(0);
  const hasMultiple = tool.examples && tool.examples.length > 1;

  useEffect(() => {
    if (!hasMultiple) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % tool.examples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [hasMultiple, tool.examples]);

  const currentText = tool.examples && tool.examples.length > 0 
    ? tool.examples[index].text 
    : tool.say;

  return (
    <div className="flex items-start gap-2 flex-1">
      <button
        onClick={() => {
          if (hasMultiple) {
            setIndex((prev) => (prev + 1) % tool.examples.length);
          }
        }}
        className={`shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
          hasMultiple ? 'hover:text-amber-400 cursor-pointer text-slate-500' : 'text-slate-600'
        }`}
        title={hasMultiple ? "Next example" : ""}
      >
        <Mic className="w-3 h-3" />
      </button>
      <div className="relative flex-1">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="text-xs text-slate-400 italic leading-relaxed"
          >
            {currentText}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function JarvisNexus() {
  const highestVersion = Math.max(...RELEASES.map(r => r.version));
  const [activeVersion, setActiveVersion] = useState(highestVersion);
  const [activeToolCat, setActiveToolCat] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openExampleId, setOpenExampleId] = useState<string | null>(null);
  const [showAllTools, setShowAllTools] = useState(false);

  const release = RELEASES.find(r => r.version === activeVersion) || RELEASES[0];
  const tier = getVisualTier(activeVersion);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const filteredTools = activeToolCat === 'all'
    ? TOOL_DATA
    : TOOL_DATA.filter(t => t.cat === activeToolCat);

  const visibleTools = (activeToolCat === 'all' && !showAllTools)
    ? filteredTools.slice(0, 3)
    : filteredTools;

  return (
    <div className="relative min-h-screen text-slate-200 font-sans overflow-x-hidden">
      <SEOHead
        title={`JARVIS Nexus v${release.version}`}
        rawTitle
        description="Jarvis Nexus by V.A.N.T. — Advanced local AI assistant & OS orchestrator. 100% offline, zero cloud dependencies, 30+ built-in tools."
        canonicalUrl="https://vanthq.net/JarvisNexus"
        keywords="Jarvis Nexus, VANT AI, local AI, OS Orchestrator, Ollama, Whisper, Piper, offline AI"
        image="/jarvis-og.jpg"
        isProductPage
        productName="Jarvis Nexus"
        productDescription="A production-grade, fully local AI assistant and OS orchestrator."
        productUrl="https://vanthq.net/JarvisNexus"
      />

      <AiCoreBackground version={activeVersion} />
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

      <div className="relative z-10 flex flex-col md:flex-row min-h-screen">

        {/* ════ SIDEBAR ════ */}
        <aside className="
          w-full md:w-20 md:fixed md:h-screen md:left-0 top-0
          border-b md:border-b-0 md:border-r border-white/[0.08]
          bg-black/50 backdrop-blur-2xl z-50
          flex md:flex-col items-center
          py-4 px-6 md:px-0 md:py-8
          gap-6 justify-between md:justify-start
        ">
          <Link to="/#Projects" className="text-slate-500 hover:text-white transition-colors duration-200" title="Back">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex md:flex-col gap-3 items-center">
            {[...RELEASES].sort((a, b) => b.version - a.version).map(r => {
              const isActive = activeVersion === r.version;
              const t = getVisualTier(r.version);
              return (
                <button key={r.version} onClick={() => setActiveVersion(r.version)} title={r.label}
                  className={`relative py-2.5 px-3 rounded-xl font-mono text-[11px] font-bold transition-all duration-300 ${isActive
                    ? 'bg-white/10 text-white border border-white/20 shadow-lg'
                    : 'text-slate-600 hover:text-slate-300 hover:bg-white/5 border border-transparent'}`}
                >
                  {isActive && (
                    <span className={`absolute -left-[5px] md:-left-[13px] top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-gradient-to-b ${t.gradient}`} />
                  )}
                  v{r.version}
                </button>
              );
            })}
          </div>
          <div className="hidden md:block flex-1" />
        </aside>

        {/* ════ MAIN CONTENT ════ */}
        <main className="flex-1 md:ml-20 max-w-[2000px] mx-auto px-5 sm:px-10 lg:px-16 py-20 w-full">
          <AnimatePresence mode="wait">
            <motion.div key={activeVersion} initial="hidden" animate="visible" exit="exit" variants={stagger}>

              {/* ── HERO ── */}
              <motion.section variants={fadeUp}
                className="flex flex-col items-center text-center min-h-[75vh] justify-center mb-24 mt-10 md:mt-0"
              >
                <div className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-full border mb-9 backdrop-blur-md ${tier.border} ${tier.bg}`}>
                  <span className={`w-2 h-2 rounded-full animate-pulse bg-gradient-to-r ${tier.gradient}`} />
                  <span className="font-mono text-[11px] font-bold tracking-widest text-white uppercase">{release.badge}</span>
                </div>

                <h1 className={`text-[clamp(4rem,14vw,9rem)] font-black tracking-tighter leading-none mb-5 ${tier.glow}`}>
                  <span className="inline-block px-5 bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">JARVIS</span>
                  <br />
                  <span className={`inline-block px-5 bg-gradient-to-r bg-clip-text text-transparent ${tier.gradient}`}>NEXUS</span>
                </h1>

                <p className="font-mono text-sm text-slate-400 tracking-[0.35em] uppercase mb-8">
                  {release.label} — v{release.version}
                </p>

                <p className="max-w-2xl text-lg leading-relaxed mb-10 text-slate-300">
                  {release.description}
                </p>

                {release.stats && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-4 pt-10 border-t border-white/[0.07] w-full max-w-2xl mb-10">
                    {release.stats.map(s => (
                      <div key={s.label} className="flex flex-col items-center">
                        <span className={`text-3xl md:text-4xl font-black font-mono mb-1.5 bg-gradient-to-r bg-clip-text text-transparent ${tier.gradient}`}>{s.val}</span>
                        <span className="text-xs text-slate-400 font-mono tracking-widest uppercase">{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Unified Download CTA */}
                {activeVersion >= 1 && (
                  <div className="flex flex-col items-center gap-4 mt-2">
                    <a
                      href="https://github.com/VANT-HQ/JARVIS-NEXUS/releases/latest"
                      target="_blank" rel="noopener noreferrer"
                      className={`
                        inline-flex items-center justify-center gap-3 px-8 py-4
                        rounded-xl border font-bold text-white
                        bg-gradient-to-r ${tier.gradient} border-transparent
                        hover:opacity-90 hover:-translate-y-1
                        transition-all duration-300 shadow-lg text-base
                      `}
                    >
                      <Download className="w-5 h-5" />
                      Download JARVIS NEXUS v{release.version}
                    </a>
                    <div className="flex items-center gap-3 text-xs font-medium text-slate-400 uppercase tracking-widest">
                      <HardDrive className="w-3 h-3" /> Windows 10/11
                      <span className="w-px h-3 bg-white/10" />
                      <Terminal className="w-3 h-3" /> Linux (Ubuntu 20.04+)
                    </div>
                    <a
                      href="https://github.com/VANT-HQ/JARVIS-NEXUS"
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors mt-2"
                    >
                      <Github className="w-4 h-4" />
                      Architecture, source code & full docs on GitHub
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </motion.section>

              <Divider tier={tier} />

              {/* ── WHAT'S NEW ── */}
              <motion.section variants={fadeUp} className="mb-28">
                <div className="mb-10 text-center md:text-left">
                  <SectionLabel tier={tier}>Release Notes</SectionLabel>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">What's New in v{release.version}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {release.whatsNew.map((note, i) => (
                    <motion.div key={i} variants={fadeUp}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.025] border border-white/[0.07] backdrop-blur-sm hover:border-white/[0.14] transition-colors"
                    >
                      <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${tier.accent}`} />
                      <p className="text-slate-300 text-sm leading-relaxed">{note}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              <Divider tier={tier} />

              {/* ── ARCHITECTURE ── */}
              <section className="mb-28">
                <div className="mb-10">
                  <SectionLabel tier={tier}>System Architecture</SectionLabel>
                  <h2 className="text-4xl md:text-5xl font-bold text-white">
                    {activeVersion < 1 ? 'The Wild West' : 'Production-First Engine'}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {release.features.map((feat, i) => (
                    <motion.div key={i} variants={fadeUp} whileHover={{ scale: activeVersion < 1 ? 1 : 1.02 }}
                      className={`
                        group relative p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06]
                        backdrop-blur-xl overflow-hidden transition-all duration-300 ${tier.border}
                        ${activeVersion < 1 ? 'opacity-60 grayscale hover:grayscale-0 hover:opacity-90' : ''}
                      `}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${feat.bg} ${feat.border} mb-5`}>
                        <feat.icon className={`w-5 h-5 ${feat.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2.5">{feat.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* ────────────────────────────────────────────
                  TOOLS ARSENAL — only for v1.0+
              ──────────────────────────────────────────── */}
              {activeVersion >= 1 && release.features.length > 2 && (
                <>
                  <Divider tier={tier} />
                  <section className="mb-28">
                    <div className="mb-10">
                      <SectionLabel tier={tier}>Built-in Arsenal</SectionLabel>
                      <h2 className="text-4xl font-bold text-white mb-3">30+ Tools, Zero Setup</h2>
                      <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
                        Every tool is registered at boot and invoked via natural speech. No commands to memorize — just say what you want.
                        The LLM picks the right tool and chains them automatically.
                      </p>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {Object.entries(CAT_META).map(([id, meta]) => {
                        const count = id === 'all' ? TOOL_DATA.length : TOOL_DATA.filter(t => t.cat === id).length;
                        const isActive = activeToolCat === id;
                        return (
                          <button key={id} onClick={() => { setActiveToolCat(id); setShowAllTools(false); }}
                            className={`
                              flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold
                              border transition-all duration-200
                              ${isActive
                                ? `${meta.bg} ${meta.border} ${meta.color}`
                                : 'border-white/[0.07] text-slate-500 hover:text-slate-300 hover:border-white/[0.15] hover:bg-white/[0.03]'}
                            `}
                          >
                            {meta.label}
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isActive ? 'bg-white/20' : 'bg-white/5'}`}>
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Tool Grid */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeToolCat}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
                      >
                        {visibleTools.map((tool) => {
                          const catMeta = CAT_META[tool.cat];

                          return (
                            <div key={tool.name}
                              className="relative p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.035] transition-all duration-200 group"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${catMeta.bg} border ${catMeta.border}`}>
                                  <tool.icon className={`w-3.5 h-3.5 ${catMeta.color}`} />
                                </div>
                                <code className="text-sm font-mono font-bold text-white">{tool.name}</code>
                                <span className={`ml-auto px-2 py-0.5 rounded-full text-[9px] font-mono border ${catMeta.bg} ${catMeta.border} ${catMeta.color} whitespace-nowrap`}>
                                  {catMeta.label}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed mb-3">{tool.desc}</p>

                              <div className="flex items-start justify-between gap-4 pt-3 border-t border-white/[0.05]">
                                <AnimatedExample tool={tool} />

                                {tool.examples && tool.examples.length > 0 && (
                                  <div>
                                    <button
                                      onClick={() => setOpenExampleId(tool.name)}
                                      className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                                    >
                                      Examples
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </motion.div>
                    </AnimatePresence>

                    {activeToolCat === 'all' && !showAllTools && TOOL_DATA.length > 3 && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="mt-6 flex justify-center"
                      >
                        <button
                          onClick={() => setShowAllTools(true)}
                          className={`px-6 py-3 rounded-xl border border-white/[0.08] hover:border-white/[0.2] bg-white/[0.02] hover:bg-white/[0.05] transition-all font-mono text-xs font-bold text-slate-300 flex items-center gap-2`}
                        >
                          Show All {TOOL_DATA.length} Tools
                          <ChevronRight className="w-4 h-4 rotate-90" />
                        </button>
                      </motion.div>
                    )}
                  </section>
                </>
              )}

              {/* ────────────────────────────────────────────
                  RUN SCENARIO SPOTLIGHT
              ──────────────────────────────────────────── */}
              {activeVersion >= 1 && release.features.length > 2 && (
                <>
                  <Divider tier={tier} />
                  <section className="mb-28">
                    <div className="mb-10">
                      <SectionLabel tier={tier}>Limit Breaker</SectionLabel>
                      <h2 className="text-4xl font-bold text-white mb-3">
                        <code className="font-mono text-amber-400">run scenario</code>
                        <span className="text-white"> — the impossible tool</span>
                      </h2>
                      <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
                        Every other tool has a fixed purpose. This one has no ceiling.
                        Want JARVIS to boot a dev environment, kill background apps, switch your audio profile, and open your playlist in one command?
                        Write the script once. Name the file. Done — forever.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/[0.08] bg-[#070C12] overflow-hidden">
                      {/* Terminal header */}
                      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                        <span className="w-3 h-3 rounded-full bg-rose-500/60" />
                        <span className="w-3 h-3 rounded-full bg-amber-500/60" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                        <span className="ml-3 text-xs font-mono text-slate-400">jarvis_run_dir/</span>
                      </div>

                      <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
                        {/* Left: How it works */}
                        <div>
                          <p className={`text-xs font-mono tracking-widest uppercase mb-4 ${tier.accent}`}>How it works</p>
                          <div className="space-y-3">
                            {[
                              { step: '01', text: 'Copy one of the prompts below' },
                              { step: '02', text: 'Send it to any AI with your task description filled in' },
                              { step: '03', text: 'Save the generated script to your JARVIS Run Directory' },
                              { step: '04', text: 'Name the file whatever you\'d say to call it' },
                              { step: '05', text: '"Jarvis, run [your script name] scenario" — that\'s it, forever' },
                            ].map(({ step, text }) => (
                              <div key={step} className="flex items-start gap-3">
                                <span className={`font-mono text-xs font-bold shrink-0 mt-0.5 ${tier.accent}`}>{step}</span>
                                <p className="text-sm text-slate-300 leading-relaxed">{text}</p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                            <p className="text-xs font-mono text-slate-400 mb-2">// Example</p>
                            <p className="text-xs text-slate-300">
                              File: <code className="text-amber-400">work mode.ps1</code><br />
                              Voice: <code className="text-white">"Jarvis, run work mode scenario"</code><br />
                              Result: VS Code opens, Spotify pauses, Do Not Disturb activates.
                            </p>
                          </div>
                        </div>

                        {/* Right: Copy buttons */}
                        <div>
                          <p className={`text-xs font-mono tracking-widest uppercase mb-4 ${tier.accent}`}>AI Prompt Templates</p>
                          <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                            Fill in your task, paste to any AI, get a ready-to-run script back.
                            No coding required.
                          </p>
                          <div className="flex flex-col gap-3">
                            <CopyButton
                              text={WIN_SCRIPT_TPL} id="win-script"
                              copiedId={copiedId} onCopy={handleCopy}
                              label="Windows Script Prompt"
                              sublabel="Generates a .ps1 PowerShell script"
                            />
                            <CopyButton
                              text={LIN_SCRIPT_TPL} id="lin-script"
                              copiedId={copiedId} onCopy={handleCopy}
                              label="Linux Script Prompt"
                              sublabel="Generates a .sh Bash script"
                            />
                          </div>
                          <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                            Scripts run with JARVIS's permissions. Review before placing in your Run Directory.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              )}

              {/* ────────────────────────────────────────────
                  PERSONA STUDIO
              ──────────────────────────────────────────── */}
              {activeVersion >= 1 && release.features.length > 2 && (
                <>
                  <Divider tier={tier} />
                  <section className="mb-28">
                    <div className="mb-10">
                      <SectionLabel tier={tier}>Character Engine</SectionLabel>
                      <h2 className="text-4xl font-bold text-white mb-3">Persona Studio</h2>
                      <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
                        JARVIS ships with two built-in personas (Classic and FRIDAY). But you can build any character you want —
                        a cold analyst, a chaotic gremlin, a hype man. Copy the template below, fill in the fields, and
                        send it to any AI to get a ready-to-paste persona prompt.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      {/* Left: Existing personas */}
                      <div className="space-y-3">
                        <p className={`text-xs font-mono tracking-widest uppercase mb-5 ${tier.accent}`}>Built-in Personas</p>
                        {[
                          {
                            name: 'JARVIS (Classic)', badge: 'Default', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20',
                            desc: 'Polished British executive assistant. Witty, loyal, mildly sarcastic. Addresses you as Sir or Boss.',
                          },
                          {
                            name: 'FRIDAY (Tactical)', badge: 'Locked', color: 'text-slate-400', bg: 'bg-slate-400/10', border: 'border-slate-400/20',
                            desc: 'Strictly professional, robotically cold, zero humor. Declarative sentences only. Pure execution.',
                          },
                          {
                            name: 'Your Custom Persona', badge: 'Build it →', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20',
                            desc: 'Anything you imagine. Use the template on the right to generate and paste your own character.',
                          },
                        ].map((p) => (
                          <div key={p.name} className={`p-5 rounded-xl bg-white/[0.02] border ${p.border} transition-all`}>
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`font-bold text-sm ${p.color}`}>{p.name}</span>
                              <span className={`ml-auto px-2 py-0.5 rounded-full text-[9px] font-mono border ${p.bg} ${p.border} ${p.color}`}>{p.badge}</span>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                          </div>
                        ))}
                      </div>

                      {/* Right: Build your own */}
                      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                        <p className={`text-xs font-mono tracking-widest uppercase mb-2 ${tier.accent}`}>Build Your Own</p>
                        <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                          Copy this template, fill in the blanks, paste it into any AI assistant.
                          It will generate a persona prompt you can add directly inside JARVIS Settings.
                        </p>
                        <CopyButton
                          text={PERSONA_TPL} id="persona-tpl"
                          copiedId={copiedId} onCopy={handleCopy}
                          label="Copy Persona Template"
                          sublabel="Fill in the blanks, send to any AI"
                        />
                        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                          The AI is instructed to keep output under 580 chars and never embed real names — matching JARVIS's internal persona format.
                        </p>
                      </div>
                    </div>
                  </section>
                </>
              )}

              {/* ── MODELS ── */}
              {release.models && (
                <>
                  <Divider tier={tier} />
                  <section className="mb-28">
                    <div className="mb-10">
                      <SectionLabel tier={tier}>System Requirements</SectionLabel>
                      <h2 className="text-4xl font-bold text-white mb-3">Engine Requirements</h2>
                      <p className="text-slate-400 max-w-2xl">
                        What JARVIS NEXUS needs to run. The Setup Wizard handles detection and download automatically on first launch.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                      {release.models.map((m, i) => (
                        <div key={i} className={`p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl ${m.hoverBorder} transition-all duration-300`}>
                          <div className="flex items-start gap-4 mb-5">
                            <div className={`p-2.5 rounded-xl border ${m.iconBg}`}>
                              <m.icon className={`w-5 h-5 ${m.badgeColor}`} />
                            </div>
                            <div>
                              <span className={`inline-block px-2.5 py-0.5 border text-[10px] font-mono font-bold rounded-full mb-1.5 ${m.badgeBg} ${m.badgeColor}`}>{m.badge}</span>
                              <h3 className="text-base font-bold text-white leading-tight">{m.title}</h3>
                              <p className="text-xs font-mono text-slate-400">{m.subtitle}</p>
                            </div>
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed mb-5">{m.desc}</p>
                          {m.link && (
                            <a href={m.link.url} target="_blank" rel="noopener noreferrer"
                              className={`inline-flex items-center gap-2 text-sm font-bold mb-5 hover:underline ${m.badgeColor}`}
                            >
                              <Download className="w-4 h-4" /> {m.link.text}
                            </a>
                          )}
                          <div className="flex flex-wrap gap-1.5">
                            {m.tags.map(t => (
                              <span key={t} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/[0.08] text-[10px] font-mono text-slate-400">{t}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}

              {/* ── ROADMAP ── */}
              {release.roadmap && (
                <>
                  <Divider tier={tier} />
                  <section className="mb-28">
                    <div className="mb-10">
                      <SectionLabel tier={tier}>What's Next</SectionLabel>
                      <h2 className="text-4xl font-bold text-white mb-3">Roadmap</h2>
                      <p className="text-slate-400">
                        Where JARVIS Nexus is heading. Every planned item is open for contributions.
                      </p>
                    </div>
                    <div className="space-y-2.5">
                      {release.roadmap.map((item, i) => (
                        <div key={i}
                          className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm hover:border-white/[0.12] hover:bg-white/[0.04] transition-all group"
                        >
                          <item.icon className={`w-5 h-5 shrink-0 ${item.color} ${item.status === 'In Progress' ? 'animate-[spin_5s_linear_infinite]' : ''}`} />
                          <span className="flex-1 text-sm text-slate-200 font-medium group-hover:text-white transition-colors">{item.task}</span>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-mono border ${item.bg} ${item.border} ${item.color} whitespace-nowrap`}>
                            {item.status === 'Shipped' ? '✓ ' : ''}{item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ════ FOOTER ════ */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-black/50 backdrop-blur-2xl py-14 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className={`text-xl font-black bg-clip-text text-transparent mb-1.5 bg-gradient-to-r ${tier.gradient}`}>
            JARVIS NEXUS v{release.version.toFixed(1)}
          </h2>
          <p className="text-sm text-slate-500 mb-7 flex items-center justify-center gap-1.5">
            Architected by{' '}
            <a href="https://vanthq.net" className="group font-black text-lg tracking-widest text-slate-300 hover:text-white transition-all ml-1 flex items-center">
              V
              <span className="transition-all duration-300 group-hover:text-amber-500 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]">A</span>
              NT
            </a>
          </p>
        </div>
      </footer>
      {/* ────────────────────────────────────────────
          EXAMPLES MODAL
      ──────────────────────────────────────────── */}
      <AnimatePresence>
        {openExampleId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpenExampleId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[#070C12] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-500/20 via-amber-500/50 to-slate-500/20" />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="font-mono text-amber-400">{'<'}</span>
                    {openExampleId} Examples
                    <span className="font-mono text-amber-400">{'>'}</span>
                  </h3>
                  <button 
                    onClick={() => setOpenExampleId(null)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 1L13 13M1 13L13 1" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {TOOL_DATA.find(t => t.name === openExampleId)?.examples?.map((ex: any, idx: number) => {
                    const tool = TOOL_DATA.find(t => t.name === openExampleId)!;
                    const catMeta = CAT_META[tool.cat];
                    return (
                      <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-white/5 ${catMeta.color}`}>
                            {ex.tag}
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 font-mono leading-relaxed">
                          {ex.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}