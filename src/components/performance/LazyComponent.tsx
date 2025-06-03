
import React, { Suspense, ComponentType } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyComponentProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

const LazyComponent: React.FC<LazyComponentProps> = ({
  component: Component,
  fallback,
  className = '',
  ...props
}) => {
  const LazyLoadedComponent = React.lazy(Component);

  const defaultFallback = (
    <div className={`animate-pulse ${className}`}>
      <Skeleton className="w-full h-32" />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <LazyLoadedComponent {...props} />
    </Suspense>
  );
};

export default LazyComponent;
