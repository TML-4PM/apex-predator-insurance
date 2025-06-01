
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getAnimalImageUrl } from '../../../utils/imageValidation';

export const carnivores: DeadlyAnimal[] = [
  {
    id: 'spotted-hyena',
    name: 'Spotted Hyena',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐺',
    price: 19.99,
    locations: ['Sub-Saharan Africa'],
    description: 'The laughing scavenger with powerful jaws',
    facts: ['Bite force of 1,100 PSI', 'Matriarchal society'],
    imageUrl: getAnimalImageUrl('spotted-hyena'),
    killsPerYear: 10,
    rarity: 'uncommon'
  },
  {
    id: 'gray-wolf',
    name: 'Gray Wolf',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐺',
    price: 21.99,
    locations: ['Alaska', 'Canada', 'Northern USA'],
    description: 'The apex predator of the northern wilderness',
    facts: ['Pack hunters with complex social structure', 'Can run 40 mph'],
    imageUrl: getAnimalImageUrl('gray-wolf'),
    killsPerYear: 2,
    rarity: 'uncommon'
  },
  {
    id: 'wolverine',
    name: 'Wolverine',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🦡',
    price: 23.99,
    locations: ['Alaska', 'Canada', 'Northern USA'],
    description: 'The fierce mustelid with incredible strength',
    facts: ['Can take down prey 5x their size', 'Incredible endurance'],
    imageUrl: getAnimalImageUrl('wolverine'),
    killsPerYear: 0,
    rarity: 'rare'
  }
];
