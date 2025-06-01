
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

// Complete mapping of system animal IDs to actual bucket filenames
const imageMapping: Record<string, string> = {
  // Big Cats
  'african-lion': '250px-020_The_lion_kin...to_by_Giles_Laurent.jpg',
  'siberian-tiger': '330px-Walking_tiger_female.jpg',
  'bengal-tiger': '250px-Adult_male_Royal_Bengal_tiger.jpg',
  'leopard': '250px-Indian_leopard.jpg',
  'jaguar': '330px-Standing_jaguar.jpg',
  'mountain-lion': '250px-Mountain_Lion_i...Glacier_National_Park.jpg',
  'cheetah': '250px-Male_cheetah_fa..._left_in_South_Africa.jpg',
  'snow-leopard': '250px-Snow_leopard_portrait-2010.jpg',
  
  // Bears
  'grizzly-bear': '250px-Grizzly_Bear_Yellowstone_2.jpg',
  'polar-bear': '250px-Polar_Bear_-_Alaska_%28cropped%29.jpg',
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
  'saltwater-crocodile': '250px-SaltwaterCrocodil..%27Maximo%27%29.jpg',
  'nile-crocodile': '250px-NileCrocodile.jpg',
  'inland-taipan': '250px-Inland_Taipan.jpg',
  'black-mamba': '250px-D%C3%BClmen...ark_--_2018_--_3762.jpg',
  'king-cobra': '250px-Indian_Cobra%2C_crop.jpg',
  'eastern-diamondback': '250px-Crotalus_adamanteus_CDC-a.jpg',
  'gaboon-viper': '250px-Bitis_gabonica_gabonica.jpg',
  'anaconda': '250px-Sucuri_verde.jpg',
  'caiman': '250px-Caiman_crocodilus_llanos.JPG',
  'fer-de-lance': '250px-Bothrops_asper_-_Tortuguero_01.jpg',
  'coral-snake': '250px-Micrurus_fulvius.jpg',
  'russells-viper': '250px-Russell\'s_viper_(Daboia_russelii).jpg',
  'reticulated-python': '250px-Python_reticulatu...D0%BE%D0%BD-2.jpg',
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
  'goshawk': '250px-Accipiter_gentilis_-_01.jpg',
  
  // Large Mammals
  'african-elephant': '250px-An_elephant_in_Kruger_National_Park.jpg',
  'rhinoceros': '250px-Black_Rhino_at_Working_with_Wildlife.jpg',
  'hippopotamus': '250px-Portrait_Hippopotamus_in_the_water.jpg',
  'cape-buffalo': '250px-African_buffalo_...ale_with_cattle_egret.jpg',
  'asian-elephant': '250px-Elephas_maximus_%28Bandipur%29.jpg',
  
  // Carnivores
  'spotted-hyena': '250px-Spotted_Hyena_and_young_in_Ngorongoro_crater.jpg',
  'gray-wolf': '250px-Eurasian_wolf_2.jpg',
  'wolverine': '250px-Wolverine_on_rock.jpg',
  
  // Small Carnivores
  'honey-badger': '500px-Honey_Badger.jpg',
  
  // Insects and Arachnids
  'black-widow': '250px-Latrodectus_hesperus_adult_female.jpg',
  'brazilian-wandering-spider': '250px-Phoneutria_nigriventer_MHNT.jpg',
  'sydney-funnel-web': '250px-Sydney_funnel-web_spider_male.jpg',
  'deathstalker-scorpion': '250px-Centruroides_sculpturatus_191624836.jpg',
  
  // Additional animals from your bucket list
  'sailfish': '250px-Two_men_holdin...reshly_caught_sailfish.jpg',
  'moose': '250px-Alaska_moose.jpg',
  'gorilla': '250px-Male_Gorilla_%2818109130%29.jpg',
  'octopus': '250px-Octopus2.jpg',
  'giraffe': '250px-Giraffe_Mikumi_National_Park.jpg',
  'wolf': '250px-Eurasian_wolf_2.jpg',
  'zebra': '250px-Equus_quagga_b...i_-_Etosha%2C_2014.jpg',
  'emperor-scorpion': '250px-Female_Emperor_Scorpion.jpg',
  'emerald-boa': '250px-Emerald_Tree_Boa_Head.jpg',
  'panther-chameleon': '250px-Panther_chamele...s%29_male_Nosy_Be.jpg',
  'rockhopper-penguin': '250px-Gorfou_sauteur_-_Rockhopper_Penguin.jpg',
  'lappet-faced-vulture': '250px-2012-lappet-faced-vulture.jpg',
  'african-fish-eagle': '250px-African_fish_eagl...283351661283%29.jpg',
  'lions-mane-jellyfish': '250px-Le_Caylar_fg01.JPG',
  'indian-rhinoceros': '250px-Great-Indian-one...-park-in-Assam-India.jpg',
  'ruppells-vulture': '250px-R%C3%BCppell%...28211600896%29.jpg',
  'rinkhals': '250px-Rinkhals2.jpg',
  'baboon-spider': '250px-Pterinochilus_murinus.jpg',
  'golden-orb-spider': '250px-Giant_Golden_Or...%28Ventral_Side%29.jpg',
  'impala': '500px-Impala_%28Aepy...us%29_male_Kruger.jpg',
  'wildebeest': '250px-Blue_Wildebeest%2C_Ngorongoro.jpg',
  'warthog': '250px-Southern_wartho...sundevallii%29_male.jpg'
};

export const getAnimalImageUrl = (animalId: string): string => {
  const filename = imageMapping[animalId];
  if (filename) {
    return getSupabaseImageUrl('deadly60', filename);
  }
  
  console.warn(`[Image Missing] No image mapping found for animal: ${animalId}`);
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

export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement>,
  category: string
) => {
  const target = event.target as HTMLImageElement;
  if (!target.src.includes('supabase.co') && !target.src.includes('data:image')) {
    target.src = getFallbackImageUrl(category);
  }
};
