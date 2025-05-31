
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Golden_Eagle_in_flight_-_5.jpg',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Harpia_harpyja_-Belize_Zoo-8a.jpg',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Bubo_virginianus_06.jpg',
    killsPerYear: 0,
    rarity: 'common'
  }
];
