
import React, { useState, useEffect } from 'react';
import { getAnimalImageUrl } from '@/utils/imageValidation';
import { Button } from '@/components/ui/button';

const ImageDebugger = () => {
  const [testResults, setTestResults] = useState<Record<string, any>>({});
  
  const testAnimals = [
    'great-white-shark',
    'african-lion', 
    'blue-ringed-octopus',
    'siberian-tiger',
    'grizzly-bear'
  ];

  const testImageUrl = async (animalId: string) => {
    const url = getAnimalImageUrl(animalId);
    console.log(`Testing URL for ${animalId}:`, url);
    
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const result = {
        url,
        status: response.status,
        ok: response.ok,
        contentType: response.headers.get('content-type'),
        timestamp: new Date().toISOString()
      };
      
      setTestResults(prev => ({
        ...prev,
        [animalId]: result
      }));
      
      console.log(`Result for ${animalId}:`, result);
    } catch (error) {
      const result = {
        url,
        error: error.message,
        timestamp: new Date().toISOString()
      };
      
      setTestResults(prev => ({
        ...prev,
        [animalId]: result
      }));
      
      console.error(`Error testing ${animalId}:`, error);
    }
  };

  const testAllImages = () => {
    testAnimals.forEach(testImageUrl);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Image URL Debugger</h3>
      <Button onClick={testAllImages} className="mb-4">
        Test All Image URLs
      </Button>
      
      <div className="space-y-2">
        {Object.entries(testResults).map(([animalId, result]) => (
          <div key={animalId} className="p-2 bg-white rounded border">
            <div className="font-semibold">{animalId}</div>
            <div className="text-sm text-gray-600">
              URL: <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {result.url}
              </a>
            </div>
            {result.error ? (
              <div className="text-red-500">Error: {result.error}</div>
            ) : (
              <div className={result.ok ? "text-green-500" : "text-red-500"}>
                Status: {result.status} | Content-Type: {result.contentType}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageDebugger;
