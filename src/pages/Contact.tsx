// MODIFIED: Contact page — Phase 2 UX polish
// - Removed dummy form submission that caused page refresh
// - Implemented e.preventDefault() + dynamic mailto: string construction
// - Frontend-only: opens user's default email client with pre-filled Subject & Body
// - Added form state management with useRef for clean value extraction
// - Updated contact email to contact@vanthq.net

import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MapPin, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import LightEffects from '@/components/LightEffects';

const CONTACT_EMAIL = 'contact@vanthq.net';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Sharqia, Egypt',
  },
];

const Contact = () => {
  const navigate = useNavigate();
  // MODIFIED: useRef for form field access — avoids unnecessary re-renders
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [isSending, setIsSending] = useState(false);

  // Navigate to /#Footer to preserve footer context continuity
  const handleBack = () => {
    navigate('/', { state: { scrollToFooter: true } });
    setTimeout(() => { window.location.hash = 'Footer'; }, 100);
  };

  // MODIFIED: Form submission — constructs mailto: URL and opens email client.
  // Strictly frontend-only: no fetch, no backend API calls.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value?.trim() || '';
    const email = emailRef.current?.value?.trim() || '';
    const message = messageRef.current?.value?.trim() || '';

    // Basic validation
    if (!name || !message) return;

    // MODIFIED: Construct mailto string with encoded Subject and Body
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      (email ? `Reply-To: ${email}\n` : '') +
      `\n${message}`
    );

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    // Brief visual feedback before opening email client
    setIsSending(true);

    setTimeout(() => {
      // MODIFIED: Replaced window.location.href with the Virtual Anchor Click pattern.
      // This forces the browser to native-click a link, bypassing modern SPA navigation blocks.
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.target = '_blank'; // Ensures it attempts to open gracefully if blocked in the current tab
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up the DOM
      
      setIsSending(false);
    }, 300);
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
          Contact
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-body text-lg text-muted-foreground max-w-2xl mb-16"
        >
          Have a question or want to work together? We'd love to hear from you.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-neon/20 flex items-center justify-center">
                  <info.icon className="w-5 h-5 text-neon" />
                </div>
                <div>
                  <span className="font-body text-sm text-muted-foreground block">
                    {info.label}
                  </span>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="font-logo text-foreground hover:text-neon transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="font-logo text-foreground">
                      {info.value}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* MODIFIED: Form now uses onSubmit with e.preventDefault() + mailto */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="font-body text-sm text-muted-foreground block mb-2">
                Name
              </label>
              <input
                ref={nameRef}
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-foreground/10 text-foreground font-body focus:border-neon/50 focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="font-body text-sm text-muted-foreground block mb-2">
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-foreground/10 text-foreground font-body focus:border-neon/50 focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="font-body text-sm text-muted-foreground block mb-2">
                Message
              </label>
              <textarea
                ref={messageRef}
                rows={4}
                required
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-foreground/10 text-foreground font-body focus:border-neon/50 focus:outline-none transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>
            {/* MODIFIED: Button shows sending state with icon swap */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSending}
              className="w-full py-4 rounded-xl bg-neon text-foreground font-logo font-bold hover:bg-neon/90 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSending ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.div>
                  Opening Email Client...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;