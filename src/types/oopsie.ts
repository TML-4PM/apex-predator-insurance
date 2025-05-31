
export interface Oopsie {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: 'ai_fail' | 'adventure_gone_wrong' | 'insurance_claim' | 'wildlife_encounter' | 'equipment_failure' | 'other';
  image_url?: string;
  video_url?: string;
  likes: number;
  comments: number;
  shares: number;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
  viral_score: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface OopsieComment {
  id: string;
  oopsie_id: string;
  user_id: string;
  content: string;
  likes: number;
  created_at: string;
}

export interface OopsieSubmission {
  title: string;
  description: string;
  category: Oopsie['category'];
  image_file?: File;
  image_url?: string;
}

// Add types for database responses that might have wider string types
export interface OopsieFromDB {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string; // Database returns string, we'll validate it
  image_url?: string;
  video_url?: string;
  likes: number;
  comments: number;
  shares: number;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
  viral_score: number;
  status: string; // Database returns string, we'll validate it
}
