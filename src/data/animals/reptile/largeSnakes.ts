
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../../utils/completeImageMapping';

export const largeSnakes: DeadlyAnimal[] = [
  {
    id: 'anaconda',
    name: 'Green Anaconda',
    category: 'reptile',
    dangerLevel: 4,
    icon: '🐍',
    price: 9.99,
    locations: ['Amazon Basin', 'South America'],
    description: 'The heaviest snake in the world',
    facts: ['Can weigh over 550 pounds', 'Excellent swimmers'],
    imageUrl: getCompleteAnimalImageUrl('anaconda', 'reptile'),
    killsPerYear: 1,
    rarity: 'rare'
  },
  {
    id: 'reticulated-python',
    name: 'Reticulated Python',
    category: 'reptile',
    dangerLevel: 3,
    icon: '🐍',
    price: 9.99,
    locations: ['Southeast Asia', 'Indonesia', 'Philippines'],
    description: 'The world\'s longest snake',
    facts: ['Can grow over 30 feet long', 'Excellent swimmers and climbers'],
    imageUrl: getCompleteAnimalImageUrl('reticulated-python', 'reptile'),
    killsPerYear: 3,
    rarity: 'uncommon'
  }
];
