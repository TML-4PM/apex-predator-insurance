
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Gift, Loader2 } from 'lucide-react';
import { useRewardedAd } from '@/hooks/useRewardedAd';

interface RewardedAdDiscountProps {
  originalPrice: number;
  onDiscountApplied?: (discountPercentage: number) => void;
}

const RewardedAdDiscount: React.FC<RewardedAdDiscountProps> = ({
  originalPrice,
  onDiscountApplied
}) => {
  const { loading, discountApplied, discountPercentage, showRewardedAd } = useRewardedAd();

  const handleWatchAd = async () => {
    const success = await showRewardedAd();
    if (success && onDiscountApplied) {
      onDiscountApplied(discountPercentage);
    }
  };

  const discountedPrice = originalPrice * (1 - discountPercentage / 100);
  const savings = originalPrice - discountedPrice;

  if (discountApplied) {
    return (
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-800">Discount Applied!</span>
          </div>
          <Badge className="bg-green-600 text-white">
            {discountPercentage}% OFF
          </Badge>
        </div>
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice}
            </span>
            <span className="text-lg font-bold text-green-600">
              ${discountedPrice.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-green-700">
            You saved ${savings.toFixed(2)}!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Gift className="h-5 w-5 text-purple-600" />
          <span className="font-semibold text-purple-800">
            Watch Ad for 50% Discount!
          </span>
        </div>
        
        <p className="text-sm text-purple-700">
          Watch a short video ad to unlock a massive discount on your purchase
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">Current Price</div>
            <div className="text-lg font-bold">${originalPrice}</div>
          </div>
          <div className="text-purple-600">→</div>
          <div className="text-center">
            <div className="text-sm text-purple-600">After Ad</div>
            <div className="text-lg font-bold text-purple-600">
              ${(originalPrice * 0.5).toFixed(2)}
            </div>
          </div>
        </div>

        <Button
          onClick={handleWatchAd}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading Ad...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Watch Ad & Save 50%
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default RewardedAdDiscount;
