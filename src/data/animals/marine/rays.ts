
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../../utils/completeImageMapping';

export const rays: DeadlyAnimal[] = [
  {
    id: 'manta-ray',
    name: 'Giant Manta Ray',
    category: 'marine',
    dangerLevel: 1,
    icon: '🟫',
    price: 24.99,
    locations: ['Tropical Oceans Worldwide'],
    description: 'The gentle giant of the ocean',
    facts: ['Wingspan up to 29 feet', 'Filter feeds on plankton'],
    imageUrl: getCompleteAnimalImageUrl('manta-ray', 'marine'),
    killsPerYear: 0,
    rarity: 'rare'
  },
  {
    id: 'electric-ray',
    name: 'Electric Ray',
    category: 'marine',
    dangerLevel: 3,
    icon: '⚡',
    price: 21.99,
    locations: ['Warm Ocean Waters'],
    description: 'The shocking bottom dweller',
    facts: ['Can generate 220 volts', 'Stuns prey with electric discharge'],
    imageUrl: getCompleteAnimalImageUrl('electric-ray', 'marine'),
    killsPerYear: 1,
    rarity: 'uncommon'
  }
];
