
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface MobileOptimizedLayoutProps {
  children: React.ReactNode;
  enablePullToRefresh?: boolean;
  onRefresh?: () => Promise<void>;
  className?: string;
}

const MobileOptimizedLayout: React.FC<MobileOptimizedLayoutProps> = ({
  children,
  enablePullToRefresh = false,
  onRefresh,
  className
}) => {
  const isMobile = useIsMobile();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    if (!isMobile || !enablePullToRefresh) return;

    let isActive = false;
    const threshold = 100;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        setStartY(e.touches[0].clientY);
        isActive = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isActive || isRefreshing) return;
      
      const currentY = e.touches[0].clientY;
      const distance = currentY - startY;
      
      if (distance > 0 && window.scrollY === 0) {
        e.preventDefault();
        setPullDistance(Math.min(distance * 0.5, threshold));
      }
    };

    const handleTouchEnd = async () => {
      if (!isActive || isRefreshing) return;
      
      isActive = false;
      
      if (pullDistance >= threshold && onRefresh) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
        }
      }
      
      setPullDistance(0);
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, enablePullToRefresh, onRefresh, pullDistance, startY, isRefreshing]);

  return (
    <div className={cn('relative', className)}>
      {/* Pull to refresh indicator */}
      {isMobile && enablePullToRefresh && (
        <div 
          className={cn(
            'absolute top-0 left-0 right-0 flex items-center justify-center bg-gray-100 transition-all duration-200 z-50',
            pullDistance > 0 ? 'opacity-100' : 'opacity-0'
          )}
          style={{ 
            height: `${pullDistance}px`,
            transform: `translateY(-${Math.max(0, 100 - pullDistance)}px)`
          }}
        >
          <div className={cn(
            'transition-transform duration-200',
            isRefreshing ? 'animate-spin' : '',
            pullDistance >= 100 ? 'scale-100' : 'scale-75'
          )}>
            {isRefreshing ? (
              <div className="w-6 h-6 border-2 border-apex-red border-t-transparent rounded-full animate-spin" />
            ) : (
              <div className="text-apex-red">↓</div>
            )}
          </div>
        </div>
      )}

      {/* Main content */}
      <div 
        className={cn(
          'transition-transform duration-200',
          isMobile && pullDistance > 0 ? `translate-y-[${pullDistance}px]` : ''
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileOptimizedLayout;
