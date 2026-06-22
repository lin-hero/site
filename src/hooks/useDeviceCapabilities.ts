import { useState, useEffect } from 'react';

export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLowEnd: boolean;
  screenWidth: number;
  screenHeight: number;
  prefersReducedMotion: boolean;
  // Performance settings based on device
  particleCount: number;
  enableHeavyEffects: boolean;
  enable3D: boolean;
  enableParallax: boolean;
  enableHoverEffects: boolean;
}

/**
 * Hook to detect device capabilities and optimize performance accordingly
 * Automatically reduces effects on mobile and low-end devices
 */
export const useDeviceCapabilities = (): DeviceCapabilities => {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect low-end devices (basic heuristic)
    const isLowEnd = isMobile && (
      // Low resolution
      (width * height < 1000000) ||
      // Limited cores (if available)
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
    );

    return {
      isMobile,
      isTablet,
      isDesktop,
      isLowEnd,
      screenWidth: width,
      screenHeight: height,
      prefersReducedMotion,
      // Performance settings
      particleCount: isLowEnd ? 10 : isMobile ? 15 : isTablet ? 25 : 30,
      enableHeavyEffects: !isMobile && !isLowEnd && !prefersReducedMotion,
      enable3D: isDesktop && !prefersReducedMotion,
      enableParallax: !isMobile && !prefersReducedMotion,
      enableHoverEffects: !isMobile, // Disable hover effects on mobile/touch devices
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const isLowEnd = isMobile && (
        (width * height < 1000000) ||
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
      );

      setCapabilities({
        isMobile,
        isTablet,
        isDesktop,
        isLowEnd,
        screenWidth: width,
        screenHeight: height,
        prefersReducedMotion,
        particleCount: isLowEnd ? 10 : isMobile ? 15 : isTablet ? 25 : 30,
        enableHeavyEffects: !isMobile && !isLowEnd && !prefersReducedMotion,
        enable3D: isDesktop && !prefersReducedMotion,
        enableParallax: !isMobile && !prefersReducedMotion,
        enableHoverEffects: !isMobile,
      });
    };

    // Listen for resize events
    window.addEventListener('resize', handleResize);

    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => handleResize();
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return capabilities;
};
