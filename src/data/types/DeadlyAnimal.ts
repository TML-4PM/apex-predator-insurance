
export interface DeadlyAnimal {
  id: string;
  name: string;
  category: 'terrestrial' | 'marine' | 'aerial' | 'reptile' | 'insect';
  dangerLevel: 1 | 2 | 3 | 4 | 5;
  icon: string;
  price: number;
  locations: string[];
  description: string;
  facts: string[];
  imageUrl: string;
  killsPerYear: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'mythic';
}
