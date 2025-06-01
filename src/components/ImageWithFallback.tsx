
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
    if (!hasError) {
      setHasError(true);
      const fallbackUrl = getFallbackImageUrl(category);
      setCurrentSrc(fallbackUrl);
      handleImageError(event, category);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;
