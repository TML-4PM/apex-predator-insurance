
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Animal {
  id: string;
  name: string;
  category: 'terrestrial' | 'marine' | 'aerial' | 'reptile' | 'insect';
  danger_level: number;
  locations: string[];
  description: string;
  facts: string[];
  image_url: string;
  kills_per_year: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'mythic';
  created_at: string;
}

export const useAnimals = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAnimals = async () => {
    try {
      const { data, error } = await supabase
        .from('animals')
        .select('*')
        .order('danger_level', { ascending: false });

      if (error) throw error;
      setAnimals(data || []);
    } catch (error) {
      console.error('Error fetching animals:', error);
      toast({
        title: "Error",
        description: "Failed to load animals data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  return {
    animals,
    loading,
    refetch: fetchAnimals
  };
};
