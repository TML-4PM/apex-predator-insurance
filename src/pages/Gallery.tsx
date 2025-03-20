
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Camera, Heart, MessageCircle, Share2 } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    username: 'SharkDiver23',
    location: 'Great Barrier Reef, Australia',
    caption: 'Just got my Shark Insurance! Ready for tomorrow\'s cage dive!',
    insurance: 'Shark Insurance',
    likes: 247,
    comments: 42,
    imageUrl: 'https://images.unsplash.com/photo-1564731071754-001b53a902fb?q=80&w=1000',
  },
  {
    id: 2,
    username: 'SafariKing',
    location: 'Serengeti National Park, Tanzania',
    caption: 'Lion watching at dawn. Good thing I\'m covered!',
    insurance: 'Lion Insurance',
    likes: 352,
    comments: 26,
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1000',
  },
  {
    id: 3,
    username: 'AdventureAmy',
    location: 'Kakadu National Park, Australia',
    caption: 'Spotted some crocs today! My certificate doesn\'t make me feel any safer...',
    insurance: 'Crocodile Insurance',
    likes: 189,
    comments: 37,
    imageUrl: 'https://images.unsplash.com/photo-1610058908279-b8ef27153f5e?q=80&w=1000',
  },
  {
    id: 4,
    username: 'WildernessWanderer',
    location: 'Yellowstone National Park, USA',
    caption: 'Bear country! Thankfully I\'ve got my bear "insurance"!',
    insurance: 'Bear Insurance',
    likes: 274,
    comments: 18,
    imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=1000',
  },
  {
    id: 5,
    username: 'DesertTrekker',
    location: 'Mojave Desert, USA',
    caption: 'Scorpion hunting at night. Bought insurance just in case!',
    insurance: 'Scorpion Insurance',
    likes: 156,
    comments: 29,
    imageUrl: 'https://images.unsplash.com/photo-1582559934353-2e47511c95c9?q=80&w=1000',
  },
  {
    id: 6,
    username: 'DeepSeaDiver',
    location: 'Marianas Trench, Pacific Ocean',
    caption: 'Descending to the abyss. My Kraken Insurance makes me feel... exactly the same!',
    insurance: 'Kraken Insurance',
    likes: 421,
    comments: 62,
    imageUrl: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=1000',
  }
];

const Gallery = () => {
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleLike = (id: number) => {
    setLikedPosts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  return (
    <Layout>
      <div className="pt-28 pb-16 bg-apex-lightgray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-apex-black mb-6 animate-fade-up">
              Adventure Gallery
            </h1>
            <p className="text-xl text-apex-darkgray/70 mb-6 animate-fade-up animate-delay-100">
              See how our brave (or foolish) customers are putting their "insurance" to the test.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-apex-red/10 text-apex-red text-sm animate-fade-up animate-delay-200">
              <Camera size={16} />
              <span>Share your own adventure</span>
            </div>
          </div>
        </div>
      </div>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-apex-lightgray animate-pulse rounded-xl h-[400px]"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-card border border-apex-black/5 animate-fade-up"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.caption} 
                      className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-apex-red text-white text-xs font-medium px-3 py-1 rounded-full">
                        {item.insurance}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-apex-black">{item.username}</h3>
                        <p className="text-sm text-apex-darkgray/60">{item.location}</p>
                      </div>
                    </div>
                    
                    <p className="text-apex-darkgray/80 mb-4">
                      {item.caption}
                    </p>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-apex-black/5">
                      <button 
                        className="flex items-center gap-1 text-apex-darkgray/60 hover:text-apex-red transition-colors"
                        onClick={() => toggleLike(item.id)}
                      >
                        <Heart 
                          size={18} 
                          className={likedPosts[item.id] ? "fill-apex-red text-apex-red" : ""} 
                        />
                        <span>{likedPosts[item.id] ? item.likes + 1 : item.likes}</span>
                      </button>
                      
                      <button className="flex items-center gap-1 text-apex-darkgray/60 hover:text-apex-darkgray transition-colors">
                        <MessageCircle size={18} />
                        <span>{item.comments}</span>
                      </button>
                      
                      <button className="flex items-center gap-1 text-apex-darkgray/60 hover:text-apex-darkgray transition-colors">
                        <Share2 size={18} />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-16 text-center">
            <button className="inline-flex items-center justify-center px-6 py-3 bg-apex-lightgray text-apex-black rounded-lg hover:bg-apex-lightgray/70 transition-all duration-300">
              <Camera size={18} className="mr-2" />
              Upload Your Adventure
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
