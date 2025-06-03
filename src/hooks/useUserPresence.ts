
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface UserPresence {
  user_id: string;
  username: string;
  avatar_url?: string;
  status: 'online' | 'away' | 'offline';
  last_seen: string;
}

export const useUserPresence = () => {
  const [onlineUsers, setOnlineUsers] = useState<UserPresence[]>([]);
  const [currentUserStatus, setCurrentUserStatus] = useState<'online' | 'away' | 'offline'>('offline');

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
        last_seen: new Date().toISOString()
      };

      // Create presence channel
      const presenceChannel = supabase.channel('user_presence');

      presenceChannel
        .on('presence', { event: 'sync' }, () => {
          const state = presenceChannel.presenceState();
          const users = Object.values(state).flat().map((presence: any) => ({
            user_id: presence.user_id || '',
            username: presence.username || 'Anonymous',
            avatar_url: presence.avatar_url,
            status: presence.status || 'online',
            last_seen: presence.last_seen || new Date().toISOString()
          })) as UserPresence[];
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
          }
        });

      // Handle visibility changes
      const handleVisibilityChange = () => {
        if (document.hidden) {
          presenceChannel.track({ ...userPresence, status: 'away' });
          setCurrentUserStatus('away');
        } else {
          presenceChannel.track({ ...userPresence, status: 'online' });
          setCurrentUserStatus('online');
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        supabase.removeChannel(presenceChannel);
        setCurrentUserStatus('offline');
      };
    };

    setupPresence();
  }, []);

  return {
    onlineUsers,
    currentUserStatus,
    onlineCount: onlineUsers.length
  };
};
