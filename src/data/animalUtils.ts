
import { DeadlyAnimal } from './types/DeadlyAnimal';
import { marineAnimals } from './animals/marineAnimals';
import { terrestrialAnimals } from './animals/terrestrialAnimals';
import { reptileAnimals } from './animals/reptileAnimals';
import { aerialAnimals } from './animals/aerialAnimals';
import { insectAnimals } from './animals/insectAnimals';

export const deadlyAnimals: DeadlyAnimal[] = [
  ...marineAnimals,
  ...terrestrialAnimals,
  ...reptileAnimals,
  ...aerialAnimals,
  ...insectAnimals
];

export const getAnimalByCategory = (category: string) => {
  return deadlyAnimals.filter(animal => animal.category === category);
};

export const getAnimalById = (id: string) => {
  return deadlyAnimals.find(animal => animal.id === id);
};

export const getRandomAnimal = () => {
  return deadlyAnimals[Math.floor(Math.random() * deadlyAnimals.length)];
};

export const getFeaturedAnimals = (count: number = 8) => {
  return deadlyAnimals
    .filter(animal => animal.rarity === 'legendary' || animal.rarity === 'mythic')
    .slice(0, count);
};

export const getAnimalsByRarity = (rarity: string) => {
  return deadlyAnimals.filter(animal => animal.rarity === rarity);
};
