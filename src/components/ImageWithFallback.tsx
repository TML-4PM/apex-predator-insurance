
import React, { useState } from 'react';
import { getFallbackImageUrl } from '@/utils/imageValidation';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  category: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  category,
  className = '',
  loading = 'lazy'
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);

  const handleError = () => {
    console.log(`[ImageWithFallback] Image failed to load for ${alt}:`, currentSrc);
    
    if (!fallbackAttempted) {
      const fallbackUrl = getFallbackImageUrl(category);
      console.log(`[ImageWithFallback] Using fallback for ${alt}:`, fallbackUrl);
      setCurrentSrc(fallbackUrl);
      setFallbackAttempted(true);
    } else {
      console.error(`[ImageWithFallback] Even fallback failed for ${alt}, using placeholder`);
      // Use a simple data URL as final fallback
      setCurrentSrc('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+');
    }
  };

  const handleLoad = () => {
    console.log(`[ImageWithFallback] Image loaded successfully for ${alt}:`, currentSrc);
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
};

export default ImageWithFallback;
