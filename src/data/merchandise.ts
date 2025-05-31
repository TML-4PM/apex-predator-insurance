
export interface MerchandiseItem {
  id: string;
  name: string;
  category: 'apparel' | 'accessories' | 'gear' | 'digital' | 'experience';
  price: number;
  description: string;
  imageUrl: string;
  variants?: {
    size?: string[];
    color?: string[];
    style?: string[];
  };
  tags: string[];
  popularity: number;
  inStock: boolean;
}

export const merchandise: MerchandiseItem[] = [
  // Apparel
  {
    id: 'survived-shark-tee',
    name: 'I Survived a Shark Attack T-Shirt',
    category: 'apparel',
    price: 24.99,
    description: 'Premium cotton tee with bite mark design and certificate number',
    imageUrl: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f',
    variants: {
      size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      color: ['Ocean Blue', 'Shark Gray', 'Blood Red', 'Survival Black']
    },
    tags: ['bestseller', 'shark', 'apparel'],
    popularity: 95,
    inStock: true
  },
  {
    id: 'bear-encounter-hoodie',
    name: 'Bear Encounter Survivor Hoodie',
    category: 'apparel',
    price: 49.99,
    description: 'Heavyweight hoodie with claw mark details and survival story',
    imageUrl: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f',
    variants: {
      size: ['S', 'M', 'L', 'XL', 'XXL'],
      color: ['Forest Green', 'Mountain Brown', 'Arctic White']
    },
    tags: ['premium', 'bear', 'hoodie'],
    popularity: 88,
    inStock: true
  },
  {
    id: 'danger-zone-cap',
    name: 'Wildlife Danger Zone Cap',
    category: 'apparel',
    price: 19.99,
    description: 'Adjustable cap with embroidered danger zone map',
    imageUrl: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f',
    variants: {
      color: ['Khaki', 'Black', 'Camo Green']
    },
    tags: ['accessories', 'outdoor', 'unisex'],
    popularity: 76,
    inStock: true
  },

  // Survival Gear
  {
    id: 'emergency-whistle',
    name: 'Wildlife Shield Emergency Whistle',
    category: 'gear',
    price: 12.99,
    description: 'Ultra-loud survival whistle with lanyard and instructions',
    imageUrl: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f',
    tags: ['survival', 'emergency', 'practical'],
    popularity: 92,
    inStock: true
  },
  {
    id: 'tactical-flashlight',
    name: 'Predator Defense Tactical Light',
    category: 'gear',
    price: 34.99,
    description: 'Military-grade flashlight with strobe mode for animal deterrent',
    imageUrl: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f',
    tags: ['tactical', 'defense', 'premium'],
    popularity: 84,
    inStock: true
  },
  {
    id: 'survival-bracelet',
    name: 'Adventure Survival Paracord Bracelet',
    category: 'accessories',
    price: 16.99,
    description: '15 feet of paracord with fire starter, compass, and whistle',
    imageUrl: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f',
    variants: {
      color: ['Black', 'Olive', 'Orange', 'Camo']
    },
    tags: ['survival', 'practical', 'edc'],
    popularity: 89,
    inStock: true
  },

  // Stickers & Decals
  {
    id: 'animal-sticker-pack',
    name: 'Deadly Animals Sticker Pack',
    category: 'accessories',
    price: 8.99,
    description: 'Waterproof vinyl stickers of 20 deadliest animals',
    imageUrl: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f',
    tags: ['stickers', 'collectible', 'affordable'],
    popularity: 94,
    inStock: true
  },
  {
    id: 'certificate-decal',
    name: 'Personalized Certificate Car Decal',
    category: 'accessories',
    price: 14.99,
    description: 'Custom car decal with your certificate details',
    imageUrl: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f',
    variants: {
      size: ['Small (4")', 'Medium (6")', 'Large (8")'],
      color: ['White', 'Black', 'Silver']
    },
    tags: ['personalized', 'car', 'custom'],
    popularity: 71,
    inStock: true
  },

  // Digital Products
  {
    id: 'premium-certificate',
    name: 'Premium Animated Certificate',
    category: 'digital',
    price: 19.99,
    description: 'Animated certificate with sound effects and custom background',
    imageUrl: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f',
    tags: ['digital', 'premium', 'animated'],
    popularity: 67,
    inStock: true
  },
  {
    id: 'survival-guide',
    name: 'Digital Survival Guide Collection',
    category: 'digital',
    price: 29.99,
    description: 'Comprehensive guides for surviving 50+ animal encounters',
    imageUrl: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f',
    tags: ['educational', 'digital', 'comprehensive'],
    popularity: 73,
    inStock: true
  },
  {
    id: 'nft-certificate',
    name: 'Limited Edition NFT Certificate',
    category: 'digital',
    price: 99.99,
    description: 'Blockchain-verified unique certificate with rarity traits',
    imageUrl: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f',
    tags: ['nft', 'blockchain', 'limited', 'exclusive'],
    popularity: 45,
    inStock: true
  },

  // Experience Packages
  {
    id: 'wildlife-photography-tour',
    name: 'Dangerous Wildlife Photography Experience',
    category: 'experience',
    price: 499.99,
    description: 'Guided photography tour with professional wildlife photographer',
    imageUrl: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f',
    tags: ['experience', 'photography', 'premium', 'guided'],
    popularity: 58,
    inStock: true
  },
  {
    id: 'survival-training',
    name: 'Wilderness Survival Training Course',
    category: 'experience',
    price: 299.99,
    description: '2-day intensive survival training with certified instructors',
    imageUrl: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f',
    tags: ['training', 'survival', 'educational', 'intensive'],
    popularity: 62,
    inStock: true
  },

  // Bundles
  {
    id: 'ultimate-survivor-bundle',
    name: 'Ultimate Survivor Bundle',
    category: 'gear',
    price: 149.99,
    description: 'Complete survival kit: whistle, flashlight, bracelet, guides & certificate',
    imageUrl: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f',
    tags: ['bundle', 'complete', 'value', 'bestseller'],
    popularity: 96,
    inStock: true
  }
];

export const getMerchandiseByCategory = (category: string) => {
  return merchandise.filter(item => item.category === category);
};

export const getPopularMerchandise = (limit: number = 6) => {
  return merchandise
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

export const getBestSellers = () => {
  return merchandise.filter(item => item.tags.includes('bestseller'));
};
