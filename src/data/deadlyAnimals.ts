
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

export const deadlyAnimals: DeadlyAnimal[] = [
  // Marine Predators
  {
    id: 'great-white-shark',
    name: 'Great White Shark',
    category: 'marine',
    dangerLevel: 5,
    icon: '🦈',
    price: 29.99,
    locations: ['Australia', 'South Africa', 'California', 'Mexico'],
    description: 'The apex predator of the ocean',
    facts: ['Can detect a drop of blood in 25 gallons of water', 'Reaches speeds of 35 mph'],
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    killsPerYear: 10,
    rarity: 'legendary'
  },
  {
    id: 'tiger-shark',
    name: 'Tiger Shark',
    category: 'marine',
    dangerLevel: 4,
    icon: '🦈',
    price: 27.99,
    locations: ['Pacific Ocean', 'Indian Ocean', 'Caribbean'],
    description: 'The garbage disposal of the sea',
    facts: ['Will eat almost anything', 'Has serrated teeth like a saw'],
    imageUrl: 'https://images.unsplash.com/photo-1566024287286-457247b70310?w=800&h=600&fit=crop',
    killsPerYear: 8,
    rarity: 'rare'
  },
  {
    id: 'bull-shark',
    name: 'Bull Shark',
    category: 'marine',
    dangerLevel: 4,
    icon: '🦈',
    price: 26.99,
    locations: ['Global Coastal Waters', 'Rivers', 'Lakes'],
    description: 'The most aggressive shark species',
    facts: ['Can swim in fresh water', 'Highest testosterone levels of any animal'],
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop',
    killsPerYear: 12,
    rarity: 'rare'
  },
  {
    id: 'saltwater-crocodile',
    name: 'Saltwater Crocodile',
    category: 'reptile',
    dangerLevel: 5,
    icon: '🐊',
    price: 32.99,
    locations: ['Australia', 'Southeast Asia', 'India'],
    description: 'The largest living reptile and apex predator',
    facts: ['Bite force of 16,460 newtons', 'Can hold breath for 1 hour'],
    imageUrl: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?w=800&h=600&fit=crop',
    killsPerYear: 1000,
    rarity: 'mythic'
  },
  {
    id: 'nile-crocodile',
    name: 'Nile Crocodile',
    category: 'reptile',
    dangerLevel: 5,
    icon: '🐊',
    price: 31.99,
    locations: ['Africa', 'Nile River', 'Sub-Saharan Africa'],
    description: 'Africa\'s largest freshwater predator',
    facts: ['Can grow up to 20 feet long', 'Ambush predator extraordinaire'],
    imageUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c35a?w=800&h=600&fit=crop',
    killsPerYear: 745,
    rarity: 'mythic'
  },
  {
    id: 'box-jellyfish',
    name: 'Box Jellyfish',
    category: 'marine',
    dangerLevel: 5,
    icon: '🪼',
    price: 24.99,
    locations: ['Australia', 'Thailand', 'Malaysia', 'Philippines'],
    description: 'One of the most venomous creatures on Earth',
    facts: ['Venom can kill in 2-5 minutes', 'Nearly transparent in water'],
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    killsPerYear: 70,
    rarity: 'legendary'
  },
  
  // Big Cats
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
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    killsPerYear: 2,
    rarity: 'uncommon'
  },
  
  // Bears
  {
    id: 'grizzly-bear',
    name: 'Grizzly Bear',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🐻',
    price: 26.99,
    locations: ['Alaska', 'Canada', 'Montana', 'Wyoming'],
    description: 'North America\'s apex predator',
    facts: ['Can run 35 mph', 'Sense of smell 7x stronger than bloodhound'],
    imageUrl: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=800&h=600&fit=crop',
    killsPerYear: 1,
    rarity: 'uncommon'
  },
  {
    id: 'polar-bear',
    name: 'Polar Bear',
    category: 'terrestrial',
    dangerLevel: 5,
    icon: '🐻‍❄️',
    price: 31.99,
    locations: ['Arctic Circle', 'Greenland', 'Canada', 'Alaska'],
    description: 'The Arctic\'s apex predator',
    facts: ['Can smell seals 20 miles away', 'Excellent swimmers'],
    imageUrl: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&h=600&fit=crop',
    killsPerYear: 1,
    rarity: 'legendary'
  },
  {
    id: 'kodiak-bear',
    name: 'Kodiak Bear',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🐻',
    price: 28.99,
    locations: ['Kodiak Island', 'Alaska'],
    description: 'The largest brown bear subspecies',
    facts: ['Can weigh up to 1,500 pounds', 'Omnivorous giants'],
    imageUrl: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=800&h=600&fit=crop',
    killsPerYear: 1,
    rarity: 'rare'
  },
  {
    id: 'black-bear',
    name: 'American Black Bear',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐻',
    price: 19.99,
    locations: ['North America', 'Canada', 'USA'],
    description: 'The most common bear in North America',
    facts: ['Excellent climbers', 'Can run 30 mph'],
    imageUrl: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=800&h=600&fit=crop',
    killsPerYear: 1,
    rarity: 'common'
  },
  
  // Venomous Snakes
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
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop',
    killsPerYear: 10,
    rarity: 'rare'
  },
  
  // Spiders & Arachnids
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
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    killsPerYear: 2,
    rarity: 'rare'
  },
  
  // Marine Life
  {
    id: 'blue-ringed-octopus',
    name: 'Blue-Ringed Octopus',
    category: 'marine',
    dangerLevel: 5,
    icon: '🐙',
    price: 22.99,
    locations: ['Australia', 'Japan', 'Indonesia'],
    description: 'Small but extremely venomous',
    facts: ['Size of golf ball but can kill 26 adults', 'No known antidote'],
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    killsPerYear: 3,
    rarity: 'legendary'
  },
  {
    id: 'stonefish',
    name: 'Stonefish',
    category: 'marine',
    dangerLevel: 4,
    icon: '🐠',
    price: 19.99,
    locations: ['Australia', 'Indo-Pacific'],
    description: 'Most venomous fish in the world',
    facts: ['Perfectly camouflaged as rock', 'Venom causes excruciating pain'],
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    killsPerYear: 5,
    rarity: 'rare'
  },
  {
    id: 'cone-snail',
    name: 'Cone Snail',
    category: 'marine',
    dangerLevel: 4,
    icon: '🐚',
    price: 17.99,
    locations: ['Indo-Pacific', 'Caribbean'],
    description: 'Beautiful but deadly mollusk',
    facts: ['Shoots venomous darts', 'No antivenom exists'],
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    killsPerYear: 3,
    rarity: 'rare'
  },
  {
    id: 'orca',
    name: 'Orca (Killer Whale)',
    category: 'marine',
    dangerLevel: 4,
    icon: '🐋',
    price: 29.99,
    locations: ['Global Oceans'],
    description: 'The ocean\'s apex predator',
    facts: ['Hunt in coordinated pods', 'Can beach themselves to catch prey'],
    imageUrl: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&h=600&fit=crop',
    killsPerYear: 0,
    rarity: 'rare'
  },
  {
    id: 'barracuda',
    name: 'Great Barracuda',
    category: 'marine',
    dangerLevel: 3,
    icon: '🐟',
    price: 18.99,
    locations: ['Tropical Waters', 'Caribbean'],
    description: 'The torpedo of the sea',
    facts: ['Can reach speeds of 36 mph', 'Razor-sharp teeth'],
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    killsPerYear: 1,
    rarity: 'uncommon'
  },
  
  // Aerial Predators
  {
    id: 'golden-eagle',
    name: 'Golden Eagle',
    category: 'aerial',
    dangerLevel: 3,
    icon: '🦅',
    price: 21.99,
    locations: ['North America', 'Europe', 'Asia'],
    description: 'The king of the sky',
    facts: ['Can dive at 150 mph', 'Excellent eyesight'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    killsPerYear: 0,
    rarity: 'uncommon'
  },
  {
    id: 'harpy-eagle',
    name: 'Harpy Eagle',
    category: 'aerial',
    dangerLevel: 3,
    icon: '🦅',
    price: 23.99,
    locations: ['Amazon Rainforest'],
    description: 'The most powerful eagle in the Americas',
    facts: ['Talons larger than grizzly bear claws', 'Can snatch sloths from trees'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    killsPerYear: 0,
    rarity: 'rare'
  },
  {
    id: 'great-horned-owl',
    name: 'Great Horned Owl',
    category: 'aerial',
    dangerLevel: 2,
    icon: '🦉',
    price: 16.99,
    locations: ['North America', 'South America'],
    description: 'The silent hunter of the night',
    facts: ['Silent flight feathers', 'Can rotate head 270 degrees'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    killsPerYear: 0,
    rarity: 'common'
  },
  
  // African Predators
  {
    id: 'hippopotamus',
    name: 'Hippopotamus',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🦛',
    price: 24.99,
    locations: ['Sub-Saharan Africa'],
    description: 'Africa\'s most dangerous large mammal',
    facts: ['Can run 30 mph on land', 'Kills more humans than any other large animal in Africa'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    killsPerYear: 500,
    rarity: 'rare'
  },
  {
    id: 'african-elephant',
    name: 'African Elephant',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐘',
    price: 26.99,
    locations: ['Sub-Saharan Africa'],
    description: 'The largest land animal',
    facts: ['Can weigh up to 14,000 pounds', 'Excellent memory'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    killsPerYear: 100,
    rarity: 'uncommon'
  },
  {
    id: 'cape-buffalo',
    name: 'Cape Buffalo',
    category: 'terrestrial',
    dangerLevel: 4,
    icon: '🐃',
    price: 23.99,
    locations: ['Sub-Saharan Africa'],
    description: 'One of Africa\'s Big Five',
    facts: ['Never been domesticated', 'Known to ambush hunters'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    killsPerYear: 200,
    rarity: 'rare'
  },
  {
    id: 'spotted-hyena',
    name: 'Spotted Hyena',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐺',
    price: 19.99,
    locations: ['Sub-Saharan Africa'],
    description: 'The laughing scavenger with powerful jaws',
    facts: ['Bite force of 1,100 PSI', 'Matriarchal society'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    killsPerYear: 10,
    rarity: 'uncommon'
  },
  
  // Asian Predators
  {
    id: 'asian-elephant',
    name: 'Asian Elephant',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐘',
    price: 25.99,
    locations: ['India', 'Southeast Asia'],
    description: 'The intelligent giant of Asia',
    facts: ['Smaller than African elephants', 'Highly intelligent'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    killsPerYear: 400,
    rarity: 'uncommon'
  },
  {
    id: 'sloth-bear',
    name: 'Sloth Bear',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐻',
    price: 22.99,
    locations: ['India', 'Sri Lanka'],
    description: 'The shaggy bear of the Indian subcontinent',
    facts: ['Excellent climbers', 'Feed primarily on insects'],
    imageUrl: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=800&h=600&fit=crop',
    killsPerYear: 5,
    rarity: 'uncommon'
  },
  {
    id: 'sun-bear',
    name: 'Sun Bear',
    category: 'terrestrial',
    dangerLevel: 2,
    icon: '🐻',
    price: 19.99,
    locations: ['Southeast Asia'],
    description: 'The smallest bear species',
    facts: ['Excellent climbers', 'Long tongue for honey'],
    imageUrl: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=800&h=600&fit=crop',
    killsPerYear: 1,
    rarity: 'uncommon'
  },
  
  // Australian Predators
  {
    id: 'tasmanian-devil',
    name: 'Tasmanian Devil',
    category: 'terrestrial',
    dangerLevel: 2,
    icon: '😈',
    price: 18.99,
    locations: ['Tasmania'],
    description: 'The feisty marsupial with powerful jaws',
    facts: ['Strongest bite relative to body size', 'Can eat 40% of body weight daily'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    killsPerYear: 0,
    rarity: 'uncommon'
  },
  {
    id: 'dingo',
    name: 'Dingo',
    category: 'terrestrial',
    dangerLevel: 2,
    icon: '🐕',
    price: 17.99,
    locations: ['Australia'],
    description: 'Australia\'s wild dog',
    facts: ['Pack hunters', 'Can rotate head 180 degrees'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    killsPerYear: 1,
    rarity: 'common'
  },
  
  // North American Predators  
  {
    id: 'gray-wolf',
    name: 'Gray Wolf',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🐺',
    price: 21.99,
    locations: ['Alaska', 'Canada', 'Northern USA'],
    description: 'The apex predator of the northern wilderness',
    facts: ['Pack hunters with complex social structure', 'Can run 40 mph'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    killsPerYear: 2,
    rarity: 'uncommon'
  },
  {
    id: 'wolverine',
    name: 'Wolverine',
    category: 'terrestrial',
    dangerLevel: 3,
    icon: '🦡',
    price: 23.99,
    locations: ['Alaska', 'Canada', 'Northern USA'],
    description: 'The fierce mustelid with incredible strength',
    facts: ['Can take down prey 5x their size', 'Incredible endurance'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    killsPerYear: 0,
    rarity: 'rare'
  },
  {
    id: 'bobcat',
    name: 'Bobcat',
    category: 'terrestrial',
    dangerLevel: 2,
    icon: '🐱',
    price: 16.99,
    locations: ['North America'],
    description: 'The stealthy wild cat of North America',
    facts: ['Excellent climbers and swimmers', 'Can leap 12 feet high'],
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    killsPerYear: 0,
    rarity: 'common'
  },
  
  // South American Predators
  {
    id: 'anaconda',
    name: 'Green Anaconda',
    category: 'reptile',
    dangerLevel: 4,
    icon: '🐍',
    price: 26.99,
    locations: ['Amazon Basin', 'South America'],
    description: 'The heaviest snake in the world',
    facts: ['Can weigh over 550 pounds', 'Excellent swimmers'],
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop',
    killsPerYear: 1,
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
    imageUrl: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800&h=600&fit=crop',
    killsPerYear: 5,
    rarity: 'rare'
  },
  {
    id: 'caiman',
    name: 'Black Caiman',
    category: 'reptile',
    dangerLevel: 4,
    icon: '🐊',
    price: 24.99,
    locations: ['Amazon Basin'],
    description: 'The largest predator in the Amazon',
    facts: ['Can grow up to 20 feet long', 'Apex predator of the Amazon'],
    imageUrl: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?w=800&h=600&fit=crop',
    killsPerYear: 10,
    rarity: 'rare'
  },
  
  // Venomous Creatures
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
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop',
    killsPerYear: 2,
    rarity: 'rare'
  },
  
  // Additional Marine Predators
  {
    id: 'moray-eel',
    name: 'Giant Moray Eel',
    category: 'marine',
    dangerLevel: 3,
    icon: '🐍',
    price: 19.99,
    locations: ['Tropical Reefs Worldwide'],
    description: 'The serpent of the coral reef',
    facts: ['Has two sets of jaws', 'Can grow up to 10 feet long'],
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    killsPerYear: 1,
    rarity: 'uncommon'
  },
  {
    id: 'electric-eel',
    name: 'Electric Eel',
    category: 'marine',
    dangerLevel: 3,
    icon: '⚡',
    price: 21.99,
    locations: ['Amazon River Basin'],
    description: 'The living electric generator',
    facts: ['Can produce 600-volt electric shocks', 'Actually a type of knifefish'],
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    killsPerYear: 1,
    rarity: 'uncommon'
  },
  
  // Insects & Small Predators
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
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    killsPerYear: 7000,
    rarity: 'uncommon'
  }
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
