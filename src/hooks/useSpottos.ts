
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Spotto {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  image_url?: string;
  location_name?: string;
  latitude?: number;
  longitude?: number;
  category: string;
  likes_count?: number;
  shares_count?: number;
  views_count?: number;
  is_featured?: boolean;
  status?: string;
  created_at: string;
  updated_at: string;
}

export const useSpottos = () => {
  const [spottos, setSpottos] = useState<Spotto[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSpottos = async () => {
    try {
      const { data, error } = await supabase
        .from('spottos')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSpottos(data || []);
    } catch (error) {
      console.error('Error fetching spottos:', error);
      toast({
        title: "Error",
        description: "Failed to load spottos.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const convertSpottoToOopsie = async (spottoId: string) => {
    try {
      const spotto = spottos.find(s => s.id === spottoId);
      if (!spotto) throw new Error('Spotto not found');

      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('User not authenticated');

      // Determine appropriate oopsie category based on spotto content
      let oopsieCategory = 'adventure_gone_wrong';
      const content = `${spotto.title} ${spotto.description}`.toLowerCase();
      
      if (content.includes('wildlife') || content.includes('animal') || content.includes('bear') || content.includes('shark')) {
        oopsieCategory = 'wildlife_encounter';
      } else if (content.includes('equipment') || content.includes('gear') || content.includes('broken')) {
        oopsieCategory = 'equipment_failure';
      } else if (content.includes('insurance') || content.includes('claim')) {
        oopsieCategory = 'insurance_claim';
      }

      const { error } = await supabase
        .from('oopsies')
        .insert({
          user_id: spotto.user_id,
          title: `Adventure Mishap: ${spotto.title}`,
          description: `${spotto.description}${spotto.location_name ? ` (Location: ${spotto.location_name})` : ''}`,
          category: oopsieCategory,
          image_url: spotto.image_url,
          status: 'approved', // Auto-approve conversions from spottos
          is_featured: spotto.is_featured || false,
          likes: spotto.likes_count || 0,
          viral_score: (spotto.likes_count || 0) + (spotto.shares_count || 0)
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Spotto converted to oopsie successfully.",
      });

      return true;
    } catch (error) {
      console.error('Error converting spotto to oopsie:', error);
      toast({
        title: "Error",
        description: "Failed to convert spotto to oopsie.",
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    fetchSpottos();
  }, []);

  return {
    spottos,
    loading,
    convertSpottoToOopsie,
    refetch: fetchSpottos
  };
};
