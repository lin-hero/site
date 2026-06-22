// NEW FILE: SEOHead.tsx — Enterprise-grade SEO & AI-readability component
// Injects dynamic <title>, meta tags, OpenGraph, Twitter Cards, and JSON-LD Schema.org structured data.
// Designed for react-helmet-async to manage <head> declaratively from any page component.

import { Helmet } from 'react-helmet-async';

// --- BRAND DEFAULTS ---
const BRAND = {
  name: 'V.A.N.T.',
  fullName: 'V.A.N.T. — Vision, Architect, Neutralize, Thrive',
  siteUrl: 'https://vanthq.net',
  defaultTitle: 'V.A.N.T. | Engineering Logic. Securing the Core.',
  defaultDescription:
    'At V.A.N.T., we go beyond writing syntax; we engineer logic. We are an independent software studio focused on building intelligent, privacy-first, and highly secure digital solutions like Jarvis Nexus.',
  defaultKeywords:
    'V.A.N.T., VANT, V.A.N.T, Vision Architect Neutralize Thrive, JARVIS NEXUS, JARVISNEXUS, VARVISNEXUS, JARVIS, Software Engineering, Cybersecurity, Local AI, Privacy-First, System Architecture',
  defaultImage: '/og-image.jpg',
  logo: '/favicon.ico',
  helpCenter: 'https://help.vanthq.net',
  twitterHandle: '@VANTcreative',
  locale: 'en_US',
} as const;

// --- PROP INTERFACE ---
interface SEOHeadProps {
  /** Page title — appended with brand suffix automatically */
  title?: string;
  /** Meta description for search engines */
  description?: string;
  /** Canonical URL for this page */
  canonicalUrl?: string;
  /** Comma-separated keywords string */
  keywords?: string;
  /** OpenGraph / Twitter Card image URL */
  image?: string;
  /** Page type for OpenGraph (default: 'website') */
  ogType?: string;
  /** If true, injects SoftwareApplication schema for a product page */
  isProductPage?: boolean;
  /** Product name (used for SoftwareApplication schema) */
  productName?: string;
  /** Product description */
  productDescription?: string;
  /** Product GitHub/download URL */
  productUrl?: string;
  /** Disable automatic brand suffix on title */
  rawTitle?: boolean;
}

// --- COMPONENT ---
const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  keywords,
  image,
  ogType = 'website',
  isProductPage = false,
  productName,
  productDescription,
  productUrl,
  rawTitle = false,
}) => {
  // Compute derived values with brand fallbacks
  const pageTitle = title
    ? rawTitle
      ? title
      : `${title} | ${BRAND.name}`
    : BRAND.defaultTitle;

  const pageDescription = description || BRAND.defaultDescription;
  const pageKeywords = keywords || BRAND.defaultKeywords;
  const pageImage = image || BRAND.defaultImage;
  const pageCanonical = canonicalUrl || BRAND.siteUrl;

  // Resolve absolute image URL for OpenGraph (OG requires absolute URLs)
  const absoluteImage = pageImage.startsWith('http')
    ? pageImage
    : `${BRAND.siteUrl}${pageImage}`;

  // --- JSON-LD: Organization Schema (always present) ---
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.fullName,
    alternateName: ['VANT', 'V.A.N.T.', 'V.A.N.T'],
    url: BRAND.siteUrl,
    logo: `${BRAND.siteUrl}${BRAND.logo}`,
    description: BRAND.defaultDescription,
    sameAs: [
      'https://github.com/VANT-HQ',
      'https://twitter.com/VANTcreative',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      url: BRAND.helpCenter,
      contactType: 'customer support',
      availableLanguage: ['English', 'Arabic'],
    },
    foundingDate: '2024',
    knowsAbout: [
      'Artificial Intelligence',
      'Open Source Software',
      'AI Voice Assistants',
      'Web Development',
      'Creative Technology',
    ],
  };

  // --- JSON-LD: SoftwareApplication Schema (product pages only) ---
  const softwareSchema = isProductPage
    ? {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: productName || 'Jarvis Nexus',
        description:
          productDescription ||
          'From cinematic fiction to local reality. An autonomous, modular AI ecosystem built for blazing-fast offline inference and persistent memory.',
        url: productUrl || `${BRAND.siteUrl}/JarvisNexus`,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Windows, Linux',
        license: 'https://opensource.org/licenses/MIT',
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        author: {
          '@type': 'Organization',
          name: BRAND.fullName,
          url: BRAND.siteUrl,
        },
        downloadUrl: 'https://github.com/VANT-HQ/JARVIS-NEXUS',
        softwareVersion: '2.x.x',
        featureList: [
          'Offline AI Voice Assistant',
          'Native JSON Mode',
          'Smart Response Caching',
          'No Browser Dependencies',
          'Qwen 2.5 Optimized',
          'MIT Licensed',
        ],
      }
    : null;

  // --- JSON-LD: WebSite Schema with SearchAction ---
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: BRAND.siteUrl,
    description: BRAND.defaultDescription,
    publisher: {
      '@type': 'Organization',
      name: BRAND.fullName,
    },
  };

  return (
    <Helmet>
      {/* PRIMARY META */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content={BRAND.name} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* CANONICAL */}
      <link rel="canonical" href={pageCanonical} />

      {/* OPENGRAPH */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:site_name" content={BRAND.fullName} />
      <meta property="og:locale" content={BRAND.locale} />

      {/* TWITTER CARD */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={BRAND.twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={absoluteImage} />

      {/* JSON-LD: Organization (always) */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* JSON-LD: WebSite (always) */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {/* JSON-LD: SoftwareApplication (product pages only) */}
      {softwareSchema && (
        <script type="application/ld+json">
          {JSON.stringify(softwareSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
