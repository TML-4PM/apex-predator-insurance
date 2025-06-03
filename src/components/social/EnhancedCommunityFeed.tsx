
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
  Camera, 
  Trophy,
  UserPlus,
  Send
} from 'lucide-react';
import { useCommunity } from '@/hooks/useCommunity';
import { formatDistanceToNow } from 'date-fns';
import ShareAdventure from '@/components/ShareAdventure';

const EnhancedCommunityFeed = () => {
  const { posts, loading, createPost, toggleLike, followUser } = useCommunity();
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostLocation, setNewPostLocation] = useState('');

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    
    await createPost(newPostContent, undefined, newPostLocation);
    setNewPostContent('');
    setNewPostLocation('');
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Create Post Card */}
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-3">
          <h3 className="font-semibold text-apex-black">Share Your Adventure</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="What's your latest adventure story? Share your experience with the community..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className="min-h-[100px] resize-none border-none focus-visible:ring-0"
          />
          
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-apex-darkgray/60" />
            <input
              type="text"
              placeholder="Add location..."
              value={newPostLocation}
              onChange={(e) => setNewPostLocation(e.target.value)}
              className="flex-1 text-sm border-none outline-none bg-transparent placeholder:text-apex-darkgray/60"
            />
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-apex-darkgray/60">
                <Camera size={18} className="mr-1" />
                Photo
              </Button>
              <Button variant="ghost" size="sm" className="text-apex-darkgray/60">
                <Trophy size={18} className="mr-1" />
                Certificate
              </Button>
            </div>
            <Button 
              onClick={handleCreatePost}
              disabled={!newPostContent.trim()}
              className="bg-apex-red hover:bg-apex-red/90"
            >
              <Send size={16} className="mr-1" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="border-none shadow-lg overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={post.user_profile?.avatar_url} />
                    <AvatarFallback>
                      {post.user_profile?.username?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-apex-black">
                        {post.user_profile?.full_name || post.user_profile?.username}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        Adventurer
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-apex-darkgray/60">
                      <span>{formatDistanceToNow(new Date(post.created_at))} ago</span>
                      {post.location && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin size={12} />
                            <span>{post.location}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => followUser(post.user_id)}
                  className="text-apex-red hover:bg-apex-red/10"
                >
                  <UserPlus size={16} className="mr-1" />
                  Follow
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-apex-darkgray leading-relaxed">{post.content}</p>
              
              {post.image_url && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={post.image_url}
                    alt="Adventure"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              
              {post.certificate_id && (
                <div className="bg-gradient-to-r from-apex-red/10 to-orange-500/10 p-4 rounded-lg border border-apex-red/20">
                  <div className="flex items-center gap-2 text-apex-red">
                    <Trophy size={20} />
                    <span className="font-medium">Certificate Earned!</span>
                  </div>
                  <p className="text-sm text-apex-darkgray/70 mt-1">
                    This adventure was backed by Apex Predator Insurance
                  </p>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-4 border-t border-apex-lightgray">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-2 text-apex-darkgray/60 hover:text-apex-red transition-colors"
                  >
                    <Heart
                      size={18}
                      className={post.is_liked ? "fill-apex-red text-apex-red" : ""}
                    />
                    <span>{post.likes_count}</span>
                  </button>
                  
                  <button className="flex items-center gap-2 text-apex-darkgray/60 hover:text-apex-darkgray transition-colors">
                    <MessageCircle size={18} />
                    <span>{post.comments_count}</span>
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <ShareAdventure
                      title={`Adventure Story by ${post.user_profile?.username}`}
                      text={post.content}
                      compact={true}
                    />
                    <span className="text-apex-darkgray/60 text-sm">{post.shares_count}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {posts.length === 0 && (
        <Card className="border-none shadow-lg">
          <CardContent className="text-center py-12">
            <Trophy className="mx-auto h-12 w-12 text-apex-darkgray/40 mb-4" />
            <h3 className="text-lg font-semibold text-apex-black mb-2">
              No adventures shared yet
            </h3>
            <p className="text-apex-darkgray/60 mb-6">
              Be the first to share your adventure story with the community!
            </p>
            <Button className="bg-apex-red hover:bg-apex-red/90">
              Share Your Adventure
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedCommunityFeed;
