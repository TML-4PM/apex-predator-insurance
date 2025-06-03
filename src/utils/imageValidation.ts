
import { validateImageUrl } from './imageUrlUtils';
import { getSupabaseImageUrl } from './imageUrlUtils';
import { COMPLETE_IMAGE_MAPPING } from './animalImageMappings';
import { CATEGORY_FALLBACKS } from './categoryFallbacks';

export const getImageWithFallbacks = async (animalId: string, category: string = 'terrestrial'): Promise<string> => {
  const mapping = COMPLETE_IMAGE_MAPPING[animalId];
  
  if (mapping) {
    // Try primary image from deadly60 bucket
    const primaryUrl = getSupabaseImageUrl(mapping.bucket, mapping.filename);
    if (await validateImageUrl(primaryUrl)) {
      return primaryUrl;
    }
    
    // Try fallbacks if specified (all from deadly60 bucket)
    if (mapping.fallbacks) {
      for (const fallback of mapping.fallbacks) {
        const fallbackUrl = getSupabaseImageUrl('deadly60', fallback);
        if (await validateImageUrl(fallbackUrl)) {
          console.log(`[CompleteImageMapping] Using fallback for ${animalId}: ${fallback} (deadly60 bucket)`);
          return fallbackUrl;
        }
      }
    }
  }
  
  // Use category fallback as last resort (deadly60 bucket)
  const categoryFallback = CATEGORY_FALLBACKS[category as keyof typeof CATEGORY_FALLBACKS] || CATEGORY_FALLBACKS.terrestrial;
  return getSupabaseImageUrl('deadly60', categoryFallback);
};
