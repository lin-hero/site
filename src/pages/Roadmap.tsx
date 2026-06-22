import { motion } from 'framer-motion';
import { ArrowLeft, Check, Clock, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LightEffects from '@/components/LightEffects';

const roadmapItems = [
  {
    quarter: 'Q1 2026',
    status: 'completed',
    title: 'Platform Launch',
    description: 'Initial release with core features and infrastructure.',
  },
  {
    quarter: 'Q2 2026',
    status: 'in-progress',
    title: 'AI Integration',
    description: 'Advanced AI capabilities for automation and insights.',
  },
  {
    quarter: 'Q3 2026',
    status: 'planned',
    title: 'Enterprise Features',
    description: 'Advanced security, SSO, and team management tools.',
  },
  {
    quarter: 'Q4 2026',
    status: 'planned',
    title: 'Global Expansion',
    description: 'Multi-region deployment and localization support.',
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <Check className="w-5 h-5 text-vant-v" />;
    case 'in-progress':
      return <Clock className="w-5 h-5 text-vant-a" />;
    default:
      return <Rocket className="w-5 h-5 text-muted-foreground" />;
  }
};

const Roadmap = () => {
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
          className="font-logo font-bold text-4xl sm:text-5xl md:text-6xl text-foreground mb-6"
        >
          Roadmap
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-body text-lg text-muted-foreground max-w-2xl mb-16"
        >
          See what we're building and what's coming next for VANT.
        </motion.p>

        <div className="space-y-6">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={item.quarter}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex gap-6 p-6 rounded-2xl bg-muted/50 border border-foreground/10"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center">
                {getStatusIcon(item.status)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-logo font-bold text-lg text-foreground">
                    {item.title}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-neon/20 text-neon border border-neon/30">
                    {item.quarter}
                  </span>
                </div>
                <p className="font-body text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
