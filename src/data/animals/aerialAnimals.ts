
import { DeadlyAnimal } from '../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../utils/completeImageMapping';

export const aerialAnimals: DeadlyAnimal[] = [
  {
    id: 'golden-eagle',
    name: 'Golden Eagle',
    category: 'aerial',
    dangerLevel: 3,
    icon: '🦅',
    price: 9.99,
    locations: ['North America', 'Europe', 'Asia'],
    description: 'The king of the sky',
    facts: ['Can dive at 150 mph', 'Excellent eyesight'],
    imageUrl: getCompleteAnimalImageUrl('golden-eagle', 'aerial'),
    killsPerYear: 0,
    rarity: 'uncommon'
  },
  {
    id: 'harpy-eagle',
    name: 'Harpy Eagle',
    category: 'aerial',
    dangerLevel: 3,
    icon: '🦅',
    price: 9.99,
    locations: ['Amazon Rainforest'],
    description: 'The most powerful eagle in the Americas',
    facts: ['Talons larger than grizzly bear claws', 'Can snatch sloths from trees'],
    imageUrl: getCompleteAnimalImageUrl('harpy-eagle', 'aerial'),
    killsPerYear: 0,
    rarity: 'rare'
  },
  {
    id: 'great-horned-owl',
    name: 'Great Horned Owl',
    category: 'aerial',
    dangerLevel: 2,
    icon: '🦉',
    price: 9.99,
    locations: ['North America', 'South America'],
    description: 'The silent hunter of the night',
    facts: ['Silent flight feathers', 'Can rotate head 270 degrees'],
    imageUrl: getCompleteAnimalImageUrl('great-horned-owl', 'aerial'),
    killsPerYear: 0,
    rarity: 'common'
  },
  {
    id: 'secretary-bird',
    name: 'Secretary Bird',
    category: 'aerial',
    dangerLevel: 3,
    icon: '🦅',
    price: 9.99,
    locations: ['Sub-Saharan Africa'],
    description: 'The snake-killing bird of prey',
    facts: ['Kicks with force of 5x its body weight', 'Can kill venomous snakes'],
    imageUrl: getCompleteAnimalImageUrl('secretary-bird', 'aerial'),
    killsPerYear: 0,
    rarity: 'uncommon'
  },
  {
    id: 'bald-eagle',
    name: 'Bald Eagle',
    category: 'aerial',
    dangerLevel: 3,
    icon: '🦅',
    price: 9.99,
    locations: ['North America'],
    description: 'The symbol of American power',
    facts: ['Can dive at 100 mph', 'Builds largest bird nests'],
    imageUrl: getCompleteAnimalImageUrl('bald-eagle', 'aerial'),
    killsPerYear: 0,
    rarity: 'uncommon'
  },
  {
    id: 'stellers-sea-eagle',
    name: 'Steller\'s Sea Eagle',
    category: 'aerial',
    dangerLevel: 3,
    icon: '🦅',
    price: 9.99,
    locations: ['Russia', 'Japan'],
    description: 'One of the heaviest eagles on Earth',
    facts: ['Weighs up to 20 pounds', 'Massive 8-foot wingspan'],
    imageUrl: getCompleteAnimalImageUrl('stellers-sea-eagle', 'aerial'),
    killsPerYear: 0,
    rarity: 'rare'
  },
  {
    id: 'peregrine-falcon',
    name: 'Peregrine Falcon',
    category: 'aerial',
    dangerLevel: 3,
    icon: '🦅',
    price: 9.99,
    locations: ['Global Distribution'],
    description: 'The fastest animal on the planet',
    facts: ['Diving speed exceeds 240 mph', 'Found on every continent except Antarctica'],
    imageUrl: getCompleteAnimalImageUrl('peregrine-falcon', 'aerial'),
    killsPerYear: 0,
    rarity: 'uncommon'
  },
  {
    id: 'goshawk',
    name: 'Northern Goshawk',
    category: 'aerial',
    dangerLevel: 2,
    icon: '🦅',
    price: 9.99,
    locations: ['Northern Hemisphere'],
    description: 'The fierce forest hunter',
    facts: ['Aggressive defender of territory', 'Can navigate dense forests at high speed'],
    imageUrl: getCompleteAnimalImageUrl('goshawk', 'aerial'),
    killsPerYear: 0,
    rarity: 'common'
  }
];
