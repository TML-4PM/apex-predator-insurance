
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../../utils/completeImageMapping';

export const bears: DeadlyAnimal[] = [
  {
    id: 'grizzly-bear',
    name: 'Grizzly Bear',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🐻',
    price: 9.99,
    locations: ['Alaska', 'Canada', 'Montana', 'Wyoming'],
    description: 'North America\'s apex predator',
    facts: ['Can run 35 mph', 'Sense of smell 7x stronger than bloodhound'],
    imageUrl: getCompleteAnimalImageUrl('grizzly-bear', 'terrestrial'),
    killsPerYear: 1,
    rarity: 'uncommon'
  },
  {
    id: 'polar-bear',
    name: 'Polar Bear',
    category: 'terrestrial',
    dangerLevel: 5,
    icon: '🐻‍❄️',
    price: 9.99,
    locations: ['Arctic Circle', 'Greenland', 'Canada', 'Alaska'],
    description: 'The Arctic\'s apex predator',
    facts: ['Can smell seals 20 miles away', 'Excellent swimmers'],
    imageUrl: getCompleteAnimalImageUrl('polar-bear', 'terrestrial'),
    killsPerYear: 1,
    rarity: 'legendary'
  },
  {
    id: 'kodiak-bear',
    name: 'Kodiak Bear',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🐻',
    price: 9.99,
    locations: ['Kodiak Island', 'Alaska'],
    description: 'The largest brown bear subspecies',
    facts: ['Can weigh up to 1,500 pounds', 'Omnivorous giants'],
    imageUrl: getCompleteAnimalImageUrl('kodiak-bear', 'terrestrial'),
    killsPerYear: 1,
    rarity: 'rare'
  },
  {
    id: 'black-bear',
    name: 'American Black Bear',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐻',
    price: 9.99,
    locations: ['North America', 'Canada', 'USA'],
    description: 'The most common bear in North America',
    facts: ['Excellent climbers', 'Can run 30 mph'],
    imageUrl: getCompleteAnimalImageUrl('black-bear', 'terrestrial'),
    killsPerYear: 1,
    rarity: 'common'
  },
  {
    id: 'sloth-bear',
    name: 'Sloth Bear',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐻',
    price: 9.99,
    locations: ['India', 'Sri Lanka'],
    description: 'The shaggy bear of the Indian subcontinent',
    facts: ['Excellent climbers', 'Feed primarily on insects'],
    imageUrl: getCompleteAnimalImageUrl('sloth-bear', 'terrestrial'),
    killsPerYear: 5,
    rarity: 'uncommon'
  },
  {
    id: 'sun-bear',
    name: 'Sun Bear',
    category: 'terrestrial',
    dangerLevel: 2,
    icon: '🐻',
    price: 9.99,
    locations: ['Southeast Asia'],
    description: 'The smallest bear species',
    facts: ['Excellent climbers', 'Long tongue for honey'],
    imageUrl: getCompleteAnimalImageUrl('sun-bear', 'terrestrial'),
    killsPerYear: 1,
    rarity: 'uncommon'
  }
];
