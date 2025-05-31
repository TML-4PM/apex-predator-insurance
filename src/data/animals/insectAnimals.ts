
import { DeadlyAnimal } from '../types/DeadlyAnimal';

export const insectAnimals: DeadlyAnimal[] = [
  {
    id: 'brazilian-wandering-spider',
    name: 'Brazilian Wandering Spider',
    category: 'insect',
    dangerLevel: 4,
    icon: '🕷️',
    price: 18.99,
    locations: ['Brazil', 'Central America', 'South America'],
    description: 'World\'s most venomous spider',
    facts: ['Aggressive and fast-moving', 'Venom causes painful erections'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Brazilian_wandering_spider.jpg',
    killsPerYear: 5,
    rarity: 'rare'
  },
  {
    id: 'sydney-funnel-web',
    name: 'Sydney Funnel-Web Spider',
    category: 'insect',
    dangerLevel: 4,
    icon: '🕷️',
    price: 19.99,
    locations: ['Sydney', 'Australia'],
    description: 'Australia\'s most dangerous spider',
    facts: ['Male is more venomous than female', 'Can survive underwater for hours'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Atrax_robustus.jpg',
    killsPerYear: 2,
    rarity: 'rare'
  },
  {
    id: 'black-widow',
    name: 'Black Widow Spider',
    category: 'insect',
    dangerLevel: 3,
    icon: '🕷️',
    price: 16.99,
    locations: ['North America', 'Australia'],
    description: 'The infamous red hourglass spider',
    facts: ['Female eats male after mating', 'Venom is 15x stronger than rattlesnake'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Latrodectus_mactans_adult_female.jpg',
    killsPerYear: 1,
    rarity: 'uncommon'
  },
  {
    id: 'deathstalker-scorpion',
    name: 'Deathstalker Scorpion',
    category: 'insect',
    dangerLevel: 4,
    icon: '🦂',
    price: 20.99,
    locations: ['Middle East', 'North Africa'],
    description: 'One of the most dangerous scorpions',
    facts: ['Venom contains neurotoxins', 'Glows under UV light'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Leiurus_quinquestriatus.jpg',
    killsPerYear: 2,
    rarity: 'rare'
  },
  {
    id: 'bullet-ant',
    name: 'Bullet Ant',
    category: 'insect',
    dangerLevel: 3,
    icon: '🐜',
    price: 15.99,
    locations: ['Central America', 'South America'],
    description: 'The ant with the most painful sting',
    facts: ['Sting feels like being shot', 'Pain lasts up to 24 hours'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Paraponera_clavata_%28Bullet_ant%29_P1100135.JPG',
    killsPerYear: 0,
    rarity: 'uncommon'
  },
  {
    id: 'tsetse-fly',
    name: 'Tsetse Fly',
    category: 'insect',
    dangerLevel: 4,
    icon: '🪰',
    price: 17.99,
    locations: ['Sub-Saharan Africa'],
    description: 'The fly that carries sleeping sickness',
    facts: ['Transmits deadly parasites', 'Responsible for thousands of deaths annually'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/TsetseflyCDC.jpg',
    killsPerYear: 10000,
    rarity: 'uncommon'
  },
  {
    id: 'kissing-bug',
    name: 'Kissing Bug',
    category: 'insect',
    dangerLevel: 3,
    icon: '🪲',
    price: 16.99,
    locations: ['Americas'],
    description: 'The bug that kisses you to death',
    facts: ['Transmits Chagas disease', 'Feeds on blood at night'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Triatoma_infestans_PHIL_613_lores.jpg',
    killsPerYear: 7000,
    rarity: 'uncommon'
  }
];
