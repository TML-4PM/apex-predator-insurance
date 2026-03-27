
import React, { useState } from 'react';
import { getFallbackImageUrl } from '@/utils/completeImageMapping';
import { ImageOff } from 'lucide-react';

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
  const [errorCount, setErrorCount] = useState(0);

  const handleError = () => {
    if (errorCount === 0) {
      // First failure: try category fallback
      const fallbackUrl = getFallbackImageUrl(category);
      setCurrentSrc(fallbackUrl);
      setErrorCount(1);
      onError?.(`Image failed: ${src}`);
    } else {
      // Fallback also failed: show "Image unavailable"
      setErrorCount(2);
    }
  };

  if (errorCount >= 2) {
    return (
      <div className={`flex flex-col items-center justify-center bg-muted text-muted-foreground ${className}`}>
        <ImageOff size={32} className="mb-2 opacity-50" />
        <span className="text-xs font-medium">Image unavailable</span>
      </div>
    );
  }

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
