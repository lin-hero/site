// MODIFIED: Footer — Phase 3 UX polish
// - REMOVED: "Help Center" from the Resources section links.
// - MODIFIED: Moved the "Help Center" pill to sit horizontally next to the social icons (Google-style utility row) instead of stacking directly above the VANT logo.
// - Maintained all animations, VANT logo sizing, and IntersectionObserver configurations.

import { motion } from 'framer-motion';
import { Mail, Youtube, Facebook, Instagram, Linkedin, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const XIcon = () => <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
</svg>;

interface FooterLink {
  name: string;
  href: string;
  soon?: boolean;
}
interface FooterSection {
  title: string;
  links: FooterLink[];
}

// MODIFIED: 3-column layout, hiding Pricing, Careers, Contact.
// Links marked `soon: true` are rendered as non-clickable spans below.
const footerSections: FooterSection[] = [{
  title: 'Product',
  links: [{
    name: 'Features',
    href: '/features'
  }, {
    name: 'Roadmap',
    href: '/roadmap',
    soon: true
  }]
}, {
  title: 'Company & Resources',
  links: [{
    name: 'About Us',
    href: '/about'
  }, {
    name: 'Blog',
    href: '/blog',
    soon: true
  }, {
    name: 'Status',
    href: '/status',
    soon: true
  }]
}, {
  title: 'Legal',
  links: [{
    name: 'Privacy Policy',
    href: '/privacy',
    soon: true
  }, {
    name: 'Terms of Service',
    href: '/terms',
    soon: true
  }, {
    name: 'Cookies Policy',
    href: '/cookies',
    soon: true
  }]
}];

const socialLinks = [
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/company/hqVANT',
    label: 'Linkedin'
  }, {
    icon: XIcon,
    href: 'https://x.com/hqVANT',
    label: 'X (Twitter)',
    isCustom: true
  }, {
    icon: Facebook,
    href: 'https://facebook.com/hqVANT',
    label: 'Facebook'
  }, {
    icon: Instagram,
    href: 'https://instagram.com/hqVANT',
    label: 'Instagram'
  }, {
    icon: Youtube,
    href: 'https://youtube.com/@hqVANT',
    label: 'YouTube'
  }
];

// Always-visible section renderer (no accordion)
const FooterLinkSection = ({ section }: { section: FooterSection }) => (
  <div>
    <span className="font-logo font-bold text-sm text-foreground block mb-3 md:mb-4">
      {section.title}
    </span>
    <ul className="space-y-2.5">
      {section.links.map(link => {
        // External links (Help Center) open in new tab
        const isExternal = link.href.startsWith('http');
        return (
          <li key={link.name}>
            {isExternal ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-muted-foreground hover:text-neon transition-colors duration-150 ease-out flex items-center gap-2"
              >
                {link.name}
              </a>
            ) : link.soon ? (
              // MODIFIED: "soon" items are non-clickable — no navigation, just visual indicator
              <span
                className="font-body text-sm text-muted-foreground/50 flex items-center gap-2 cursor-not-allowed select-none"
              >
                {link.name}
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-neon/20 text-neon border border-neon/30">
                  soon
                </span>
              </span>
            ) : (
              <Link
                to={link.href}
                className="font-body text-sm text-muted-foreground hover:text-neon transition-colors duration-150 ease-out flex items-center gap-2"
              >
                {link.name}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);

const Footer = () => {
  return <footer id="Footer" className="relative bg-gradient-to-b from-muted/30 via-muted/50 to-muted/70 backdrop-blur-xl border-t border-foreground/10 mt-auto pb-1">
    {/* Background effects */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 left-1/4 w-96 h-96 bg-gradient-to-tr from-vant-v/20 to-vant-a/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-32 right-1/4 w-80 h-80 bg-gradient-to-tl from-vant-n/20 to-vant-t/10 rounded-full blur-3xl"
      />

      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background/50 to-transparent" />
    </div>

    <div className="container mx-auto px-6 py-16 lg:py-20 relative z-10">
      {/* Main footer content */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-16 lg:gap-24">
        
        {/* Left side - Navigation & Help Center */}
        <div className="flex-1 flex flex-col gap-10">
          {/* Link sections grid (3 columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 w-full lg:max-w-2xl">
            {footerSections.map(section => <FooterLinkSection key={section.title} section={section} />)}
          </div>
          
          {/* Help Center pill (DISABLED) */}
          {/* <div className="pt-2">
            <motion.a
              href="https://help.vanthq.net"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground/5 border border-foreground/10 text-muted-foreground hover:text-neon hover:border-neon/40 transition-all duration-300 ease-out text-sm font-body shadow-sm"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help Center</span>
            </motion.a>
          </div> */}
        </div>

        {/* Right side - Branding & Utilities */}
        <div className="flex flex-col items-start sm:items-center lg:items-end gap-6 pt-10 lg:pt-0 border-t border-foreground/10 lg:border-none">
          
          {/* VANT logo scaled */}
          <div className="group text-left sm:text-center lg:text-right cursor-default select-none">
            <span className="font-logo font-black text-6xl md:text-7xl whitespace-nowrap inline-flex tracking-tight">
              <span className="text-foreground group-hover:text-vant-v transition-colors duration-300">V</span>
              <span className="text-foreground group-hover:text-vant-a transition-colors duration-300">A</span>
              <span className="text-foreground group-hover:text-vant-n transition-colors duration-300">N</span>
              <span className="text-foreground group-hover:text-vant-t transition-colors duration-300">T</span>
            </span>
            {/* <p className="text-sm text-muted-foreground font-body mt-2 tracking-widest uppercase">Vision. Architect. Neutralize. Thrive.</p> */}
          </div>

          {/* Social Links row */}
          <div className="flex items-center gap-3 mt-2">
            {socialLinks.map((social) => <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.15,
                y: -2
              }}
              whileTap={{
                scale: 0.9
              }}
              className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-muted-foreground hover:text-neon hover:border-neon/50 transition-all duration-300 ease-out"
              aria-label={social.label}
            >
              {social.isCustom ? <social.icon /> : <social.icon className="w-5 h-5" />}
            </motion.a>)}
          </div>
          
        </div>
      </div>
    </div>
  </footer>;
};
export default Footer;