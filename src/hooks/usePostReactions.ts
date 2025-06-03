
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const usePostReactions = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const reactToPostMutation = useMutation({
    mutationFn: async ({ 
      postId, 
      reactionType, 
      currentReaction 
    }: { 
      postId: string; 
      reactionType: string; 
      currentReaction?: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      if (currentReaction === reactionType) {
        // Remove reaction if clicking the same one
        await supabase
          .from('post_reactions')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
      } else {
        // Add or update reaction
        await supabase
          .from('post_reactions')
          .upsert({
            post_id: postId,
            user_id: user.id,
            reaction_type: reactionType,
          });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
    },
    onError: (error) => {
      console.error('Error updating reaction:', error);
      toast({
        title: "Error",
        description: "Failed to update reaction. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    reactToPost: reactToPostMutation.mutate,
    isReacting: reactToPostMutation.isPending,
  };
};
