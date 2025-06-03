
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../../utils/completeImageMapping';

export const cephalopods: DeadlyAnimal[] = [
  {
    id: 'blue-ringed-octopus',
    name: 'Blue-Ringed Octopus',
    category: 'marine',
    dangerLevel: 5,
    icon: '🐙',
    price: 22.99,
    locations: ['Australia', 'Japan', 'Indonesia'],
    description: 'Small but extremely venomous',
    facts: ['Size of golf ball but can kill 26 adults', 'No known antidote'],
    imageUrl: getCompleteAnimalImageUrl('blue-ringed-octopus', 'marine'),
    killsPerYear: 3,
    rarity: 'legendary'
  }
];
