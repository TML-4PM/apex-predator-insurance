
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface InsurancePolicy {
  id: string;
  name: string;
  description: string;
  price: number;
  coverage_amount: number;
  coverage_duration_days: number;
  covered_animals: string[];
  covered_regions: string[];
  exclusions: string[];
  requirements: string[];
  is_active: boolean;
  created_at: string;
}

export const useInsurancePolicies = () => {
  const [policies, setPolicies] = useState<InsurancePolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPolicies = async () => {
    try {
      const { data, error } = await supabase
        .from('insurance_policies')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true });

      if (error) throw error;
      setPolicies(data || []);
    } catch (error) {
      console.error('Error fetching policies:', error);
      toast({
        title: "Error",
        description: "Failed to load insurance policies.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  return {
    policies,
    loading,
    refetch: fetchPolicies
  };
};
