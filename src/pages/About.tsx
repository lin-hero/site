import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Lock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LightEffects from '@/components/LightEffects';
 
// Elevated the values to reflect a high-end software architecture firm focused on performance, privacy, and production-ready solutions.
const values = [
  {
    icon: Lock, 
    title: 'Absolute Privacy',
    // Replaced 'offline-first' with a broader statement guaranteeing exclusive data access.
    description: 'We believe your data belongs to you. We engineer systems that operate with architectures guaranteeing that no one but you can access your data, delivering uncompromising security by design.',
  },
  {
    icon: Zap,
    title: 'Zero Latency Performance',
    description: 'Optimization is our obsession. We squeeze every drop of capability out of hardware, delivering near-instant execution and seamless UX.',
  },
  {
    icon: Cpu,
    title: 'Production-First Mindset',
    description: 'We don’t build concepts; we build robust, scalable engines capable of handling real-world complexity without breaking a sweat.',
  },
];

const About = () => {
  const navigate = useNavigate();

  // Navigate to /#Footer to preserve footer context continuity
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
          className="font-logo font-bold text-4xl sm:text-5xl md:text-6xl text-foreground mb-6"
        >
          About VANT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-body text-xl text-muted-foreground max-w-3xl mb-8 leading-relaxed"
        >
          We are a Tech Creative Collective of specialized engineers and product visionaries. 
          We exist to build groundbreaking software that respects your hardware and protects your privacy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-body text-muted-foreground max-w-3xl mb-16 space-y-6"
        >
          <p>
            VANT is more than an agency; it is a meticulously structured ecosystem comprising four distinct disciplines: 
            <strong className="text-foreground font-medium"> Vision, Architecture, Neutralization, and Thrive.</strong> 
            This separation of concerns allows us to tackle complex problems with military precision.
          </p>
          {/* Generalized the scope to include diverse applications and systems, removing specific AI/offline constraints. */}
          <p>
            From engineering cutting-edge digital platforms and dynamic applications to building critical management infrastructures, 
            we refuse to rely on bloated cloud services. Instead, we architect elegant, secure, and highly 
            optimized solutions that redefine what standard hardware can achieve across all our systems.
          </p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-logo font-bold text-2xl text-foreground mb-8"
        >
          Our Engineering Pillars
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-6 rounded-2xl bg-muted/50 border border-foreground/10 transition-all hover:bg-muted/80"
            >
              <value.icon className="w-8 h-8 text-neon mb-4" />
              <h3 className="font-logo font-bold text-lg text-foreground mb-2">
                {value.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;