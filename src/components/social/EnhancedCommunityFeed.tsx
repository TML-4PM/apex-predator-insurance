
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Award,
  Send,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useRealTimeCommunityFeed } from '@/hooks/useRealTimeCommunityFeed';
import { useCommunity } from '@/hooks/useCommunity';
import OnlineUsersIndicator from '@/components/OnlineUsersIndicator';

const EnhancedCommunityFeed = () => {
  const { posts, loading } = useRealTimeCommunityFeed();
  const { createPost, toggleLike, isCreatingPost, isTogglingLike } = useCommunity();
  const [newPostContent, setNewPostContent] = useState('');

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    
    await createPost(newPostContent);
    setNewPostContent('');
  };

  const handleLike = async (postId: string) => {
    await toggleLike(postId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-apex-red" />
        <span className="ml-2 text-apex-darkgray">Loading community feed...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Online Users Indicator */}
      <OnlineUsersIndicator />

      {/* Create Post Card */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <h3 className="text-lg font-semibold text-apex-black">Share Your Adventure</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Tell the community about your latest wildlife encounter or adventure..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ImageIcon className="h-4 w-4 mr-2" />
                Add Photo
              </Button>
              <Button variant="outline" size="sm" disabled>
                <MapPin className="h-4 w-4 mr-2" />
                Add Location
              </Button>
            </div>
            <Button 
              onClick={handleCreatePost}
              disabled={!newPostContent.trim() || isCreatingPost}
              className="bg-apex-red hover:bg-apex-red/90"
            >
              {isCreatingPost ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Share Story
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <Card className="border-none shadow-lg">
            <CardContent className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-apex-darkgray/40 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-apex-black mb-2">
                No Stories Yet
              </h3>
              <p className="text-apex-darkgray/60 mb-6">
                Be the first to share your adventure story with the community!
              </p>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                {/* Post Header */}
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.user_profile?.avatar_url} />
                    <AvatarFallback>
                      {post.user_profile?.username?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-apex-black">
                        {post.user_profile?.full_name || post.user_profile?.username}
                      </h4>
                      {post.certificate_id && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <Award className="h-3 w-3 mr-1" />
                          Certified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-apex-darkgray/60">
                      @{post.user_profile?.username} • {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-apex-black leading-relaxed">
                    {post.content}
                  </p>
                  
                  {post.location && (
                    <div className="flex items-center gap-1 mt-2 text-sm text-apex-darkgray/60">
                      <MapPin className="h-4 w-4" />
                      {post.location}
                    </div>
                  )}
                </div>

                {/* Post Image */}
                {post.image_url && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={post.image_url} 
                      alt="Adventure story"
                      className="w-full h-auto max-h-96 object-cover"
                    />
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      disabled={isTogglingLike}
                      className={`hover:bg-red-50 ${post.is_liked ? 'text-red-500' : 'text-gray-500'}`}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${post.is_liked ? 'fill-current' : ''}`} />
                      {post.likes_count}
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="hover:bg-blue-50 text-gray-500">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments_count}
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="hover:bg-green-50 text-gray-500">
                      <Share2 className="h-4 w-4 mr-1" />
                      {post.shares_count}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default EnhancedCommunityFeed;
