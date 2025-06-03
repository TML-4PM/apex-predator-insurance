
import { SUPABASE_URL } from '@/constants/auditConstants';

export interface ImageTestResult {
  url: string;
  name: string;
  isWorking: boolean;
  loadTime: number;
  error?: string;
  bucket?: string;
}

export const testImageWithDetails = async (imageUrl: string, animalName: string): Promise<ImageTestResult> => {
  const startTime = performance.now();
  
  return new Promise((resolve) => {
    const img = new Image();
    const timeout = setTimeout(() => {
      const endTime = performance.now();
      resolve({
        url: imageUrl,
        name: animalName,
        isWorking: false,
        loadTime: Math.round(endTime - startTime),
        error: 'Timeout (5s)',
        bucket: getBucketFromUrl(imageUrl)
      });
    }, 5000);
    
    img.onload = () => {
      clearTimeout(timeout);
      const endTime = performance.now();
      resolve({
        url: imageUrl,
        name: animalName,
        isWorking: true,
        loadTime: Math.round(endTime - startTime),
        bucket: getBucketFromUrl(imageUrl)
      });
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      const endTime = performance.now();
      resolve({
        url: imageUrl,
        name: animalName,
        isWorking: false,
        loadTime: Math.round(endTime - startTime),
        error: 'Failed to load',
        bucket: getBucketFromUrl(imageUrl)
      });
    };
    
    img.src = imageUrl;
  });
};

export const getBucketFromUrl = (url: string): string => {
  if (url.includes('/deadly60/')) return 'deadly60';
  if (url.includes('/animal-images/')) return 'animal-images';
  if (url.includes('/spotto-images/')) return 'spotto-images';
  if (url.includes('/gallery-images/')) return 'gallery-images';
  return 'unknown';
};

export const testBucketAccess = async (bucketName: string): Promise<boolean> => {
  try {
    const testUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucketName}/test.jpg`;
    const response = await fetch(testUrl, { method: 'HEAD' });
    // Even a 404 means the bucket is accessible, just the file doesn't exist
    return response.status !== 403 && response.status !== 401;
  } catch {
    return false;
  }
};
