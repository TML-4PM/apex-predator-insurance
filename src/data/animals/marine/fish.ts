
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../../utils/completeImageMapping';

export const fish: DeadlyAnimal[] = [
  {
    id: 'stonefish',
    name: 'Stonefish',
    category: 'marine',
    dangerLevel: 4,
    icon: '🐠',
    price: 9.99,
    locations: ['Australia', 'Indo-Pacific'],
    description: 'Most venomous fish in the world',
    facts: ['Perfectly camouflaged as rock', 'Venom causes excruciating pain'],
    imageUrl: getCompleteAnimalImageUrl('stonefish', 'marine'),
    killsPerYear: 5,
    rarity: 'rare'
  },
  {
    id: 'barracuda',
    name: 'Great Barracuda',
    category: 'marine',
    dangerLevel: 3,
    icon: '🐟',
    price: 9.99,
    locations: ['Tropical Waters', 'Caribbean'],
    description: 'The torpedo of the sea',
    facts: ['Can reach speeds of 36 mph', 'Razor-sharp teeth'],
    imageUrl: getCompleteAnimalImageUrl('barracuda', 'marine'),
    killsPerYear: 1,
    rarity: 'uncommon'
  }
];
