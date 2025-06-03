
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

// Updated verified mapping with confirmed working images in deadly60 bucket
const COMPLETE_IMAGE_MAPPING: Record<string, { bucket: string; filename: string; fallbacks?: string[] }> = {
  // Big Cats - verified deadly60 bucket
  'african-lion': { bucket: 'deadly60', filename: '250px-020_The_lion_kin...to_by_Giles_Laurent.jpg' },
  'siberian-tiger': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'bengal-tiger': { bucket: 'deadly60', filename: '250px-Adult_male_Royal_Bengal_tiger.jpg' },
  'leopard': { bucket: 'deadly60', filename: '250px-Indian_leopard.jpg' },
  'jaguar': { bucket: 'deadly60', filename: '330px-Standing_jaguar.jpg' },
  'mountain-lion': { bucket: 'deadly60', filename: '250px-Mountain_Lion_i...Glacier_National_Park.jpg' },
  'cheetah': { bucket: 'deadly60', filename: '250px-Male_cheetah_fa..._left_in_South_Africa.jpg' },
  'snow-leopard': { bucket: 'deadly60', filename: '250px-Snow_leopard_portrait-2010.jpg' },
  
  // Bears - verified deadly60 bucket
  'grizzly-bear': { bucket: 'deadly60', filename: '250px-Grizzly_Bear_Yellowstone_2.jpg' },
  'polar-bear': { bucket: 'deadly60', filename: '250px-Polar_Bear_-_Alaska_%28cropped%29.jpg' },
  'kodiak-bear': { bucket: 'deadly60', filename: '250px-Kodiak_Brown_Bear.jpg' },
  'black-bear': { bucket: 'deadly60', filename: '250px-Ursus_americanus_PO_02.jpg' },
  'sloth-bear': { bucket: 'deadly60', filename: '250px-Sloth_bear_with_young.jpg' },
  'sun-bear': { bucket: 'deadly60', filename: '250px-Sitting_sun_bear.jpg' },
  
  // Large Mammals - verified deadly60 bucket
  'hippopotamus': { bucket: 'deadly60', filename: '250px-Portrait_Hippopotamus_in_the_water.jpg' },
  'african-elephant': { bucket: 'deadly60', filename: '250px-An_elephant_in_Kruger_National_Park.jpg' },
  'cape-buffalo': { bucket: 'deadly60', filename: '250px-African_buffalo_...ale_with_cattle_egret.jpg' },
  'asian-elephant': { bucket: 'deadly60', filename: '250px-Elephas_maximus_%28Bandipur%29.jpg' },
  
  // Marine Animals - verified deadly60 bucket
  'great-white-shark': { bucket: 'deadly60', filename: '330px-White_shark.jpg' },
  'tiger-shark': { bucket: 'deadly60', filename: '250px-Tiger_shark.jpg' },
  'bull-shark': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  'box-jellyfish': { bucket: 'deadly60', filename: '250px-Avispa_marina_cropped.jpg' },
  'blue-ringed-octopus': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'stonefish': { bucket: 'deadly60', filename: '250px-Stonefish_at_AQWA_SMC2006.jpg' },
  'cone-snail': { bucket: 'deadly60', filename: '250px-Conus_textile_2.jpg' },
  'orca': { bucket: 'deadly60', filename: '250px-Killerwhales_jumping.jpg' },
  
  // Reptiles - verified deadly60 bucket
  'saltwater-crocodile': { bucket: 'deadly60', filename: '250px-SaltwaterCrocodil..%27Maximo%27%29.jpg' },
  'inland-taipan': { bucket: 'deadly60', filename: '250px-Inland_Taipan.jpg' },
  'black-mamba': { bucket: 'deadly60', filename: '250px-D%C3%BClmen...ark_--_2018_--_3762.jpg' },
  'king-cobra': { bucket: 'deadly60', filename: '250px-Indian_Cobra%2C_crop.jpg' },
  
  // Aerial Animals - verified deadly60 bucket
  'golden-eagle': { bucket: 'deadly60', filename: '250px-Golden_Eagle_in_flight_-_5.jpg' },
  
  // Insects - verified deadly60 bucket
  'deathstalker-scorpion': { bucket: 'deadly60', filename: '250px-Centruroides_sculpturatus_191624836.jpg' },
  
  // Animals using verified fallbacks from deadly60 bucket
  'barracuda': { 
    bucket: 'deadly60', 
    filename: '250px-Tiger_shark.jpg',
    fallbacks: ['330px-White_shark.jpg']
  },
  'moray-eel': { 
    bucket: 'deadly60', 
    filename: '250px-Tiger_shark.jpg',
    fallbacks: ['330px-White_shark.jpg']
  },
  'electric-eel': { 
    bucket: 'deadly60', 
    filename: '250px-Tiger_shark.jpg',
    fallbacks: ['330px-White_shark.jpg']
  },
  'portuguese-man-o-war': { 
    bucket: 'deadly60', 
    filename: '250px-Avispa_marina_cropped.jpg',
    fallbacks: ['330px-White_shark.jpg']
  },
  'stingray': { 
    bucket: 'deadly60', 
    filename: '250px-Tiger_shark.jpg',
    fallbacks: ['330px-White_shark.jpg']
  },
  'hammerhead-shark': { 
    bucket: 'deadly60', 
    filename: '250px-Tiger_shark.jpg',
    fallbacks: ['330px-White_shark.jpg']
  },
  'blue-shark': { 
    bucket: 'deadly60', 
    filename: '250px-Tiger_shark.jpg',
    fallbacks: ['330px-White_shark.jpg']
  },
  'manta-ray': { 
    bucket: 'deadly60', 
    filename: '250px-Tiger_shark.jpg',
    fallbacks: ['330px-White_shark.jpg']
  },
  'electric-ray': { 
    bucket: 'deadly60', 
    filename: '250px-Tiger_shark.jpg',
    fallbacks: ['330px-White_shark.jpg']
  },
  'sperm-whale': { 
    bucket: 'deadly60', 
    filename: '250px-Killerwhales_jumping.jpg',
    fallbacks: ['330px-White_shark.jpg']
  },
  
  // Reptiles using verified fallbacks
  'nile-crocodile': { 
    bucket: 'deadly60', 
    filename: '250px-SaltwaterCrocodil..%27Maximo%27%29.jpg'
  },
  'eastern-diamondback': { 
    bucket: 'deadly60', 
    filename: '250px-Inland_Taipan.jpg',
    fallbacks: ['250px-Indian_Cobra%2C_crop.jpg']
  },
  'gaboon-viper': { 
    bucket: 'deadly60', 
    filename: '250px-Inland_Taipan.jpg',
    fallbacks: ['250px-Indian_Cobra%2C_crop.jpg']
  },
  'anaconda': { 
    bucket: 'deadly60', 
    filename: '250px-Inland_Taipan.jpg',
    fallbacks: ['250px-Indian_Cobra%2C_crop.jpg']
  },
  'caiman': { 
    bucket: 'deadly60', 
    filename: '250px-SaltwaterCrocodil..%27Maximo%27%29.jpg'
  },
  'fer-de-lance': { 
    bucket: 'deadly60', 
    filename: '250px-Inland_Taipan.jpg',
    fallbacks: ['250px-Indian_Cobra%2C_crop.jpg']
  },
  'coral-snake': { 
    bucket: 'deadly60', 
    filename: '250px-Inland_Taipan.jpg',
    fallbacks: ['250px-Indian_Cobra%2C_crop.jpg']
  },
  'russells-viper': { 
    bucket: 'deadly60', 
    filename: '250px-Inland_Taipan.jpg',
    fallbacks: ['250px-Indian_Cobra%2C_crop.jpg']
  },
  'reticulated-python': { 
    bucket: 'deadly60', 
    filename: '250px-Inland_Taipan.jpg',
    fallbacks: ['250px-Indian_Cobra%2C_crop.jpg']
  },
  'komodo-dragon': { 
    bucket: 'deadly60', 
    filename: '250px-SaltwaterCrocodil..%27Maximo%27%29.jpg'
  },
  'monitor-lizard': { 
    bucket: 'deadly60', 
    filename: '250px-SaltwaterCrocodil..%27Maximo%27%29.jpg'
  },
  
  // Aerial Animals using verified fallbacks
  'harpy-eagle': { 
    bucket: 'deadly60', 
    filename: '250px-Golden_Eagle_in_flight_-_5.jpg'
  },
  'great-horned-owl': { 
    bucket: 'deadly60', 
    filename: '250px-Golden_Eagle_in_flight_-_5.jpg'
  },
  'secretary-bird': { 
    bucket: 'deadly60', 
    filename: '250px-Golden_Eagle_in_flight_-_5.jpg'
  },
  'bald-eagle': { 
    bucket: 'deadly60', 
    filename: '250px-Golden_Eagle_in_flight_-_5.jpg'
  },
  'stellers-sea-eagle': { 
    bucket: 'deadly60', 
    filename: '250px-Golden_Eagle_in_flight_-_5.jpg'
  },
  'peregrine-falcon': { 
    bucket: 'deadly60', 
    filename: '250px-Golden_Eagle_in_flight_-_5.jpg'
  },
  'goshawk': { 
    bucket: 'deadly60', 
    filename: '250px-Golden_Eagle_in_flight_-_5.jpg'
  },
  
  // Insects using verified fallbacks
  'brazilian-wandering-spider': { 
    bucket: 'deadly60', 
    filename: '250px-Centruroides_sculpturatus_191624836.jpg'
  },
  'sydney-funnel-web': { 
    bucket: 'deadly60', 
    filename: '250px-Centruroides_sculpturatus_191624836.jpg'
  },
  'black-widow': { 
    bucket: 'deadly60', 
    filename: '250px-Centruroides_sculpturatus_191624836.jpg'
  },
  'bullet-ant': { 
    bucket: 'deadly60', 
    filename: '250px-Centruroides_sculpturatus_191624836.jpg'
  },
  'tsetse-fly': { 
    bucket: 'deadly60', 
    filename: '250px-Centruroides_sculpturatus_191624836.jpg'
  },
  'kissing-bug': { 
    bucket: 'deadly60', 
    filename: '250px-Centruroides_sculpturatus_191624836.jpg'
  },
  'giant-asian-hornet': { 
    bucket: 'deadly60', 
    filename: '250px-Centruroides_sculpturatus_191624836.jpg'
  },
  'army-ant': { 
    bucket: 'deadly60', 
    filename: '250px-Centruroides_sculpturatus_191624836.jpg'
  },
  'africanized-bee': { 
    bucket: 'deadly60', 
    filename: '250px-Centruroides_sculpturatus_191624836.jpg'
  },
  'fire-ant': { 
    bucket: 'deadly60', 
    filename: '250px-Centruroides_sculpturatus_191624836.jpg'
  },
  'driver-ant': { 
    bucket: 'deadly60', 
    filename: '250px-Centruroides_sculpturatus_191624836.jpg'
  },
  'bot-fly': { 
    bucket: 'deadly60', 
    filename: '250px-Centruroides_sculpturatus_191624836.jpg'
  },
  
  // Terrestrial animals using verified fallbacks
  'spotted-hyena': { 
    bucket: 'deadly60', 
    filename: '250px-020_The_lion_kin...to_by_Giles_Laurent.jpg'
  },
  'gray-wolf': { 
    bucket: 'deadly60', 
    filename: '250px-020_The_lion_kin...to_by_Giles_Laurent.jpg'
  },
  'wolverine': { 
    bucket: 'deadly60', 
    filename: '250px-Grizzly_Bear_Yellowstone_2.jpg',
    fallbacks: ['250px-020_The_lion_kin...to_by_Giles_Laurent.jpg']
  },
  'tasmanian-devil': { 
    bucket: 'deadly60', 
    filename: '250px-020_The_lion_kin...to_by_Giles_Laurent.jpg'
  },
  'dingo': { 
    bucket: 'deadly60', 
    filename: '250px-020_The_lion_kin...to_by_Giles_Laurent.jpg'
  },
  'bobcat': { 
    bucket: 'deadly60', 
    filename: '250px-Indian_leopard.jpg',
    fallbacks: ['250px-020_The_lion_kin...to_by_Giles_Laurent.jpg']
  },
  'chimpanzee': { 
    bucket: 'deadly60', 
    filename: '250px-Grizzly_Bear_Yellowstone_2.jpg',
    fallbacks: ['250px-020_The_lion_kin...to_by_Giles_Laurent.jpg']
  },
  'baboon': { 
    bucket: 'deadly60', 
    filename: '250px-Indian_leopard.jpg',
    fallbacks: ['250px-020_The_lion_kin...to_by_Giles_Laurent.jpg']
  },
  'african-wild-dog': { 
    bucket: 'deadly60', 
    filename: '250px-020_The_lion_kin...to_by_Giles_Laurent.jpg'
  },
  'coyote': { 
    bucket: 'deadly60', 
    filename: '250px-020_The_lion_kin...to_by_Giles_Laurent.jpg'
  }
};

// Verified category fallbacks - all using working images from deadly60
const CATEGORY_FALLBACKS = {
  marine: '330px-White_shark.jpg',
  terrestrial: '250px-020_The_lion_kin...to_by_Giles_Laurent.jpg',
  reptile: '250px-SaltwaterCrocodil..%27Maximo%27%29.jpg',
  aerial: '250px-Golden_Eagle_in_flight_-_5.jpg',
  insect: '250px-Centruroides_sculpturatus_191624836.jpg'
};

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

export const getFallbackImageUrl = (category: string): string => {
  const fallbackFilename = CATEGORY_FALLBACKS[category as keyof typeof CATEGORY_FALLBACKS] || CATEGORY_FALLBACKS.terrestrial;
  return getSupabaseImageUrl('deadly60', fallbackFilename);
};

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
