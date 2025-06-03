
import { lazy } from 'react';

// Lazy load components with error boundaries
export const createLazyComponent = (importFn: () => Promise<any>) => {
  return lazy(() =>
    importFn().catch((error) => {
      console.error('Error loading component:', error);
      // Return a fallback component
      return {
        default: () => (
          <div className="p-4 text-center text-red-600">
            <p>Failed to load component</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )
      };
    })
  );
};

// Preload components for better performance
export const preloadComponent = (importFn: () => Promise<any>) => {
  return importFn();
};

// Route-based code splitting
export const LazyPages = {
  Gallery: createLazyComponent(() => import('@/pages/Gallery')),
  Store: createLazyComponent(() => import('@/pages/Store')),
  Dashboard: createLazyComponent(() => import('@/pages/Dashboard')),
  AdminPortal: createLazyComponent(() => import('@/pages/AdminPortal')),
  SocialHub: createLazyComponent(() => import('@/pages/SocialHub')),
  Plans: createLazyComponent(() => import('@/pages/Plans')),
  Checkout: createLazyComponent(() => import('@/pages/Checkout'))
};

// Component-based code splitting for heavy components
export const LazyComponents = {
  PhotoGallery: createLazyComponent(() => import('@/components/PhotoGallery')),
  WorldMap: createLazyComponent(() => import('@/components/WorldMap')),
  MerchandiseStore: createLazyComponent(() => import('@/components/MerchandiseStore')),
  Community: createLazyComponent(() => import('@/components/Community'))
};
