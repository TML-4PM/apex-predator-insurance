
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateWholesalePrice } from '@/constants/pricing';

interface WholesalePricingCalculatorProps {
  onQuantityChange: (quantity: number, unitPrice: number, totalPrice: number) => void;
}

export const WholesalePricingCalculator = ({ onQuantityChange }: WholesalePricingCalculatorProps) => {
  const [quantity, setQuantity] = useState(1);
  
  const unitPrice = calculateWholesalePrice(quantity);
  const totalPrice = quantity * unitPrice;
  const regularPrice = quantity * 9.99;
  const savings = regularPrice - totalPrice;
  const discountPercentage = Math.round((savings / regularPrice) * 100);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      const newUnitPrice = calculateWholesalePrice(newQuantity);
      const newTotalPrice = newQuantity * newUnitPrice;
      onQuantityChange(newQuantity, newUnitPrice, newTotalPrice);
    }
  };

  const pricingTiers = [
    { min: 1, max: 9, price: 9.99, discount: 0, label: 'Regular Price' },
    { min: 10, max: 24, price: 8.99, discount: 10, label: 'Wholesale Starter' },
    { min: 25, max: 49, price: 7.99, discount: 20, label: 'Wholesale Business' },
    { min: 50, max: 99, price: 6.99, discount: 30, label: 'Wholesale Enterprise' },
    { min: 100, max: 999, price: 5.99, discount: 40, label: 'Bulk Reseller' },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quantity Pricing Calculator</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="quantity">Number of Certificates</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="mt-1"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Unit Price:</span>
              <span className="text-lg font-bold">${unitPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Price:</span>
              <span className="text-xl font-bold text-green-600">${totalPrice.toFixed(2)}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between items-center text-green-600">
                <span className="font-medium">You Save:</span>
                <span className="font-bold">
                  ${savings.toFixed(2)} ({discountPercentage}% off)
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-semibold mb-3">Wholesale Pricing Tiers</h4>
        <div className="grid gap-2">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-3 rounded-lg border ${
                quantity >= tier.min && quantity <= tier.max
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{tier.label}</span>
                {quantity >= tier.min && quantity <= tier.max && (
                  <Badge className="bg-green-500">Current</Badge>
                )}
              </div>
              <div className="text-right">
                <div className="font-bold">${tier.price}</div>
                <div className="text-sm text-gray-600">
                  {tier.min}-{tier.max === 999 ? '∞' : tier.max} units
                </div>
                {tier.discount > 0 && (
                  <div className="text-sm text-green-600">{tier.discount}% off</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
