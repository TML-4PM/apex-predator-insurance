
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../../utils/completeImageMapping';

export const miscellaneousMarine: DeadlyAnimal[] = [
  {
    id: 'cone-snail',
    name: 'Cone Snail',
    category: 'marine',
    dangerLevel: 4,
    icon: '🐚',
    price: 9.99,
    locations: ['Indo-Pacific', 'Caribbean'],
    description: 'Beautiful but deadly mollusk',
    facts: ['Shoots venomous darts', 'No antivenom exists'],
    imageUrl: getCompleteAnimalImageUrl('cone-snail', 'marine'),
    killsPerYear: 3,
    rarity: 'rare'
  },
  {
    id: 'orca',
    name: 'Orca (Killer Whale)',
    category: 'marine',
    dangerLevel: 4,
    icon: '🐋',
    price: 9.99,
    locations: ['Global Oceans'],
    description: 'The ocean\'s apex predator',
    facts: ['Hunt in coordinated pods', 'Can beach themselves to catch prey'],
    imageUrl: getCompleteAnimalImageUrl('orca', 'marine'),
    killsPerYear: 0,
    rarity: 'rare'
  },
  {
    id: 'stingray',
    name: 'Southern Stingray',
    category: 'marine',
    dangerLevel: 3,
    icon: '🎣',
    price: 9.99,
    locations: ['Caribbean', 'Gulf of Mexico', 'Atlantic Coast'],
    description: 'The graceful glider with a venomous barb',
    facts: ['Barbed tail delivers painful venom', 'Can bury themselves in sand'],
    imageUrl: getCompleteAnimalImageUrl('stingray', 'marine'),
    killsPerYear: 2,
    rarity: 'uncommon'
  }
];
