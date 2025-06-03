
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
  firstInputDelay?: number;
}

const PerformanceOptimizer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Measure Core Web Vitals
    const measurePerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        const performanceMetrics: PerformanceMetrics = {
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
        };

        // First Contentful Paint
        const paintEntries = performance.getEntriesByType('paint');
        const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          performanceMetrics.firstContentfulPaint = fcpEntry.startTime;
        }

        setMetrics(performanceMetrics);

        // Performance warnings
        if (performanceMetrics.loadTime > 3000) {
          console.warn('Slow page load detected:', performanceMetrics.loadTime + 'ms');
        }

        if (performanceMetrics.firstContentfulPaint && performanceMetrics.firstContentfulPaint > 2500) {
          console.warn('Slow FCP detected:', performanceMetrics.firstContentfulPaint + 'ms');
        }

        // Log performance metrics
        console.log('Performance Metrics:', performanceMetrics);
      }
    };

    // Observe LCP
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry && metrics) {
            setMetrics(prev => prev ? { ...prev, largestContentfulPaint: lastEntry.startTime } : null);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Observe CLS
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          if (metrics) {
            setMetrics(prev => prev ? { ...prev, cumulativeLayoutShift: clsValue } : null);
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Observe FID
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (metrics) {
              setMetrics(prev => prev ? { ...prev, firstInputDelay: (entry as any).processingStart - entry.startTime } : null);
            }
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        return () => {
          lcpObserver.disconnect();
          clsObserver.disconnect();
          fidObserver.disconnect();
        };
      } catch (error) {
        console.warn('Performance observation not fully supported:', error);
      }
    }

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, [toast, metrics]);

  // Image optimization
  useEffect(() => {
    const optimizeImages = () => {
      const images = document.querySelectorAll('img:not([loading])');
      images.forEach(img => {
        (img as HTMLImageElement).loading = 'lazy';
        
        // Add error handling
        if (!(img as any).hasErrorHandler) {
          img.addEventListener('error', () => {
            console.warn('Image failed to load:', (img as HTMLImageElement).src);
            (img as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
          });
          (img as any).hasErrorHandler = true;
        }
      });
    };

    // Initial optimization
    optimizeImages();
    
    // Re-optimize when new content is added
    const observer = new MutationObserver(optimizeImages);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  // Resource hints for preloading
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalImages = [
        'https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
      });
    };

    preloadCriticalResources();
  }, []);

  return <>{children}</>;
};

export default PerformanceOptimizer;
