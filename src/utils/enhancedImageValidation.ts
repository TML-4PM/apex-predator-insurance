
export const validateImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok && response.headers.get('content-type')?.startsWith('image/');
  } catch {
    return false;
  }
};

export const getSupabaseImageUrl = (bucket: string, path: string): string => {
  return `https://pflisxkcxbzboxwidywf.supabase.co/storage/v1/object/public/${bucket}/${path}`;
};

// Enhanced mapping with better organization
const VERIFIED_IMAGE_MAPPING: Record<string, { bucket: string; filename: string }> = {
  // Big Cats - deadly60 bucket
  'african-lion': { bucket: 'deadly60', filename: '250px-020_The_lion_kin...to_by_Giles_Laurent.jpg' },
  'siberian-tiger': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'bengal-tiger': { bucket: 'deadly60', filename: '250px-Adult_male_Royal_Bengal_tiger.jpg' },
  'leopard': { bucket: 'deadly60', filename: '250px-Indian_leopard.jpg' },
  'jaguar': { bucket: 'deadly60', filename: '330px-Standing_jaguar.jpg' },
  'mountain-lion': { bucket: 'deadly60', filename: '250px-Mountain_Lion_i...Glacier_National_Park.jpg' },
  'cheetah': { bucket: 'deadly60', filename: '250px-Male_cheetah_fa..._left_in_South_Africa.jpg' },
  'snow-leopard': { bucket: 'deadly60', filename: '250px-Snow_leopard_portrait-2010.jpg' },
  
  // Bears - deadly60 bucket
  'grizzly-bear': { bucket: 'deadly60', filename: '250px-Grizzly_Bear_Yellowstone_2.jpg' },
  'polar-bear': { bucket: 'deadly60', filename: '250px-Polar_Bear_-_Alaska_%28cropped%29.jpg' },
  'kodiak-bear': { bucket: 'deadly60', filename: '250px-Kodiak_Brown_Bear.jpg' },
  'black-bear': { bucket: 'deadly60', filename: '250px-Ursus_americanus_PO_02.jpg' },
  'sloth-bear': { bucket: 'deadly60', filename: '250px-Sloth_bear_with_young.jpg' },
  'sun-bear': { bucket: 'deadly60', filename: '250px-Sitting_sun_bear.jpg' },
  
  // Marine Animals - deadly60 bucket
  'great-white-shark': { bucket: 'deadly60', filename: '330px-White_shark.jpg' },
  'tiger-shark': { bucket: 'deadly60', filename: '250px-Tiger_shark.jpg' },
  'bull-shark': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  'box-jellyfish': { bucket: 'deadly60', filename: '250px-Avispa_marina_cropped.jpg' },
  'blue-ringed-octopus': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'stonefish': { bucket: 'deadly60', filename: '250px-Stonefish_at_AQWA_SMC2006.jpg' },
  'cone-snail': { bucket: 'deadly60', filename: '250px-Conus_textile_2.jpg' },
  'orca': { bucket: 'deadly60', filename: '250px-Killerwhales_jumping.jpg' },
  
  // Large Mammals - deadly60 bucket  
  'hippopotamus': { bucket: 'deadly60', filename: '250px-Portrait_Hippopotamus_in_the_water.jpg' },
  'african-elephant': { bucket: 'deadly60', filename: '250px-An_elephant_in_Kruger_National_Park.jpg' },
  'cape-buffalo': { bucket: 'deadly60', filename: '250px-African_buffalo_...ale_with_cattle_egret.jpg' },
  'asian-elephant': { bucket: 'deadly60', filename: '250px-Elephas_maximus_%28Bandipur%29.jpg' }
};

export const getEnhancedAnimalImageUrl = (animalId: string): string => {
  const mapping = VERIFIED_IMAGE_MAPPING[animalId];
  
  if (mapping) {
    console.log(`[ImageMapping] Found verified mapping for ${animalId}:`, mapping);
    return getSupabaseImageUrl(mapping.bucket, mapping.filename);
  }
  
  // Fallback to original mapping for unmapped animals
  console.warn(`[ImageMapping] No verified mapping found for animal: ${animalId}, using fallback`);
  return getSupabaseImageUrl('deadly60', `${animalId}.jpg`);
};

export const getFallbackImageUrl = (category: string): string => {
  const fallbacks = {
    marine: getSupabaseImageUrl('deadly60', '330px-White_shark.jpg'),
    terrestrial: getSupabaseImageUrl('deadly60', '250px-020_The_lion_kin...to_by_Giles_Laurent.jpg'),
    reptile: getSupabaseImageUrl('deadly60', '250px-SaltwaterCrocodil..%27Maximo%27%29.jpg'),
    aerial: getSupabaseImageUrl('deadly60', '250px-Golden_Eagle_in_flight_-_5.jpg'),
    insect: getSupabaseImageUrl('deadly60', '250px-Centruroides_sculpturatus_191624836.jpg')
  };
  
  return fallbacks[category as keyof typeof fallbacks] || fallbacks.terrestrial;
};

// Test all bucket accessibility
export const testAllBuckets = async (): Promise<Record<string, boolean>> => {
  const buckets = ['deadly60', 'animal-images', 'spotto-images', 'gallery-images'];
  const results: Record<string, boolean> = {};
  
  for (const bucket of buckets) {
    try {
      const testUrl = getSupabaseImageUrl(bucket, 'test.jpg');
      const response = await fetch(testUrl, { method: 'HEAD' });
      results[bucket] = response.status !== 403 && response.status !== 401;
    } catch {
      results[bucket] = false;
    }
  }
  
  return results;
};

export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement>,
  category: string
) => {
  const target = event.target as HTMLImageElement;
  if (!target.src.includes('supabase.co') && !target.src.includes('data:image')) {
    target.src = getFallbackImageUrl(category);
  }
};
