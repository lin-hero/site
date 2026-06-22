import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LightEffects from '@/components/LightEffects';

const Terms = () => {
  const navigate = useNavigate();

  // MODIFIED: Navigate to /#Footer to preserve footer context continuity
  const handleBack = () => {
    navigate('/', { state: { scrollToFooter: true } });
    setTimeout(() => { window.location.hash = 'Footer'; }, 100);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <LightEffects />
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">
        <motion.button
          onClick={handleBack}
          whileHover={{ x: -5 }}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-neon transition-colors mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-body">Back to Home</span>
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-logo font-bold text-4xl sm:text-5xl md:text-6xl text-foreground mb-12 text-center"
        >
          Terms of Service
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto space-y-8 font-body text-muted-foreground"
        >
          <section>
            <h2 className="font-logo font-bold text-2xl text-foreground mb-4">Acceptance of Terms</h2>
            <p>By accessing and using VANT's services, you accept and agree to be bound by the terms and conditions of this agreement.</p>
          </section>

          <section>
            <h2 className="font-logo font-bold text-2xl text-foreground mb-4">Use License</h2>
            <p>Permission is granted to temporarily access the materials on VANT's website for personal, non-commercial transitory viewing only.</p>
          </section>

          <section>
            <h2 className="font-logo font-bold text-2xl text-foreground mb-4">Limitations</h2>
            <p>VANT shall not be held liable for any damages arising from the use or inability to use the materials on our website.</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
