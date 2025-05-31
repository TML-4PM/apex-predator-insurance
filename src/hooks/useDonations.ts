
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface DonationSubmission {
  amount: number;
  donorName: string;
  donorEmail: string;
  message?: string;
  isAnonymous?: boolean;
}

export interface Donation {
  id: string;
  user_id?: string;
  amount: number;
  currency: string;
  status: string;
  donor_email?: string;
  stripe_session_id?: string;
  created_at: string;
  updated_at: string;
}

export const useDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchDonations = async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('status', 'completed')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDonations(data || []);
    } catch (error) {
      console.error('Error fetching donations:', error);
      toast({
        title: "Error",
        description: "Failed to load donations.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const submitDonation = async (submission: DonationSubmission) => {
    setSubmitting(true);
    try {
      // Call Stripe payment function
      const { data, error } = await supabase.functions.invoke('create-donation-session', {
        body: {
          amount: submission.amount,
          donorEmail: submission.donorEmail,
          donorName: submission.donorName,
          message: submission.message,
          isAnonymous: submission.isAnonymous
        }
      });

      if (error) throw error;

      if (data.url) {
        // Redirect to Stripe Checkout
        window.open(data.url, '_blank');
        
        toast({
          title: "Redirecting to Payment",
          description: "You'll be redirected to complete your donation.",
        });
        
        return true;
      }

      throw new Error('No payment URL received');
    } catch (error) {
      console.error('Error submitting donation:', error);
      toast({
        title: "Error",
        description: "Failed to process donation. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return {
    donations,
    loading,
    submitting,
    submitDonation,
    refetch: fetchDonations
  };
};
