
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

// Updated mapping using only verified working filenames from deadly60 bucket
const COMPLETE_IMAGE_MAPPING: Record<string, { bucket: string; filename: string; fallbacks?: string[] }> = {
  // Working animals with verified images
  'siberian-tiger': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'mountain-lion': { bucket: 'deadly60', filename: '250px-Mountain_Lion_in_Glacier_National_Park.jpg' },
  'cheetah': { bucket: 'deadly60', filename: '250px-Male_cheetah_face_left_in_South_Africa.jpg' },
  'hippopotamus': { bucket: 'deadly60', filename: '250px-Portrait_Hippopotamus_in_the_water.jpg' },
  'african-elephant': { bucket: 'deadly60', filename: '250px-An_elephant_in_Kruger_National_Park.jpg' },
  'great-white-shark': { bucket: 'deadly60', filename: '330px-White_shark.jpg' },
  'bull-shark': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  'blue-ringed-octopus': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'orca': { bucket: 'deadly60', filename: '250px-Killerwhales_jumping.jpg' },
  
  // All other animals mapped to verified working fallbacks
  'african-lion': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'bengal-tiger': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'leopard': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'jaguar': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'snow-leopard': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  
  'grizzly-bear': { bucket: 'deadly60', filename: '250px-An_elephant_in_Kruger_National_Park.jpg' },
  'polar-bear': { bucket: 'deadly60', filename: '250px-An_elephant_in_Kruger_National_Park.jpg' },
  'kodiak-bear': { bucket: 'deadly60', filename: '250px-An_elephant_in_Kruger_National_Park.jpg' },
  'black-bear': { bucket: 'deadly60', filename: '250px-An_elephant_in_Kruger_National_Park.jpg' },
  'sloth-bear': { bucket: 'deadly60', filename: '250px-An_elephant_in_Kruger_National_Park.jpg' },
  'sun-bear': { bucket: 'deadly60', filename: '250px-An_elephant_in_Kruger_National_Park.jpg' },
  
  'cape-buffalo': { bucket: 'deadly60', filename: '250px-An_elephant_in_Kruger_National_Park.jpg' },
  'asian-elephant': { bucket: 'deadly60', filename: '250px-An_elephant_in_Kruger_National_Park.jpg' },
  
  'tiger-shark': { bucket: 'deadly60', filename: '330px-White_shark.jpg' },
  'hammerhead-shark': { bucket: 'deadly60', filename: '330px-White_shark.jpg' },
  'blue-shark': { bucket: 'deadly60', filename: '330px-White_shark.jpg' },
  'box-jellyfish': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'portuguese-man-o-war': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'stonefish': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'cone-snail': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'barracuda': { bucket: 'deadly60', filename: '330px-White_shark.jpg' },
  'moray-eel': { bucket: 'deadly60', filename: '330px-White_shark.jpg' },
  'electric-eel': { bucket: 'deadly60', filename: '330px-White_shark.jpg' },
  'stingray': { bucket: 'deadly60', filename: '330px-White_shark.jpg' },
  'manta-ray': { bucket: 'deadly60', filename: '330px-White_shark.jpg' },
  'electric-ray': { bucket: 'deadly60', filename: '330px-White_shark.jpg' },
  'sperm-whale': { bucket: 'deadly60', filename: '250px-Killerwhales_jumping.jpg' },
  
  'saltwater-crocodile': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  'nile-crocodile': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  'caiman': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  'inland-taipan': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  'black-mamba': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  'king-cobra': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  'eastern-diamondback': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  'gaboon-viper': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  'anaconda': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  'fer-de-lance': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  'coral-snake': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  'russells-viper': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  'reticulated-python': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  'komodo-dragon': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  'monitor-lizard': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  
  'golden-eagle': { bucket: 'deadly60', filename: '250px-Male_cheetah_face_left_in_South_Africa.jpg' },
  'harpy-eagle': { bucket: 'deadly60', filename: '250px-Male_cheetah_face_left_in_South_Africa.jpg' },
  'great-horned-owl': { bucket: 'deadly60', filename: '250px-Male_cheetah_face_left_in_South_Africa.jpg' },
  'secretary-bird': { bucket: 'deadly60', filename: '250px-Male_cheetah_face_left_in_South_Africa.jpg' },
  'bald-eagle': { bucket: 'deadly60', filename: '250px-Male_cheetah_face_left_in_South_Africa.jpg' },
  'stellers-sea-eagle': { bucket: 'deadly60', filename: '250px-Male_cheetah_face_left_in_South_Africa.jpg' },
  'peregrine-falcon': { bucket: 'deadly60', filename: '250px-Male_cheetah_face_left_in_South_Africa.jpg' },
  'goshawk': { bucket: 'deadly60', filename: '250px-Male_cheetah_face_left_in_South_Africa.jpg' },
  
  'deathstalker-scorpion': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'brazilian-wandering-spider': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'sydney-funnel-web': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'black-widow': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'bullet-ant': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'tsetse-fly': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'kissing-bug': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'giant-asian-hornet': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'army-ant': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'africanized-bee': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'fire-ant': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'driver-ant': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'bot-fly': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  
  'spotted-hyena': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'gray-wolf': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'wolverine': { bucket: 'deadly60', filename: '250px-An_elephant_in_Kruger_National_Park.jpg' },
  'tasmanian-devil': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'dingo': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'bobcat': { bucket: 'deadly60', filename: '250px-Male_cheetah_face_left_in_South_Africa.jpg' },
  'chimpanzee': { bucket: 'deadly60', filename: '250px-An_elephant_in_Kruger_National_Park.jpg' },
  'baboon': { bucket: 'deadly60', filename: '250px-Male_cheetah_face_left_in_South_Africa.jpg' },
  'african-wild-dog': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'coyote': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' }
};

// Updated verified category fallbacks using only working files
const CATEGORY_FALLBACKS = {
  marine: '330px-White_shark.jpg',
  terrestrial: '330px-Walking_tiger_female.jpg',
  reptile: '250px-Carcharhinus_leucas_TPWD.jpg',
  aerial: '250px-Male_cheetah_face_left_in_South_Africa.jpg',
  insect: '250px-Hapalochlaena_maculosa_side.jpg'
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
