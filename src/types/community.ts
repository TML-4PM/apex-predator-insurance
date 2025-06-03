
export interface CommunityPost {
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

export interface UserProfile {
  user_id: string;
  username: string;
  avatar_url?: string;
  full_name?: string;
}

export interface CreatePostData {
  content: string;
  imageUrl?: string;
  location?: string;
  certificateId?: string;
}
