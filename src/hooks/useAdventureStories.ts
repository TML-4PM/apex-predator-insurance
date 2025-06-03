
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AdventureStory {
  id: string;
  user_id: string;
  title: string;
  content: string;
  predator_type?: string;
  location?: string;
  image_urls: string[];
  certificate_id?: string;
  shares_count: number;
  views_count: number;
  likes_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  user_profile?: {
    username: string;
    avatar_url?: string;
    full_name?: string;
  };
  is_liked?: boolean;
}

export const useAdventureStories = (featured = false) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: stories = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['adventure-stories', featured],
    queryFn: async () => {
      let query = supabase
        .from('adventure_stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (featured) {
        query = query.eq('is_featured', true);
      }

      const { data: storiesData, error: storiesError } = await query;

      if (storiesError) throw storiesError;

      if (!storiesData || storiesData.length === 0) {
        return [];
      }

      const { data: { user } } = await supabase.auth.getUser();

      // Get unique user IDs
      const userIds = [...new Set(storiesData.map(story => story.user_id))];
      
      // Fetch profiles
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, username, avatar_url, full_name')
        .in('user_id', userIds);

      // Create profiles map
      const profilesMap = new Map();
      profilesData?.forEach(profile => {
        profilesMap.set(profile.user_id, profile);
      });

      // Check if user liked stories
      let likesData: any[] = [];
      if (user) {
        const storyIds = storiesData.map(story => story.id);
        const { data } = await supabase
          .from('post_likes')
          .select('post_id')
          .eq('user_id', user.id)
          .in('post_id', storyIds);
        
        likesData = data || [];
      }

      // Combine data and ensure proper type conversion
      const formattedStories = storiesData.map(story => ({
        ...story,
        image_urls: Array.isArray(story.image_urls) ? 
          (story.image_urls as any[]).map(url => String(url)) : [],
        user_profile: profilesMap.get(story.user_id) || {
          username: 'Unknown User',
          avatar_url: null,
          full_name: null
        },
        is_liked: likesData.some(like => like.post_id === story.id)
      }));

      return formattedStories;
    },
  });

  const createStoryMutation = useMutation({
    mutationFn: async ({
      title,
      content,
      predatorType,
      location,
      imageUrls = [],
      certificateId
    }: {
      title: string;
      content: string;
      predatorType?: string;
      location?: string;
      imageUrls?: string[];
      certificateId?: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('adventure_stories')
        .insert({
          user_id: user.id,
          title,
          content,
          predator_type: predatorType,
          location,
          image_urls: imageUrls,
          certificate_id: certificateId
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adventure-stories'] });
      toast({
        title: "Success!",
        description: "Your adventure story has been shared.",
      });
    },
    onError: (error) => {
      console.error('Error creating story:', error);
      toast({
        title: "Error",
        description: "Failed to share story. Please try again.",
        variant: "destructive",
      });
    },
  });

  const incrementViewsMutation = useMutation({
    mutationFn: async (storyId: string) => {
      const currentStory = stories.find(s => s.id === storyId);
      const { error } = await supabase
        .from('adventure_stories')
        .update({ 
          views_count: (currentStory?.views_count || 0) + 1 
        })
        .eq('id', storyId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adventure-stories'] });
    },
  });

  const incrementSharesMutation = useMutation({
    mutationFn: async (storyId: string) => {
      const currentStory = stories.find(s => s.id === storyId);
      const { error } = await supabase
        .from('adventure_stories')
        .update({ 
          shares_count: (currentStory?.shares_count || 0) + 1 
        })
        .eq('id', storyId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adventure-stories'] });
    },
  });

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('adventure-stories-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'adventure_stories',
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['adventure-stories'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const createStory = (
    title: string, 
    content: string, 
    predatorType?: string, 
    location?: string, 
    imageUrls?: string[],
    certificateId?: string
  ) => {
    createStoryMutation.mutate({ title, content, predatorType, location, imageUrls, certificateId });
  };

  const incrementViews = (storyId: string) => {
    incrementViewsMutation.mutate(storyId);
  };

  const incrementShares = (storyId: string) => {
    incrementSharesMutation.mutate(storyId);
  };

  return {
    stories,
    loading,
    error,
    createStory,
    incrementViews,
    incrementShares,
    isCreatingStory: createStoryMutation.isPending,
  };
};
