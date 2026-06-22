// MODIFIED: Index page refactored for hash routing and section IDs
// - Integrated useActiveSection hook for IntersectionObserver-based URL hash tracking
// - Each LetterSection now receives an `id` prop matching its meaning (Vision, Architect, etc.)
// - OutroSection wrapper div receives id logic via the component itself (id="Projects")
// - Footer id is set inside Footer.tsx (id="Footer")
// - On hard-refresh with a hash, the user is scrolled to the correct section instantly

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import LetterSection from '@/components/LetterSection';
import OutroSection from '@/components/OutroSection';
import SEOHead from '@/components/SEOHead';
import { useActiveSection } from '@/hooks/useActiveSection';

const letterSections = [
  {
    letter: 'V',
    meaning: 'Vision',
    title: 'Pioneering the Unconventional',
    description: 'Vision is the core of our creative leadership. We look beyond conventional boundaries to pioneer out-of-the-box ideas. By identifying opportunities others miss, we transform bold concepts into forward-thinking, impactful digital realities.',
    teamColor: 'Green',
    bgClass: 'bg-vant-v-bg',
    textColorClass: 'text-vant-v',
    glowClass: 'text-shadow-glow-v',
    particleColor: 'rgba(76, 175, 80, 0.3)',
  },
  {
    letter: 'A',
    meaning: 'Architect',
    title: 'Engineering Optimal Foundations',
    description: 'We build with a production-first mindset. Architecting means structuring robust, scalable systems while strictly optimizing resource management. From secure backend logic to seamless, intuitive user experiences, we engineer every layer for flawless performance.',
    teamColor: 'Yellow',
    bgClass: 'bg-vant-a-bg',
    textColorClass: 'text-vant-a',
    glowClass: 'text-shadow-glow-a',
    particleColor: 'rgba(255, 179, 0, 0.3)',
  },
  {
    letter: 'N',
    meaning: 'Neutralize',
    title: 'Securing the Core',
    description: 'Security is our baseline, not an afterthought. We neutralize risks by engineering privacy-first products and proactively eliminating vulnerabilities. We fortify our systems to ensure user data remains strictly protected and unconditionally secure.',
    teamColor: 'Blue',
    bgClass: 'bg-vant-n-bg',
    textColorClass: 'text-vant-n',
    glowClass: 'text-shadow-glow-n',
    particleColor: 'rgba(33, 150, 243, 0.3)',
  },
  {
    letter: 'T',
    meaning: 'Thrive',
    title: 'Sustaining Continuous Evolution',
    description: 'Deployment is just the beginning. Thrive represents our commitment to continuous growth and product evolution. Through relentless support, dynamic updates, and continuous optimization, we ensure our software scales and adapts to future demands.',
    teamColor: 'Orange',
    bgClass: 'bg-vant-t-bg',
    textColorClass: 'text-vant-t',
    glowClass: 'text-shadow-glow-t',
    particleColor: 'rgba(255, 87, 34, 0.3)',
  },
];

const Index = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);

  // MODIFIED: Activate IntersectionObserver-based hash routing
  useActiveSection();

  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Only scroll to footer if explicitly requested via navigation state
    if (location.state?.scrollToFooter && footerRef.current) {
      setTimeout(() => {
        footerRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (!window.location.hash) {
      // Only reset scroll to top if there's no hash (hash scroll is handled by useActiveSection)
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (mainRef.current) {
        mainRef.current.scrollTop = 0;
      }
    }

    // Clear the scroll state after handling it
    if (location.state?.scrollToFooter) {
      window.history.replaceState({}, document.title);
    }
  }, [location.pathname]); // Changed dependency to pathname instead of state 

  return (
    <motion.main
      ref={mainRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <SEOHead
        title="VANT"
        description="V.A.N.T. is a Tech Creative Collective of four specialized teams: Vision, Architect, Neutralize, and Thrive. We build groundbreaking AI systems like Jarvis Nexus and PingAfter."
        canonicalUrl="https://vanthq.net/"
        keywords="VANT, Vision Architect Neutralize Thrive, Tech Creative Collective, Jarvis Nexus, PingAfter, AI systems, open source AI, AI voice assistant, creative technology, digital innovation"
        rawTitle
      />

      <HeroSection />

      {/* MODIFIED: Each LetterSection now receives id={section.meaning} for hash routing */}
      {letterSections.map((section, index) => (
        <LetterSection key={section.letter} id={section.meaning} {...section} />
      ))}

      <div ref={footerRef}>
        {/* OutroSection has id="Projects" internally; Footer has id="Footer" internally */}
        <OutroSection />
      </div>
    </motion.main>
  );
};

export default Index;
