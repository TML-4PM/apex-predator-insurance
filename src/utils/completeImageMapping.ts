
// Re-export everything from the modular files to maintain compatibility
export { validateImageUrl, getSupabaseImageUrl } from './imageUrlUtils';
export { CATEGORY_FALLBACKS } from './categoryFallbacks';
export { COMPLETE_IMAGE_MAPPING } from './animalImageMappings';
export { getImageWithFallbacks } from './imageValidation';
export { getAllMappedAnimals, getBucketStats } from './imageMappingStats';

// Main functions that use the imported modules
import { getSupabaseImageUrl } from './imageUrlUtils';
import { COMPLETE_IMAGE_MAPPING } from './animalImageMappings';
import { CATEGORY_FALLBACKS } from './categoryFallbacks';

export const getCompleteAnimalImageUrl = (animalId: string, category: string = 'terrestrial'): string => {
  const mapping = COMPLETE_IMAGE_MAPPING[animalId];
  
  if (mapping) {
    console.log(`[CompleteImageMapping] Found mapping for ${animalId}: ${mapping.filename} (deadly60 bucket)`);
    return getSupabaseImageUrl(mapping.bucket, mapping.filename);
  }
  
  // If no mapping found, use category fallback with deadly60 bucket
  console.warn(`[CompleteImageMapping] No mapping found for ${animalId}, using category fallback (deadly60 bucket)`);
  const fallbackFilename = CATEGORY_FALLBACKS[category as keyof typeof CATEGORY_FALLBACKS] || CATEGORY_FALLBACKS.terrestrial;
  return getSupabaseImageUrl('deadly60', fallbackFilename);
};

export const getFallbackImageUrl = (category: string): string => {
  const fallbackFilename = CATEGORY_FALLBACKS[category as keyof typeof CATEGORY_FALLBACKS] || CATEGORY_FALLBACKS.terrestrial;
  return getSupabaseImageUrl('deadly60', fallbackFilename);
};
