
import { PricingPlan } from './types';

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
