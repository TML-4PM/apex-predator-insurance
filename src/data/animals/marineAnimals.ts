
import { DeadlyAnimal } from '../types/DeadlyAnimal';
import { sharks } from './marine/sharks';
import { jellyfish } from './marine/jellyfish';
import { cephalopods } from './marine/cephalopods';
import { fish } from './marine/fish';
import { eels } from './marine/eels';
import { miscellaneousMarine } from './marine/miscellaneous';
import { rays } from './marine/rays';
import { whales } from './marine/whales';

export const marineAnimals: DeadlyAnimal[] = [
  ...sharks,
  ...jellyfish,
  ...cephalopods,
  ...fish,
  ...eels,
  ...miscellaneousMarine,
  ...rays,
  ...whales
];
