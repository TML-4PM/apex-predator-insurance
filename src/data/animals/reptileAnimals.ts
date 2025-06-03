
import { DeadlyAnimal } from '../types/DeadlyAnimal';
import { crocodilians } from './reptile/crocodilians';
import { venomousSnakes } from './reptile/venomousSnakes';
import { largeSnakes } from './reptile/largeSnakes';
import { lizards } from './reptile/lizards';

export const reptileAnimals: DeadlyAnimal[] = [
  ...crocodilians,
  ...venomousSnakes,
  ...largeSnakes,
  ...lizards
];
