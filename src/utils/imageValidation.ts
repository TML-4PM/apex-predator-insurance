
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
  'african-lion': 'Lion_waiting_in_Namibia.jpg',
  'siberian-tiger': 'Siberian_Tiger_by_Malene_Thyssen.jpg',
  'bengal-tiger': 'Royal_Bengal_Tiger_at_Kanha_Tiger_Reserve.jpg',
  'leopard': 'African_leopard_male_(cropped).jpg',
  'jaguar': 'Jaguar_(Panthera_onca_palustris)_male_Three_Brothers_River.jpg',
  'mountain-lion': 'Cougar_closeup.jpg',
  'cheetah': 'Cheetah_portrait_Whipsnade_Zoo.jpg',
  'snow-leopard': 'Snow_leopard_portrait-2010.jpg',
  
  // Bears
  'grizzly-bear': 'Grizzly_Bear_Yellowstone.jpg',
  'polar-bear': 'Polar_bear_(Ursus_maritimus)_with_its_prey.jpg',
  'kodiak-bear': 'Kodiak_Brown_Bear.jpg',
  'black-bear': 'Ursus_americanus_PO_02.jpg',
  'sloth-bear': 'Sloth_bear_with_young.jpg',
  'sun-bear': 'Sitting_sun_bear.jpg',
  
  // Marine Animals
  'great-white-shark': 'Great_white_shark_south_africa.jpg',
  'tiger-shark': 'Tiger_shark.jpg',
  'bull-shark': 'Bull_shark_size_chart.svg.png',
  'box-jellyfish': 'Avispa_marina_cropped.jpg',
  'blue-ringed-octopus': 'Blue-ringed_octopus.jpg',
  'stonefish': 'Stonefish_at_AQWA_SMC2006.jpg',
  'cone-snail': 'Conus_textile_2.jpg',
  'orca': 'Killerwhales_jumping.jpg',
  'barracuda': 'Great_barracuda_off_Islamorada.jpg',
  'moray-eel': 'Gymnothorax_javanicus_(Giant_moray).jpg',
  'electric-eel': 'Electric_eel_at_Shedd_Aquarium.jpg',
  'portuguese-man-o-war': 'Portuguese_Man-o-War_(Physalia_physalis).jpg',
  'stingray': 'Dasyatis_americana.jpg',
  'hammerhead-shark': 'Great_hammerhead_shark_off_Bimini.jpg',
  'blue-shark': 'Blue_shark.jpg',
  
  // Reptiles
  'saltwater-crocodile': 'Saltwater_crocodile_(Crocodylus_porosus).jpg',
  'nile-crocodile': 'Nile_crocodile_head.jpg',
  'inland-taipan': 'Inland_Taipan.jpg',
  'black-mamba': 'Black_Mamba.jpg',
  'king-cobra': 'King_Cobra.jpg',
  'eastern-diamondback': 'Crotalus_adamanteus_CDC-a.jpg',
  'gaboon-viper': 'Bitis_gabonica_gabonica.jpg',
  'anaconda': 'Green_Anaconda.jpg',
  'caiman': 'Melanosuchus_niger_060706_002.jpg',
  'fer-de-lance': 'Bothrops_asper_-_Tortuguero_01.jpg',
  'coral-snake': 'Micrurus_fulvius.jpg',
  'russells-viper': 'Russell\'s_viper_(Daboia_russelii).jpg',
  'reticulated-python': 'Reticulated_python.jpg',
  'komodo-dragon': 'Komodo_dragon_with_forked_tongue.jpg',
  'monitor-lizard': 'Water_monitor_lizard.jpg',
  
  // Aerial Animals
  'golden-eagle': 'Golden_Eagle_in_flight_-_5.jpg',
  'harpy-eagle': 'Harpy_eagle_(Harpia_harpyja)_adult_female.jpg',
  'great-horned-owl': 'Bubo_virginianus_06.jpg',
  'secretary-bird': 'Secretary_bird_(Sagittarius_serpentarius).jpg',
  'bald-eagle': 'Bald_Eagle_Portrait.jpg',
  'stellers-sea-eagle': 'Steller\'s_sea_eagle.jpg',
  'peregrine-falcon': 'Peregrine_falcon.jpg',
  'goshawk': 'Accipiter_gentilis_-_01.jpg'
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
  const fallbacks = {
    marine: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    terrestrial: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    reptile: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aerial: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    insect: 'https://images.unsplash.com/photo-1516905365617-5616be34b315?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  };
  
  return fallbacks[category as keyof typeof fallbacks] || fallbacks.terrestrial;
};

export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement>,
  category: string
) => {
  const target = event.target as HTMLImageElement;
  if (!target.src.includes('unsplash.com')) {
    target.src = getFallbackImageUrl(category);
  }
};
