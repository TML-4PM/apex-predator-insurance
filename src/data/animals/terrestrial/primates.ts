
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getAnimalImageUrl } from '../../../utils/imageValidation';

export const primates: DeadlyAnimal[] = [
  {
    id: 'chimpanzee',
    name: 'Chimpanzee',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐵',
    price: 20.99,
    locations: ['Central Africa', 'West Africa'],
    description: 'Our closest living relatives with surprising strength',
    facts: ['5x stronger than humans', 'Use tools for hunting and gathering'],
    imageUrl: getAnimalImageUrl('chimpanzee'),
    killsPerYear: 2,
    rarity: 'uncommon'
  },
  {
    id: 'baboon',
    name: 'Baboon',
    category: 'terrestrial',
    dangerLevel: 2,
    icon: '🐒',
    price: 18.99,
    locations: ['Africa', 'Arabian Peninsula'],
    description: 'Highly social primates with powerful jaws',
    facts: ['Live in troops of up to 300', 'Can run 30 mph'],
    imageUrl: getAnimalImageUrl('baboon'),
    killsPerYear: 1,
    rarity: 'common'
  }
];
