
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Notification {
  id: string;
  user_id: string;
  type: 'like' | 'comment' | 'follow' | 'post_mention';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  related_id?: string;
  from_user?: {
    username: string;
    avatar_url?: string;
  };
}

export const useRealTimeNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch notifications
      const { data: notificationsData, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching notifications:', error);
        return;
      }

      if (notificationsData) {
        // Fetch profile data for notifications that have from_user_id
        const fromUserIds = notificationsData
          .filter(n => n.from_user_id)
          .map(n => n.from_user_id);

        let profilesData: any[] = [];
        if (fromUserIds.length > 0) {
          const { data: profiles } = await supabase
            .from('profiles')
            .select('user_id, username, avatar_url')
            .in('user_id', fromUserIds);
          
          profilesData = profiles || [];
        }

        const formattedNotifications = notificationsData.map(notification => {
          const profile = profilesData.find(p => p.user_id === notification.from_user_id);
          
          return {
            ...notification,
            from_user: profile ? {
              username: profile.username || 'Unknown User',
              avatar_url: profile.avatar_url
            } : undefined
          };
        }) as Notification[];
        
        setNotifications(formattedNotifications);
        setUnreadCount(formattedNotifications.filter(n => !n.read).length);
      }
    };

    fetchNotifications();

    // Subscribe to real-time notifications
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications'
        },
        async (payload) => {
          const newNotification = payload.new as any;
          
          // Fetch the user profile for the new notification if it has from_user_id
          let fromUser = undefined;
          if (newNotification.from_user_id) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('username, avatar_url')
              .eq('user_id', newNotification.from_user_id)
              .single();

            if (profile) {
              fromUser = {
                username: profile.username || 'Unknown User',
                avatar_url: profile.avatar_url
              };
            }
          }

          const formattedNotification: Notification = {
            ...newNotification,
            from_user: fromUser
          };
          
          setNotifications(prev => [formattedNotification, ...prev]);
          setUnreadCount(prev => prev + 1);
          
          // Show toast for new notification
          toast({
            title: newNotification.title,
            description: newNotification.message,
            duration: 4000,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const markAsRead = async (notificationId: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (!error) {
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const markAllAsRead = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', user.id)
      .eq('read', false);

    if (!error) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    }
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead
  };
};
