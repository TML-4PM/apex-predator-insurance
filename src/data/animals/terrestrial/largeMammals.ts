
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../../utils/completeImageMapping';

export const largeMammals: DeadlyAnimal[] = [
  {
    id: 'hippopotamus',
    name: 'Hippopotamus',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🦛',
    price: 9.99,
    locations: ['Sub-Saharan Africa'],
    description: 'Africa\'s most dangerous large mammal',
    facts: ['Can run 30 mph on land', 'Kills more humans than any other large animal in Africa'],
    imageUrl: getCompleteAnimalImageUrl('hippopotamus', 'terrestrial'),
    killsPerYear: 500,
    rarity: 'rare'
  },
  {
    id: 'african-elephant',
    name: 'African Elephant',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐘',
    price: 9.99,
    locations: ['Sub-Saharan Africa'],
    description: 'The largest land animal',
    facts: ['Can weigh up to 14,000 pounds', 'Excellent memory'],
    imageUrl: getCompleteAnimalImageUrl('african-elephant', 'terrestrial'),
    killsPerYear: 100,
    rarity: 'uncommon'
  },
  {
    id: 'cape-buffalo',
    name: 'Cape Buffalo',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🐃',
    price: 9.99,
    locations: ['Sub-Saharan Africa'],
    description: 'One of Africa\'s Big Five',
    facts: ['Never been domesticated', 'Known to ambush hunters'],
    imageUrl: getCompleteAnimalImageUrl('cape-buffalo', 'terrestrial'),
    killsPerYear: 200,
    rarity: 'rare'
  },
  {
    id: 'asian-elephant',
    name: 'Asian Elephant',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐘',
    price: 9.99,
    locations: ['India', 'Southeast Asia'],
    description: 'The intelligent giant of Asia',
    facts: ['Smaller than African elephants', 'Highly intelligent'],
    imageUrl: getCompleteAnimalImageUrl('asian-elephant', 'terrestrial'),
    killsPerYear: 400,
    rarity: 'uncommon'
  }
];
