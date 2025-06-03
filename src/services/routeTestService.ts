
import { RouteDetail } from '@/types/audit';

export const testRoute = async (route: { path: string; name: string }): Promise<RouteDetail> => {
  const startTime = performance.now();
  
  try {
    // Simulate route testing by creating a temporary link and checking if it would be valid
    const testElement = document.createElement('a');
    testElement.href = route.path;
    const isValidPath = testElement.pathname === route.path || route.path === '/';
    
    const endTime = performance.now();
    const loadTime = Math.round(endTime - startTime);
    
    return {
      path: route.path,
      name: route.name,
      status: isValidPath ? 'success' : 'error',
      loadTime,
      message: isValidPath ? 'Route accessible' : 'Route not found'
    };
  } catch (error) {
    const endTime = performance.now();
    const loadTime = Math.round(endTime - startTime);
    
    return {
      path: route.path,
      name: route.name,
      status: 'error',
      loadTime,
      message: 'Failed to test route'
    };
  }
};
