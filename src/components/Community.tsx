
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Heart, MessageCircle, Send, Image, Globe, Users } from 'lucide-react';

const communityPosts = [
  {
    id: 1,
    author: {
      name: 'Jamie Sullivan',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces',
    },
    createdAt: '2 hours ago',
    content: "Just booked my trip to Borneo! Any recommendations for trails where I might encounter some wildlife? (Obviously getting my Komodo Dragon certificate before I go!)",
    likes: 28,
    comments: 12,
  },
  {
    id: 2,
    author: {
      name: 'Lena Nguyen',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces',
    },
    createdAt: '5 hours ago',
    content: "Spent the day shark cage diving off the coast of South Africa. The shark certificate was a hit with my diving group. Thanks Wildlife Shield!",
    likes: 56,
    comments: 24,
    image: 'https://images.unsplash.com/photo-1560953956-c11bb5679db4?q=80&w=1000'
  },
];

const Community = () => {
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
                  <Textarea 
                    placeholder="Share your adventure story..." 
                    className="resize-none border-none focus-visible:ring-0 p-2 text-base" 
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
              <Button size="sm" className="bg-apex-red hover:bg-apex-red/90">
                Post
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-6">
            {communityPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden border-none shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-apex-black">{post.author.name}</h3>
                        <span className="text-sm text-apex-darkgray/60">{post.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-apex-darkgray mb-4">{post.content}</p>
                  {post.image && (
                    <div className="rounded-lg overflow-hidden mb-4">
                      <img 
                        src={post.image} 
                        alt="Post" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t border-apex-lightgray pt-4 flex justify-between">
                  <div className="flex gap-6">
                    <button className="flex items-center gap-1 text-apex-darkgray/60 hover:text-apex-red transition-colors">
                      <Heart size={18} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-apex-darkgray/60 hover:text-apex-darkgray transition-colors">
                      <MessageCircle size={18} />
                      <span>{post.comments}</span>
                    </button>
                  </div>
                  <div className="flex items-center">
                    <Textarea 
                      placeholder="Add a comment..." 
                      className="resize-none border-none focus-visible:ring-0 py-0 text-sm h-8 min-h-0"
                    />
                    <Button variant="ghost" size="sm" className="text-apex-red">
                      <Send size={16} />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
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
