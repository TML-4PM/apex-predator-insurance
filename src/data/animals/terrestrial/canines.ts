
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getAnimalImageUrl } from '../../../utils/imageValidation';

export const canines: DeadlyAnimal[] = [
  {
    id: 'african-wild-dog',
    name: 'African Wild Dog',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐕',
    price: 22.99,
    locations: ['Sub-Saharan Africa'],
    description: 'Africa\'s most efficient predator',
    facts: ['80% hunting success rate', 'Pack hunters with incredible endurance'],
    imageUrl: getAnimalImageUrl('african-wild-dog'),
    killsPerYear: 3,
    rarity: 'rare'
  },
  {
    id: 'coyote',
    name: 'Coyote',
    category: 'terrestrial',
    dangerLevel: 2,
    icon: '🐺',
    price: 16.99,
    locations: ['North America'],
    description: 'The adaptable urban predator',
    facts: ['Highly adaptable to urban environments', 'Can run 43 mph'],
    imageUrl: getAnimalImageUrl('coyote'),
    killsPerYear: 1,
    rarity: 'common'
  }
];
