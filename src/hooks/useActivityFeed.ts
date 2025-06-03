
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ActivityFeed {
  id: string;
  user_id: string;
  activity_type: string;
  target_id?: string;
  target_type?: string;
  metadata: Record<string, any>;
  created_at: string;
  user_profile?: {
    username: string;
    avatar_url?: string;
    full_name?: string;
  };
}

export const useActivityFeed = (limit = 20) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: activities = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['activity-feed', limit],
    queryFn: async () => {
      const { data: activitiesData, error: activitiesError } = await supabase
        .from('activity_feeds')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (activitiesError) throw activitiesError;

      if (!activitiesData || activitiesData.length === 0) {
        return [];
      }

      // Get unique user IDs
      const userIds = [...new Set(activitiesData.map(activity => activity.user_id))];
      
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

      // Combine data and ensure proper type conversion
      const formattedActivities = activitiesData.map(activity => ({
        ...activity,
        metadata: (activity.metadata as Record<string, any>) || {},
        user_profile: profilesMap.get(activity.user_id) || {
          username: 'Unknown User',
          avatar_url: null,
          full_name: null
        }
      }));

      return formattedActivities;
    },
  });

  const createActivityMutation = useMutation({
    mutationFn: async ({ 
      activityType, 
      targetId, 
      targetType, 
      metadata = {} 
    }: {
      activityType: string;
      targetId?: string;
      targetType?: string;
      metadata?: Record<string, any>;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('activity_feeds')
        .insert({
          user_id: user.id,
          activity_type: activityType,
          target_id: targetId,
          target_type: targetType,
          metadata
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activity-feed'] });
    },
    onError: (error) => {
      console.error('Error creating activity:', error);
      toast({
        title: "Error",
        description: "Failed to record activity",
        variant: "destructive",
      });
    },
  });

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('activity-feed-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'activity_feeds',
        },
        async (payload) => {
          const newActivity = payload.new as any;
          
          // Fetch user profile for the new activity
          const { data: profile } = await supabase
            .from('profiles')
            .select('username, avatar_url, full_name')
            .eq('user_id', newActivity.user_id)
            .single();

          const formattedActivity: ActivityFeed = {
            ...newActivity,
            metadata: (newActivity.metadata as Record<string, any>) || {},
            user_profile: profile || {
              username: 'Unknown User',
              avatar_url: null,
              full_name: null
            }
          };

          queryClient.setQueryData(['activity-feed', limit], (oldData: ActivityFeed[] = []) => 
            [formattedActivity, ...oldData.slice(0, limit - 1)]
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [limit, queryClient]);

  const createActivity = (
    activityType: string, 
    targetId?: string, 
    targetType?: string, 
    metadata?: Record<string, any>
  ) => {
    createActivityMutation.mutate({ activityType, targetId, targetType, metadata });
  };

  return {
    activities,
    loading,
    error,
    createActivity,
    isCreatingActivity: createActivityMutation.isPending,
  };
};
