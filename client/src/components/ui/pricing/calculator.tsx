import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PricingConfig, PricingFeatures } from "@shared/schema";
import { 
  calculateBasePlanPrice, 
  calculateUsersCost,
  calculateStorageCost,
  calculateApiCallsCost,
  calculateFeaturesCost,
  calculateSubtotal,
  calculateAnnualDiscount,
  calculateTotalPrice,
  getRecommendedTier,
  getDefaultPricingConfig
} from "@/lib/pricing-utils";
import { Check, ArrowRight, Info } from "lucide-react";

type PricingCalculatorProps = {
  onConfigChange?: (config: PricingConfig) => void;
};

export default function PricingCalculator({ onConfigChange }: PricingCalculatorProps) {
  const [config, setConfig] = useState<PricingConfig>(getDefaultPricingConfig());
  
  const {
    users,
    storage,
    apiCalls,
    features,
    billingCycle
  } = config;
  
  // Calculated values
  const basePlanPrice = calculateBasePlanPrice(config);
  const usersCost = calculateUsersCost(users);
  const storageCost = calculateStorageCost(storage);
  const apiCallsCost = calculateApiCallsCost(apiCalls);
  const featuresCost = calculateFeaturesCost(features);
  const subtotal = calculateSubtotal(config);
  const annualDiscount = calculateAnnualDiscount(subtotal, billingCycle);
  const totalPrice = calculateTotalPrice(config);
  const recommendedTier = getRecommendedTier(config);
  
  // When config changes, notify parent component
  useEffect(() => {
    if (onConfigChange) {
      onConfigChange(config);
    }
  }, [config, onConfigChange]);
  
  const handleUsersChange = (value: number[]) => {
    setConfig(prev => ({ ...prev, users: value[0] }));
  };
  
  const handleStorageChange = (value: number[]) => {
    setConfig(prev => ({ ...prev, storage: value[0] }));
  };
  
  const handleApiCallsChange = (value: number[]) => {
    setConfig(prev => ({ ...prev, apiCalls: value[0] }));
  };
  
  const handleFeatureChange = (feature: keyof PricingFeatures, checked: boolean) => {
    setConfig(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: checked
      }
    }));
  };
  
  const handleBillingCycleChange = (cycle: 'monthly' | 'annual') => {
    setConfig(prev => ({ ...prev, billingCycle: cycle }));
  };
  
  return (
    <section id="calculator" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Customize Your Plan</h2>
          <p className="mt-4 text-lg text-gray-500">Drag the sliders to calculate your perfect pricing plan</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-2">
              {/* Left column: Calculator controls */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Usage Parameters</h3>
                
                {/* Users slider */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="users" className="block text-sm font-medium text-gray-700">Users</Label>
                    <span className="text-sm text-gray-500">{users}</span>
                  </div>
                  <Slider
                    id="users"
                    min={1}
                    max={100}
                    step={1}
                    value={[users]}
                    onValueChange={handleUsersChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
                
                {/* Storage slider */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="storage" className="block text-sm font-medium text-gray-700">Storage (GB)</Label>
                    <span className="text-sm text-gray-500">{storage}</span>
                  </div>
                  <Slider
                    id="storage"
                    min={5}
                    max={1000}
                    step={5}
                    value={[storage]}
                    onValueChange={handleStorageChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5GB</span>
                    <span>500GB</span>
                    <span>1TB</span>
                  </div>
                </div>
                
                {/* API calls slider */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="apiCalls" className="block text-sm font-medium text-gray-700">API Calls (per day)</Label>
                    <span className="text-sm text-gray-500">{apiCalls.toLocaleString()}</span>
                  </div>
                  <Slider
                    id="apiCalls"
                    min={1000}
                    max={1000000}
                    step={1000}
                    value={[apiCalls]}
                    onValueChange={handleApiCallsChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1K</span>
                    <span>500K</span>
                    <span>1M</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-4 mt-8">Features</h3>
                
                {/* Feature toggles */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        id="analytics"
                        checked={features.analytics}
                        onCheckedChange={(checked) => handleFeatureChange('analytics', checked)}
                      />
                      <Label htmlFor="analytics" className="text-sm font-medium text-gray-700">Advanced Analytics</Label>
                    </div>
                    <span className="text-sm text-gray-500">+$25/mo</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        id="support"
                        checked={features.support}
                        onCheckedChange={(checked) => handleFeatureChange('support', checked)}
                      />
                      <Label htmlFor="support" className="text-sm font-medium text-gray-700">Priority Support</Label>
                    </div>
                    <span className="text-sm text-gray-500">+$50/mo</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        id="sso"
                        checked={features.sso}
                        onCheckedChange={(checked) => handleFeatureChange('sso', checked)}
                      />
                      <Label htmlFor="sso" className="text-sm font-medium text-gray-700">SSO Authentication</Label>
                    </div>
                    <span className="text-sm text-gray-500">+$30/mo</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Billing Period</Label>
                  <div className="flex items-center space-x-4">
                    <Button 
                      onClick={() => handleBillingCycleChange('monthly')} 
                      variant={billingCycle === 'monthly' ? 'secondary' : 'outline'}
                      className="flex-1"
                    >
                      Monthly
                    </Button>
                    <Button 
                      onClick={() => handleBillingCycleChange('annual')} 
                      variant={billingCycle === 'annual' ? 'secondary' : 'outline'}
                      className="flex-1"
                    >
                      Annual (Save 15%)
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Right column: Pricing result */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Your Custom Plan</h3>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-900">
                    ${totalPrice.toFixed(2)}
                    <span className="text-base font-normal text-gray-500">/ {billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Based on your selected options</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Base plan</span>
                    <span className="text-sm font-medium text-gray-900">${basePlanPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">{users} users</span>
                    <span className="text-sm font-medium text-gray-900">${usersCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">{storage} GB storage</span>
                    <span className="text-sm font-medium text-gray-900">${storageCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">{apiCalls.toLocaleString()} API calls/day</span>
                    <span className="text-sm font-medium text-gray-900">${apiCallsCost.toFixed(2)}</span>
                  </div>
                  
                  {features.analytics && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Advanced Analytics</span>
                      <span className="text-sm font-medium text-gray-900">+$25.00</span>
                    </div>
                  )}
                  
                  {features.support && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Priority Support</span>
                      <span className="text-sm font-medium text-gray-900">+$50.00</span>
                    </div>
                  )}
                  
                  {features.sso && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">SSO Authentication</span>
                      <span className="text-sm font-medium text-gray-900">+$30.00</span>
                    </div>
                  )}
                  
                  {billingCycle === 'annual' && (
                    <div className="flex justify-between text-green-600">
                      <span className="text-sm">Annual discount (15%)</span>
                      <span className="text-sm font-medium">-${annualDiscount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-8">
                  <p className="text-sm text-gray-500 mb-4">Your plan includes:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{users} user accounts</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{storage} GB of storage</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Up to {apiCalls.toLocaleString()} API calls per day</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Email support</span>
                    </li>
                    {recommendedTier && (
                      <li className="flex items-start">
                        <Info className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm text-primary-700">Recommended tier: {recommendedTier}</span>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="mt-8">
                  <Button className="w-full">
                    Get started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
