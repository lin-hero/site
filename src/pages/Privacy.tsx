import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LightEffects from '@/components/LightEffects';

const Privacy = () => {
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
          Privacy Policy
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto space-y-8 font-body text-muted-foreground"
        >
          <section>
            <h2 className="font-logo font-bold text-2xl text-foreground mb-4">Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
          </section>

          <section>
            <h2 className="font-logo font-bold text-2xl text-foreground mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
          </section>

          <section>
            <h2 className="font-logo font-bold text-2xl text-foreground mb-4">Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
