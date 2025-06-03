
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../../utils/completeImageMapping';

export const whales: DeadlyAnimal[] = [
  {
    id: 'sperm-whale',
    name: 'Sperm Whale',
    category: 'marine',
    dangerLevel: 3,
    icon: '🐋',
    price: 26.99,
    locations: ['Deep Ocean Waters Worldwide'],
    description: 'The deep-diving giant with the largest brain',
    facts: ['Can dive 7,000 feet deep', 'Battles giant squid in the depths'],
    imageUrl: getCompleteAnimalImageUrl('sperm-whale', 'marine'),
    killsPerYear: 0,
    rarity: 'rare'
  }
];
