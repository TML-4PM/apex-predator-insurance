
import { PricingPlan } from './types';

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
