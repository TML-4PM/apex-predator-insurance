
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../../utils/completeImageMapping';

export const sharks: DeadlyAnimal[] = [
  {
    id: 'great-white-shark',
    name: 'Great White Shark',
    category: 'marine',
    dangerLevel: 5,
    icon: '🦈',
    price: 29.99,
    locations: ['Australia', 'South Africa', 'California', 'Mexico'],
    description: 'The apex predator of the ocean',
    facts: ['Can detect a drop of blood in 25 gallons of water', 'Reaches speeds of 35 mph'],
    imageUrl: getCompleteAnimalImageUrl('great-white-shark', 'marine'),
    killsPerYear: 10,
    rarity: 'legendary'
  },
  {
    id: 'tiger-shark',
    name: 'Tiger Shark',
    category: 'marine',
    dangerLevel: 4,
    icon: '🦈',
    price: 27.99,
    locations: ['Pacific Ocean', 'Indian Ocean', 'Caribbean'],
    description: 'The garbage disposal of the sea',
    facts: ['Will eat almost anything', 'Has serrated teeth like a saw'],
    imageUrl: getCompleteAnimalImageUrl('tiger-shark', 'marine'),
    killsPerYear: 8,
    rarity: 'rare'
  },
  {
    id: 'bull-shark',
    name: 'Bull Shark',
    category: 'marine',
    dangerLevel: 4,
    icon: '🦈',
    price: 26.99,
    locations: ['Global Coastal Waters', 'Rivers', 'Lakes'],
    description: 'The most aggressive shark species',
    facts: ['Can swim in fresh water', 'Highest testosterone levels of any animal'],
    imageUrl: getCompleteAnimalImageUrl('bull-shark', 'marine'),
    killsPerYear: 12,
    rarity: 'rare'
  },
  {
    id: 'hammerhead-shark',
    name: 'Great Hammerhead Shark',
    category: 'marine',
    dangerLevel: 4,
    icon: '🦈',
    price: 25.99,
    locations: ['Tropical Oceans Worldwide'],
    description: 'The hammer-headed apex predator',
    facts: ['360-degree vision', 'Can sense electrical fields'],
    imageUrl: getCompleteAnimalImageUrl('hammerhead-shark', 'marine'),
    killsPerYear: 3,
    rarity: 'rare'
  },
  {
    id: 'blue-shark',
    name: 'Blue Shark',
    category: 'marine',
    dangerLevel: 3,
    icon: '🦈',
    price: 20.99,
    locations: ['Open Ocean Worldwide'],
    description: 'The elegant ocean wanderer',
    facts: ['Can migrate up to 5,500 miles', 'Excellent vision in low light'],
    imageUrl: getCompleteAnimalImageUrl('blue-shark', 'marine'),
    killsPerYear: 2,
    rarity: 'uncommon'
  }
];
