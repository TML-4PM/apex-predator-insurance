
import React from 'react';
import AuditResultCard from './AuditResultCard';
import { ImageTestResult } from '@/hooks/useImageAudit';

interface AuditResultsGridProps {
  results: Record<string, ImageTestResult>;
  onUpdateResult: (animalId: string, updates: Partial<ImageTestResult>) => void;
}

const AuditResultsGrid = ({ results, onUpdateResult }: AuditResultsGridProps) => {
  const resultArray = Object.values(results).sort((a, b) => a.name.localeCompare(b.name));

  const handleImageError = (animalId: string) => {
    onUpdateResult(animalId, {
      status: 'error',
      error: 'Failed to load'
    });
  };

  const handleImageLoad = (animalId: string) => {
    const result = results[animalId];
    if (result.status === 'loading') {
      onUpdateResult(animalId, {
        status: result.url.includes('unsplash.com') ? 'fallback' : 'success'
      });
    }
  };

  if (resultArray.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {resultArray.map((result) => (
        <AuditResultCard
          key={result.animalId}
          result={result}
          onImageError={handleImageError}
          onImageLoad={handleImageLoad}
        />
      ))}
    </div>
  );
};

export default AuditResultsGrid;
