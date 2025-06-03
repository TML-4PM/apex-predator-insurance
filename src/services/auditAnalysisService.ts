
import { AuditData, AuditIssue, RouteDetail } from '@/types/audit';
import { ImageTestResult } from './imageTestService';
import { APP_ROUTES, STORAGE_BUCKETS } from '@/constants/auditConstants';

export const analyzeAuditResults = (
  routeResults: RouteDetail[],
  imageResults: ImageTestResult[],
  bucketTests: boolean[]
): AuditData => {
  const workingImages = imageResults.filter(result => result.isWorking).length;
  const failedImages = imageResults.filter(result => !result.isWorking).length;
  const totalImages = imageResults.length;

  // Group failed images by bucket for better insights
  const failedByBucket = imageResults
    .filter(result => !result.isWorking)
    .reduce((acc, result) => {
      const bucket = result.bucket || 'unknown';
      acc[bucket] = (acc[bucket] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  // Calculate performance metrics
  const avgImageLoadTime = imageResults.reduce((sum, result) => sum + result.loadTime, 0) / totalImages;
  const avgRouteLoadTime = routeResults.reduce((sum, route) => sum + route.loadTime, 0) / routeResults.length;

  // Generate comprehensive issues and recommendations
  const issues = generateAuditIssues(routeResults, imageResults, bucketTests, failedByBucket, avgImageLoadTime, avgRouteLoadTime);

  const workingRoutes = routeResults.filter(route => route.status === 'success').length;
  
  // Calculate overall performance score (weighted)
  const routeScore = (workingRoutes / APP_ROUTES.length) * 40; // 40% weight
  const imageScore = (workingImages / totalImages) * 40; // 40% weight
  const speedScore = Math.max(0, (2000 - avgImageLoadTime) / 2000) * 20; // 20% weight
  const performanceScore = Math.min(100, Math.max(0, Math.round(routeScore + imageScore + speedScore)));

  return {
    timestamp: new Date().toISOString(),
    routes: {
      total: APP_ROUTES.length,
      working: workingRoutes,
      failed: APP_ROUTES.length - workingRoutes
    },
    images: {
      total: totalImages,
      working: workingImages,
      failed: failedImages,
      fallback: 0 // Could be enhanced to track fallback usage
    },
    performance: {
      avgLoadTime: Math.round(avgRouteLoadTime),
      score: performanceScore,
      fcp: Math.round(avgImageLoadTime * 0.7), // Estimated
      lcp: Math.round(avgImageLoadTime), // Estimated
      cls: 0.05 // Estimated good CLS score
    },
    routeDetails: routeResults,
    issues
  };
};

const generateAuditIssues = (
  routeResults: RouteDetail[],
  imageResults: ImageTestResult[],
  bucketTests: boolean[],
  failedByBucket: Record<string, number>,
  avgImageLoadTime: number,
  avgRouteLoadTime: number
): AuditIssue[] => {
  const issues: AuditIssue[] = [];
  
  // Check for failed routes
  const failedRoutes = routeResults.filter(route => route.status === 'error');
  if (failedRoutes.length > 0) {
    issues.push({
      severity: 'error',
      title: `${failedRoutes.length} Route(s) Failed`,
      description: `Routes not accessible: ${failedRoutes.map(r => r.path).join(', ')}`,
      recommendation: 'Check route configuration and ensure all paths are properly defined in App.tsx'
    });
  }

  // Check for failed images
  const failedImages = imageResults.filter(result => !result.isWorking).length;
  if (failedImages > 0) {
    const bucketBreakdown = Object.entries(failedByBucket)
      .map(([bucket, count]) => `${bucket}: ${count}`)
      .join(', ');
    
    issues.push({
      severity: 'error',
      title: `${failedImages} Image(s) Failed to Load`,
      description: `${failedImages} out of ${imageResults.length} images are not loading. Breakdown by bucket: ${bucketBreakdown}`,
      recommendation: 'Check image URLs, verify bucket permissions, and update filename mappings in completeImageMapping.ts'
    });
  }

  // Check bucket accessibility
  const inaccessibleBuckets = Object.values(STORAGE_BUCKETS).filter((_, index) => !bucketTests[index]);
  if (inaccessibleBuckets.length > 0) {
    issues.push({
      severity: 'warning',
      title: `${inaccessibleBuckets.length} Storage Bucket(s) Inaccessible`,
      description: `Cannot access buckets: ${inaccessibleBuckets.join(', ')}`,
      recommendation: 'Check bucket permissions and RLS policies in Supabase Dashboard'
    });
  }

  // Performance recommendations
  if (avgImageLoadTime > 2000) {
    issues.push({
      severity: 'warning',
      title: 'Slow Image Loading',
      description: `Average image load time is ${Math.round(avgImageLoadTime)}ms`,
      recommendation: 'Optimize image sizes, implement lazy loading, and consider CDN usage'
    });
  }

  if (avgRouteLoadTime > 500) {
    issues.push({
      severity: 'info',
      title: 'Route Performance Optimization',
      description: `Average route load time is ${Math.round(avgRouteLoadTime)}ms`,
      recommendation: 'Consider implementing code splitting and lazy loading for components'
    });
  }

  // Success recommendations
  if (failedImages === 0 && failedRoutes.length === 0) {
    issues.push({
      severity: 'info',
      title: 'Platform Health Excellent',
      description: 'All routes and images are loading successfully',
      recommendation: 'Continue monitoring and consider implementing performance optimizations'
    });
  }

  return issues;
};
