
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface AuditResult {
  id: string;
  name: string;
  status: 'success' | 'error' | 'warning';
  imageUrl: string;
  fallbackUrl?: string;
  message: string;
}

interface AuditResultCardProps {
  result: AuditResult;
}

const AuditResultCard = ({ result }: AuditResultCardProps) => {
  const getStatusIcon = () => {
    switch (result.status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (result.status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span>{result.name}</span>
          <Badge className={getStatusColor()}>
            {getStatusIcon()}
            <span className="ml-1 capitalize">{result.status}</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="aspect-square w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={result.imageUrl}
              alt={result.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                if (result.fallbackUrl) {
                  (e.target as HTMLImageElement).src = result.fallbackUrl;
                }
              }}
            />
          </div>
          <p className="text-sm text-gray-600">{result.message}</p>
          <div className="text-xs text-gray-400 break-all">
            {result.imageUrl}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuditResultCard;
