
export interface ChatConversation {
  id: string;
  name?: string;
  is_group: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  participants?: ChatParticipant[];
  last_message?: ChatMessage;
}

export interface ChatParticipant {
  id: string;
  conversation_id: string;
  user_id: string;
  joined_at: string;
  last_read_at?: string;
  profile?: {
    username: string;
    avatar_url?: string;
    full_name?: string;
  };
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file';
  reply_to_id?: string;
  created_at: string;
  updated_at: string;
  is_edited: boolean;
  sender_profile?: {
    username: string;
    avatar_url?: string;
    full_name?: string;
  };
  reply_to?: ChatMessage;
}

export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  parent_comment_id?: string;
  content: string;
  likes_count: number;
  created_at: string;
  updated_at: string;
  user_profile?: {
    username: string;
    avatar_url?: string;
    full_name?: string;
  };
  replies?: PostComment[];
  is_liked?: boolean;
}

export interface PostReaction {
  id: string;
  post_id: string;
  user_id: string;
  reaction_type: 'like' | 'love' | 'wow' | 'laugh' | 'sad' | 'angry';
  created_at: string;
}

export interface UserMention {
  id: string;
  mentioned_user_id: string;
  mentioning_user_id: string;
  post_id?: string;
  comment_id?: string;
  message_id?: string;
  created_at: string;
}
