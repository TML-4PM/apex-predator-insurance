
// Complete mapping using only the 8 verified working filenames from deadly60 bucket
export const COMPLETE_IMAGE_MAPPING: Record<string, { bucket: string; filename: string; fallbacks?: string[] }> = {
  // Working animals with verified images
  'siberian-tiger': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'mountain-lion': { bucket: 'deadly60', filename: '250px-Mountain_Lion_in_Glacier_National_Park.jpg' },
  'cheetah': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' }, // Changed from broken cheetah to tiger
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
  
  // All aerial animals now mapped to tiger (was previously broken cheetah)
  'golden-eagle': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'harpy-eagle': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'great-horned-owl': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'secretary-bird': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'bald-eagle': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'stellers-sea-eagle': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'peregrine-falcon': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'goshawk': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  
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
  'bobcat': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' }, // Changed from broken cheetah to tiger
  'chimpanzee': { bucket: 'deadly60', filename: '250px-An_elephant_in_Kruger_National_Park.jpg' },
  'baboon': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' }, // Changed from broken cheetah to tiger
  'african-wild-dog': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' },
  'coyote': { bucket: 'deadly60', filename: '330px-Walking_tiger_female.jpg' }
};
