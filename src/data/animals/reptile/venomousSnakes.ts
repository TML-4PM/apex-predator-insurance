
import { DeadlyAnimal } from '../../types/DeadlyAnimal';
import { getCompleteAnimalImageUrl } from '../../../utils/completeImageMapping';

export const venomousSnakes: DeadlyAnimal[] = [
  {
    id: 'inland-taipan',
    name: 'Inland Taipan',
    category: 'reptile',
    dangerLevel: 5,
    icon: '🐍',
    price: 23.99,
    locations: ['Australia'],
    description: 'The world\'s most venomous snake',
    facts: ['One bite can kill 100 adults', 'Venom is 50x more toxic than cobra'],
    imageUrl: getCompleteAnimalImageUrl('inland-taipan', 'reptile'),
    killsPerYear: 1,
    rarity: 'mythic'
  },
  {
    id: 'black-mamba',
    name: 'Black Mamba',
    category: 'reptile',
    dangerLevel: 5,
    icon: '🐍',
    price: 25.99,
    locations: ['South Africa', 'Botswana', 'Kenya'],
    description: 'Africa\'s deadliest snake',
    facts: ['Fastest snake in the world at 12.5 mph', '100% fatal without antivenom'],
    imageUrl: getCompleteAnimalImageUrl('black-mamba', 'reptile'),
    killsPerYear: 20000,
    rarity: 'legendary'
  },
  {
    id: 'king-cobra',
    name: 'King Cobra',
    category: 'reptile',
    dangerLevel: 5,
    icon: '🐍',
    price: 27.99,
    locations: ['India', 'Southeast Asia', 'China'],
    description: 'The world\'s longest venomous snake',
    facts: ['Can grow up to 18 feet long', 'Can rear up to 6 feet high'],
    imageUrl: getCompleteAnimalImageUrl('king-cobra', 'reptile'),
    killsPerYear: 5000,
    rarity: 'legendary'
  },
  {
    id: 'eastern-diamondback',
    name: 'Eastern Diamondback Rattlesnake',
    category: 'reptile',
    dangerLevel: 4,
    icon: '🐍',
    price: 21.99,
    locations: ['Southeastern USA'],
    description: 'The largest venomous snake in North America',
    facts: ['Can strike two-thirds of its body length', 'Rattle warns of danger'],
    imageUrl: getCompleteAnimalImageUrl('eastern-diamondback', 'reptile'),
    killsPerYear: 5,
    rarity: 'rare'
  },
  {
    id: 'gaboon-viper',
    name: 'Gaboon Viper',
    category: 'reptile',
    dangerLevel: 4,
    icon: '🐍',
    price: 24.99,
    locations: ['Central Africa', 'West Africa'],
    description: 'The snake with the longest fangs',
    facts: ['Fangs can be 2 inches long', 'Perfectly camouflaged'],
    imageUrl: getCompleteAnimalImageUrl('gaboon-viper', 'reptile'),
    killsPerYear: 10,
    rarity: 'rare'
  },
  {
    id: 'fer-de-lance',
    name: 'Fer-de-Lance',
    category: 'reptile',
    dangerLevel: 4,
    icon: '🐍',
    price: 22.99,
    locations: ['Central America', 'South America'],
    description: 'The ultimate pit viper',
    facts: ['Responsible for most snakebite deaths in Central America', 'Gives birth to live young'],
    imageUrl: getCompleteAnimalImageUrl('fer-de-lance', 'reptile'),
    killsPerYear: 100,
    rarity: 'rare'
  },
  {
    id: 'coral-snake',
    name: 'Coral Snake',
    category: 'reptile',
    dangerLevel: 4,
    icon: '🐍',
    price: 20.99,
    locations: ['Southern USA', 'Central America'],
    description: 'Beautiful but deadly with potent neurotoxin',
    facts: ['Red touches yellow, kills a fellow', 'Secretive and elusive'],
    imageUrl: getCompleteAnimalImageUrl('coral-snake', 'reptile'),
    killsPerYear: 2,
    rarity: 'rare'
  },
  {
    id: 'russells-viper',
    name: 'Russell\'s Viper',
    category: 'reptile',
    dangerLevel: 4,
    icon: '🐍',
    price: 23.99,
    locations: ['India', 'Sri Lanka', 'Southeast Asia'],
    description: 'The most dangerous snake in Asia',
    facts: ['Causes more deaths than any other snake in India', 'Aggressive and fast-striking'],
    imageUrl: getCompleteAnimalImageUrl('russells-viper', 'reptile'),
    killsPerYear: 15000,
    rarity: 'rare'
  }
];
