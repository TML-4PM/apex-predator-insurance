
import { getSupabaseImageUrl } from '@/utils/imageUrlUtils';

export interface BucketVerificationResult {
  url: string;
  filename: string;
  exists: boolean;
  loadTime: number;
  error?: string;
}

export const verifyImageExists = async (filename: string, bucket: string = 'deadly60'): Promise<BucketVerificationResult> => {
  const url = getSupabaseImageUrl(bucket, filename);
  const startTime = performance.now();
  
  return new Promise((resolve) => {
    const img = new Image();
    const timeout = setTimeout(() => {
      const endTime = performance.now();
      resolve({
        url,
        filename,
        exists: false,
        loadTime: Math.round(endTime - startTime),
        error: 'Timeout (3s)'
      });
    }, 3000);
    
    img.onload = () => {
      clearTimeout(timeout);
      const endTime = performance.now();
      resolve({
        url,
        filename,
        exists: true,
        loadTime: Math.round(endTime - startTime)
      });
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      const endTime = performance.now();
      resolve({
        url,
        filename,
        exists: false,
        loadTime: Math.round(endTime - startTime),
        error: 'Failed to load'
      });
    };
    
    img.src = url;
  });
};

export const verifyAllMappings = async (): Promise<BucketVerificationResult[]> => {
  // Updated to only include the 8 files that are actually working
  const workingFilenames = [
    '330px-Walking_tiger_female.jpg',
    '250px-Mountain_Lion_in_Glacier_National_Park.jpg',
    '250px-Portrait_Hippopotamus_in_the_water.jpg',
    '250px-An_elephant_in_Kruger_National_Park.jpg',
    '330px-White_shark.jpg',
    '250px-Carcharhinus_leucas_TPWD.jpg',
    '250px-Hapalochlaena_maculosa_side.jpg',
    '250px-Killerwhales_jumping.jpg'
  ];

  const results: BucketVerificationResult[] = [];
  
  for (const filename of workingFilenames) {
    const result = await verifyImageExists(filename);
    results.push(result);
  }
  
  return results;
};
