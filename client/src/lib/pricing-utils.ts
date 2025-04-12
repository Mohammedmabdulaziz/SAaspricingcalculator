import { PricingConfig, PricingFeatures } from "@shared/schema";

// Base plan prices
export const PRICING_TIERS = {
  STARTER: {
    name: "Starter",
    monthlyPrice: 29,
    userLimit: 5,
    storageLimit: 20, // GB
    apiCallsLimit: 10000, // per day
    features: {
      analytics: false,
      support: false,
      sso: false
    }
  },
  PROFESSIONAL: {
    name: "Professional",
    monthlyPrice: 79,
    userLimit: 20,
    storageLimit: 100, // GB
    apiCallsLimit: 100000, // per day
    features: {
      analytics: true,
      support: true,
      sso: true
    }
  },
  ENTERPRISE: {
    name: "Enterprise",
    monthlyPrice: 299,
    userLimit: Infinity,
    storageLimit: 1000, // GB (1TB)
    apiCallsLimit: 1000000, // per day
    features: {
      analytics: true,
      support: true,
      sso: true
    }
  }
};

// Feature prices
export const FEATURE_PRICES = {
  analytics: 25,
  support: 50,
  sso: 30
};

// Calculate base plan price
export const calculateBasePlanPrice = (config: PricingConfig): number => {
  return 29; // Base plan starts at Starter tier
};

// Calculate cost for users
export const calculateUsersCost = (users: number): number => {
  if (users <= 5) {
    return 0;
  } else {
    return (users - 5) * 3;
  }
};

// Calculate cost for storage
export const calculateStorageCost = (storage: number): number => {
  if (storage <= 20) {
    return 0;
  } else {
    return (storage - 20) * 0.5;
  }
};

// Calculate cost for API calls
export const calculateApiCallsCost = (apiCalls: number): number => {
  if (apiCalls <= 10000) {
    return 0;
  } else {
    return Math.floor((apiCalls - 10000) / 10000) * 5;
  }
};

// Calculate cost for additional features
export const calculateFeaturesCost = (features: PricingFeatures): number => {
  let cost = 0;
  if (features.analytics) cost += FEATURE_PRICES.analytics;
  if (features.support) cost += FEATURE_PRICES.support;
  if (features.sso) cost += FEATURE_PRICES.sso;
  return cost;
};

// Calculate total cost before any discounts
export const calculateSubtotal = (config: PricingConfig): number => {
  const basePlanPrice = calculateBasePlanPrice(config);
  const usersCost = calculateUsersCost(config.users);
  const storageCost = calculateStorageCost(config.storage);
  const apiCallsCost = calculateApiCallsCost(config.apiCalls);
  const featuresCost = calculateFeaturesCost(config.features);
  
  return basePlanPrice + usersCost + storageCost + apiCallsCost + featuresCost;
};

// Calculate annual discount
export const calculateAnnualDiscount = (subtotal: number, billingCycle: 'monthly' | 'annual'): number => {
  return billingCycle === 'annual' ? subtotal * 0.15 : 0;
};

// Calculate final price
export const calculateTotalPrice = (config: PricingConfig): number => {
  const subtotal = calculateSubtotal(config);
  const annualDiscount = calculateAnnualDiscount(subtotal, config.billingCycle);
  
  return subtotal - annualDiscount;
};

// Determine recommended tier based on config
export const getRecommendedTier = (config: PricingConfig): string => {
  const { users, storage, apiCalls } = config;
  
  if (users <= 5 && storage <= 20 && apiCalls <= 10000) {
    return 'Starter';
  } else if (users <= 20 && storage <= 100 && apiCalls <= 100000) {
    return 'Professional';
  } else {
    return 'Enterprise';
  }
};

// Get default pricing configuration
export const getDefaultPricingConfig = (): PricingConfig => {
  return {
    users: 10,
    storage: 50,
    apiCalls: 20000,
    features: {
      analytics: false,
      support: false,
      sso: false
    },
    billingCycle: 'monthly'
  };
};
