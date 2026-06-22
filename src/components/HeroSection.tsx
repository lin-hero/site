import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, Suspense, lazy } from 'react';
import ParticleField from './ParticleField';
import { ParallaxLayer } from './MouseParallax';
import GlitchText from './GlitchText';
import HolographicBorder from './HolographicBorder';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

const Hero3DScene = lazy(() => import('./Hero3DScene'));

const letters = [
  { char: 'V', color: 'text-vant-v', cssVar: '--vant-v', glow: 'text-shadow-glow-v' },
  { char: 'A', color: 'text-vant-a', cssVar: '--vant-a', glow: 'text-shadow-glow-a' },
  { char: 'N', color: 'text-vant-n', cssVar: '--vant-n', glow: 'text-shadow-glow-n' },
  { char: 'T', color: 'text-vant-t', cssVar: '--vant-t', glow: 'text-shadow-glow-t' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.5,
    }
  }
};

// MODIFIED: Replaced spring with tween to prevent negative blur values from physics overshoot
const letterVariants = {
  hidden: {
    y: 120,
    opacity: 0,
    rotateX: -90,
    filter: "blur(12px)"
  },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.8
    }
  }
};

const SceneLoader = () => (
  <div className="w-full h-full flex items-center justify-center opacity-20">
    <div className="w-12 h-12 border-2 border-vant-v border-t-transparent rounded-full animate-spin" />
  </div>
);

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const device = useDeviceCapabilities();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={ref} className="relative h-screen w-full snap-start flex items-center justify-center overflow-hidden bg-background">

      {/* Only render 3D scene on desktop for performance */}
      {device.enable3D && (
        <Suspense fallback={<SceneLoader />}>
          <div className="absolute inset-0">
            <Hero3DScene />
          </div>
        </Suspense>
      )}


      {/* Reduce particle count based on device capabilities */}
      <ParticleField color="rgba(100, 200, 150, 0.3)" count={device.particleCount} />

      {/* Disable parallax on mobile for better performance */}
      {device.enableParallax && (
        <>
          <ParallaxLayer depth={0.3} className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-vant-v/20 to-transparent blur-3xl will-change-transform" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-tl from-vant-t/20 to-transparent blur-3xl will-change-transform" />
            <ParallaxLayer depth={0.1}>
              <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-vant-n/10 to-transparent blur-3xl" />
            </ParallaxLayer>
          </ParallaxLayer>

          <ParallaxLayer depth={0.5} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
              <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-vant-v shadow-[0_0_15px_rgba(76,175,80,0.6)]" />
              <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-vant-n shadow-[0_0_15px_rgba(33,150,243,0.6)]" />
              <motion.div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-vant-a shadow-[0_0_15px_rgba(255,193,7,0.6)]" />
              <motion.div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-vant-t shadow-[0_0_15px_rgba(255,152,0,0.6)]" />
            </motion.div>
          </ParallaxLayer>
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60 pointer-events-none z-10" />

      <motion.div style={{ opacity, scale, y }} className="relative z-20 flex flex-col items-center justify-center will-change-transform">

        <motion.div
          className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6"
          style={{ perspective: '1000px' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {letters.map((letter, index) => (
            <motion.div
              key={letter.char}
              variants={letterVariants}
              className="relative isolate"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotateZ: [0, 1, -1, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
                className="will-change-transform"
              >
                <motion.span
                  className={`font-logo font-black text-[clamp(60px,15vw,160px)] ${letter.color} ${letter.glow} cursor-default select-none block transition-colors duration-300`}

                  style={{
                    textShadow: `0 0 150px currentColor`,
                    // MODIFIED: replaced `transparent` with rgba to fix Framer Motion interpolation
                    WebkitTextStroke: `2px rgba(255,255,255,0)`
                  }}

                  // Disable hover/tap effects on mobile for better performance
                  // MODIFIED: replaced color: 'transparent' with rgba(255,255,255,0) to fix interpolation crash
                  {...(device.enableHoverEffects && {
                    whileHover: {
                      scale: 1.15,
                      rotateY: 15,
                      rotateX: -10,
                      color: 'rgba(255,255,255,0)',
                      WebkitTextStroke: `2px var(${letter.cssVar})`,
                      filter: "drop-shadow(0 0 20px currentColor)",
                    },
                    whileTap: {
                      scale: 0.95,
                      color: 'rgba(255,255,255,0)',
                      WebkitTextStroke: `2px var(${letter.cssVar})`,
                    }
                  })}
                >
                  {letter.char}
                </motion.span>
              </motion.div>

              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
                className={`absolute inset-0 ${letter.color} blur-3xl opacity-20 -z-10 pointer-events-none`}
                style={{ transform: 'translateZ(-40px)' }}
              />

            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-8 md:mt-10 w-full flex justify-center px-4"
        >
          <GlitchText
            text="Engineering Logic. Securing the Core"
            className="font-logo text-xs sm:text-base md:text-xl text-muted-foreground tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase text-center text-balance max-w-[90vw]"
            glitchIntensity={1.5}
          />
        </motion.div>

        {/* Underline */}
        <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: 1.8, duration: 1 }} className="mt-6 relative">
          <HolographicBorder className="h-[2px] w-40 md:w-64 rounded-full overflow-hidden">
            <div className="w-full h-full bg-background/50" />
          </HolographicBorder>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 z-10 flex items-center gap-2 sm:gap-4 md:gap-6 opacity-20 pointer-events-none" style={{ transform: 'translateX(-50%) scaleY(-1) rotateX(45deg)', transformOrigin: 'center top', perspective: '1000px', maskImage: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
        {letters.map((letter, i) => (
          <span key={`reflection-${i}`} className={`font-logo font-black text-[clamp(60px,15vw,160px)] ${letter.color} blur-[3px] select-none`}>
            {letter.char}
          </span>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;