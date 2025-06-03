
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AuditData } from '@/types/audit';
import { deadlyAnimals } from '@/data/animalUtils';
import { APP_ROUTES, STORAGE_BUCKETS } from '@/constants/auditConstants';
import { testRoute } from '@/services/routeTestService';
import { testImageWithDetails, testBucketAccess } from '@/services/imageTestService';
import { analyzeAuditResults } from '@/services/auditAnalysisService';

export const usePlatformAudit = () => {
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const { toast } = useToast();

  const runFullAudit = useCallback(async () => {
    setIsRunning(true);
    
    try {
      toast({
        title: "Starting Platform Audit",
        description: "Running comprehensive tests on routes, images, and storage buckets...",
        duration: 3000
      });

      console.log('[Audit] Starting comprehensive platform audit...');

      // Test all routes
      console.log('[Audit] Testing routes...');
      const routeResults = await Promise.all(
        APP_ROUTES.map(route => testRoute(route))
      );

      // Test bucket accessibility
      console.log('[Audit] Testing bucket access...');
      const bucketTests = await Promise.all(
        Object.values(STORAGE_BUCKETS).map(bucket => testBucketAccess(bucket))
      );

      // Test all images with detailed results
      console.log('[Audit] Testing images from deadly animals data...');
      const imageTestPromises = deadlyAnimals.map(animal => 
        testImageWithDetails(animal.imageUrl, animal.name)
      );
      const imageResults = await Promise.all(imageTestPromises);

      // Analyze results and create audit data
      const auditResult = analyzeAuditResults(routeResults, imageResults, bucketTests);

      setAuditData(auditResult);
      setLastUpdated(new Date().toLocaleTimeString());

      const workingImages = imageResults.filter(result => result.isWorking).length;
      const workingRoutes = routeResults.filter(route => route.status === 'success').length;
      const healthScore = auditResult.performance.score;
      
      toast({
        title: "Audit Complete",
        description: `Health Score: ${healthScore}/100 | Routes: ${workingRoutes}/${APP_ROUTES.length} | Images: ${workingImages}/${imageResults.length}`,
        duration: 5000
      });

      console.log('[Audit] Audit completed successfully', {
        healthScore,
        routes: `${workingRoutes}/${APP_ROUTES.length}`,
        images: `${workingImages}/${imageResults.length}`
      });

    } catch (error) {
      console.error('[Audit] Error running audit:', error);
      toast({
        title: "Audit Failed",
        description: "There was an error running the platform audit",
        variant: "destructive"
      });
    } finally {
      setIsRunning(false);
    }
  }, [toast]);

  return {
    auditData,
    isRunning,
    runFullAudit,
    lastUpdated
  };
};
