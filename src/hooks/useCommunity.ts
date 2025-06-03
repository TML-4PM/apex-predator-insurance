
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
      console.log('Fetching community posts...');
      
      // First fetch posts
      const { data: postsData, error: postsError } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (postsError) {
        console.error('Error fetching posts:', postsError);
        throw postsError;
      }

      if (!postsData || postsData.length === 0) {
        console.log('No posts found');
        setPosts([]);
        setLoading(false);
        return;
      }

      console.log('Posts fetched:', postsData.length);

      // Get current user for like status
      const { data: { user } } = await supabase.auth.getUser();

      // Fetch profiles for each post
      const userIds = postsData.map((post: any) => post.user_id);
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, username, avatar_url, full_name')
        .in('user_id', userIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
      }

      // Fetch like status if user is logged in
      let likesData: any[] = [];
      if (user) {
        const postIds = postsData.map((post: any) => post.id);
        const { data, error: likesError } = await supabase
          .from('post_likes')
          .select('post_id')
          .eq('user_id', user.id)
          .in('post_id', postIds);
        
        if (likesError) {
          console.error('Error fetching likes:', likesError);
        } else {
          likesData = data || [];
        }
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

      console.log('Formatted posts:', formattedPosts.length);
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
