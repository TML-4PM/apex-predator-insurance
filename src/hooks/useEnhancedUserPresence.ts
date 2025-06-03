
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useMutation } from '@tanstack/react-query';

export interface EnhancedUserPresence {
  user_id: string;
  username: string;
  avatar_url?: string;
  status: 'online' | 'away' | 'offline';
  last_seen: string;
  current_location?: string;
  activity_status: string;
  metadata: Record<string, any>;
}

export const useEnhancedUserPresence = () => {
  const [onlineUsers, setOnlineUsers] = useState<EnhancedUserPresence[]>([]);
  const [currentUserStatus, setCurrentUserStatus] = useState<'online' | 'away' | 'offline'>('offline');

  const updatePresenceMutation = useMutation({
    mutationFn: async ({ 
      status, 
      activityStatus, 
      currentLocation, 
      metadata = {} 
    }: {
      status: 'online' | 'away' | 'offline';
      activityStatus?: string;
      currentLocation?: string;
      metadata?: Record<string, any>;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('user_presence_extended')
        .upsert({
          user_id: user.id,
          status,
          activity_status: activityStatus || 'browsing',
          current_location: currentLocation,
          metadata,
          last_seen: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
    },
  });

  useEffect(() => {
    const setupPresence = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('user_id', user.id)
        .single();

      const userPresence = {
        user_id: user.id,
        username: profile?.username || 'Anonymous',
        avatar_url: profile?.avatar_url,
        status: 'online' as const,
        last_seen: new Date().toISOString(),
        activity_status: 'browsing',
        metadata: {}
      };

      // Create presence channel for real-time sync
      const presenceChannel = supabase.channel('enhanced_user_presence');

      presenceChannel
        .on('presence', { event: 'sync' }, () => {
          const state = presenceChannel.presenceState();
          const users = Object.values(state).flat().map((presence: any) => ({
            user_id: presence.user_id || '',
            username: presence.username || 'Anonymous',
            avatar_url: presence.avatar_url,
            status: presence.status || 'online',
            last_seen: presence.last_seen || new Date().toISOString(),
            current_location: presence.current_location,
            activity_status: presence.activity_status || 'browsing',
            metadata: presence.metadata || {}
          })) as EnhancedUserPresence[];
          setOnlineUsers(users);
        })
        .on('presence', { event: 'join' }, ({ newPresences }) => {
          console.log('User joined:', newPresences);
        })
        .on('presence', { event: 'leave' }, ({ leftPresences }) => {
          console.log('User left:', leftPresences);
        })
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            await presenceChannel.track(userPresence);
            setCurrentUserStatus('online');
            
            // Update database presence
            updatePresenceMutation.mutate({
              status: 'online',
              activityStatus: 'browsing'
            });
          }
        });

      // Handle visibility changes
      const handleVisibilityChange = () => {
        const newStatus = document.hidden ? 'away' : 'online';
        presenceChannel.track({ ...userPresence, status: newStatus });
        setCurrentUserStatus(newStatus);
        
        updatePresenceMutation.mutate({
          status: newStatus,
          activityStatus: document.hidden ? 'away' : 'browsing'
        });
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        supabase.removeChannel(presenceChannel);
        setCurrentUserStatus('offline');
        
        updatePresenceMutation.mutate({
          status: 'offline'
        });
      };
    };

    setupPresence();
  }, [updatePresenceMutation]);

  const updateActivityStatus = (activityStatus: string, currentLocation?: string, metadata?: Record<string, any>) => {
    updatePresenceMutation.mutate({
      status: currentUserStatus === 'offline' ? 'online' : currentUserStatus,
      activityStatus,
      currentLocation,
      metadata
    });
  };

  return {
    onlineUsers,
    currentUserStatus,
    onlineCount: onlineUsers.length,
    updateActivityStatus,
    isUpdatingPresence: updatePresenceMutation.isPending
  };
};
