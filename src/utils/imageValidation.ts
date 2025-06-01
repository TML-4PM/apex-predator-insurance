
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

// Mapping of animal IDs to uploaded image filenames in the deadly60 bucket
const imageMapping: Record<string, string> = {
  // Big Cats
  'african-lion': '250px-020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg',
  'siberian-tiger': '330px-Walking_tiger_female.jpg',
  'bengal-tiger': '250px-Adult_male_Royal_Bengal_tiger.jpg',
  'leopard': '250px-Indian_leopard.jpg',
  'jaguar': '250px-2jaguar.jpg',
  'mountain-lion': '250px-MountainLion.jpg',
  'cheetah': '250px-Cheetah4.jpg',
  'snow-leopard': '250px-Snow_leopard_portrait-2010.jpg',
  
  // Bears
  'grizzly-bear': '250px-Grizzly_Bear_Yellowstone_2.jpg',
  'polar-bear': '250px-Polar_Bear_-_Alaska_(cropped).jpg',
  'kodiak-bear': '250px-Kodiak_Brown_Bear.jpg',
  'black-bear': '250px-Ursus_americanus_PO_02.jpg',
  'sloth-bear': '250px-Sloth_bear_with_young.jpg',
  'sun-bear': '250px-Sitting_sun_bear.jpg',
  
  // Marine Animals
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
  
  // Reptiles
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
  
  // Aerial Animals
  'golden-eagle': '250px-Golden_Eagle_in_flight_-_5.jpg',
  'harpy-eagle': '250px-Harpy_eagle_(Harpia_harpyja)_adult_female.jpg',
  'great-horned-owl': '250px-Bubo_virginianus_06.jpg',
  'secretary-bird': '250px-Secretary_bird_(Sagittarius_serpentarius).jpg',
  'bald-eagle': '250px-Bald_Eagle_Portrait.jpg',
  'stellers-sea-eagle': '250px-Steller\'s_sea_eagle.jpg',
  'peregrine-falcon': '250px-Peregrine_falcon.jpg',
  'goshawk': '250px-Accipiter_gentilis_-_01.jpg'
};

export const getAnimalImageUrl = (animalId: string): string => {
  const filename = imageMapping[animalId];
  if (filename) {
    return getSupabaseImageUrl('deadly60', filename);
  }
  // Fallback to the old system for animals not yet uploaded
  return getSupabaseImageUrl('animal-images', `${animalId}.jpg`);
};

export const getFallbackImageUrl = (category: string): string => {
  // Use animal-specific fallback images from reliable sources
  const fallbacks = {
    marine: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&q=80', // Shark
    terrestrial: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=800&q=80', // Lion
    reptile: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80', // Snake
    aerial: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&q=80', // Eagle
    insect: 'https://images.unsplash.com/photo-1516905365617-5616be34b315?w=800&q=80' // Spider
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
