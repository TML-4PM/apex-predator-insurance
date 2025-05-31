
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
    imageUrl: 'https://images.unsplash.com/photo-1586861256632-52a3db3a26ff?w=800&h=600&fit=crop&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1586861256632-52a3db3a26ff?w=800&h=600&fit=crop&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1586861256632-52a3db3a26ff?w=800&h=600&fit=crop&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1586861256632-52a3db3a26ff?w=800&h=600&fit=crop&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1586861256632-52a3db3a26ff?w=800&h=600&fit=crop&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1586861256632-52a3db3a26ff?w=800&h=600&fit=crop&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1586861256632-52a3db3a26ff?w=800&h=600&fit=crop&q=80',
    killsPerYear: 7000,
    rarity: 'uncommon'
  }
];
