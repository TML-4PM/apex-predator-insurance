
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const MobileOptimization = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Optimize images for mobile
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.loading) {
          img.loading = 'lazy';
        }
        
        // Add error handling
        img.onerror = () => {
          console.warn('Image failed to load:', img.src);
          img.src = 'https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
        };
      });
    };

    // Performance monitoring
    const measurePerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        
        if (loadTime > 3000) {
          console.warn('Slow page load detected:', loadTime + 'ms');
        }
      }
    };

    // Initialize optimizations
    const timer = setTimeout(() => {
      optimizeImages();
      measurePerformance();
      setIsLoading(false);
    }, 100);

    // Add touch gestures for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const touchDiff = touchStartY - touchY;
      
      // Prevent overscroll bouncing on iOS
      if (window.scrollY === 0 && touchDiff < 0) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      clearTimeout(timer);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return <>{children}</>;
};

export default MobileOptimization;
