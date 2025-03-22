
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CalendarDays, User, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'How to Survive a Shark Encounter (You Probably Won\'t)',
    excerpt: 'Our tongue-in-cheek guide to shark encounters. The only real advice: don\'t get in the water.',
    author: 'Mike Fisher',
    date: 'June 12, 2023',
    readTime: '5 min read',
    category: 'Shark Safety',
    image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?q=80&w=1000',
    slug: 'how-to-survive-shark-encounter'
  },
  {
    id: 2,
    title: 'Hiking in Bear Country: The Ultimate Guide',
    excerpt: 'Essential strategies for hiking in areas populated by bears, and what to do if you encounter one.',
    author: 'Sarah Johnson',
    date: 'May 28, 2023',
    readTime: '7 min read',
    category: 'Bear Safety',
    image: 'https://images.unsplash.com/photo-1525869916826-972885c91c1e?q=80&w=1000',
    slug: 'hiking-bear-country-ultimate-guide'
  },
  {
    id: 3,
    title: 'So You Want to Pet a Lion? Here\'s Why You Shouldn\'t',
    excerpt: 'An exploration of why big cats don\'t want your cuddles, despite their fluffy appearance.',
    author: 'David Rodriguez',
    date: 'April 15, 2023',
    readTime: '6 min read',
    category: 'Big Cat Facts',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1000',
    slug: 'why-you-shouldnt-pet-lions'
  }
];

const Blog = () => {
  return (
    <section className="py-20 bg-white" id="blog">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-apex-black mb-6 animate-fade-up">
            Survival Blog
          </h2>
          <p className="text-xl text-apex-darkgray/70 animate-fade-up animate-delay-100">
            Tips, stories, and humor about the world's deadliest creatures.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-none flex flex-col">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <CardContent className="p-6 flex-grow">
                <div className="flex items-center gap-3 text-sm text-apex-darkgray/60 mb-3">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-xl mb-3 text-apex-black hover:text-apex-red transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-apex-darkgray/80 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-apex-darkgray/60" />
                    <span className="text-sm text-apex-darkgray/60">{post.author}</span>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs font-medium bg-apex-red/10 text-apex-red px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="bg-apex-lightgray/50 p-4">
                <Link to={`/articles/${post.slug}`} className="w-full">
                  <Button 
                    variant="ghost" 
                    className="text-apex-red p-0 hover:bg-transparent hover:text-apex-red/80 w-full flex justify-center items-center"
                  >
                    Read More <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/articles">
            <Button 
              variant="outline" 
              className="border-apex-red text-apex-red hover:bg-apex-red/10"
            >
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
