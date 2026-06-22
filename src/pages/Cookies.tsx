import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LightEffects from '@/components/LightEffects';

const Cookies = () => {
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
          Cookies Policy
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto space-y-8 font-body text-muted-foreground"
        >
          <section>
            <h2 className="font-logo font-bold text-2xl text-foreground mb-4">What Are Cookies</h2>
            <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website.</p>
          </section>

          <section>
            <h2 className="font-logo font-bold text-2xl text-foreground mb-4">How We Use Cookies</h2>
            <p>We use cookies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from.</p>
          </section>

          <section>
            <h2 className="font-logo font-bold text-2xl text-foreground mb-4">Managing Cookies</h2>
            <p>You can control and manage cookies in your browser settings. Please note that removing or blocking cookies may impact your user experience.</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Cookies;
