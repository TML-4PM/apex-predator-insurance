
import { COMPLETE_IMAGE_MAPPING } from './animalImageMappings';

export const getAllMappedAnimals = (): string[] => {
  return Object.keys(COMPLETE_IMAGE_MAPPING);
};

export const getBucketStats = () => {
  // Count images by domain/source
  const sources: Record<string, number> = { 'unsplash': 0, 'other': 0 };
  Object.values(COMPLETE_IMAGE_MAPPING).forEach(mapping => {
    if (mapping.url.includes('unsplash')) {
      sources['unsplash']++;
    } else {
      sources['other']++;
    }
  });
  return sources;
};
