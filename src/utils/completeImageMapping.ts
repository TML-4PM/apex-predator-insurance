
// Re-export everything from the modular files to maintain compatibility
export { validateImageUrl } from './imageUrlUtils';
export { CATEGORY_FALLBACKS } from './categoryFallbacks';
export { COMPLETE_IMAGE_MAPPING } from './animalImageMappings';
export { getImageWithFallbacks } from './imageValidation';
export { getAllMappedAnimals, getBucketStats } from './imageMappingStats';

// Main functions that use the imported modules
import { COMPLETE_IMAGE_MAPPING } from './animalImageMappings';
import { CATEGORY_FALLBACKS } from './categoryFallbacks';

export const getCompleteAnimalImageUrl = (animalId: string, category: string = 'terrestrial'): string => {
  const mapping = COMPLETE_IMAGE_MAPPING[animalId];
  
  if (mapping) {
    return mapping.url;
  }
  
  // If no mapping found, use category fallback
  return CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.terrestrial;
};

export const getFallbackImageUrl = (category: string): string => {
  return CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.terrestrial;
};

// Helper to get Supabase URL (kept for compatibility, but using external images now)
export const getSupabaseImageUrl = (bucket: string, path: string): string => {
  return `https://pflisxkcxbzboxwidywf.supabase.co/storage/v1/object/public/${bucket}/${path}`;
};
