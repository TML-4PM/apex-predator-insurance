
import { DeadlyAnimal } from '../../types/DeadlyAnimal';

export const bigCats: DeadlyAnimal[] = [
  {
    id: 'african-lion',
    name: 'African Lion',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🦁',
    price: 28.99,
    locations: ['Kenya', 'Tanzania', 'South Africa', 'Botswana'],
    description: 'The king of the savanna',
    facts: ['Can leap 36 feet horizontally', 'Roar can be heard 5 miles away'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg',
    killsPerYear: 250,
    rarity: 'rare'
  },
  {
    id: 'siberian-tiger',
    name: 'Siberian Tiger',
    category: 'terrestrial',
    dangerLevel: 5,
    icon: '🐅',
    price: 34.99,
    locations: ['Russia', 'China', 'North Korea'],
    description: 'The largest living cat species',
    facts: ['Can reach speeds of 50 mph', 'Night vision 6x better than humans'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Siberischer_tiger_de_edit02.jpg',
    killsPerYear: 50,
    rarity: 'mythic'
  },
  {
    id: 'bengal-tiger',
    name: 'Bengal Tiger',
    category: 'terrestrial',
    dangerLevel: 5,
    icon: '🐅',
    price: 33.99,
    locations: ['India', 'Bangladesh', 'Nepal'],
    description: 'The most numerous tiger subspecies',
    facts: ['Excellent swimmers', 'Can consume 88 pounds of meat in one feeding'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Bengal_Tiger_Karnataka.jpg',
    killsPerYear: 85,
    rarity: 'mythic'
  },
  {
    id: 'leopard',
    name: 'Leopard',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🐆',
    price: 27.99,
    locations: ['Africa', 'Asia', 'Middle East'],
    description: 'The stealthiest big cat',
    facts: ['Can carry prey twice their weight up trees', 'Excellent swimmers'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/70/African_leopard_male_%28cropped%29.jpg',
    killsPerYear: 15,
    rarity: 'rare'
  },
  {
    id: 'jaguar',
    name: 'Jaguar',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🐆',
    price: 29.99,
    locations: ['Amazon', 'Central America', 'Mexico'],
    description: 'The powerhouse of the Americas',
    facts: ['Strongest bite force of any big cat', 'Can crush turtle shells'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Standing_jaguar.jpg',
    killsPerYear: 5,
    rarity: 'rare'
  },
  {
    id: 'mountain-lion',
    name: 'Mountain Lion',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🦁',
    price: 22.99,
    locations: ['North America', 'South America'],
    description: 'The silent stalker of the mountains',
    facts: ['Can jump 40 feet horizontally', 'Also known as puma or cougar'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Mountain_Lion_in_Glacier_National_Park.jpg',
    killsPerYear: 2,
    rarity: 'uncommon'
  }
];
