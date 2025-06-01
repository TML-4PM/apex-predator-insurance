
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

// Updated mapping based on actual files in the deadly60 bucket
const imageMapping: Record<string, string> = {
  // Big Cats (8 animals)
  'african-lion': '250px-020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg',
  'siberian-tiger': '330px-Walking_tiger_female.jpg',
  'bengal-tiger': '250px-Adult_male_Royal_Bengal_tiger.jpg',
  'leopard': '250px-Indian_leopard.jpg',
  'jaguar': '250px-2jaguar.jpg',
  'mountain-lion': '250px-MountainLion.jpg',
  'cheetah': '250px-Cheetah4.jpg',
  'snow-leopard': '250px-Snow_leopard_portrait-2010.jpg',
  
  // Bears (6 animals)
  'grizzly-bear': '250px-Grizzly_Bear_Yellowstone_2.jpg',
  'polar-bear': '250px-Polar_Bear_-_Alaska_(cropped).jpg',
  'kodiak-bear': '250px-Kodiak_Brown_Bear.jpg',
  'black-bear': '250px-Ursus_americanus_PO_02.jpg',
  'sloth-bear': '250px-Sloth_bear_with_young.jpg',
  'sun-bear': '250px-Sitting_sun_bear.jpg',
  
  // Marine Animals (15 animals)
  'great-white-shark': '330px-White_shark.jpg',
  'tiger-shark': '250px-Tiger_shark.jpg',
  'bull-shark': '250px-Carcharhinus_leucas_TPWD.jpg',
  'box-jellyfish': '250px-Avispa_marina_cropped.jpg',
  'blue-ringed-octopus': '250px-Hapalochlaena_maculosa_side.jpg',
  'stonefish': '250px-Stonefish_at_AQWA_SMC2006.jpg',
  'cone-snail': '250px-Conus_textile_2.jpg',
  'orca': '250px-Killerwhales_jumping.jpg',
  'barracuda': '250px-Great_barracuda_off_Islamorada.jpg',
  'moray-eel': '250px-Gymnothorax_javanicus_(Giant_moray).jpg',
  'electric-eel': '250px-Electric_eel_at_Shedd_Aquarium.jpg',
  'portuguese-man-o-war': '250px-Portuguese_Man-o-War_(Physalia_physalis).jpg',
  'stingray': '250px-Dasyatis_americana.jpg',
  'hammerhead-shark': '250px-Great_hammerhead_shark_off_Bimini.jpg',
  'blue-shark': '250px-Blue_shark.jpg',
  
  // Reptiles (15 animals)
  'saltwater-crocodile': '250px-Saltwater_crocodile_(Crocodylus_porosus).jpg',
  'nile-crocodile': '250px-NileCrocodile.jpg',
  'inland-taipan': '250px-Inland_Taipan.jpg',
  'black-mamba': '250px-Black_Mamba.jpg',
  'king-cobra': '250px-King_Cobra.jpg',
  'eastern-diamondback': '250px-Crotalus_adamanteus_CDC-a.jpg',
  'gaboon-viper': '250px-Bitis_gabonica_gabonica.jpg',
  'anaconda': '250px-Green_Anaconda.jpg',
  'caiman': '250px-Caiman_crocodilus_llanos.JPG',
  'fer-de-lance': '250px-Bothrops_asper_-_Tortuguero_01.jpg',
  'coral-snake': '250px-Micrurus_fulvius.jpg',
  'russells-viper': '250px-Russell\'s_viper_(Daboia_russelii).jpg',
  'reticulated-python': '250px-Reticulated_python.jpg',
  'komodo-dragon': '250px-Komodo_dragon_with_forked_tongue.jpg',
  'monitor-lizard': '250px-Water_monitor_lizard.jpg',
  
  // Aerial Animals (8 animals)
  'golden-eagle': '250px-Golden_Eagle_in_flight_-_5.jpg',
  'harpy-eagle': '250px-Harpy_eagle_(Harpia_harpyja)_adult_female.jpg',
  'great-horned-owl': '250px-Bubo_virginianus_06.jpg',
  'secretary-bird': '250px-Secretary_bird_(Sagittarius_serpentarius).jpg',
  'bald-eagle': '250px-Bald_Eagle_Portrait.jpg',
  'stellers-sea-eagle': '250px-Steller\'s_sea_eagle.jpg',
  'peregrine-falcon': '250px-Peregrine_falcon.jpg',
  'goshawk': '250px-Accipiter_gentilis_-_01.jpg',
  
  // Large Mammals (4 animals) - Using alternative files found in bucket
  'african-elephant': '250px-African_Bush_Elephant.jpg',
  'rhinoceros': '250px-White_rhinoceros_or_square-lipped_rhinoceros.jpg', 
  'hippopotamus': '250px-Hippo_pod_edit.jpg',
  'cape-buffalo': '250px-African_buffalo_Syncerus_caffer.jpg',
  
  // Carnivores (2 animals) - Using files found in bucket  
  'hyena': '250px-Spotted_Hyena_and_young_in_Ngorongoro_crater.jpg',
  'wild-dog': '250px-African_painted_dog.jpg',
  
  // Small Carnivores (2 animals) - Using files found in bucket
  'honey-badger': '250px-Honey_badger_in_Kruger_National_Park.jpg',
  'wolverine': '250px-Wolverine_on_rock.jpg',
  
  // Insects (4 animals) - Using files found in bucket
  'black-widow': '250px-Latrodectus_hesperus_adult_female.jpg',
  'brazilian-wandering-spider': '250px-Phoneutria_nigriventer_MHNT.jpg',
  'funnel-web-spider': '250px-Sydney_funnel-web_spider_male.jpg',
  'deathstalker-scorpion': '250px-Leiurus_quinquestriatus_MHNT.jpg'
};

export const getAnimalImageUrl = (animalId: string): string => {
  // Check if we have it in the deadly60 bucket
  const filename = imageMapping[animalId];
  if (filename) {
    return getSupabaseImageUrl('deadly60', filename);
  }
  
  // Log missing animals for debugging
  console.warn(`[Image Missing] No image mapping found for animal: ${animalId}`);
  
  // Fallback to old system for any truly missing animals
  return getSupabaseImageUrl('animal-images', `${animalId}.jpg`);
};

export const getFallbackImageUrl = (category: string): string => {
  // Use diverse, animal-specific fallback images from reliable sources
  const fallbacks = {
    marine: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    terrestrial: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&q=80',
    reptile: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    aerial: 'https://images.unsplash.com/photo-1520637836862-4d197d17c23a?w=800&q=80',
    insect: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80'
  };
  
  return fallbacks[category as keyof typeof fallbacks] || fallbacks.terrestrial;
};

export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement>,
  category: string
) => {
  const target = event.target as HTMLImageElement;
  if (!target.src.includes('unsplash.com') && !target.src.includes('data:image')) {
    target.src = getFallbackImageUrl(category);
  }
};
