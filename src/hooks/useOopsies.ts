
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Oopsie, OopsieSubmission } from '@/types/oopsie';

export const useOopsies = () => {
  const [oopsies, setOopsies] = useState<Oopsie[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchOopsies = async () => {
    try {
      const { data, error } = await supabase
        .from('oopsies')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOopsies(data || []);
    } catch (error) {
      console.error('Error fetching oopsies:', error);
      toast({
        title: "Error",
        description: "Failed to load oopsies. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const submitOopsie = async (submission: OopsieSubmission) => {
    setSubmitting(true);
    try {
      let imageUrl = submission.image_url;

      // Upload image if file provided
      if (submission.image_file) {
        const fileExt = submission.image_file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('oopsies')
          .upload(fileName, submission.image_file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('oopsies')
          .getPublicUrl(fileName);
        
        imageUrl = publicUrl;
      }

      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('oopsies')
        .insert({
          user_id: user.user.id,
          title: submission.title,
          description: submission.description,
          category: submission.category,
          image_url: imageUrl,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your oopsie has been submitted for review.",
      });

      return true;
    } catch (error) {
      console.error('Error submitting oopsie:', error);
      toast({
        title: "Error",
        description: "Failed to submit oopsie. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const likeOopsie = async (oopsieId: string) => {
    try {
      const { error } = await supabase.rpc('increment_oopsie_likes', {
        oopsie_id: oopsieId
      });

      if (error) throw error;

      setOopsies(prev => prev.map(oopsie => 
        oopsie.id === oopsieId 
          ? { ...oopsie, likes: oopsie.likes + 1 }
          : oopsie
      ));

      toast({
        title: "Liked!",
        description: "You liked this oopsie.",
        duration: 1500
      });
    } catch (error) {
      console.error('Error liking oopsie:', error);
      toast({
        title: "Error",
        description: "Failed to like oopsie.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchOopsies();
  }, []);

  return {
    oopsies,
    loading,
    submitting,
    submitOopsie,
    likeOopsie,
    refetch: fetchOopsies
  };
};
