
import { COMPLETE_IMAGE_MAPPING } from './animalImageMappings';

export const getAllMappedAnimals = (): string[] => {
  return Object.keys(COMPLETE_IMAGE_MAPPING);
};

export const getBucketStats = () => {
  const buckets: Record<string, number> = {};
  Object.values(COMPLETE_IMAGE_MAPPING).forEach(mapping => {
    buckets[mapping.bucket] = (buckets[mapping.bucket] || 0) + 1;
  });
  return buckets;
};
