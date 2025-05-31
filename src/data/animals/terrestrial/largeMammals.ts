
import { DeadlyAnimal } from '../../types/DeadlyAnimal';

export const largeMammals: DeadlyAnimal[] = [
  {
    id: 'hippopotamus',
    name: 'Hippopotamus',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🦛',
    price: 24.99,
    locations: ['Sub-Saharan Africa'],
    description: 'Africa\'s most dangerous large mammal',
    facts: ['Can run 30 mph on land', 'Kills more humans than any other large animal in Africa'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Hippo_pod_edit.jpg',
    killsPerYear: 500,
    rarity: 'rare'
  },
  {
    id: 'african-elephant',
    name: 'African Elephant',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐘',
    price: 26.99,
    locations: ['Sub-Saharan Africa'],
    description: 'The largest land animal',
    facts: ['Can weigh up to 14,000 pounds', 'Excellent memory'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg',
    killsPerYear: 100,
    rarity: 'uncommon'
  },
  {
    id: 'cape-buffalo',
    name: 'Cape Buffalo',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🐃',
    price: 23.99,
    locations: ['Sub-Saharan Africa'],
    description: 'One of Africa\'s Big Five',
    facts: ['Never been domesticated', 'Known to ambush hunters'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/African_buffalo_Syncerus_caffer.jpg',
    killsPerYear: 200,
    rarity: 'rare'
  },
  {
    id: 'asian-elephant',
    name: 'Asian Elephant',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐘',
    price: 25.99,
    locations: ['India', 'Southeast Asia'],
    description: 'The intelligent giant of Asia',
    facts: ['Smaller than African elephants', 'Highly intelligent'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Asian_Elephant_%28Elephas_maximus%29_female_and_calf.jpg',
    killsPerYear: 400,
    rarity: 'uncommon'
  }
];
