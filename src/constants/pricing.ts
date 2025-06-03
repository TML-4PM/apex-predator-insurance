
export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  icon: string;
  isBundle?: boolean;
  category?: string;
  animalCount?: number;
  features?: string[];
  savings?: number;
  isWholesale?: boolean;
  minQuantity?: number;
};

// Individual animal plans - all standardized to $9.99
export const INDIVIDUAL_PLANS: PricingPlan[] = [
  {
    id: "shark",
    name: "Great White Shark",
    description: "Our most popular certificate! Face your fear of the ocean's apex predator.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🦈",
    category: "marine",
    features: [
      "Certificate of Shark Encounter Survival",
      "Digital download available instantly",
      "Perfect for ocean adventurers",
      "Makes a hilarious gift"
    ]
  },
  {
    id: "lion",
    name: "African Lion",
    description: "Survived a close encounter with the king of the jungle? Sure you did.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🦁",
    category: "terrestrial",
    features: [
      "Certificate of Lion Encounter Survival",
      "Digital download available instantly",
      "Perfect for safari enthusiasts",
      "Makes a hilarious gift"
    ]
  },
  {
    id: "bear",
    name: "Grizzly Bear",
    description: "They can smell fear... and your trail mix. Mostly your trail mix.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1525869916826-972885c91c1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🐻",
    category: "terrestrial",
    features: [
      "Certificate of Bear Encounter Survival",
      "Digital download available instantly",
      "Perfect for mountain hikers",
      "Makes a hilarious gift"
    ]
  },
  {
    id: "spider",
    name: "Giant Spider",
    description: "For those who dare to venture where eight-legged monsters lurk.",
    price: 9.99,
    image: "/lovable-uploads/d1166d04-c1e3-4dc2-9acb-f8dc895eae30.png", 
    icon: "🕷️",
    category: "insect",
    features: [
      "Certificate of Spider Encounter Survival",
      "Digital download available instantly",
      "Perfect for forest adventurers",
      "Makes a hilarious gift"
    ]
  }
];

// Enhanced Bundle Plans with psychological pricing
export const BUNDLE_PLANS: PricingPlan[] = [
  // Regional Collections
  {
    id: "african-safari-collection",
    name: "African Safari Collection",
    description: "Complete wildlife experience covering the Big Five and beyond across African savannas",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🦁",
    isBundle: true,
    category: "regional",
    animalCount: 18,
    savings: 129.83,
    features: [
      "18 African Predator Certificates",
      "Big Five Collection Included",
      "Savanna & Desert Hunters",
      "Save $129.83 vs individual plans",
      "Digital downloads available instantly"
    ]
  },
  {
    id: "amazon-rainforest-bundle",
    name: "Amazon Rainforest Bundle",
    description: "Deadly creatures from the world's most biodiverse ecosystem",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1516214104703-d870798883c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🐍",
    isBundle: true,
    category: "regional",
    animalCount: 15,
    savings: 29.86,
    features: [
      "15 Amazon Predator Certificates",
      "Venomous Snakes & Spiders",
      "Jungle Cats & River Predators",
      "Save $29.86 vs individual plans",
      "Rainforest survival essentials"
    ]
  },
  {
    id: "australian-outback-survival",
    name: "Australian Outback Survival Pack",
    description: "Everything that wants to kill you Down Under",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🕷️",
    isBundle: true,
    category: "regional",
    animalCount: 12,
    savings: 19.89,
    features: [
      "12 Australian Predator Certificates",
      "Deadly Spiders & Snakes",
      "Marine Killers & Land Predators",
      "Save $19.89 vs individual plans",
      "Outback survival guide included"
    ]
  },
  {
    id: "asian-wilderness-collection",
    name: "Asian Wilderness Collection",
    description: "Tigers, cobras, and apex predators of Asia",
    price: 109.99,
    image: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🐅",
    isBundle: true,
    category: "regional",
    animalCount: 14,
    savings: 29.87,
    features: [
      "14 Asian Predator Certificates",
      "Bengal Tigers & Snow Leopards",
      "King Cobras & Asian Elephants",
      "Save $29.87 vs individual plans",
      "Mountain & jungle specialists"
    ]
  },
  {
    id: "north-american-wild-pack",
    name: "North American Wild Pack",
    description: "Bears, wolves, and mountain predators of North America",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1525869916826-972885c91c1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🐻",
    isBundle: true,
    category: "regional",
    animalCount: 16,
    savings: 29.85,
    features: [
      "16 North American Certificates",
      "Grizzly Bears & Mountain Lions",
      "Wolves & Venomous Snakes",
      "Save $29.85 vs individual plans",
      "Wilderness survival focus"
    ]
  },

  // Seasonal Collections
  {
    id: "summer-adventure-pack",
    name: "Summer Adventure Pack",
    description: "Hot weather predators and tropical dangers",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "☀️",
    isBundle: true,
    category: "seasonal",
    animalCount: 10,
    savings: 19.91,
    features: [
      "10 Summer Predator Certificates",
      "Tropical & Desert Hunters",
      "Heat-Loving Predators",
      "Save $19.91 vs individual plans",
      "Summer safety tips included"
    ]
  },
  {
    id: "winter-survival-collection",
    name: "Winter Survival Collection",
    description: "Cold climate predators and arctic dangers",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1525869916826-972885c91c1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "❄️",
    isBundle: true,
    category: "seasonal",
    animalCount: 8,
    savings: 14.93,
    features: [
      "8 Winter Predator Certificates",
      "Arctic & Mountain Predators",
      "Cold Climate Specialists",
      "Save $14.93 vs individual plans",
      "Winter survival guide"
    ]
  },

  // Experience Level Bundles
  {
    id: "beginner-explorer-pack",
    name: "Beginner Explorer Pack",
    description: "Perfect introduction to wildlife insurance for new adventurers",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🎒",
    isBundle: true,
    category: "experience",
    animalCount: 5,
    savings: 9.96,
    features: [
      "5 Beginner-Friendly Certificates",
      "Low to Medium Danger Animals",
      "Perfect for First-Time Travelers",
      "Save $9.96 vs individual plans",
      "Adventure planning guide"
    ]
  },
  {
    id: "seasoned-adventurer-collection",
    name: "Seasoned Adventurer Collection",
    description: "For experienced travelers ready for serious challenges",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "⭐",
    isBundle: true,
    category: "experience",
    animalCount: 20,
    savings: 39.81,
    features: [
      "20 Advanced Predator Certificates",
      "High Danger Level Animals",
      "Extreme Environment Specialists",
      "Save $39.81 vs individual plans",
      "Advanced survival techniques"
    ]
  },
  {
    id: "extreme-explorer-ultimate",
    name: "Extreme Explorer Ultimate",
    description: "Only for the most daring adventurers - maximum danger level",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "💀",
    isBundle: true,
    category: "experience",
    animalCount: 12,
    savings: 19.89,
    features: [
      "12 Extreme Danger Certificates",
      "Danger Level 4-5 Animals Only",
      "World's Deadliest Predators",
      "Save $19.89 vs individual plans",
      "Emergency response protocols"
    ]
  }
];

// Ultimate bundle with enhanced positioning
export const ULTIMATE_BUNDLE: PricingPlan = {
  id: "complete-apex-predator-collection",
  name: "Complete Apex Predator Collection",
  description: "Every single deadly animal certificate - the ultimate survival bragging rights",
  price: 199.99,
  image: "https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  icon: "🏆",
  isBundle: true,
  category: "ultimate",
  animalCount: 79,
  savings: 589.22,
  features: [
    "All 79 Predator Certificates",
    "Every Category Included",
    "Save $589.22 vs individual plans",
    "Ultimate Bragging Rights",
    "Lifetime Access to New Additions",
    "Priority Customer Support",
    "Exclusive Ultimate Explorer Badge"
  ]
};

// Enhanced wholesale pricing with psychological pricing
export const WHOLESALE_PLANS: PricingPlan[] = [
  {
    id: "wholesale-starter",
    name: "Wholesale Starter",
    description: "Perfect for small businesses and gift shops.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "📦",
    isWholesale: true,
    minQuantity: 10,
    features: [
      "$8.99 per certificate (10% savings)",
      "Minimum order: 10 certificates",
      "Mix and match any animals",
      "Business license verification required",
      "Standard support included"
    ]
  },
  {
    id: "business-partner",
    name: "Business Partner",
    description: "Ideal for larger retailers and tourism companies.",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🏢",
    isWholesale: true,
    minQuantity: 25,
    features: [
      "$7.99 per certificate (20% savings)",
      "Minimum order: 25 certificates",
      "Custom branding options available",
      "Priority customer support",
      "Quarterly business reviews"
    ]
  },
  {
    id: "enterprise-solution",
    name: "Enterprise Solution",
    description: "For major distributors and theme parks.",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🏭",
    isWholesale: true,
    minQuantity: 50,
    features: [
      "$6.99 per certificate (30% savings)",
      "Minimum order: 50 certificates",
      "White-label solutions available",
      "Dedicated account manager",
      "Custom integration support"
    ]
  },
  {
    id: "volume-reseller",
    name: "Volume Reseller",
    description: "Maximum discounts for volume resellers.",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🚛",
    isWholesale: true,
    minQuantity: 100,
    features: [
      "$5.99 per certificate (40% savings)",
      "Minimum order: 100 certificates",
      "API integration included",
      "Custom certificate templates",
      "Revenue sharing opportunities"
    ]
  }
];

// Combined pricing plans
export const PRICING_PLANS: PricingPlan[] = [
  ...INDIVIDUAL_PLANS,
  ...BUNDLE_PLANS,
  ULTIMATE_BUNDLE
];

export const getPlanById = (id: string): PricingPlan => {
  const allPlans = [...PRICING_PLANS, ...WHOLESALE_PLANS];
  const plan = allPlans.find(plan => plan.id === id);
  if (!plan) {
    return PRICING_PLANS[0]; // Default to first plan if not found
  }
  return plan;
};

export const getBundlePlans = (): PricingPlan[] => {
  return PRICING_PLANS.filter(plan => plan.isBundle);
};

export const getIndividualPlans = (): PricingPlan[] => {
  return PRICING_PLANS.filter(plan => !plan.isBundle);
};

export const getWholesalePlans = (): PricingPlan[] => {
  return WHOLESALE_PLANS;
};

export const getCategoryPlans = (category: string): PricingPlan[] => {
  return PRICING_PLANS.filter(plan => plan.category === category);
};

export const calculateWholesalePrice = (quantity: number): number => {
  if (quantity >= 100) return 5.99;
  if (quantity >= 50) return 6.99;
  if (quantity >= 25) return 7.99;
  if (quantity >= 10) return 8.99;
  return 9.99; // Regular price
};

// Helper functions for enhanced bundle display
export const getRegionalBundles = (): PricingPlan[] => {
  return BUNDLE_PLANS.filter(plan => plan.category === 'regional');
};

export const getSeasonalBundles = (): PricingPlan[] => {
  return BUNDLE_PLANS.filter(plan => plan.category === 'seasonal');
};

export const getExperienceBundles = (): PricingPlan[] => {
  return BUNDLE_PLANS.filter(plan => plan.category === 'experience');
};

export const getMaxSavings = (): number => {
  const allSavings = [...BUNDLE_PLANS, ULTIMATE_BUNDLE].map(plan => plan.savings || 0);
  return Math.max(...allSavings);
};

export const getTotalAnimalCount = (): number => {
  return ULTIMATE_BUNDLE.animalCount || 79;
};
