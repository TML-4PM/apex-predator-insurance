
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../../utils/completeImageMapping';

export const canines: DeadlyAnimal[] = [
  {
    id: 'african-wild-dog',
    name: 'African Wild Dog',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐕',
    price: 9.99,
    locations: ['Sub-Saharan Africa'],
    description: 'Africa\'s most efficient predator',
    facts: ['80% hunting success rate', 'Pack hunters with incredible endurance'],
    imageUrl: getCompleteAnimalImageUrl('african-wild-dog', 'terrestrial'),
    killsPerYear: 3,
    rarity: 'rare'
  },
  {
    id: 'coyote',
    name: 'Coyote',
    category: 'terrestrial',
    dangerLevel: 2,
    icon: '🐺',
    price: 9.99,
    locations: ['North America'],
    description: 'The adaptable urban predator',
    facts: ['Highly adaptable to urban environments', 'Can run 43 mph'],
    imageUrl: getCompleteAnimalImageUrl('coyote', 'terrestrial'),
    killsPerYear: 1,
    rarity: 'common'
  }
];
