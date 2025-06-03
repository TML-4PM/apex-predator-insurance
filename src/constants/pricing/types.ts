
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
