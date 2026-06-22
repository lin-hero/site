import { motion } from 'framer-motion';
import { useMemo } from 'react';

const PerspectiveGrid = () => {
  const horizontalLines = useMemo(() => Array.from({ length: 20 }, (_, i) => i), []);
  const verticalLines = useMemo(() => Array.from({ length: 30 }, (_, i) => i), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '1000px' }}>
      <motion.div
        className="absolute w-[200%] h-[200%] left-[-50%]"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(75deg) translateY(-20%)',
        }}
        animate={{
          translateZ: [0, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Horizontal lines */}
        {horizontalLines.map((i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute w-full h-px"
            style={{
              top: `${i * 5}%`,
              background: `linear-gradient(90deg, transparent, hsl(var(--neon-glow) / ${0.1 + (i % 5) * 0.05}), transparent)`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
        
        {/* Vertical lines */}
        {verticalLines.map((i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute h-full w-px"
            style={{
              left: `${i * 3.33}%`,
              background: `linear-gradient(180deg, hsl(var(--neon-glow) / ${0.1 + (i % 5) * 0.03}), transparent)`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.05,
            }}
          />
        ))}
      </motion.div>

      {/* Glow overlay at horizon */}
      <div 
        className="absolute inset-x-0 top-1/3 h-32 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--neon-glow) / 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-neon/30 to-transparent"
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default PerspectiveGrid;
