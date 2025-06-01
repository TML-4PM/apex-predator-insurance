
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getAnimalImageUrl } from '../../../utils/imageValidation';

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
    imageUrl: getAnimalImageUrl('african-lion'),
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
    imageUrl: getAnimalImageUrl('siberian-tiger'),
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
    imageUrl: getAnimalImageUrl('bengal-tiger'),
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
    imageUrl: getAnimalImageUrl('leopard'),
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
    imageUrl: getAnimalImageUrl('jaguar'),
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
    imageUrl: getAnimalImageUrl('mountain-lion'),
    killsPerYear: 2,
    rarity: 'uncommon'
  },
  {
    id: 'cheetah',
    name: 'Cheetah',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐆',
    price: 24.99,
    locations: ['Africa', 'Iran'],
    description: 'The fastest land animal',
    facts: ['Can reach 70 mph in 3 seconds', 'Cannot retract claws'],
    imageUrl: getAnimalImageUrl('cheetah'),
    killsPerYear: 1,
    rarity: 'uncommon'
  },
  {
    id: 'snow-leopard',
    name: 'Snow Leopard',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐆',
    price: 26.99,
    locations: ['Central Asia', 'Himalayas'],
    description: 'The ghost of the mountains',
    facts: ['Can leap 50 feet', 'Thick fur protects from extreme cold'],
    imageUrl: getAnimalImageUrl('snow-leopard'),
    killsPerYear: 0,
    rarity: 'rare'
  }
];
