
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Star, Crown, Zap } from 'lucide-react';
import { WholesaleTier } from '@/hooks/useProducts';

interface WholesalePricingProps {
  tiers: WholesaleTier[];
  onSelectTier: (tier: WholesaleTier) => void;
}

export const WholesalePricing = ({ tiers, onSelectTier }: WholesalePricingProps) => {
  const getTierIcon = (tierName: string) => {
    if (tierName.includes('Starter')) return <Zap className="w-6 h-6 text-blue-500" />;
    if (tierName.includes('Business')) return <Star className="w-6 h-6 text-green-500" />;
    if (tierName.includes('Enterprise')) return <Crown className="w-6 h-6 text-purple-500" />;
    if (tierName.includes('Bulk')) return <Crown className="w-6 h-6 text-red-500" />;
    return <Zap className="w-6 h-6 text-gray-500" />;
  };

  const getTierColor = (tierName: string) => {
    if (tierName.includes('Starter')) return 'border-blue-200 bg-blue-50';
    if (tierName.includes('Business')) return 'border-green-200 bg-green-50';
    if (tierName.includes('Enterprise')) return 'border-purple-200 bg-purple-50';
    if (tierName.includes('Bulk')) return 'border-red-200 bg-red-50 border-2';
    return 'border-gray-200 bg-gray-50';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-apex-black mb-4">Wholesale Pricing Tiers</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the wholesale tier that fits your business needs. All tiers include our full product catalog 
          with volume discounts and business-focused features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier) => (
          <Card 
            key={tier.id} 
            className={`relative overflow-hidden hover:shadow-lg transition-shadow ${getTierColor(tier.tier_name)}`}
          >
            {tier.tier_name.includes('Bulk') && (
              <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold">
                BEST VALUE
              </div>
            )}
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-3">
                  {getTierIcon(tier.tier_name)}
                </div>
                <h3 className="font-bold text-xl text-apex-black mb-2">{tier.tier_name}</h3>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-apex-red">
                    ${tier.price_per_unit}
                  </div>
                  <div className="text-sm text-gray-600">per certificate</div>
                  <Badge className="bg-green-600 text-white">
                    {tier.discount_percentage}% OFF
                  </Badge>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="text-center text-sm text-gray-600">
                  Minimum Order: <span className="font-semibold">{tier.min_quantity} certificates</span>
                </div>
                
                <div className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => onSelectTier(tier)}
                className={`w-full ${
                  tier.tier_name.includes('Bulk')
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-apex-red hover:bg-apex-red/90 text-white'
                }`}
              >
                Get Started
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">
          Need a custom solution? Contact us for enterprise pricing and white-label options.
        </p>
        <Button variant="outline" className="border-apex-red text-apex-red hover:bg-apex-red/10">
          Contact Sales Team
        </Button>
      </div>
    </div>
  );
};
