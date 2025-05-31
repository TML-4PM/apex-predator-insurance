
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PredatorEncounter {
  id: string;
  user_id?: string;
  animal_id: string;
  location: string;
  latitude?: number;
  longitude?: number;
  encounter_date: string;
  severity: 'minor' | 'moderate' | 'severe' | 'fatal';
  description: string;
  image_url?: string;
  verified: boolean;
  insurance_claim_filed: boolean;
  created_at: string;
}

export const usePredatorEncounters = () => {
  const [encounters, setEncounters] = useState<PredatorEncounter[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchEncounters = async () => {
    try {
      const { data, error } = await supabase
        .from('predator_encounters')
        .select(`
          *,
          animals (
            name,
            category,
            danger_level
          )
        `)
        .order('encounter_date', { ascending: false })
        .limit(100);

      if (error) throw error;
      setEncounters((data || []) as PredatorEncounter[]);
    } catch (error) {
      console.error('Error fetching encounters:', error);
      toast({
        title: "Error",
        description: "Failed to load predator encounters.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const submitEncounter = async (encounter: Omit<PredatorEncounter, 'id' | 'created_at' | 'verified' | 'insurance_claim_filed'>) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('predator_encounters')
        .insert({
          ...encounter,
          user_id: user.user?.id,
          verified: false,
          insurance_claim_filed: false
        });

      if (error) throw error;

      toast({
        title: "Encounter Reported",
        description: "Your predator encounter has been submitted for verification.",
      });

      await fetchEncounters();
      return true;
    } catch (error) {
      console.error('Error submitting encounter:', error);
      toast({
        title: "Error",
        description: "Failed to submit encounter report.",
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    fetchEncounters();
  }, []);

  return {
    encounters,
    loading,
    submitEncounter,
    refetch: fetchEncounters
  };
};
