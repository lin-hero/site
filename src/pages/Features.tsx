import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Hammer, ShieldCheck, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LightEffects from '@/components/LightEffects';

const features = [
  { 
    icon: Brain, 
    title: 'Vision', 
    description: 'Pioneering the unconventional. We bridge the gap between imagination and production, anticipating future tech trends to build forward-thinking, impactful digital ecosystems.' 
  },
  { 
    icon: Hammer, 
    title: 'Architecture', 
    description: 'Engineering optimal foundations. We build with a relentless focus on scalability, resource optimization, and flawless performance on any hardware footprint.' 
  },
  { 
    icon: ShieldCheck, 
    title: 'Neutralize', 
    description: 'Securing the core by design. We proactively eliminate vulnerabilities, engineer privacy-first solutions, and ensure that user data remains unconditionally protected.' 
  },
  { 
    icon: TrendingUp, 
    title: 'Thrive', 
    description: 'Sustaining continuous evolution. Deployment is just day one. We ensure our software scales, adapts, and relentlessly optimizes to meet the demands of tomorrow.' 
  },
];
 
const Features = () => {
  const navigate = useNavigate();

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
          className="font-logo font-bold text-4xl sm:text-5xl md:text-6xl text-foreground mb-6 text-center"
        >
          Core Architecture
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-body text-lg text-muted-foreground mb-16 text-center max-w-2xl mx-auto"
        >
          Discover the engineering pillars that drive every system we architect at VANT
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="p-8 rounded-2xl bg-muted/50 border border-foreground/10 backdrop-blur-sm transition-colors hover:border-foreground/30"
            >
              <feature.icon className="w-12 h-12 text-neon mb-4" />
              <h3 className="font-logo font-bold text-xl text-foreground mb-2">{feature.title}</h3>
              <p className="font-body text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;