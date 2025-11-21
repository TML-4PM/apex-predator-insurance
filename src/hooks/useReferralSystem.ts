
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ReferralCode {
  id: string;
  user_id: string;
  code: string;
  uses_count: number;
  max_uses?: number;
  expires_at?: string;
  is_active: boolean;
  created_at: string;
}

export interface UserRewards {
  id: string;
  user_id: string;
  points_balance: number;
  total_points_earned: number;
  tier_level: 'bronze' | 'silver' | 'gold' | 'platinum';
  last_activity_at: string;
  created_at: string;
  updated_at: string;
}

export const useReferralSystem = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: userRewards,
    isLoading: rewardsLoading,
  } = useQuery({
    queryKey: ['user-rewards'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_rewards')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });

  const {
    data: referralCode,
    isLoading: codeLoading,
  } = useQuery({
    queryKey: ['referral-code'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('referral_codes')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });

  const createReferralCodeMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Generate unique code
      const code = `${user.id.slice(0, 8)}-${Date.now().toString(36)}`.toUpperCase();

      const { error } = await supabase
        .from('referral_codes')
        .insert({
          user_id: user.id,
          code,
          max_uses: 50, // Limit to 50 referrals
        });

      if (error) throw error;
      return code;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referral-code'] });
      toast({
        title: "Success!",
        description: "Your referral code has been created.",
      });
    },
    onError: (error) => {
      console.error('Error creating referral code:', error);
      toast({
        title: "Error",
        description: "Failed to create referral code.",
        variant: "destructive",
      });
    },
  });

  const initializeRewardsMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('user_rewards')
        .insert({
          user_id: user.id,
          points_balance: 100, // Welcome bonus
          total_points_earned: 100,
          tier_level: 'bronze'
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-rewards'] });
      toast({
        title: "Welcome!",
        description: "You've earned 100 welcome points!",
      });
    },
  });

  const addPointsMutation = useMutation({
    mutationFn: async ({ points, reason }: { points: number; reason: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      if (!userRewards) {
        await initializeRewardsMutation.mutateAsync();
      }

      const currentRewards = userRewards || { points_balance: 0, total_points_earned: 0 };
      const newBalance = currentRewards.points_balance + points;
      const newTotal = currentRewards.total_points_earned + points;
      
      // Calculate new tier
      let newTier: 'bronze' | 'silver' | 'gold' | 'platinum' = 'bronze';
      if (newTotal >= 10000) newTier = 'platinum';
      else if (newTotal >= 5000) newTier = 'gold';
      else if (newTotal >= 1000) newTier = 'silver';

      const { error } = await supabase
        .from('user_rewards')
        .update({
          points_balance: newBalance,
          total_points_earned: newTotal,
          tier_level: newTier,
          last_activity_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      return { points, reason, newTier };
    },
    onSuccess: ({ points, reason, newTier }) => {
      queryClient.invalidateQueries({ queryKey: ['user-rewards'] });
      
      if (newTier !== userRewards?.tier_level) {
        toast({
          title: "Tier Upgrade!",
          description: `Congratulations! You've reached ${newTier} tier!`,
        });
      } else {
        toast({
          title: "Points Earned!",
          description: `+${points} points for ${reason}`,
        });
      }
    },
  });

  const processReferralMutation = useMutation({
    mutationFn: async ({ referralCode }: { referralCode: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Validate referral code
      const { data: codeData, error: codeError } = await supabase
        .from('referral_codes')
        .select('*')
        .eq('code', referralCode)
        .eq('is_active', true)
        .single();

      if (codeError || !codeData) {
        throw new Error('Invalid referral code');
      }

      // Check if max uses reached
      if (codeData.max_uses && codeData.uses_count >= codeData.max_uses) {
        throw new Error('Referral code has reached maximum uses');
      }

      // Check if expired
      if (codeData.expires_at && new Date(codeData.expires_at) < new Date()) {
        throw new Error('Referral code has expired');
      }

      // Track referral conversion
      // Note: referral_tracking table doesn't support this structure yet
      // This would need a database migration to add proper columns
      
      // For now, just log the successful referral
      console.log('Referral signup successful:', { referralCode, userId: user.id });

      // Update referral code usage
      const { error: updateError } = await supabase
        .from('referral_codes')
        .update({ uses_count: codeData.uses_count + 1 })
        .eq('id', codeData.id);

      if (updateError) throw updateError;

      return codeData.user_id;
    },
    onSuccess: (referrerId) => {
      // Award points to both referrer and referred user
      addPointsMutation.mutate({ points: 50, reason: 'referral signup' });
      
      toast({
        title: "Referral Applied!",
        description: "You've earned 50 bonus points!",
      });
    },
    onError: (error) => {
      toast({
        title: "Invalid Referral",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createReferralCode = () => {
    createReferralCodeMutation.mutate();
  };

  const addPoints = (points: number, reason: string) => {
    addPointsMutation.mutate({ points, reason });
  };

  const processReferral = (code: string) => {
    processReferralMutation.mutate({ referralCode: code });
  };

  const initializeRewards = () => {
    initializeRewardsMutation.mutate();
  };

  return {
    userRewards,
    referralCode,
    loading: rewardsLoading || codeLoading,
    createReferralCode,
    addPoints,
    processReferral,
    initializeRewards,
    isCreatingCode: createReferralCodeMutation.isPending,
    isProcessingReferral: processReferralMutation.isPending,
  };
};
