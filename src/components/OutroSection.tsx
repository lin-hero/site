// MODIFIED: Hybrid OutroSection — Phase 5 (Ultimate Polish & Dynamic Colors)
// - MERGED: Maintained the expanded, safe formatting and structural logic of Phase 3 (avoiding lost lines).
// - MERGED: Integrated the perfect dynamic color logic (`brandTraits`, `loop`, `primaryColor`) from Phase 4.
// - FIXED: Ensured `h-[280px]`, `line-clamp-3`, and `mt-auto` strictly remain in the DOM structure.
// - OPTIMIZED: Removed all static Tailwind color classes for cards, relying 100% on the V A N T brand color map.

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { ArrowRight, Bot, Clock } from 'lucide-react';
import Footer from './Footer';
import GlitchText from './GlitchText';
import { ParallaxLayer } from './MouseParallax';
import LightEffects from './LightEffects';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';
import { Link } from 'react-router-dom';

// MODIFIED: Color map for brand trait glow mixing system using exact HSL values.
const BRAND_COLOR_MAP: Record<string, string> = {
  V: 'hsl(120, 45%, 55%)',  // Green
  A: 'hsl(45, 95%, 55%)',   // Yellow/Amber
  N: 'hsl(210, 80%, 55%)',  // Blue
  T: 'hsl(25, 90%, 55%)',   // Orange
};

interface ProjectBadge {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
}

// MODIFIED: Removed static Tailwind colors. Everything is driven dynamically by brandTraits.
interface ProjectData {
  title: string;
  description: string;
  icon: 'bot' | 'clock';
  link: string;
  badges: ProjectBadge[];
  brandTraits: string[];
}

// MODIFIED: Synchronized brandTraits to match the intended colors perfectly.
const projects: ProjectData[] = [
  {
    title: 'Jarvis Nexus',
    description: 'From cinematic fiction to local reality. An autonomous, modular AI ecosystem that brings the ultimate voice-activated assistant directly to your hardware.... (F12 huh? What did you expect?)',
    icon: 'bot',
    link: '/JarvisNexus',
    badges: [
      {
        label: 'Open Source',
        color: 'hsl(120, 45%, 65%)',
        bgColor: 'hsla(120, 45%, 55%, 0.12)',
        borderColor: 'hsla(120, 45%, 55%, 0.35)',
        glowColor: 'hsla(120, 45%, 55%, 0.25)',
      },
    ],
    brandTraits: ['A', 'T'],
  },
  {
    title: 'Incoming Protocol...', 
    description: 'A paradigm shift in digital privacy is loading. We are architecting a next-generation security utility that blends uncompromising protection with an impossibly.... (Hey!!! u arent supposed to see this part.. GET OUT!)',
    icon: 'clock',
    link: '',
    badges: [
      {
        label: 'In Development',
        color: 'hsl(45, 90%, 65%)',
        bgColor: 'hsla(45, 90%, 55%, 0.12)',
        borderColor: 'hsla(45, 90%, 55%, 0.35)',
        glowColor: 'hsla(45, 90%, 55%, 0.25)',
      },
    ],
    brandTraits: ['V', 'N'], 
  },
];

// MODIFIED: Generates equal steps for gradient. loop=false for static backgrounds, loop=true for continuous animations.
function generateBrandGradient(traits: string[], alpha: number = 1, loop: boolean = false): string {
  const colors = traits
    .map((t) => BRAND_COLOR_MAP[t.toUpperCase()])
    .filter(Boolean);

  if (colors.length === 0) return 'transparent';
  
  const applyAlpha = (c: string) => c.replace(')', `, ${alpha})`);

  if (colors.length === 1) {
    return applyAlpha(colors[0]);
  }

  const gradientColors = loop ? [...colors, colors[0]] : colors;
  
  const step = 100 / (gradientColors.length - 1);
  const stops = gradientColors.map((c, i) => `${applyAlpha(c)} ${i * step}%`).join(', ');
  
  return `linear-gradient(110deg, ${stops})`;
}

const AnimatedBotIcon = ({ isHovered }: { isHovered: boolean }) => (
  <div className="relative w-6 h-6">
    <motion.div
      className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-current"
      animate={isHovered ? { scale: [1, 1.8, 1], opacity: [0.7, 1, 0.7] } : { scale: 1, opacity: 0.7 }}
      transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-current"
      animate={isHovered ? { scale: [0.5, 2, 0.5], opacity: [0.6, 0, 0.6] } : { scale: 0.5, opacity: 0 }}
      transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0, ease: 'easeOut' }}
    />
    <Bot className="w-6 h-6" strokeWidth={1.5} />
  </div>
);

const AnimatedClockIcon = ({ isHovered }: { isHovered: boolean }) => (
  <div className="relative w-6 h-6">
    <Clock className="w-6 h-6" strokeWidth={1.5} />
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
      transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
    >
      <div className="w-px bg-current origin-bottom" style={{ height: '6px', marginBottom: '3px' }} />
    </motion.div>
  </div>
);

const ProjectCard = ({ project, index }: { project: ProjectData; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const isMultiColor = project.brandTraits.length > 1;
  const primaryColor = BRAND_COLOR_MAP[project.brandTraits[0]?.toUpperCase()] || BRAND_COLOR_MAP['V'];

  // MODIFIED: Integrated perfect visual layers logic
  const idleBackground = useMemo(() => generateBrandGradient(project.brandTraits, 0.08, false), [project.brandTraits]);
  const ambientGlow = useMemo(() => generateBrandGradient(project.brandTraits, 0.20, true), [project.brandTraits]);
  const innerWash = useMemo(() => generateBrandGradient(project.brandTraits, 0.12, true), [project.brandTraits]);
  const edgeGlow = useMemo(() => generateBrandGradient(project.brandTraits, 0.6, true), [project.brandTraits]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="h-full relative group"
    >
      {/* 1. Outer Ambient Shadow Blur */}
      <motion.div
        className="absolute -inset-3 rounded-[2rem] z-0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none"
        style={{
          background: ambientGlow,
          backgroundSize: isMultiColor ? '300% 300%' : '100% 100%',
        }}
        animate={isHovered && isMultiColor ? { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] } : { backgroundPosition: '0% 50%' }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* 2. Main Card Wrapper */}
      <a
        href={project.link || undefined}
        target={project.link ? undefined : undefined}
        rel={project.link ? 'noopener noreferrer' : undefined}
        className={`
          relative z-10 flex flex-col h-[280px] rounded-2xl overflow-hidden
          backdrop-blur-xl border border-foreground/5
          p-6 sm:p-8
          transition-all duration-300 ease-out
          hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] group-hover:border-transparent
          active:scale-[0.98]
          cursor-pointer
        `}
        style={{ 
          background: idleBackground, 
          transform: 'translateZ(0)', 
          willChange: 'transform', 
          textDecoration: 'none' 
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 3. Inner Soft Wash (Hover Overlay) */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"
          style={{
            background: innerWash,
            backgroundSize: isMultiColor ? '300% 300%' : '100% 100%',
          }}
          animate={isHovered && isMultiColor ? { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] } : { backgroundPosition: '0% 50%' }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />

        {/* 4. Glowing Edge Overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 0 1px transparent`,
          }}
        >
           <motion.div 
             className="absolute inset-0 opacity-50"
             style={{
               background: edgeGlow,
               backgroundSize: isMultiColor ? '300% 300%' : '100% 100%',
               WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
               WebkitMaskComposite: 'xor',
               maskComposite: 'exclude',
               padding: '1px',
               borderRadius: 'inherit'
             }}
             animate={isHovered && isMultiColor ? { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] } : { backgroundPosition: '0% 50%' }}
             transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
           />
        </motion.div>

        {/* Badge row */}
        {project.badges.length > 0 && (
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            {project.badges.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase font-logo select-none bg-background/50 backdrop-blur-md"
                style={{
                  color: badge.color,
                  border: `1px solid ${badge.borderColor}`,
                  boxShadow: isHovered ? `0 0 12px ${badge.glowColor}, 0 0 4px ${badge.glowColor}` : 'none',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: badge.color, boxShadow: `0 0 6px ${badge.color}` }} />
                {badge.label}
              </span>
            ))}
          </div>
        )}

        {/* Animated icon (Auto colored by primary brand trait) */}
        <div className="relative z-10 mb-4">
          <div 
            className="w-12 h-12 rounded-xl bg-foreground/5 border flex items-center justify-center transition-colors duration-200 group-hover:bg-foreground/10"
            style={{ 
              color: primaryColor,
              borderColor: primaryColor.replace(')', ', 0.2)'),
            }}
          >
            {project.icon === 'bot' ? <AnimatedBotIcon isHovered={isHovered} /> : <AnimatedClockIcon isHovered={isHovered} />}
          </div>
        </div>

        {/* Title */}
        <h3 className="relative z-10 font-logo font-bold text-lg sm:text-xl text-foreground mb-2">
          {project.title}
        </h3>

        {/* Description */}
        <div className="relative z-10 flex-1 overflow-hidden">
          <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Arrow indicator anchored to bottom */}
        <div className="relative z-10 mt-auto pt-4 flex items-center gap-1.5 text-xs text-muted-foreground/60 group-hover:text-foreground/90 transition-colors duration-200">
          <span className="font-body font-medium">Explore</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </a>
    </motion.div>
  );
};

const OutroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const device = useDeviceCapabilities();
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      id="Projects"
      ref={ref}
      className="relative overflow-hidden pt-24 sm:pt-32 pb-16"
      style={{ background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)/0.3) 50%, hsl(var(--muted)/0.5) 100%)' }}
    >
      {/* LightEffects only on desktop */}
      {device.enableHeavyEffects && <LightEffects />}

      {/* Background decorations - only on desktop */}
      {device.enableHeavyEffects && (
        <>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Diagonal lines */}
            <motion.div
              animate={{ opacity: [0.03, 0.06, 0.03] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  rgba(0,0,0,0),
                  rgba(0,0,0,0) 100px,
                  hsl(var(--vant-v) / 0.05) 100px,
                  hsl(var(--vant-v) / 0.05) 101px
                )`,
              }}
            />

            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                className="absolute h-px bg-gradient-to-r from-transparent via-vant-v/20 to-transparent"
                style={{ top: `${30 + i * 20}%`, width: '200%' }}
              />
            ))}
          </div>

          <ParallaxLayer depth={0.5} className="absolute inset-0 pointer-events-none">
            <motion.div animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotateZ: [0, 10, 0]
            }} transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }} className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-vant-v/15 to-vant-a/5 blur-3xl" style={{
              transformStyle: 'preserve-3d'
            }} />
            <motion.div animate={{
              y: [0, 20, 0],
              x: [0, -15, 0],
              rotateZ: [0, -10, 0]
            }} transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }} className="absolute bottom-40 left-20 w-48 h-48 rounded-full bg-gradient-to-tl from-vant-n/15 to-vant-t/5 blur-3xl" style={{
              transformStyle: 'preserve-3d' 
            }} />
            <motion.div animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }} transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-vant-a/10 to-transparent blur-3xl" />
          </ParallaxLayer>
        </>
      )}

      <div className="container mx-auto px-4 sm:px-6 relative z-20 flex-1 flex flex-col justify-center">

        <motion.div initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="mb-16 sm:mb-24 relative" style={{
          zIndex: 30,
          transform: 'translateZ(0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}>
          <motion.h2 initial={{ 
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} className="font-logo font-bold text-3xl sm:text-4xl md:text-5xl text-foreground text-center mb-4 pb-4"
          >
            <GlitchText text="Current Projects" glitchIntensity={1} />
          </motion.h2>
          <motion.p initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1
          }} className="font-body text-muted-foreground text-center mb-12 sm:mb-16 max-w-2xl mx-auto text-sm sm:text-base">
            Showcasing our current work across all VANT teams
          </motion.p>

          {/* Card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto items-stretch">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </motion.div>

        {/* <motion.div initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="text-center mb-16 sm:mb-24" style={{
          perspective: '1000px'
        }}>
          <motion.h2 initial={{
            opacity: 0,
            scale: 0.9,
            rotateX: -20
          }} whileInView={{
            opacity: 1,
            scale: 1,
            rotateX: 0
          }} className="font-logo font-bold text-1xl sm:text-2xl md:text-4xl text-foreground mb-6">
            <GlitchText text="Looking for products?" glitchIntensity={2} />
          </motion.h2>

          <motion.p initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="font-body text-sm sm:text-base text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto">
            Take a look at our commercial products
          </motion.p>

          <motion.a
            href="https://category.vanthq.net"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-neon text-dark-bg font-logo font-bold text-sm sm:text-base overflow-hidden shadow-2xl shadow-neon/30 cursor-pointer"
            style={{
              textDecoration: 'none'
            }}
          >
            <motion.span
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
              className="absolute inset-0 bg-gradient-to-r from-neon via-white to-neon opacity-0 group-hover:opacity-20"
            />

            <span className="relative z-10">Category</span>

            <motion.div
              animate={{
                x: [0, 5, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            >
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
              className="absolute inset-0 rounded-full bg-neon blur-xl opacity-50"
            />
          </motion.a>
        </motion.div> */}

      </div>

      <div className="w-full relative z-20 mt-auto">
        <Footer />
      </div>

    </section>
  );
};
export default OutroSection;