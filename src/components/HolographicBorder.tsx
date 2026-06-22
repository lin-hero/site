import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HolographicBorderProps {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  animationDuration?: number;
}

const HolographicBorder = ({ 
  children, 
  className = '', 
  borderWidth = 2,
  animationDuration = 3
}: HolographicBorderProps) => {
  // Check if this is being used as a rounded button (contains inline-block or rounded-full in className)
  const isRoundedButton = className.includes('rounded-full') || className.includes('inline-block');
  const borderRadius = isRoundedButton ? '9999px' : '1.5rem';
  
  return (
    <div className={`relative ${className}`} style={{ borderRadius }}>
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius,
          padding: borderWidth,
          background: 'linear-gradient(90deg, hsl(var(--vant-v)), hsl(var(--vant-a)), hsl(var(--vant-n)), hsl(var(--vant-t)), hsl(var(--vant-v)))',
          backgroundSize: '400% 100%',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Outer glow - only show for non-button elements */}
      {!isRoundedButton && (
        <motion.div
          className="absolute -inset-1 opacity-30 blur-md pointer-events-none"
          style={{
            borderRadius,
            background: 'linear-gradient(90deg, hsl(var(--vant-v)), hsl(var(--vant-a)), hsl(var(--vant-n)), hsl(var(--vant-t)), hsl(var(--vant-v)))',
            backgroundSize: '400% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default HolographicBorder;

