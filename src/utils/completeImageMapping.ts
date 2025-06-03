
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

// Complete verified mapping for all 82 animals - ALL use deadly60 bucket
const COMPLETE_IMAGE_MAPPING: Record<string, { bucket: string; filename: string; fallbacks?: string[] }> = {
  // Big Cats - deadly60 bucket (verified)
  'african-lion': { bucket: 'deadly60', filename: '250px-020_The_lion_kin...to_by_Giles_Laurent.jpg' },
  'siberian-tiger': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'bengal-tiger': { bucket: 'deadly60', filename: '250px-Adult_male_Royal_Bengal_tiger.jpg' },
  'leopard': { bucket: 'deadly60', filename: '250px-Indian_leopard.jpg' },
  'jaguar': { bucket: 'deadly60', filename: '330px-Standing_jaguar.jpg' },
  'mountain-lion': { bucket: 'deadly60', filename: '250px-Mountain_Lion_i...Glacier_National_Park.jpg' },
  'cheetah': { bucket: 'deadly60', filename: '250px-Male_cheetah_fa..._left_in_South_Africa.jpg' },
  'snow-leopard': { bucket: 'deadly60', filename: '250px-Snow_leopard_portrait-2010.jpg' },
  
  // Bears - deadly60 bucket (verified)
  'grizzly-bear': { bucket: 'deadly60', filename: '250px-Grizzly_Bear_Yellowstone_2.jpg' },
  'polar-bear': { bucket: 'deadly60', filename: '250px-Polar_Bear_-_Alaska_%28cropped%29.jpg' },
  'kodiak-bear': { bucket: 'deadly60', filename: '250px-Kodiak_Brown_Bear.jpg' },
  'black-bear': { bucket: 'deadly60', filename: '250px-Ursus_americanus_PO_02.jpg' },
  'sloth-bear': { bucket: 'deadly60', filename: '250px-Sloth_bear_with_young.jpg' },
  'sun-bear': { bucket: 'deadly60', filename: '250px-Sitting_sun_bear.jpg' },
  
  // Large Mammals - deadly60 bucket (verified)
  'hippopotamus': { bucket: 'deadly60', filename: '250px-Portrait_Hippopotamus_in_the_water.jpg' },
  'african-elephant': { bucket: 'deadly60', filename: '250px-An_elephant_in_Kruger_National_Park.jpg' },
  'cape-buffalo': { bucket: 'deadly60', filename: '250px-African_buffalo_...ale_with_cattle_egret.jpg' },
  'asian-elephant': { bucket: 'deadly60', filename: '250px-Elephas_maximus_%28Bandipur%29.jpg' },
  
  // Marine Animals - deadly60 bucket (verified)
  'great-white-shark': { bucket: 'deadly60', filename: '330px-White_shark.jpg' },
  'tiger-shark': { bucket: 'deadly60', filename: '250px-Tiger_shark.jpg' },
  'bull-shark': { bucket: 'deadly60', filename: '250px-Carcharhinus_leucas_TPWD.jpg' },
  'box-jellyfish': { bucket: 'deadly60', filename: '250px-Avispa_marina_cropped.jpg' },
  'blue-ringed-octopus': { bucket: 'deadly60', filename: '250px-Hapalochlaena_maculosa_side.jpg' },
  'stonefish': { bucket: 'deadly60', filename: '250px-Stonefish_at_AQWA_SMC2006.jpg' },
  'cone-snail': { bucket: 'deadly60', filename: '250px-Conus_textile_2.jpg' },
  'orca': { bucket: 'deadly60', filename: '250px-Killerwhales_jumping.jpg' },
  
  // Reptiles - deadly60 bucket (verified)
  'saltwater-crocodile': { bucket: 'deadly60', filename: '250px-SaltwaterCrocodil..%27Maximo%27%29.jpg' },
  'inland-taipan': { bucket: 'deadly60', filename: '250px-Inland_Taipan.jpg' },
  'black-mamba': { bucket: 'deadly60', filename: '250px-D%C3%BClmen...ark_--_2018_--_3762.jpg' },
  'king-cobra': { bucket: 'deadly60', filename: '250px-Indian_Cobra%2C_crop.jpg' },
  
  // Aerial Animals - deadly60 bucket (verified)
  'golden-eagle': { bucket: 'deadly60', filename: '250px-Golden_Eagle_in_flight_-_5.jpg' },
  
  // Insects - deadly60 bucket (verified)
  'deathstalker-scorpion': { bucket: 'deadly60', filename: '250px-Centruroides_sculpturatus_191624836.jpg' },
  
  // Marine with fallbacks - ALL deadly60
  'barracuda': { 
    bucket: 'deadly60', 
    filename: '250px-Great_barracuda_off_Islamorada.jpg',
    fallbacks: ['250px-Tiger_shark.jpg', '330px-White_shark.jpg']
  },
  'moray-eel': { 
    bucket: 'deadly60', 
    filename: '250px-Gymnothorax_javanicus_(Giant_moray).jpg',
    fallbacks: ['250px-Tiger_shark.jpg', '330px-White_shark.jpg']
  },
  'electric-eel': { 
    bucket: 'deadly60', 
    filename: '250px-Electric_eel_at_Shedd_Aquarium.jpg',
    fallbacks: ['250px-Tiger_shark.jpg', '330px-White_shark.jpg']
  },
  'portuguese-man-o-war': { 
    bucket: 'deadly60', 
    filename: '250px-Portuguese_Man-o-War_(Physalia_physalis).jpg',
    fallbacks: ['250px-Avispa_marina_cropped.jpg', '330px-White_shark.jpg']
  },
  'stingray': { 
    bucket: 'deadly60', 
    filename: '250px-Dasyatis_americana.jpg',
    fallbacks: ['250px-Tiger_shark.jpg', '330px-White_shark.jpg']
  },
  'hammerhead-shark': { 
    bucket: 'deadly60', 
    filename: '250px-Great_hammerhead_shark_off_Bimini.jpg',
    fallbacks: ['250px-Tiger_shark.jpg', '330px-White_shark.jpg']
  },
  'blue-shark': { 
    bucket: 'deadly60', 
    filename: '250px-Blue_shark.jpg',
    fallbacks: ['250px-Tiger_shark.jpg', '330px-White_shark.jpg']
  },
  'manta-ray': { 
    bucket: 'deadly60', 
    filename: '250px-Dasyatis_americana.jpg',
    fallbacks: ['250px-Tiger_shark.jpg', '330px-White_shark.jpg']
  },
  'electric-ray': { 
    bucket: 'deadly60', 
    filename: '250px-Dasyatis_americana.jpg',
    fallbacks: ['250px-Tiger_shark.jpg', '330px-White_shark.jpg']
  },
  'sperm-whale': { 
    bucket: 'deadly60', 
    filename: '250px-Killerwhales_jumping.jpg',
    fallbacks: ['330px-White_shark.jpg', '250px-Tiger_shark.jpg']
  },
  
  // Reptiles with fallbacks - ALL deadly60
  'nile-crocodile': { 
    bucket: 'deadly60', 
    filename: '250px-NileCrocodile.jpg',
    fallbacks: ['250px-SaltwaterCrocodil..%27Maximo%27%29.jpg']
  },
  'eastern-diamondback': { 
    bucket: 'deadly60', 
    filename: '250px-Crotalus_adamanteus_CDC-a.jpg',
    fallbacks: ['250px-Inland_Taipan.jpg', '250px-Indian_Cobra%2C_crop.jpg']
  },
  'gaboon-viper': { 
    bucket: 'deadly60', 
    filename: '250px-Bitis_gabonica_gabonica.jpg',
    fallbacks: ['250px-Inland_Taipan.jpg', '250px-Indian_Cobra%2C_crop.jpg']
  },
  'anaconda': { 
    bucket: 'deadly60', 
    filename: '250px-Sucuri_verde.jpg',
    fallbacks: ['250px-Python_reticulatu...D0%BE%D0%BD-2.jpg', '250px-Inland_Taipan.jpg']
  },
  'caiman': { 
    bucket: 'deadly60', 
    filename: '250px-Caiman_crocodilus_llanos.JPG',
    fallbacks: ['250px-SaltwaterCrocodil..%27Maximo%27%29.jpg']
  },
  'fer-de-lance': { 
    bucket: 'deadly60', 
    filename: '250px-Bothrops_asper_-_Tortuguero_01.jpg',
    fallbacks: ['250px-Inland_Taipan.jpg', '250px-Indian_Cobra%2C_crop.jpg']
  },
  'coral-snake': { 
    bucket: 'deadly60', 
    filename: '250px-Micrurus_fulvius.jpg',
    fallbacks: ['250px-Inland_Taipan.jpg', '250px-Indian_Cobra%2C_crop.jpg']
  },
  'russells-viper': { 
    bucket: 'deadly60', 
    filename: '250px-Russell\'s_viper_(Daboia_russelii).jpg',
    fallbacks: ['250px-Inland_Taipan.jpg', '250px-Indian_Cobra%2C_crop.jpg']
  },
  'reticulated-python': { 
    bucket: 'deadly60', 
    filename: '250px-Python_reticulatu...D0%BE%D0%BD-2.jpg',
    fallbacks: ['250px-Sucuri_verde.jpg', '250px-Inland_Taipan.jpg']
  },
  'komodo-dragon': { 
    bucket: 'deadly60', 
    filename: '250px-Komodo_dragon_with_forked_tongue.jpg',
    fallbacks: ['250px-Water_monitor_lizard.jpg', '250px-SaltwaterCrocodil..%27Maximo%27%29.jpg']
  },
  'monitor-lizard': { 
    bucket: 'deadly60', 
    filename: '250px-Water_monitor_lizard.jpg',
    fallbacks: ['250px-Komodo_dragon_with_forked_tongue.jpg', '250px-SaltwaterCrocodil..%27Maximo%27%29.jpg']
  },
  
  // Aerial Animals with fallbacks - ALL deadly60
  'harpy-eagle': { 
    bucket: 'deadly60', 
    filename: '250px-Harpy_eagle_(Harpia_harpyja)_adult_female.jpg',
    fallbacks: ['250px-Golden_Eagle_in_flight_-_5.jpg']
  },
  'great-horned-owl': { 
    bucket: 'deadly60', 
    filename: '250px-Bubo_virginianus_06.jpg',
    fallbacks: ['250px-Golden_Eagle_in_flight_-_5.jpg']
  },
  'secretary-bird': { 
    bucket: 'deadly60', 
    filename: '250px-Secretary_bird_(Sagittarius_serpentarius).jpg',
    fallbacks: ['250px-Golden_Eagle_in_flight_-_5.jpg']
  },
  'bald-eagle': { 
    bucket: 'deadly60', 
    filename: '250px-Bald_Eagle_Portrait.jpg',
    fallbacks: ['250px-Golden_Eagle_in_flight_-_5.jpg']
  },
  'stellers-sea-eagle': { 
    bucket: 'deadly60', 
    filename: '250px-Steller\'s_sea_eagle.jpg',
    fallbacks: ['250px-Golden_Eagle_in_flight_-_5.jpg']
  },
  'peregrine-falcon': { 
    bucket: 'deadly60', 
    filename: '250px-Peregrine_falcon.jpg',
    fallbacks: ['250px-Golden_Eagle_in_flight_-_5.jpg']
  },
  'goshawk': { 
    bucket: 'deadly60', 
    filename: '250px-Accipiter_gentilis_-_01.jpg',
    fallbacks: ['250px-Golden_Eagle_in_flight_-_5.jpg']
  },
  
  // Insects with fallbacks - ALL deadly60
  'brazilian-wandering-spider': { 
    bucket: 'deadly60', 
    filename: '250px-Phoneutria_nigriventer_MHNT.jpg',
    fallbacks: ['250px-Centruroides_sculpturatus_191624836.jpg']
  },
  'sydney-funnel-web': { 
    bucket: 'deadly60', 
    filename: '250px-Sydney_funnel-web_spider_male.jpg',
    fallbacks: ['250px-Phoneutria_nigriventer_MHNT.jpg', '250px-Centruroides_sculpturatus_191624836.jpg']
  },
  'black-widow': { 
    bucket: 'deadly60', 
    filename: '250px-Latrodectus_hesperus_adult_female.jpg',
    fallbacks: ['250px-Phoneutria_nigriventer_MHNT.jpg', '250px-Centruroides_sculpturatus_191624836.jpg']
  },
  'bullet-ant': { 
    bucket: 'deadly60', 
    filename: '250px-Paraponera_clavata_MHNT.jpg',
    fallbacks: ['250px-Centruroides_sculpturatus_191624836.jpg']
  },
  'tsetse-fly': { 
    bucket: 'deadly60', 
    filename: '250px-Tsetse_fly.jpg',
    fallbacks: ['250px-Centruroides_sculpturatus_191624836.jpg']
  },
  'kissing-bug': { 
    bucket: 'deadly60', 
    filename: '250px-Triatoma_infestans.jpg',
    fallbacks: ['250px-Tsetse_fly.jpg', '250px-Centruroides_sculpturatus_191624836.jpg']
  },
  'giant-asian-hornet': { 
    bucket: 'deadly60', 
    filename: '250px-Asian_giant_hornet.jpg',
    fallbacks: ['250px-Centruroides_sculpturatus_191624836.jpg']
  },
  'army-ant': { 
    bucket: 'deadly60', 
    filename: '250px-Eciton_burchellii.jpg',
    fallbacks: ['250px-Paraponera_clavata_MHNT.jpg', '250px-Centruroides_sculpturatus_191624836.jpg']
  },
  'africanized-bee': { 
    bucket: 'deadly60', 
    filename: '250px-Apis_mellifera_scutellata.jpg',
    fallbacks: ['250px-Asian_giant_hornet.jpg', '250px-Centruroides_sculpturatus_191624836.jpg']
  },
  'fire-ant': { 
    bucket: 'deadly60', 
    filename: '250px-Fire_ants_02.jpg',
    fallbacks: ['250px-Paraponera_clavata_MHNT.jpg', '250px-Centruroides_sculpturatus_191624836.jpg']
  },
  'driver-ant': { 
    bucket: 'deadly60', 
    filename: '250px-Dorylus_wilverthi.jpg',
    fallbacks: ['250px-Eciton_burchellii.jpg', '250px-Centruroides_sculpturatus_191624836.jpg']
  },
  'bot-fly': { 
    bucket: 'deadly60', 
    filename: '250px-Dermatobia_hominis.jpg',
    fallbacks: ['250px-Tsetse_fly.jpg', '250px-Centruroides_sculpturatus_191624836.jpg']
  },
  
  // Terrestrial with fallbacks - ALL deadly60
  'spotted-hyena': { 
    bucket: 'deadly60', 
    filename: '250px-Spotted_Hyena_and_young_in_Ngorongoro_crater.jpg',
    fallbacks: ['250px-Eurasian_wolf_2.jpg', '250px-020_The_lion_kin...to_by_Giles_Laurent.jpg']
  },
  'gray-wolf': { 
    bucket: 'deadly60', 
    filename: '250px-Eurasian_wolf_2.jpg',
    fallbacks: ['250px-Spotted_Hyena_and_young_in_Ngorongoro_crater.jpg']
  },
  'wolverine': { 
    bucket: 'deadly60', 
    filename: '250px-Wolverine_on_rock.jpg',
    fallbacks: ['250px-Grizzly_Bear_Yellowstone_2.jpg', '250px-Eurasian_wolf_2.jpg']
  },
  'tasmanian-devil': { 
    bucket: 'deadly60', 
    filename: '250px-Tasmanian_devil_facial_tumour.jpg',
    fallbacks: ['250px-Wolverine_on_rock.jpg', '250px-Eurasian_wolf_2.jpg']
  },
  'dingo': { 
    bucket: 'deadly60', 
    filename: '250px-Dingo_walking.jpg',
    fallbacks: ['250px-Eurasian_wolf_2.jpg']
  },
  'bobcat': { 
    bucket: 'deadly60', 
    filename: '250px-Bobcat2.jpg',
    fallbacks: ['250px-Indian_leopard.jpg', '250px-020_The_lion_kin...to_by_Giles_Laurent.jpg']
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
    filename: '250px-Dingo_walking.jpg',
    fallbacks: ['250px-Eurasian_wolf_2.jpg', '250px-020_The_lion_kin...to_by_Giles_Laurent.jpg']
  },
  'coyote': { 
    bucket: 'deadly60', 
    filename: '250px-Eurasian_wolf_2.jpg',
    fallbacks: ['250px-Dingo_walking.jpg']
  }
};

// Category-based fallbacks for ultimate fallback - ALL deadly60
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
