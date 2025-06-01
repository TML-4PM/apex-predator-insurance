
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getAnimalImageUrl, getFallbackImageUrl } from '@/utils/imageValidation';

export const useAnimalImages = () => {
  const [imageCache, setImageCache] = useState<Record<string, string>>({});

  const getValidatedImageUrl = async (animalId: string, category: string): Promise<string> => {
    // Check cache first
    if (imageCache[animalId]) {
      console.log(`[Image Cache] Using cached URL for ${animalId}:`, imageCache[animalId]);
      return imageCache[animalId];
    }

    try {
      // Try to get the image from the deadly60 bucket first
      const deadly60Url = getAnimalImageUrl(animalId);
      console.log(`[Image Debug] Testing URL for ${animalId}:`, deadly60Url);
      
      // Verify the image exists by attempting to fetch it
      const response = await fetch(deadly60Url, { method: 'HEAD' });
      console.log(`[Image Debug] Response for ${animalId}:`, response.status, response.ok);
      
      if (response.ok) {
        console.log(`[Image Success] Using deadly60 image for ${animalId}`);
        setImageCache(prev => ({ ...prev, [animalId]: deadly60Url }));
        return deadly60Url;
      } else {
        console.warn(`[Image Failed] Deadly60 image failed for ${animalId}, status:`, response.status);
      }
    } catch (error) {
      console.warn(`[Image Error] Failed to load image for ${animalId} from deadly60 bucket:`, error);
    }

    // Fall back to category default
    const fallbackUrl = getFallbackImageUrl(category);
    console.log(`[Image Fallback] Using fallback for ${animalId}:`, fallbackUrl);
    setImageCache(prev => ({ ...prev, [animalId]: fallbackUrl }));
    return fallbackUrl;
  };

  const uploadAnimalImage = async (animalId: string, file: File): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from('deadly60')
        .upload(`${animalId}.jpg`, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (!error) {
        // Update cache with new URL
        const newUrl = getAnimalImageUrl(animalId);
        setImageCache(prev => ({ ...prev, [animalId]: newUrl }));
        return true;
      }
    } catch (error) {
      console.error(`Failed to upload image for ${animalId}:`, error);
    }
    return false;
  };

  return {
    getValidatedImageUrl,
    uploadAnimalImage,
    imageCache
  };
};
