
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

// Category bundle plans
export const BUNDLE_PLANS: PricingPlan[] = [
  {
    id: "land-predators-bundle",
    name: "Land Predators Bundle",
    description: "Complete collection of terrestrial hunters - from big cats to bears and beyond.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🦁",
    isBundle: true,
    category: "terrestrial",
    animalCount: 25,
    savings: 99.76,
    features: [
      "25 Terrestrial Predator Certificates",
      "Big Cats, Bears, Large Mammals & More",
      "Save $99.76 compared to individual plans",
      "Digital downloads available instantly"
    ]
  },
  {
    id: "ocean-hunters-bundle",
    name: "Ocean Hunters Bundle",
    description: "Master the seas with certificates for sharks, jellyfish, and marine predators.",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🦈",
    isBundle: true,
    category: "marine",
    animalCount: 20,
    savings: 79.81,
    features: [
      "20 Marine Predator Certificates",
      "Sharks, Jellyfish, Octopus & More",
      "Save $79.81 compared to individual plans",
      "Perfect for ocean adventurers"
    ]
  },
  {
    id: "cold-blooded-killers-bundle",
    name: "Cold-Blooded Killers Bundle",
    description: "Reptiles and amphibians that will make your blood run cold.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1516214104703-d870798883c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🐍",
    isBundle: true,
    category: "reptile",
    animalCount: 15,
    savings: 59.86,
    features: [
      "15 Reptile Predator Certificates",
      "Snakes, Crocodiles, Lizards & More",
      "Save $59.86 compared to individual plans",
      "Venomous and constricting specialists"
    ]
  },
  {
    id: "sky-stalkers-bundle",
    name: "Sky Stalkers Bundle",
    description: "Aerial predators that rule the skies above.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🦅",
    isBundle: true,
    category: "aerial",
    animalCount: 8,
    savings: 29.93,
    features: [
      "8 Aerial Predator Certificates",
      "Eagles, Hawks, Owls & More",
      "Save $29.93 compared to individual plans",
      "Masters of the sky"
    ]
  },
  {
    id: "tiny-terrors-bundle",
    name: "Tiny Terrors Bundle",
    description: "Small but deadly - insects and arachnids that pack a venomous punch.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🕷️",
    isBundle: true,
    category: "insect",
    animalCount: 13,
    savings: 49.88,
    features: [
      "13 Insect & Arachnid Certificates",
      "Spiders, Scorpions, Ants & More",
      "Save $49.88 compared to individual plans",
      "Venomous micro-predators"
    ]
  }
];

// Ultimate bundle
export const ULTIMATE_BUNDLE: PricingPlan = {
  id: "complete-collection",
  name: "Complete Apex Predator Collection",
  description: "Every single deadly animal certificate - the ultimate survival bragging rights.",
  price: 199.99,
  image: "https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  icon: "🏆",
  isBundle: true,
  animalCount: 79,
  savings: 589.22,
  features: [
    "All 79 Predator Certificates",
    "Every category included",
    "Save $589.22 compared to individual plans",
    "Ultimate bragging rights",
    "Lifetime access to new additions"
  ]
};

// Wholesale pricing tiers
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
      "$8.99 per certificate (10% off)",
      "Minimum order: 10 certificates",
      "Mix and match any animals",
      "Business license verification required"
    ]
  },
  {
    id: "wholesale-business",
    name: "Wholesale Business",
    description: "Ideal for larger retailers and tourism companies.",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🏢",
    isWholesale: true,
    minQuantity: 25,
    features: [
      "$7.99 per certificate (20% off)",
      "Minimum order: 25 certificates",
      "Custom branding options",
      "Priority customer support"
    ]
  },
  {
    id: "wholesale-enterprise",
    name: "Wholesale Enterprise",
    description: "For major distributors and theme parks.",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🏭",
    isWholesale: true,
    minQuantity: 50,
    features: [
      "$6.99 per certificate (30% off)",
      "Minimum order: 50 certificates",
      "White-label solutions available",
      "Dedicated account manager"
    ]
  },
  {
    id: "wholesale-reseller",
    name: "Bulk Reseller",
    description: "Maximum discounts for volume resellers.",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🚛",
    isWholesale: true,
    minQuantity: 100,
    features: [
      "$5.99 per certificate (40% off)",
      "Minimum order: 100 certificates",
      "API integration available",
      "Custom certificate templates"
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
