
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface RewardedAdState {
  loading: boolean;
  discountApplied: boolean;
  discountPercentage: number;
}

export const useRewardedAd = () => {
  const [state, setState] = useState<RewardedAdState>({
    loading: false,
    discountApplied: false,
    discountPercentage: 0
  });
  const { toast } = useToast();

  const showRewardedAd = useCallback(async (): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true }));

    try {
      // For now, simulate an ad completion (in production, integrate with AdMob)
      const adSuccess = await simulateAdCompletion();
      
      if (adSuccess) {
        // Apply 50% discount
        setState(prev => ({ 
          ...prev, 
          loading: false, 
          discountApplied: true, 
          discountPercentage: 50 
        }));

        // Fire dataLayer event for analytics
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'rewarded_ad',
            ad_type: 'video',
            reward_type: 'discount',
            reward_value: 50,
            timestamp: new Date().toISOString()
          });
        }

        toast({
          title: "🎉 Discount Unlocked!",
          description: "You've earned a 50% discount by watching the ad!",
        });

        return true;
      } else {
        setState(prev => ({ ...prev, loading: false }));
        
        toast({
          title: "Ad Incomplete",
          description: "Please watch the full ad to unlock your discount.",
          variant: "destructive"
        });
        
        return false;
      }
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }));
      
      toast({
        title: "Ad Failed",
        description: "There was an issue loading the ad. Please try again.",
        variant: "destructive"
      });
      
      return false;
    }
  }, [toast]);

  const resetDiscount = useCallback(() => {
    setState({
      loading: false,
      discountApplied: false,
      discountPercentage: 0
    });
  }, []);

  return {
    ...state,
    showRewardedAd,
    resetDiscount
  };
};

// Simulate ad completion - replace with actual AdMob integration
const simulateAdCompletion = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Simulate 3-second ad
    setTimeout(() => {
      // 90% success rate for demo purposes
      resolve(Math.random() > 0.1);
    }, 3000);
  });
};
