
import React, { useState, useEffect } from 'react';
import { getAnimalImageUrl } from '@/utils/imageValidation';
import { deadlyAnimals } from '@/data/animalUtils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface ImageTestResult {
  animalId: string;
  name: string;
  category: string;
  url: string;
  status: 'loading' | 'success' | 'error' | 'fallback';
  loadTime?: number;
  error?: string;
}

const ImageAuditTool = () => {
  const [results, setResults] = useState<Record<string, ImageTestResult>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [summary, setSummary] = useState({
    total: 0,
    success: 0,
    error: 0,
    fallback: 0
  });

  const testImageUrl = async (animalId: string, name: string, category: string): Promise<ImageTestResult> => {
    const url = getAnimalImageUrl(animalId);
    const startTime = Date.now();
    
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const loadTime = Date.now() - startTime;
      
      if (response.ok) {
        return {
          animalId,
          name,
          category,
          url,
          status: url.includes('unsplash.com') ? 'fallback' : 'success',
          loadTime
        };
      } else {
        return {
          animalId,
          name,
          category,
          url,
          status: 'error',
          loadTime,
          error: `HTTP ${response.status}`
        };
      }
    } catch (error) {
      return {
        animalId,
        name,
        category,
        url,
        status: 'error',
        loadTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  const runAudit = async () => {
    setIsRunning(true);
    setResults({});
    
    console.log(`[Image Audit] Starting audit of ${deadlyAnimals.length} animals`);
    
    // Initialize results with loading state
    const initialResults: Record<string, ImageTestResult> = {};
    deadlyAnimals.forEach(animal => {
      initialResults[animal.id] = {
        animalId: animal.id,
        name: animal.name,
        category: animal.category,
        url: getAnimalImageUrl(animal.id),
        status: 'loading'
      };
    });
    setResults(initialResults);
    
    // Test images in batches to avoid overwhelming the server
    const batchSize = 10;
    const batches = [];
    for (let i = 0; i < deadlyAnimals.length; i += batchSize) {
      batches.push(deadlyAnimals.slice(i, i + batchSize));
    }
    
    for (const batch of batches) {
      const batchPromises = batch.map(animal => 
        testImageUrl(animal.id, animal.name, animal.category)
      );
      
      const batchResults = await Promise.all(batchPromises);
      
      setResults(prev => {
        const updated = { ...prev };
        batchResults.forEach(result => {
          updated[result.animalId] = result;
        });
        return updated;
      });
      
      // Small delay between batches
      if (batches.indexOf(batch) < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    setIsRunning(false);
  };

  useEffect(() => {
    const resultArray = Object.values(results);
    setSummary({
      total: resultArray.length,
      success: resultArray.filter(r => r.status === 'success').length,
      error: resultArray.filter(r => r.status === 'error').length,
      fallback: resultArray.filter(r => r.status === 'fallback').length
    });
  }, [results]);

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

  const resultArray = Object.values(results).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Image Audit Tool</h2>
        <p className="text-gray-600 mb-4">
          Test all {deadlyAnimals.length} animal images to ensure proper display and identify issues.
        </p>
        
        <div className="flex items-center gap-4 mb-4">
          <Button 
            onClick={runAudit} 
            disabled={isRunning}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isRunning ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Running Audit...
              </>
            ) : (
              'Start Image Audit'
            )}
          </Button>
          
          {summary.total > 0 && (
            <div className="flex gap-4 text-sm">
              <span className="text-green-600">✓ {summary.success} Success</span>
              <span className="text-yellow-600">⚠ {summary.fallback} Fallback</span>
              <span className="text-red-600">✗ {summary.error} Error</span>
            </div>
          )}
        </div>
      </div>

      {resultArray.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {resultArray.map((result) => (
            <Card key={result.animalId} className="p-4">
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
                  onError={() => {
                    setResults(prev => ({
                      ...prev,
                      [result.animalId]: {
                        ...prev[result.animalId],
                        status: 'error',
                        error: 'Failed to load'
                      }
                    }));
                  }}
                  onLoad={() => {
                    if (result.status === 'loading') {
                      setResults(prev => ({
                        ...prev,
                        [result.animalId]: {
                          ...prev[result.animalId],
                          status: result.url.includes('unsplash.com') ? 'fallback' : 'success'
                        }
                      }));
                    }
                  }}
                />
              </div>
              
              <div className="text-xs text-gray-500 break-all">
                {result.url.split('/').pop()}
              </div>
              
              {result.error && (
                <p className="text-xs text-red-600 mt-1">{result.error}</p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageAuditTool;
