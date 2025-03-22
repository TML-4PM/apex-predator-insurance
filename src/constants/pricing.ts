
export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  icon: string;
  isBundle?: boolean;
  features?: string[];
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "shark",
    name: "Great White Shark",
    description: "Our most popular certificate! Face your fear of the ocean's apex predator.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🦈",
    features: [
      "Certificate of Shark Encounter Survival",
      "Digital download available instantly",
      "Perfect for ocean adventurers",
      "Makes a hilarious gift"
    ]
  },
  {
    id: "crocodile",
    name: "Saltwater Crocodile",
    description: "For those brave souls venturing into murky waters. Don't be a snack!",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🐊",
    features: [
      "Certificate of Crocodile Encounter Survival",
      "Digital download available instantly",
      "Perfect for tropical adventurers",
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
    features: [
      "Certificate of Bear Encounter Survival",
      "Digital download available instantly",
      "Perfect for mountain hikers",
      "Makes a hilarious gift"
    ]
  },
  {
    id: "bundle25",
    name: "25 Predator Bundle",
    description: "Our mid-tier value! Get covered for 25 apex predators at a great price.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🏅",
    isBundle: true,
    features: [
      "25 Different Predator Certificates",
      "Digital downloads available instantly",
      "Save 40% compared to individual plans",
      "Great for adventure enthusiasts"
    ]
  },
  {
    id: "bundle",
    name: "Complete Bundle",
    description: "Our best value! Get covered for all 60 apex predators.",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1501793123636-75796c6c03b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🏆",
    isBundle: true,
    features: [
      "All 60 Predator Certificates",
      "Digital downloads available instantly",
      "Save 80% compared to individual plans",
      "Ultimate bragging rights"
    ]
  }
];

export const getPlanById = (id: string): PricingPlan => {
  const plan = PRICING_PLANS.find(plan => plan.id === id);
  if (!plan) {
    return PRICING_PLANS[0]; // Default to first plan if not found
  }
  return plan;
};
