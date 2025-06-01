
import React, { useState } from 'react';
import { handleImageError, getFallbackImageUrl } from '@/utils/imageValidation';

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
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    console.log(`[ImageWithFallback] Image failed to load for ${alt}:`, src);
    
    if (!hasError) {
      setHasError(true);
      const fallbackUrl = getFallbackImageUrl(category);
      console.log(`[ImageWithFallback] Using fallback for ${alt}:`, fallbackUrl);
      setCurrentSrc(fallbackUrl);
      handleImageError(event, category);
    } else {
      console.error(`[ImageWithFallback] Even fallback failed for ${alt}`);
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
