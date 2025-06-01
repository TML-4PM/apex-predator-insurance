
import React from 'react';
import AuditResultCard from './AuditResultCard';

interface AuditResult {
  id: string;
  name: string;
  status: 'success' | 'error' | 'warning';
  imageUrl: string;
  fallbackUrl?: string;
  message: string;
}

interface AuditResultsGridProps {
  results: AuditResult[];
  isLoading?: boolean;
}

const AuditResultsGrid = ({ results, isLoading = false }: AuditResultsGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 animate-pulse rounded-lg h-64"
          />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No audit results available</div>
        <div className="text-gray-400 text-sm mt-2">
          Run an audit to see results here
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((result) => (
        <AuditResultCard key={result.id} result={result} />
      ))}
    </div>
  );
};

export default AuditResultsGrid;
