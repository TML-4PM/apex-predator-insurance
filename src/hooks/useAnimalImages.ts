
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getAnimalImageUrl, getFallbackImageUrl } from '@/utils/imageValidation';

export const useAnimalImages = () => {
  const [imageCache, setImageCache] = useState<Record<string, string>>({});

  const getValidatedImageUrl = async (animalId: string, category: string): Promise<string> => {
    // Check cache first
    if (imageCache[animalId]) {
      return imageCache[animalId];
    }

    try {
      // Try to get the image from Supabase storage
      const supabaseUrl = getAnimalImageUrl(animalId);
      
      // Verify the image exists
      const { data, error } = await supabase.storage
        .from('animal-images')
        .list('', { search: `${animalId}.jpg` });

      if (!error && data && data.length > 0) {
        setImageCache(prev => ({ ...prev, [animalId]: supabaseUrl }));
        return supabaseUrl;
      }
    } catch (error) {
      console.warn(`Failed to load image for ${animalId}:`, error);
    }

    // Fall back to category default
    const fallbackUrl = getFallbackImageUrl(category);
    setImageCache(prev => ({ ...prev, [animalId]: fallbackUrl }));
    return fallbackUrl;
  };

  const uploadAnimalImage = async (animalId: string, file: File): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from('animal-images')
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
