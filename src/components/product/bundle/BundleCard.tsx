
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { BundleProduct } from '@/hooks/useProducts';
import { getCategoryIcon, getCategoryColor } from './BundleUtils';

interface BundleCardProps {
  bundle: BundleProduct;
  onSelect: (bundle: BundleProduct) => void;
}

export const BundleCard = ({ bundle, onSelect }: BundleCardProps) => {
  return (
    <Card 
      className={`group hover:shadow-lg transition-shadow overflow-hidden ${getCategoryColor(bundle.category || '')}`}
    >
      {bundle.category === 'ultimate' && (
        <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold">
          PREMIUM
        </div>
      )}
      
      <div className="p-6">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-3">
            {getCategoryIcon(bundle.category || '')}
            <div className="text-4xl ml-2">{bundle.icon}</div>
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
            <div className="text-sm text-gray-500">
              vs individual purchases
            </div>
          </div>
          
          <div className="space-y-2">
            {bundle.features?.map((feature, index) => (
              <div key={index} className="flex items-start text-sm text-gray-700">
                <div className="w-2 h-2 bg-apex-red rounded-full mr-2 mt-2 flex-shrink-0"></div>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6 pt-0">
        <Button 
          onClick={() => onSelect(bundle)}
          className={`w-full text-white ${
            bundle.category === 'ultimate' 
              ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
              : 'bg-apex-red hover:bg-apex-red/90'
          }`}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {bundle.category === 'ultimate' ? 'Get Premium Collection' : 'Select Bundle'}
        </Button>
      </div>
    </Card>
  );
};
