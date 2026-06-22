import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Hammer, Shield, TrendingUp } from 'lucide-react';
import ParticleField from './ParticleField';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

// Icons mapping for each letter
const letterIcons: Record<string, React.ElementType> = {
  V: Brain,
  A: Hammer,
  N: Shield,
  T: TrendingUp
};
// MODIFIED: Added optional `id` prop for IntersectionObserver hash routing
interface LetterSectionProps {
  id?: string;
  letter: string;
  meaning: string;
  title: string;
  description: string;
  teamColor: string;
  bgClass: string;
  textColorClass: string;
  glowClass: string;
  particleColor: string;
}
const LetterSection = ({
  id,
  letter,
  meaning,
  title,
  description,
  teamColor,
  bgClass,
  textColorClass,
  glowClass,
  particleColor
}: LetterSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const device = useDeviceCapabilities();

  // Only use heavy scroll animations on desktop
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Scroll-based transforms - only used on desktop
  const letterY = useTransform(scrollYProgress, [0, 0.3, 0.5], [200, 0, 0]);
  const letterScale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.5, 1, 1]);
  const letterRotate = useTransform(scrollYProgress, [0, 0.3], [45, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.4], [50, 0]);
  const decorOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 0.2]);
  // MODIFIED: Pass `id` to section element for IntersectionObserver targeting
  return <section id={id} ref={ref} className={`relative min-h-[110vh] snap-start flex items-center justify-center overflow-hidden ${bgClass}`}>
    {/* Reduce particles on mobile */}
    <ParticleField color={particleColor} count={Math.floor(device.particleCount * 0.7)} />

    {/* Animated background gradients - disabled on mobile for better performance */}
    {device.enableHeavyEffects && (
      <motion.div style={{
        opacity: decorOpacity
      }} className="absolute inset-0 pointer-events-none">
        <motion.div animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0]
        }} transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }} className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full ${textColorClass.replace('text-', 'bg-')} opacity-5 blur-3xl`} />
        <motion.div animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -45, 0]
        }} transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }} className={`absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full ${textColorClass.replace('text-', 'bg-')} opacity-5 blur-3xl`} />
      </motion.div>
    )}

    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-24">
        {/* Icon with enhanced effects - use simple animation on mobile, scroll-based on desktop */}
        <motion.div
          {...(device.enableHeavyEffects ? {
            style: {
              y: letterY,
              scale: letterScale,
              rotate: letterRotate
            }
          } : {
            initial: { opacity: 0, scale: 0.8, y: 50 },
            whileInView: { opacity: 1, scale: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, ease: "easeOut" }
          })}
          className="relative flex items-center justify-center"
        >
          {/* Pulsing glow behind icon - only on desktop */}
          {device.enableHeavyEffects && (
            <motion.div animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1]
            }} transition={{
              duration: 3,
              repeat: Infinity
            }} className={`absolute inset-0 ${textColorClass.replace('text-', 'bg-')} blur-[80px] opacity-20`} />
          )}

          <motion.div
            className="relative z-10"
            {...(device.enableHoverEffects && {
              whileHover: {
                scale: 1.08,
                rotateY: 10
              },
              transition: {
                type: "spring",
                stiffness: 300
              }
            })}
          >
            {(() => {
              const IconComponent = letterIcons[letter];
              return IconComponent ? <IconComponent className="w-[30vw] h-[30vw] sm:w-[25vw] sm:h-[25vw] md:w-[20vw] md:h-[20vw] lg:w-[15vw] lg:h-[15vw] text-primary-foreground drop-shadow-2xl" strokeWidth={1.5} /> : null;
            })()}
          </motion.div>

          {/* Shimmer effect overlay - only on desktop */}
          {device.enableHeavyEffects && (
            <motion.div animate={{
              x: ['-100%', '200%']
            }} transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-20" />
          )}

          {/* Reflection - only on desktop */}
          {device.enableHeavyEffects && (
            <div className="absolute -bottom-4 left-0 right-0 h-20 overflow-hidden opacity-10 z-0 flex items-center justify-center" style={{
              transform: 'scaleY(-1)',
              maskImage: 'linear-gradient(to bottom, black, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)'
            }}>
              {(() => {
                const IconComponent = letterIcons[letter];
                return IconComponent ? <IconComponent className="w-[30vw] h-[30vw] sm:w-[25vw] sm:h-[25vw] md:w-[20vw] md:h-[20vw] lg:w-[15vw] lg:h-[15vw] text-primary-foreground blur-[3px]" strokeWidth={1.5} /> : null;
              })()}
            </div>
          )}
        </motion.div>

        {/* Content - use simple animation on mobile, scroll-based on desktop */}
        <motion.div
          {...(device.enableHeavyEffects ? {
            style: {
              opacity: contentOpacity,
              y: contentY
            }
          } : {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: 0.2, ease: "easeOut" }
          })}
          className="max-w-xl text-center lg:text-left"
        >
          {/* Animated decorative line - simplified on mobile */}
          <motion.div
            initial={{ width: 0 }}
            {...(device.enableHeavyEffects ? {
              whileInView: { width: '100px' },
              transition: { delay: 0.3, duration: 0.8, ease: "easeOut" }
            } : {
              animate: { width: '100px' },
              transition: { duration: 0.3 }
            })}
            className={`h-1.5 ${textColorClass.replace('text-', 'bg-')} mb-6 mx-auto lg:mx-0 rounded-full relative overflow-hidden`}
          >
            {/* Shimmer effect - only on desktop */}
            {device.enableHeavyEffects && (
              <motion.div animate={{
                x: ['-100%', '100%']
              }} transition={{
                duration: 1.5,
                repeat: Infinity
              }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            )}
          </motion.div>

          {/* Simplified animations for mobile */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="font-logo font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mb-2"
          >
            <span className={textColorClass}>{meaning}</span>
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="font-display text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6"
          >
            {title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed mb-8"
          >
            {description}
          </motion.p>

          {/* Team badge with animation */}

        </motion.div>
      </div>
    </div>

    {/* Enhanced decorative elements - disabled on mobile */}
    {device.enableHeavyEffects && (
      <>
        <motion.div style={{
          opacity: decorOpacity
        }} className="absolute top-10 sm:top-20 right-10 sm:right-20 w-20 sm:w-32 h-20 sm:h-32 border border-foreground/10 rounded-full">
          <motion.div animate={{
            rotate: 360
          }} transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }} className="absolute inset-2 border border-foreground/5 rounded-full" />
        </motion.div>
        <motion.div style={{
          opacity: decorOpacity
        }} className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-32 sm:w-48 h-32 sm:h-48 border border-foreground/10 rounded-full">
          <motion.div animate={{
            rotate: -360
          }} transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }} className="absolute inset-4 border border-dashed border-foreground/5 rounded-full" />
        </motion.div>

        {/* Corner accents */}
        <motion.div initial={{
          opacity: 0,
          scale: 0
        }} whileInView={{
          opacity: 0.3,
          scale: 1
        }} transition={{
          delay: 0.5
        }} className={`absolute top-0 left-0 w-32 h-32 ${textColorClass.replace('text-', 'bg-')} opacity-10 blur-3xl`} />
        <motion.div initial={{
          opacity: 0,
          scale: 0
        }} whileInView={{
          opacity: 0.3,
          scale: 1
        }} transition={{
          delay: 0.7
        }} className={`absolute bottom-0 right-0 w-48 h-48 ${textColorClass.replace('text-', 'bg-')} opacity-10 blur-3xl`} />
      </>
    )}
  </section>;
};
export default LetterSection;