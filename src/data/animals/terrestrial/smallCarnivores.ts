
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../../utils/completeImageMapping';

export const smallCarnivores: DeadlyAnimal[] = [
  {
    id: 'tasmanian-devil',
    name: 'Tasmanian Devil',
    category: 'terrestrial',
    dangerLevel: 2,
    icon: '😈',
    price: 9.99,
    locations: ['Tasmania'],
    description: 'The feisty marsupial with powerful jaws',
    facts: ['Strongest bite relative to body size', 'Can eat 40% of body weight daily'],
    imageUrl: getCompleteAnimalImageUrl('tasmanian-devil', 'terrestrial'),
    killsPerYear: 0,
    rarity: 'uncommon'
  },
  {
    id: 'dingo',
    name: 'Dingo',
    category: 'terrestrial',
    dangerLevel: 2,
    icon: '🐕',
    price: 9.99,
    locations: ['Australia'],
    description: 'Australia\'s wild dog',
    facts: ['Pack hunters', 'Can rotate head 180 degrees'],
    imageUrl: getCompleteAnimalImageUrl('dingo', 'terrestrial'),
    killsPerYear: 1,
    rarity: 'common'
  },
  {
    id: 'bobcat',
    name: 'Bobcat',
    category: 'terrestrial',
    dangerLevel: 2,
    icon: '🐱',
    price: 9.99,
    locations: ['North America'],
    description: 'The stealthy wild cat of North America',
    facts: ['Excellent climbers and swimmers', 'Can leap 12 feet high'],
    imageUrl: getCompleteAnimalImageUrl('bobcat', 'terrestrial'),
    killsPerYear: 0,
    rarity: 'common'
  }
];
