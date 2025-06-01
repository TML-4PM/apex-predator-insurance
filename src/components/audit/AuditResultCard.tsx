
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { ImageTestResult } from '@/hooks/useImageAudit';

interface AuditResultCardProps {
  result: ImageTestResult;
  onImageError: (animalId: string) => void;
  onImageLoad: (animalId: string) => void;
}

const AuditResultCard = ({ result, onImageError, onImageLoad }: AuditResultCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'fallback':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'fallback':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate">{result.name}</h3>
          <p className="text-xs text-gray-500">{result.category}</p>
        </div>
        {getStatusIcon(result.status)}
      </div>
      
      <div className="mb-2">
        <Badge className={getStatusColor(result.status)}>
          {result.status.toUpperCase()}
        </Badge>
        {result.loadTime && (
          <span className="text-xs text-gray-500 ml-2">
            {result.loadTime}ms
          </span>
        )}
      </div>
      
      <div className="aspect-square bg-gray-100 rounded overflow-hidden mb-2">
        <img
          src={result.url}
          alt={result.name}
          className="w-full h-full object-cover"
          onError={() => onImageError(result.animalId)}
          onLoad={() => onImageLoad(result.animalId)}
        />
      </div>
      
      <div className="text-xs text-gray-500 break-all">
        {result.url.split('/').pop()}
      </div>
      
      {result.error && (
        <p className="text-xs text-red-600 mt-1">{result.error}</p>
      )}
    </Card>
  );
};

export default AuditResultCard;
