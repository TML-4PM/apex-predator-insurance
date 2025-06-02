
import { DeadlyAnimal } from '../types/DeadlyAnimal';
import { bigCats } from './terrestrial/bigCats';
import { bears } from './terrestrial/bears';
import { largeMammals } from './terrestrial/largeMammals';
import { carnivores } from './terrestrial/carnivores';
import { smallCarnivores } from './terrestrial/smallCarnivores';
import { primates } from './terrestrial/primates';
import { canines } from './terrestrial/canines';

export const terrestrialAnimals: DeadlyAnimal[] = [
  ...bigCats,
  ...bears,
  ...largeMammals,
  ...carnivores,
  ...smallCarnivores,
  ...primates,
  ...canines
];
