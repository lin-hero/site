import { useEffect, useRef, useCallback } from 'react';

// SECTION_IDS must match the IDs assigned to each section in Index.tsx
const SECTION_IDS = ['Vision', 'Architect', 'Neutralize', 'Thrive', 'Projects', 'Footer'] as const;
type SectionId = (typeof SECTION_IDS)[number];

// MODIFIED: Added 'Hero' sentinel — when user scrolls to the very top, the hash is cleared entirely.
// This ensures vant.com/ instead of vant.com/#Vision when at the top of the page.
const HERO_CLEAR_THRESHOLD = 100; // px from top to consider "at hero"

/**
 * Custom hook: IntersectionObserver-based active-section tracker.
 * - Updates the URL hash via history.replaceState (no re-render, no page reload).
 * - On initial mount, reads the current hash and scrolls to that section.
 * - MODIFIED: Clears hash when scrolled back to Hero (top of page).
 * 
 * PERFORMANCE: Uses a single IntersectionObserver for all sections,
 * avoiding per-section observers that waste memory.
 */
export const useActiveSection = () => {
  // Track which sections are currently visible and their intersection ratios
  const visibleSections = useRef<Map<string, number>>(new Map());
  // Prevents hash update during programmatic scroll-to-hash on mount
  const isScrollingToHash = useRef(false);

  // MODIFIED: Scroll to hash on initial load (hard-refresh support)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && SECTION_IDS.includes(hash as SectionId)) {
      isScrollingToHash.current = true;
      // Use requestAnimationFrame to wait for DOM layout completion
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'instant' });
        }
        // Release the lock after scroll completes
        setTimeout(() => {
          isScrollingToHash.current = false;
        }, 500);
      });
    }
  }, []);

  // MODIFIED: Set up a single IntersectionObserver to track all sections
  useEffect(() => {
    // MODIFIED: Scroll listener to detect when user is at the very top (Hero section).
    // Uses passive listener for zero scroll-jank overhead.
    const handleScroll = () => {
      if (isScrollingToHash.current) return;

      // If user is at or near the top, clear the hash entirely
      if (window.scrollY <= HERO_CLEAR_THRESHOLD) {
        const currentHash = window.location.hash;
        if (currentHash) {
          // MODIFIED: Use replaceState with pathname to clear hash without reload
          history.replaceState(null, '', window.location.pathname);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleSections.current.set(id, entry.intersectionRatio);
          } else {
            visibleSections.current.delete(id);
          }
        });

        // Don't update hash during programmatic scroll
        if (isScrollingToHash.current) return;

        // MODIFIED: If scrolled to very top, skip hash update (handled by scroll listener above)
        if (window.scrollY <= HERO_CLEAR_THRESHOLD) return;

        // Find the section with the highest intersection ratio
        let maxRatio = 0;
        let activeId = '';
        visibleSections.current.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            activeId = id;
          }
        });

        // Update URL hash without re-render or page reload
        if (activeId) {
          const currentHash = window.location.hash.replace('#', '');
          if (currentHash !== activeId) {
            history.replaceState(null, '', `#${activeId}`);
          }
        }
      },
      {
        // threshold array for fine-grained intersection tracking
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
        // Slight negative margin to trigger slightly before section enters viewport
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    // Observe all registered sections
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};
