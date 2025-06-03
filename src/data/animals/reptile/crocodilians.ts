
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../../utils/completeImageMapping';

export const crocodilians: DeadlyAnimal[] = [
  {
    id: 'saltwater-crocodile',
    name: 'Saltwater Crocodile',
    category: 'reptile',
    dangerLevel: 5,
    icon: '🐊',
    price: 32.99,
    locations: ['Australia', 'Southeast Asia', 'India'],
    description: 'The largest living reptile and apex predator',
    facts: ['Bite force of 16,460 newtons', 'Can hold breath for 1 hour'],
    imageUrl: getCompleteAnimalImageUrl('saltwater-crocodile', 'reptile'),
    killsPerYear: 1000,
    rarity: 'mythic'
  },
  {
    id: 'nile-crocodile',
    name: 'Nile Crocodile',
    category: 'reptile',
    dangerLevel: 5,
    icon: '🐊',
    price: 31.99,
    locations: ['Africa', 'Nile River', 'Sub-Saharan Africa'],
    description: 'Africa\'s largest freshwater predator',
    facts: ['Can grow up to 20 feet long', 'Ambush predator extraordinaire'],
    imageUrl: getCompleteAnimalImageUrl('nile-crocodile', 'reptile'),
    killsPerYear: 745,
    rarity: 'mythic'
  },
  {
    id: 'caiman',
    name: 'Black Caiman',
    category: 'reptile',
    dangerLevel: 4,
    icon: '🐊',
    price: 24.99,
    locations: ['Amazon Basin'],
    description: 'The largest predator in the Amazon',
    facts: ['Can grow up to 20 feet long', 'Apex predator of the Amazon'],
    imageUrl: getCompleteAnimalImageUrl('caiman', 'reptile'),
    killsPerYear: 10,
    rarity: 'rare'
  }
];
