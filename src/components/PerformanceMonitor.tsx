
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
}

const PerformanceMonitor = ({ children }: { children: React.ReactNode }) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const measurePerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        const performanceMetrics: PerformanceMetrics = {
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
        };

        // Get Web Vitals if available
        if ('getEntriesByType' in performance) {
          const paintEntries = performance.getEntriesByType('paint');
          const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            performanceMetrics.firstContentfulPaint = fcpEntry.startTime;
          }

          // LCP observation
          if ('PerformanceObserver' in window) {
            try {
              const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                if (lastEntry) {
                  performanceMetrics.largestContentfulPaint = lastEntry.startTime;
                }
              });
              observer.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (error) {
              console.warn('LCP observation not supported:', error);
            }
          }
        }

        setMetrics(performanceMetrics);

        // Warning for slow performance
        if (performanceMetrics.loadTime > 3000) {
          console.warn('Slow page load detected:', performanceMetrics.loadTime + 'ms');
          toast({
            title: "Performance Notice",
            description: `Page loaded in ${Math.round(performanceMetrics.loadTime)}ms. Consider optimizing images or enabling caching.`,
            duration: 5000
          });
        }

        // Log performance metrics for debugging
        console.log('Performance Metrics:', performanceMetrics);
      }
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, [toast]);

  // Image optimization
  useEffect(() => {
    const optimizeImages = () => {
      const images = document.querySelectorAll('img:not([loading])');
      images.forEach(img => {
        (img as HTMLImageElement).loading = 'lazy';
        
        // Add error handling for broken images
        img.addEventListener('error', () => {
          console.warn('Image failed to load:', (img as HTMLImageElement).src);
          (img as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
        });
      });
    };

    // Run optimization
    optimizeImages();
    
    // Re-run when new content is added
    const observer = new MutationObserver(optimizeImages);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
};

export default PerformanceMonitor;
