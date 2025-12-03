
import { validateImageUrl } from './imageUrlUtils';
import { COMPLETE_IMAGE_MAPPING } from './animalImageMappings';
import { CATEGORY_FALLBACKS } from './categoryFallbacks';

export const getImageWithFallbacks = async (animalId: string, category: string = 'terrestrial'): Promise<string> => {
  const mapping = COMPLETE_IMAGE_MAPPING[animalId];
  
  if (mapping) {
    // Try primary image
    if (await validateImageUrl(mapping.url)) {
      return mapping.url;
    }
  }
  
  // Use category fallback as last resort
  const categoryFallback = CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.terrestrial;
  return categoryFallback;
};
