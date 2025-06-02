
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getAnimalImageUrl } from '../../../utils/imageValidation';

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
    imageUrl: getAnimalImageUrl('sperm-whale'),
    killsPerYear: 0,
    rarity: 'rare'
  }
];
