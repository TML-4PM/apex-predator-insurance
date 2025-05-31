
import { DeadlyAnimal } from '../types/DeadlyAnimal';

export const aerialAnimals: DeadlyAnimal[] = [
  {
    id: 'golden-eagle',
    name: 'Golden Eagle',
    category: 'aerial',
    dangerLevel: 3,
    icon: '🦅',
    price: 21.99,
    locations: ['North America', 'Europe', 'Asia'],
    description: 'The king of the sky',
    facts: ['Can dive at 150 mph', 'Excellent eyesight'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop&q=80',
    killsPerYear: 0,
    rarity: 'uncommon'
  },
  {
    id: 'harpy-eagle',
    name: 'Harpy Eagle',
    category: 'aerial',
    dangerLevel: 3,
    icon: '🦅',
    price: 23.99,
    locations: ['Amazon Rainforest'],
    description: 'The most powerful eagle in the Americas',
    facts: ['Talons larger than grizzly bear claws', 'Can snatch sloths from trees'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop&q=80',
    killsPerYear: 0,
    rarity: 'rare'
  },
  {
    id: 'great-horned-owl',
    name: 'Great Horned Owl',
    category: 'aerial',
    dangerLevel: 2,
    icon: '🦉',
    price: 16.99,
    locations: ['North America', 'South America'],
    description: 'The silent hunter of the night',
    facts: ['Silent flight feathers', 'Can rotate head 270 degrees'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop&q=80',
    killsPerYear: 0,
    rarity: 'common'
  }
];
