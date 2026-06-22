import { motion } from 'framer-motion';

interface FloatingShapeProps {
  className?: string;
}

const FloatingShape = ({ className = '' }: FloatingShapeProps) => {
  return (
    <motion.div
      className={`pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="relative w-16 h-16"
        animate={{
          rotate: [0, 360],
          y: [0, -10, 0],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {/* Geometric VANT shape */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-vant-v rotate-45 rounded-sm opacity-80" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'rotate(15deg)' }}>
          <div className="w-6 h-6 bg-vant-a rotate-45 rounded-sm opacity-60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'rotate(30deg)' }}>
          <div className="w-4 h-4 bg-vant-n rotate-45 rounded-sm opacity-40" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'rotate(45deg)' }}>
          <div className="w-2 h-2 bg-vant-t rotate-45 rounded-sm opacity-80" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingShape;
