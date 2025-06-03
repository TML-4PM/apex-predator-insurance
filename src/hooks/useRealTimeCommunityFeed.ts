
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { CommunityPost } from '@/types/community';
import { useToast } from '@/hooks/use-toast';

export const useRealTimeCommunityFeed = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data: postsData, error: postsError } = await supabase
          .from('community_posts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);

        if (postsError) throw postsError;

        if (!postsData || postsData.length === 0) {
          setPosts([]);
          setLoading(false);
          return;
        }

        // Get current user for like status
        const { data: { user } } = await supabase.auth.getUser();

        // Fetch profiles for each post
        const userIds = postsData.map((post: any) => post.user_id);
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('user_id, username, avatar_url, full_name')
          .in('user_id', userIds);

        // Fetch like status if user is logged in
        let likesData: any[] = [];
        if (user) {
          const postIds = postsData.map((post: any) => post.id);
          const { data } = await supabase
            .from('post_likes')
            .select('post_id')
            .eq('user_id', user.id)
            .in('post_id', postIds);
          
          likesData = data || [];
        }

        // Combine data
        const formattedPosts = postsData.map((post: any) => {
          const profile = profilesData?.find((p: any) => p.user_id === post.user_id);
          const isLiked = likesData.some((like: any) => like.post_id === post.id);

          return {
            ...post,
            user_profile: profile ? {
              username: profile.username || 'Unknown User',
              avatar_url: profile.avatar_url,
              full_name: profile.full_name
            } : {
              username: 'Unknown User',
              avatar_url: undefined,
              full_name: undefined
            },
            is_liked: isLiked
          };
        });

        setPosts(formattedPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('community_posts_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'community_posts'
        },
        async (payload) => {
          const newPost = payload.new as any;
          
          // Fetch the user profile for the new post
          const { data: profile } = await supabase
            .from('profiles')
            .select('username, avatar_url, full_name')
            .eq('user_id', newPost.user_id)
            .single();

          const formattedPost: CommunityPost = {
            ...newPost,
            user_profile: profile ? {
              username: profile.username || 'Unknown User',
              avatar_url: profile.avatar_url,
              full_name: profile.full_name
            } : {
              username: 'Unknown User',
              avatar_url: undefined,
              full_name: undefined
            },
            is_liked: false
          };

          setPosts(prev => [formattedPost, ...prev]);
          
          toast({
            title: "New Adventure Story!",
            description: `${formattedPost.user_profile?.username} shared a new story`,
            duration: 3000,
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'community_posts'
        },
        (payload) => {
          const updatedPost = payload.new as any;
          setPosts(prev => 
            prev.map(post => 
              post.id === updatedPost.id 
                ? { ...post, ...updatedPost }
                : post
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  return {
    posts,
    loading,
    setPosts
  };
};
