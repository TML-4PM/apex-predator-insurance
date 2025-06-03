
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DynamicRiskCard from '@/components/DynamicRiskCard';
import RewardedAdDiscount from '@/components/RewardedAdDiscount';

interface ProductSelectionProps {
  selectedProduct: any;
  discountApplied: boolean;
  finalPrice: number;
  showRiskCard: boolean;
  onShowRiskCard: (show: boolean) => void;
  onDiscountApplied: (discountPercentage: number) => void;
}

export const ProductSelection = ({ 
  selectedProduct, 
  discountApplied, 
  finalPrice, 
  showRiskCard, 
  onShowRiskCard,
  onDiscountApplied 
}: ProductSelectionProps) => {
  if (!selectedProduct) return null;

  return (
    <div className="space-y-8">
      {/* Rewarded Ad Discount */}
      <RewardedAdDiscount 
        originalPrice={9.99}
        onDiscountApplied={onDiscountApplied}
      />

      {/* Selected Product Preview */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-apex-black mb-2">
            {selectedProduct.name} Insurance Preview
          </h3>
          <div className="flex items-center justify-center gap-4">
            <div className="bg-apex-red text-white px-3 py-1 rounded-full text-sm">
              Danger Level: {selectedProduct.danger_level}/5
            </div>
            <div className={`text-white px-3 py-1 rounded-full text-sm ${discountApplied ? 'bg-green-600' : 'bg-blue-600'}`}>
              Price: ${finalPrice.toFixed(2)}
              {discountApplied && (
                <span className="ml-1 line-through text-gray-300">
                  ${selectedProduct.base_price}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="flex-1">
            <div className="text-6xl text-center mb-4">
              {selectedProduct.icon}
            </div>
            <div className="text-center">
              <h4 className="text-xl font-bold text-apex-black mb-2">
                {selectedProduct.name} Encounter Coverage
              </h4>
              <p className="text-apex-darkgray/70 mb-4">
                {selectedProduct.description}
              </p>
              
              <Button 
                onClick={() => onShowRiskCard(true)}
                className="bg-apex-red hover:bg-apex-red/90 text-white"
              >
                Generate Risk Card
              </Button>
            </div>
          </div>

          {showRiskCard && (
            <div className="flex-1">
              <DynamicRiskCard
                animal={selectedProduct.name}
                riskScore={selectedProduct.danger_level * 20} // Convert to percentage
                quoteCost={`$${finalPrice.toFixed(2)}`}
                onCardGenerated={(url) => {
                  console.log('Risk card generated:', url);
                }}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
