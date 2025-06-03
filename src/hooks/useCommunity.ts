
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CommunityPost {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  location?: string;
  certificate_id?: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  user_profile?: {
    username: string;
    avatar_url?: string;
    full_name?: string;
  };
  is_liked?: boolean;
}

export const useCommunity = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [userFollowing, setUserFollowing] = useState<string[]>([]);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url,
            full_name
          ),
          post_likes!left (
            user_id
          )
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      const formattedPosts = data?.map(post => ({
        ...post,
        user_profile: post.profiles,
        is_liked: post.post_likes?.some((like: any) => 
          like.user_id === (await supabase.auth.getUser()).data.user?.id
        ) || false
      })) || [];

      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error loading posts",
        description: "Could not load community posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content: string, imageUrl?: string, location?: string, certificateId?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('community_posts')
        .insert({
          user_id: user.id,
          content,
          image_url: imageUrl,
          location,
          certificate_id: certificateId
        });

      if (error) throw error;

      toast({
        title: "Post created!",
        description: "Your adventure story has been shared with the community."
      });

      fetchPosts(); // Refresh posts
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error creating post",
        description: "Could not share your adventure story",
        variant: "destructive"
      });
    }
  };

  const toggleLike = async (postId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const post = posts.find(p => p.id === postId);
      if (!post) return;

      if (post.is_liked) {
        // Unlike
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);

        await supabase
          .from('community_posts')
          .update({ likes_count: Math.max(0, post.likes_count - 1) })
          .eq('id', postId);
      } else {
        // Like
        await supabase
          .from('post_likes')
          .insert({ post_id: postId, user_id: user.id });

        await supabase
          .from('community_posts')
          .update({ likes_count: post.likes_count + 1 })
          .eq('id', postId);
      }

      // Update local state
      setPosts(prevPosts => 
        prevPosts.map(p => 
          p.id === postId 
            ? { 
                ...p, 
                is_liked: !p.is_liked,
                likes_count: p.is_liked ? p.likes_count - 1 : p.likes_count + 1
              }
            : p
        )
      );
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: "Error",
        description: "Could not update like status",
        variant: "destructive"
      });
    }
  };

  const followUser = async (userId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('user_follows')
        .insert({ follower_id: user.id, following_id: userId });

      if (error) throw error;

      setUserFollowing(prev => [...prev, userId]);
      toast({
        title: "Following user",
        description: "You are now following this adventurer!"
      });
    } catch (error) {
      console.error('Error following user:', error);
      toast({
        title: "Error",
        description: "Could not follow user",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    userFollowing,
    createPost,
    toggleLike,
    followUser,
    refreshPosts: fetchPosts
  };
};
