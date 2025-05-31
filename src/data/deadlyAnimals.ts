
export interface DeadlyAnimal {
  id: string;
  name: string;
  category: 'terrestrial' | 'marine' | 'aerial' | 'reptile' | 'insect';
  dangerLevel: 1 | 2 | 3 | 4 | 5;
  icon: string;
  price: number;
  locations: string[];
  description: string;
  facts: string[];
  imageUrl: string;
  killsPerYear: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'mythic';
}

export const deadlyAnimals: DeadlyAnimal[] = [
  // Marine Predators
  {
    id: 'great-white-shark',
    name: 'Great White Shark',
    category: 'marine',
    dangerLevel: 5,
    icon: '🦈',
    price: 9.99,
    locations: ['Australia', 'South Africa', 'California', 'Mexico'],
    description: 'The apex predator of the ocean',
    facts: ['Can detect a drop of blood in 25 gallons of water', 'Reaches speeds of 35 mph'],
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
    killsPerYear: 10,
    rarity: 'legendary'
  },
  {
    id: 'saltwater-crocodile',
    name: 'Saltwater Crocodile',
    category: 'reptile',
    dangerLevel: 5,
    icon: '🐊',
    price: 12.99,
    locations: ['Australia', 'Southeast Asia', 'India'],
    description: 'The largest living reptile and apex predator',
    facts: ['Bite force of 16,460 newtons', 'Can hold breath for 1 hour'],
    imageUrl: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302',
    killsPerYear: 1000,
    rarity: 'mythic'
  },
  {
    id: 'box-jellyfish',
    name: 'Box Jellyfish',
    category: 'marine',
    dangerLevel: 5,
    icon: '🪼',
    price: 8.99,
    locations: ['Australia', 'Thailand', 'Malaysia', 'Philippines'],
    description: 'One of the most venomous creatures on Earth',
    facts: ['Venom can kill in 2-5 minutes', 'Nearly transparent in water'],
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    killsPerYear: 70,
    rarity: 'legendary'
  },
  
  // Big Cats
  {
    id: 'african-lion',
    name: 'African Lion',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🦁',
    price: 9.99,
    locations: ['Kenya', 'Tanzania', 'South Africa', 'Botswana'],
    description: 'The king of the savanna',
    facts: ['Can leap 36 feet horizontally', 'Roar can be heard 5 miles away'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    killsPerYear: 250,
    rarity: 'rare'
  },
  {
    id: 'siberian-tiger',
    name: 'Siberian Tiger',
    category: 'terrestrial',
    dangerLevel: 5,
    icon: '🐅',
    price: 14.99,
    locations: ['Russia', 'China', 'North Korea'],
    description: 'The largest living cat species',
    facts: ['Can reach speeds of 50 mph', 'Night vision 6x better than humans'],
    imageUrl: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6',
    killsPerYear: 50,
    rarity: 'mythic'
  },
  {
    id: 'leopard',
    name: 'Leopard',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🐆',
    price: 9.99,
    locations: ['Africa', 'Asia', 'Middle East'],
    description: 'The stealthiest big cat',
    facts: ['Can carry prey twice their weight up trees', 'Excellent swimmers'],
    imageUrl: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6',
    killsPerYear: 15,
    rarity: 'rare'
  },
  
  // Bears
  {
    id: 'grizzly-bear',
    name: 'Grizzly Bear',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🐻',
    price: 9.99,
    locations: ['Alaska', 'Canada', 'Montana', 'Wyoming'],
    description: 'North America\'s apex predator',
    facts: ['Can run 35 mph', 'Sense of smell 7x stronger than bloodhound'],
    imageUrl: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2',
    killsPerYear: 1,
    rarity: 'uncommon'
  },
  {
    id: 'polar-bear',
    name: 'Polar Bear',
    category: 'terrestrial',
    dangerLevel: 5,
    icon: '🐻‍❄️',
    price: 11.99,
    locations: ['Arctic Circle', 'Greenland', 'Canada', 'Alaska'],
    description: 'The Arctic\'s apex predator',
    facts: ['Can smell seals 20 miles away', 'Excellent swimmers'],
    imageUrl: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4',
    killsPerYear: 1,
    rarity: 'legendary'
  },
  
  // Venomous Creatures
  {
    id: 'inland-taipan',
    name: 'Inland Taipan',
    category: 'reptile',
    dangerLevel: 5,
    icon: '🐍',
    price: 7.99,
    locations: ['Australia'],
    description: 'The world\'s most venomous snake',
    facts: ['One bite can kill 100 adults', 'Venom is 50x more toxic than cobra'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    killsPerYear: 1,
    rarity: 'mythic'
  },
  {
    id: 'black-mamba',
    name: 'Black Mamba',
    category: 'reptile',
    dangerLevel: 5,
    icon: '🐍',
    price: 8.99,
    locations: ['South Africa', 'Botswana', 'Kenya'],
    description: 'Africa\'s deadliest snake',
    facts: ['Fastest snake in the world at 12.5 mph', '100% fatal without antivenom'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    killsPerYear: 20000,
    rarity: 'legendary'
  },
  
  // Insects & Arachnids
  {
    id: 'brazilian-wandering-spider',
    name: 'Brazilian Wandering Spider',
    category: 'insect',
    dangerLevel: 4,
    icon: '🕷️',
    price: 6.99,
    locations: ['Brazil', 'Central America', 'South America'],
    description: 'World\'s most venomous spider',
    facts: ['Aggressive and fast-moving', 'Venom causes painful erections'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    killsPerYear: 5,
    rarity: 'rare'
  },
  {
    id: 'deathstalker-scorpion',
    name: 'Deathstalker Scorpion',
    category: 'insect',
    dangerLevel: 4,
    icon: '🦂',
    price: 6.99,
    locations: ['Middle East', 'North Africa'],
    description: 'One of the most dangerous scorpions',
    facts: ['Venom contains neurotoxins', 'Glows under UV light'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    killsPerYear: 2,
    rarity: 'rare'
  },
  
  // Additional Marine Life
  {
    id: 'blue-ringed-octopus',
    name: 'Blue-Ringed Octopus',
    category: 'marine',
    dangerLevel: 5,
    icon: '🐙',
    price: 7.99,
    locations: ['Australia', 'Japan', 'Indonesia'],
    description: 'Small but extremely venomous',
    facts: ['Size of golf ball but can kill 26 adults', 'No known antidote'],
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    killsPerYear: 3,
    rarity: 'legendary'
  },
  {
    id: 'stonefish',
    name: 'Stonefish',
    category: 'marine',
    dangerLevel: 4,
    icon: '🐠',
    price: 6.99,
    locations: ['Australia', 'Indo-Pacific'],
    description: 'Most venomous fish in the world',
    facts: ['Perfectly camouflaged as rock', 'Venom causes excruciating pain'],
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    killsPerYear: 5,
    rarity: 'rare'
  }
];

export const getAnimalByCategory = (category: string) => {
  return deadlyAnimals.filter(animal => animal.category === category);
};

export const getAnimalById = (id: string) => {
  return deadlyAnimals.find(animal => animal.id === id);
};

export const getRandomAnimal = () => {
  return deadlyAnimals[Math.floor(Math.random() * deadlyAnimals.length)];
};
