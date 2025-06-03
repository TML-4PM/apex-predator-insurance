
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../../utils/completeImageMapping';

export const bigCats: DeadlyAnimal[] = [
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
    imageUrl: getCompleteAnimalImageUrl('african-lion', 'terrestrial'),
    killsPerYear: 250,
    rarity: 'rare'
  },
  {
    id: 'siberian-tiger',
    name: 'Siberian Tiger',
    category: 'terrestrial',
    dangerLevel: 5,
    icon: '🐅',
    price: 9.99,
    locations: ['Russia', 'China', 'North Korea'],
    description: 'The largest living cat species',
    facts: ['Can reach speeds of 50 mph', 'Night vision 6x better than humans'],
    imageUrl: getCompleteAnimalImageUrl('siberian-tiger', 'terrestrial'),
    killsPerYear: 50,
    rarity: 'mythic'
  },
  {
    id: 'bengal-tiger',
    name: 'Bengal Tiger',
    category: 'terrestrial',
    dangerLevel: 5,
    icon: '🐅',
    price: 9.99,
    locations: ['India', 'Bangladesh', 'Nepal'],
    description: 'The most numerous tiger subspecies',
    facts: ['Excellent swimmers', 'Can consume 88 pounds of meat in one feeding'],
    imageUrl: getCompleteAnimalImageUrl('bengal-tiger', 'terrestrial'),
    killsPerYear: 85,
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
    imageUrl: getCompleteAnimalImageUrl('leopard', 'terrestrial'),
    killsPerYear: 15,
    rarity: 'rare'
  },
  {
    id: 'jaguar',
    name: 'Jaguar',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🐆',
    price: 9.99,
    locations: ['Amazon', 'Central America', 'Mexico'],
    description: 'The powerhouse of the Americas',
    facts: ['Strongest bite force of any big cat', 'Can crush turtle shells'],
    imageUrl: getCompleteAnimalImageUrl('jaguar', 'terrestrial'),
    killsPerYear: 5,
    rarity: 'rare'
  },
  {
    id: 'mountain-lion',
    name: 'Mountain Lion',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🦁',
    price: 9.99,
    locations: ['North America', 'South America'],
    description: 'The silent stalker of the mountains',
    facts: ['Can jump 40 feet horizontally', 'Also known as puma or cougar'],
    imageUrl: getCompleteAnimalImageUrl('mountain-lion', 'terrestrial'),
    killsPerYear: 2,
    rarity: 'uncommon'
  },
  {
    id: 'cheetah',
    name: 'Cheetah',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐆',
    price: 9.99,
    locations: ['Africa', 'Iran'],
    description: 'The fastest land animal',
    facts: ['Can reach 70 mph in 3 seconds', 'Cannot retract claws'],
    imageUrl: getCompleteAnimalImageUrl('cheetah', 'terrestrial'),
    killsPerYear: 1,
    rarity: 'uncommon'
  },
  {
    id: 'snow-leopard',
    name: 'Snow Leopard',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐆',
    price: 9.99,
    locations: ['Central Asia', 'Himalayas'],
    description: 'The ghost of the mountains',
    facts: ['Can leap 50 feet', 'Thick fur protects from extreme cold'],
    imageUrl: getCompleteAnimalImageUrl('snow-leopard', 'terrestrial'),
    killsPerYear: 0,
    rarity: 'rare'
  }
];
