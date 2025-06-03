
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { verifyAllMappings, BucketVerificationResult } from '@/services/bucketVerificationService';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const BucketVerificationResults = () => {
  const [results, setResults] = useState<BucketVerificationResult[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);

  const runVerification = async () => {
    setIsVerifying(true);
    try {
      const verificationResults = await verifyAllMappings();
      setResults(verificationResults);
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const workingCount = results.filter(r => r.exists).length;
  const totalCount = results.length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Deadly60 Bucket Verification
          <Button onClick={runVerification} disabled={isVerifying}>
            {isVerifying ? 'Verifying...' : 'Verify Images'}
          </Button>
        </CardTitle>
        {results.length > 0 && (
          <div className="flex gap-2">
            <Badge variant={workingCount === totalCount ? 'default' : 'secondary'}>
              {workingCount}/{totalCount} Working
            </Badge>
            <Badge variant="outline">
              Avg: {Math.round(results.reduce((sum, r) => sum + r.loadTime, 0) / results.length)}ms
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((result, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  {result.exists ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm font-medium truncate">
                    {result.filename.substring(0, 30)}...
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {result.loadTime}ms
                  {result.error && (
                    <Badge variant="destructive" className="text-xs">
                      {result.error}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {results.length === 0 && !isVerifying && (
          <p className="text-gray-500 text-center py-4">
            Click "Verify Images" to test deadly60 bucket image availability
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default BucketVerificationResults;
