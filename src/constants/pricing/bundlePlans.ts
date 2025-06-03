
import { PricingPlan } from './types';

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
