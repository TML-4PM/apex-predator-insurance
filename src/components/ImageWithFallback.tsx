
import React, { useState } from 'react';
import { getFallbackImageUrl } from '@/utils/enhancedImageValidation';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  category: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onError?: (error: string) => void;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  category,
  className = '',
  loading = 'lazy',
  onError
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loadTime, setLoadTime] = useState<number | null>(null);

  const handleError = () => {
    const errorMsg = `Image failed to load: ${currentSrc}`;
    console.log(`[ImageWithFallback] ${errorMsg}`);
    
    if (!fallbackAttempted && !hasError) {
      const fallbackUrl = getFallbackImageUrl(category);
      console.log(`[ImageWithFallback] Using category fallback for ${alt}:`, fallbackUrl);
      setCurrentSrc(fallbackUrl);
      setFallbackAttempted(true);
      onError?.(errorMsg);
    } else if (!hasError) {
      console.error(`[ImageWithFallback] All fallbacks failed for ${alt}, using placeholder`);
      setHasError(true);
      onError?.('All fallbacks failed');
      // Use a simple data URL as final fallback
      setCurrentSrc('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+');
    }
  };

  const handleLoad = () => {
    if (!hasError) {
      const endTime = performance.now();
      if (loadTime === null) {
        setLoadTime(endTime);
      }
      console.log(`[ImageWithFallback] Image loaded successfully for ${alt}:`, currentSrc);
    }
  };

  const handleLoadStart = () => {
    if (loadTime === null) {
      setLoadTime(performance.now());
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
      onLoad={handleLoad}
      onLoadStart={handleLoadStart}
    />
  );
};

export default ImageWithFallback;
