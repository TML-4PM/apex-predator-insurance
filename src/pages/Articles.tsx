
import React from 'react';
import Layout from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: 'How to Survive a Shark Encounter (You Probably Won\'t)',
    excerpt: 'Our tongue-in-cheek guide to shark encounters. The only real advice: don\'t get in the water.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl nec nisl.',
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
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl nec nisl.',
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
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl nec nisl.',
    author: 'David Rodriguez',
    date: 'April 15, 2023',
    readTime: '6 min read',
    category: 'Big Cat Facts',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1000',
    slug: 'why-you-shouldnt-pet-lions'
  },
  {
    id: 4,
    title: 'Crocodile Encounters: Surviving the Ambush Predator',
    excerpt: 'Understanding crocodile behavior and the importance of respecting their territory.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl nec nisl.',
    author: 'Emma Waters',
    date: 'March 3, 2023',
    readTime: '8 min read',
    category: 'Crocodile Safety',
    image: 'https://images.unsplash.com/photo-1610058908279-b8ef27153f5e?q=80&w=1000',
    slug: 'crocodile-encounters-surviving'
  },
  {
    id: 5,
    title: 'Venomous Snakes: Identifying the Deadliest Species',
    excerpt: 'A guide to recognizing dangerous snake species and what to do if bitten.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl nec nisl.',
    author: 'Robert Chen',
    date: 'February 17, 2023',
    readTime: '6 min read',
    category: 'Snake Safety',
    image: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?q=80&w=1000',
    slug: 'venomous-snakes-identification'
  },
  {
    id: 6,
    title: 'The Hippo: Africa\'s Most Dangerous Animal',
    excerpt: 'Why these seemingly docile giants are responsible for more human deaths than lions.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl nec nisl.',
    author: 'James Mutugi',
    date: 'January 9, 2023',
    readTime: '5 min read',
    category: 'African Wildlife',
    image: 'https://images.unsplash.com/photo-1595162265991-c9e603c0f2e7?q=80&w=1000',
    slug: 'hippos-africas-most-dangerous'
  }
];

const Articles = () => {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-apex-black mb-6">
              Survival Blog
            </h1>
            <p className="text-xl text-apex-darkgray/70 mb-8">
              Your resource for wildlife safety, predator facts, and survival tips.
            </p>
            <Link to="/">
              <Button variant="outline" className="mb-12">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link to={`/articles/${post.slug}`} key={post.id}>
                <div className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-3 text-sm text-apex-darkgray/60 mb-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="font-bold text-xl mb-3 text-apex-black group-hover:text-apex-red transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-apex-darkgray/80 mb-4 flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm text-apex-darkgray/60">{post.author}</span>
                      <span className="text-xs font-medium bg-apex-red/10 text-apex-red px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Articles;
