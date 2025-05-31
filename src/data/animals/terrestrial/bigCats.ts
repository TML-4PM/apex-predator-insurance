
import { DeadlyAnimal } from '../../types/DeadlyAnimal';

export const bigCats: DeadlyAnimal[] = [
  {
    id: 'african-lion',
    name: 'African Lion',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🦁',
    price: 28.99,
    locations: ['Kenya', 'Tanzania', 'South Africa', 'Botswana'],
    description: 'The king of the savanna',
    facts: ['Can leap 36 feet horizontally', 'Roar can be heard 5 miles away'],
    imageUrl: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=800&h=600&fit=crop&q=80',
    killsPerYear: 250,
    rarity: 'rare'
  },
  {
    id: 'siberian-tiger',
    name: 'Siberian Tiger',
    category: 'terrestrial',
    dangerLevel: 5,
    icon: '🐅',
    price: 34.99,
    locations: ['Russia', 'China', 'North Korea'],
    description: 'The largest living cat species',
    facts: ['Can reach speeds of 50 mph', 'Night vision 6x better than humans'],
    imageUrl: 'https://images.unsplash.com/photo-1605790237683-4d86d9e1c28e?w=800&h=600&fit=crop&q=80',
    killsPerYear: 50,
    rarity: 'mythic'
  },
  {
    id: 'bengal-tiger',
    name: 'Bengal Tiger',
    category: 'terrestrial',
    dangerLevel: 5,
    icon: '🐅',
    price: 33.99,
    locations: ['India', 'Bangladesh', 'Nepal'],
    description: 'The most numerous tiger subspecies',
    facts: ['Excellent swimmers', 'Can consume 88 pounds of meat in one feeding'],
    imageUrl: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800&h=600&fit=crop&q=80',
    killsPerYear: 85,
    rarity: 'mythic'
  },
  {
    id: 'leopard',
    name: 'Leopard',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🐆',
    price: 27.99,
    locations: ['Africa', 'Asia', 'Middle East'],
    description: 'The stealthiest big cat',
    facts: ['Can carry prey twice their weight up trees', 'Excellent swimmers'],
    imageUrl: 'https://images.unsplash.com/photo-1539066830844-29cb8c84e859?w=800&h=600&fit=crop&q=80',
    killsPerYear: 15,
    rarity: 'rare'
  },
  {
    id: 'jaguar',
    name: 'Jaguar',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🐆',
    price: 29.99,
    locations: ['Amazon', 'Central America', 'Mexico'],
    description: 'The powerhouse of the Americas',
    facts: ['Strongest bite force of any big cat', 'Can crush turtle shells'],
    imageUrl: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&h=600&fit=crop&q=80',
    killsPerYear: 5,
    rarity: 'rare'
  },
  {
    id: 'mountain-lion',
    name: 'Mountain Lion',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🦁',
    price: 22.99,
    locations: ['North America', 'South America'],
    description: 'The silent stalker of the mountains',
    facts: ['Can jump 40 feet horizontally', 'Also known as puma or cougar'],
    imageUrl: 'https://images.unsplash.com/photo-1534567110043-1591d51e30c4?w=800&h=600&fit=crop&q=80',
    killsPerYear: 2,
    rarity: 'uncommon'
  }
];
