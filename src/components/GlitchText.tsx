import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchIntensity?: number;
}

const GlitchText = ({ text, className = '', glitchIntensity = 1 }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main text */}
      <span className="relative z-10">{text}</span>
      
      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute top-0 left-0 text-vant-v opacity-70"
            style={{ clipPath: 'inset(10% 0 60% 0)' }}
            animate={{
              x: [-2 * glitchIntensity, 2 * glitchIntensity, -1 * glitchIntensity, 0],
              y: [1 * glitchIntensity, -1 * glitchIntensity, 0],
            }}
            transition={{ duration: 0.2 }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 text-vant-t opacity-70"
            style={{ clipPath: 'inset(40% 0 20% 0)' }}
            animate={{
              x: [2 * glitchIntensity, -2 * glitchIntensity, 1 * glitchIntensity, 0],
              y: [-1 * glitchIntensity, 1 * glitchIntensity, 0],
            }}
            transition={{ duration: 0.2 }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 text-vant-n opacity-70"
            style={{ clipPath: 'inset(70% 0 0 0)' }}
            animate={{
              x: [-1 * glitchIntensity, 1 * glitchIntensity, -2 * glitchIntensity, 0],
            }}
            transition={{ duration: 0.15 }}
          >
            {text}
          </motion.span>
        </>
      )}
      
      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
        }}
        animate={{ opacity: isGlitching ? 0.5 : 0 }}
      />
    </div>
  );
};

export default GlitchText;
