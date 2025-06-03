
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../../utils/completeImageMapping';

export const eels: DeadlyAnimal[] = [
  {
    id: 'moray-eel',
    name: 'Giant Moray Eel',
    category: 'marine',
    dangerLevel: 3,
    icon: '🐍',
    price: 9.99,
    locations: ['Tropical Reefs Worldwide'],
    description: 'The serpent of the coral reef',
    facts: ['Has two sets of jaws', 'Can grow up to 10 feet long'],
    imageUrl: getCompleteAnimalImageUrl('moray-eel', 'marine'),
    killsPerYear: 1,
    rarity: 'uncommon'
  },
  {
    id: 'electric-eel',
    name: 'Electric Eel',
    category: 'marine',
    dangerLevel: 3,
    icon: '⚡',
    price: 9.99,
    locations: ['Amazon River Basin'],
    description: 'The living electric generator',
    facts: ['Can produce 600-volt electric shocks', 'Actually a type of knifefish'],
    imageUrl: getCompleteAnimalImageUrl('electric-eel', 'marine'),
    killsPerYear: 1,
    rarity: 'uncommon'
  }
];
