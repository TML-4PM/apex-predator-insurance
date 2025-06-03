
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Crown } from 'lucide-react';
import { BundleProduct } from '@/hooks/useProducts';

interface BundleGridProps {
  bundles: BundleProduct[];
  onSelectBundle: (bundle: BundleProduct) => void;
}

export const BundleGrid = ({ bundles, onSelectBundle }: BundleGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bundles.map((bundle) => (
        <Card 
          key={bundle.id} 
          className={`group hover:shadow-lg transition-shadow overflow-hidden ${
            bundle.category === 'ultimate' ? 'border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' : ''
          }`}
        >
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="flex justify-center items-center mb-3">
                {bundle.category === 'ultimate' && <Crown className="w-8 h-8 text-yellow-500 mr-2" />}
                <div className="text-5xl">{bundle.icon}</div>
              </div>
              <h3 className="font-bold text-xl text-apex-black mb-2">{bundle.name}</h3>
              <p className="text-gray-600">{bundle.description}</p>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-apex-red mb-1">
                  ${bundle.base_price}
                </div>
                <Badge className="bg-green-600 text-white mb-2">
                  {bundle.animal_count} Animals
                </Badge>
                <div className="text-lg text-green-600 font-semibold">
                  Save ${bundle.savings.toFixed(2)}
                </div>
              </div>
              
              <div className="space-y-2">
                {bundle.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-apex-red rounded-full mr-2 flex-shrink-0"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-6 pt-0">
            <Button 
              onClick={() => onSelectBundle(bundle)}
              className={`w-full text-white ${
                bundle.category === 'ultimate' 
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600' 
                  : 'bg-apex-red hover:bg-apex-red/90'
              }`}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {bundle.category === 'ultimate' ? 'Get Ultimate Collection' : 'Select Bundle'}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
