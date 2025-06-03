
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../../utils/completeImageMapping';

export const jellyfish: DeadlyAnimal[] = [
  {
    id: 'box-jellyfish',
    name: 'Box Jellyfish',
    category: 'marine',
    dangerLevel: 5,
    icon: '🪼',
    price: 24.99,
    locations: ['Australia', 'Thailand', 'Malaysia', 'Philippines'],
    description: 'One of the most venomous creatures on Earth',
    facts: ['Venom can kill in 2-5 minutes', 'Nearly transparent in water'],
    imageUrl: getCompleteAnimalImageUrl('box-jellyfish', 'marine'),
    killsPerYear: 70,
    rarity: 'legendary'
  },
  {
    id: 'portuguese-man-o-war',
    name: 'Portuguese Man o\' War',
    category: 'marine',
    dangerLevel: 4,
    icon: '🪼',
    price: 23.99,
    locations: ['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean'],
    description: 'The floating terror with deadly tentacles',
    facts: ['Tentacles can extend 165 feet', 'Stings remain venomous after death'],
    imageUrl: getCompleteAnimalImageUrl('portuguese-man-o-war', 'marine'),
    killsPerYear: 15,
    rarity: 'rare'
  }
];
