
import { PricingPlan } from './types';
import { INDIVIDUAL_PLANS } from './individualPlans';
import { BUNDLE_PLANS, ULTIMATE_BUNDLE } from './bundlePlans';
import { WHOLESALE_PLANS } from './wholesalePlans';

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
