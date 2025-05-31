
export interface WikipediaImageResponse {
  query?: {
    pages?: {
      [key: string]: {
        original?: {
          source: string;
        };
        thumbnail?: {
          source: string;
        };
      };
    };
  };
}

export const getWikipediaImage = async (articleTitle: string): Promise<string | null> => {
  try {
    const encodedTitle = encodeURIComponent(articleTitle);
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodedTitle}`;
    
    const response = await fetch(url);
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.originalimage?.source || data.thumbnail?.source || null;
  } catch (error) {
    console.error(`Failed to fetch image for ${articleTitle}:`, error);
    return null;
  }
};

export const animalWikipediaMapping: Record<string, string> = {
  // Marine Animals
  'great-white-shark': 'Great white shark',
  'tiger-shark': 'Tiger shark',
  'bull-shark': 'Bull shark',
  'box-jellyfish': 'Box jellyfish',
  'blue-ringed-octopus': 'Blue-ringed octopus',
  'stonefish': 'Synanceia',
  'cone-snail': 'Cone snail',
  'orca': 'Orca',
  'barracuda': 'Great barracuda',
  'moray-eel': 'Giant moray',
  'electric-eel': 'Electric eel',
  'portuguese-man-o-war': 'Portuguese man o\' war',
  'stingray': 'Southern stingray',
  'hammerhead-shark': 'Great hammerhead shark',
  'blue-shark': 'Blue shark',
  
  // Big Cats
  'african-lion': 'Lion',
  'siberian-tiger': 'Siberian tiger',
  'bengal-tiger': 'Bengal tiger',
  'leopard': 'Leopard',
  'jaguar': 'Jaguar',
  'mountain-lion': 'Cougar',
  'cheetah': 'Cheetah',
  'snow-leopard': 'Snow leopard',
  
  // Bears
  'grizzly-bear': 'Grizzly bear',
  'polar-bear': 'Polar bear',
  'kodiak-bear': 'Kodiak bear',
  'black-bear': 'American black bear',
  'sloth-bear': 'Sloth bear',
  'sun-bear': 'Sun bear',
  
  // Reptiles
  'saltwater-crocodile': 'Saltwater crocodile',
  'nile-crocodile': 'Nile crocodile',
  'inland-taipan': 'Inland taipan',
  'black-mamba': 'Black mamba',
  'king-cobra': 'King cobra',
  'eastern-diamondback': 'Eastern diamondback rattlesnake',
  'gaboon-viper': 'Gaboon viper',
  'anaconda': 'Green anaconda',
  'caiman': 'Black caiman',
  'fer-de-lance': 'Bothrops asper',
  'coral-snake': 'Coral snake',
  'russells-viper': 'Russell\'s viper',
  'reticulated-python': 'Reticulated python',
  'komodo-dragon': 'Komodo dragon',
  'monitor-lizard': 'Water monitor',
  
  // Large Mammals
  'hippopotamus': 'Hippopotamus',
  'african-elephant': 'African bush elephant',
  'cape-buffalo': 'African buffalo',
  'asian-elephant': 'Asian elephant',
  
  // Carnivores
  'spotted-hyena': 'Spotted hyena',
  'gray-wolf': 'Wolf',
  'wolverine': 'Wolverine',
  
  // Small Carnivores
  'tasmanian-devil': 'Tasmanian devil',
  'dingo': 'Dingo',
  'bobcat': 'Bobcat',
  
  // Aerial Animals
  'golden-eagle': 'Golden eagle',
  'harpy-eagle': 'Harpy eagle',
  'great-horned-owl': 'Great horned owl',
  'secretary-bird': 'Secretary bird',
  'bald-eagle': 'Bald eagle',
  'stellers-sea-eagle': 'Steller\'s sea eagle',
  'peregrine-falcon': 'Peregrine falcon',
  'goshawk': 'Northern goshawk',
  
  // Insects
  'brazilian-wandering-spider': 'Brazilian wandering spider',
  'sydney-funnel-web': 'Sydney funnel-web spider',
  'black-widow': 'Latrodectus',
  'deathstalker-scorpion': 'Deathstalker',
  'bullet-ant': 'Paraponera clavata',
  'tsetse-fly': 'Tsetse fly',
  'kissing-bug': 'Triatominae',
  'giant-asian-hornet': 'Asian giant hornet',
  'army-ant': 'Army ant',
  'africanized-bee': 'Africanized bee',
  'fire-ant': 'Red imported fire ant',
  'driver-ant': 'Dorylus',
  'bot-fly': 'Dermatobia hominis'
};

// The fallback image list to use when Wikipedia images fail
export const fallbackAnimalImages: Record<string, string> = {
  'jaguar': 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Standing_jaguar.jpg',
  'orca': 'https://upload.wikimedia.org/wikipedia/commons/3/37/Killerwhales_jumping.jpg',
  'tiger-shark': 'https://upload.wikimedia.org/wikipedia/commons/7/77/Tiger_shark.png',
  'snow-leopard': 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Snow_leopard_portrait-2010-07-09.jpg',
  'bot-fly': 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Human_bot_fly_%28Dermatobia_hominis%29%2C_emerged_female_%2830742624341%29.jpg'
};
