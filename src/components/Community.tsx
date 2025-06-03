
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Heart, MessageCircle, Send, Image, Globe, Users, Share2 } from 'lucide-react';
import { useCommunity } from '@/hooks/useCommunity';
import { formatDistanceToNow } from 'date-fns';
import UserMentions from '@/components/social/UserMentions';
import PostReactions from '@/components/social/PostReactions';
import EnhancedCommentsSection from '@/components/social/EnhancedCommentsSection';
import { usePostReactions } from '@/hooks/usePostReactions';

const Community = () => {
  const [newPostContent, setNewPostContent] = useState('');
  const [showCommentsFor, setShowCommentsFor] = useState<string | null>(null);
  const { posts, loading, createPost, isCreatingPost } = useCommunity();
  const { reactToPost } = usePostReactions();

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    
    await createPost(newPostContent);
    setNewPostContent('');
  };

  const handleReaction = (postId: string, reactionType: string, currentReaction?: string) => {
    reactToPost({ postId, reactionType, currentReaction });
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-apex-lightgray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading community posts...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-apex-lightgray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-apex-black mb-6 animate-fade-up">
            Join Our Adventure Community
          </h2>
          <p className="text-xl text-apex-darkgray/70 animate-fade-up animate-delay-100">
            Connect with fellow adventurers, share stories, and find your next thrill.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card className="mb-8 border-none shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex space-x-4">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces" />
                  <AvatarFallback>CH</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <UserMentions
                    value={newPostContent}
                    onChange={setNewPostContent}
                    placeholder="Share your adventure story... (Use @ to mention other users)"
                    className="resize-none border-none focus-visible:ring-0 p-2 text-base min-h-[80px]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardFooter className="pt-0 flex justify-between">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-apex-darkgray/60">
                  <Image size={18} className="mr-1" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm" className="text-apex-darkgray/60">
                  <Globe size={18} className="mr-1" />
                  Location
                </Button>
              </div>
              <Button 
                size="sm" 
                className="bg-apex-red hover:bg-apex-red/90"
                onClick={handleCreatePost}
                disabled={!newPostContent.trim() || isCreatingPost}
              >
                {isCreatingPost ? 'Posting...' : 'Post'}
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id}>
                <Card className="overflow-hidden border-none shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={post.user_profile?.avatar_url} />
                        <AvatarFallback>
                          {post.user_profile?.username?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-apex-black">
                            {post.user_profile?.username || 'Unknown User'}
                          </h3>
                          <span className="text-sm text-apex-darkgray/60">
                            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-apex-darkgray mb-4 whitespace-pre-wrap">{post.content}</p>
                    {post.image_url && (
                      <div className="rounded-lg overflow-hidden mb-4">
                        <img 
                          src={post.image_url} 
                          alt="Post" 
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="border-t border-apex-lightgray pt-4 flex flex-col gap-4">
                    {/* Post Reactions */}
                    <PostReactions
                      reactions={{
                        like: post.likes_count || 0,
                        love: 0,
                        wow: 0,
                        laugh: 0,
                        sad: 0,
                        angry: 0,
                      }}
                      userReaction={post.is_liked ? 'like' : undefined}
                      onReact={(reaction) => handleReaction(post.id, reaction, post.is_liked ? 'like' : undefined)}
                    />
                    
                    {/* Action buttons */}
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-4">
                        <button
                          onClick={() => setShowCommentsFor(
                            showCommentsFor === post.id ? null : post.id
                          )}
                          className="flex items-center gap-1 text-apex-darkgray/60 hover:text-apex-darkgray transition-colors"
                        >
                          <MessageCircle size={18} />
                          <span>{post.comments_count}</span>
                        </button>
                        <button className="flex items-center gap-1 text-apex-darkgray/60 hover:text-apex-darkgray transition-colors">
                          <Share2 size={18} />
                          <span>{post.shares_count}</span>
                        </button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>

                {/* Enhanced Comments Section */}
                {showCommentsFor === post.id && (
                  <div className="mt-4">
                    <EnhancedCommentsSection postId={post.id} />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline" className="border-apex-red text-apex-red hover:bg-apex-red/10">
              <Users className="mr-2 h-4 w-4" />
              Join Full Community
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
