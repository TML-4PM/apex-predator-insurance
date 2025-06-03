
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../../utils/completeImageMapping';

export const lizards: DeadlyAnimal[] = [
  {
    id: 'komodo-dragon',
    name: 'Komodo Dragon',
    category: 'reptile',
    dangerLevel: 5,
    icon: '🦎',
    price: 28.99,
    locations: ['Indonesia'],
    description: 'The world\'s largest lizard',
    facts: ['Can run 13 mph', 'Venomous bite prevents blood clotting'],
    imageUrl: getCompleteAnimalImageUrl('komodo-dragon', 'reptile'),
    killsPerYear: 5,
    rarity: 'mythic'
  },
  {
    id: 'monitor-lizard',
    name: 'Water Monitor',
    category: 'reptile',
    dangerLevel: 3,
    icon: '🦎',
    price: 19.99,
    locations: ['Southeast Asia'],
    description: 'The aquatic giant lizard',
    facts: ['Can grow up to 9 feet long', 'Excellent swimmers'],
    imageUrl: getCompleteAnimalImageUrl('monitor-lizard', 'reptile'),
    killsPerYear: 1,
    rarity: 'uncommon'
  }
];
