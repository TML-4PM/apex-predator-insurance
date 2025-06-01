
import { useState, useEffect } from 'react';
import { getAnimalImageUrl } from '@/utils/imageValidation';
import { deadlyAnimals } from '@/data/animalUtils';

export interface ImageTestResult {
  animalId: string;
  name: string;
  category: string;
  url: string;
  status: 'loading' | 'success' | 'error' | 'fallback';
  loadTime?: number;
  error?: string;
}

export const useImageAudit = () => {
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

  const updateResult = (animalId: string, updates: Partial<ImageTestResult>) => {
    setResults(prev => ({
      ...prev,
      [animalId]: {
        ...prev[animalId],
        ...updates
      }
    }));
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

  return {
    results,
    isRunning,
    summary,
    runAudit,
    updateResult
  };
};
