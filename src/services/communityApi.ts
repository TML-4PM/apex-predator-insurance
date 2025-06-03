
import { supabase } from '@/integrations/supabase/client';
import type { CommunityPost, UserProfile, CreatePostData } from '@/types/community';

export const fetchCommunityPosts = async (): Promise<CommunityPost[]> => {
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
    return [];
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
  return formattedPosts;
};

export const createCommunityPost = async (postData: CreatePostData): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('community_posts')
    .insert({
      user_id: user.id,
      content: postData.content,
      image_url: postData.imageUrl,
      location: postData.location,
      certificate_id: postData.certificateId
    });

  if (error) throw error;
};

export const togglePostLike = async (postId: string, isCurrentlyLiked: boolean, currentLikesCount: number): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  if (isCurrentlyLiked) {
    // Unlike
    await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', user.id);

    await supabase
      .from('community_posts')
      .update({ likes_count: Math.max(0, currentLikesCount - 1) })
      .eq('id', postId);
  } else {
    // Like
    await supabase
      .from('post_likes')
      .insert({ post_id: postId, user_id: user.id });

    await supabase
      .from('community_posts')
      .update({ likes_count: currentLikesCount + 1 })
      .eq('id', postId);
  }
};

export const followUser = async (userId: string): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('user_follows')
    .insert({ follower_id: user.id, following_id: userId });

  if (error) throw error;
};
