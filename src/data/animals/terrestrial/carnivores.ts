
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../../utils/completeImageMapping';

export const carnivores: DeadlyAnimal[] = [
  {
    id: 'spotted-hyena',
    name: 'Spotted Hyena',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐺',
    price: 9.99,
    locations: ['Sub-Saharan Africa'],
    description: 'The laughing scavenger with powerful jaws',
    facts: ['Bite force of 1,100 PSI', 'Matriarchal society'],
    imageUrl: getCompleteAnimalImageUrl('spotted-hyena', 'terrestrial'),
    killsPerYear: 10,
    rarity: 'uncommon'
  },
  {
    id: 'gray-wolf',
    name: 'Gray Wolf',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐺',
    price: 9.99,
    locations: ['Alaska', 'Canada', 'Northern USA'],
    description: 'The apex predator of the northern wilderness',
    facts: ['Pack hunters with complex social structure', 'Can run 40 mph'],
    imageUrl: getCompleteAnimalImageUrl('gray-wolf', 'terrestrial'),
    killsPerYear: 2,
    rarity: 'uncommon'
  },
  {
    id: 'wolverine',
    name: 'Wolverine',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🦡',
    price: 9.99,
    locations: ['Alaska', 'Canada', 'Northern USA'],
    description: 'The fierce mustelid with incredible strength',
    facts: ['Can take down prey 5x their size', 'Incredible endurance'],
    imageUrl: getCompleteAnimalImageUrl('wolverine', 'terrestrial'),
    killsPerYear: 0,
    rarity: 'rare'
  }
];
