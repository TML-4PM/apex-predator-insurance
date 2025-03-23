
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Camera, Heart, MessageCircle, Share2 } from 'lucide-react';
import ShareAdventure from '@/components/ShareAdventure';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const galleryItems = [
  {
    id: 1,
    username: 'SharkDiver23',
    location: 'Great Barrier Reef, Australia',
    caption: 'Just got my Shark Insurance! Ready for tomorrow\'s cage dive with these monsters!',
    insurance: 'Shark Insurance',
    likes: 247,
    comments: 42,
    imageUrl: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    username: 'SafariKing',
    location: 'Serengeti National Park, Tanzania',
    caption: 'Lion watching at dawn. This beast came within 10 feet of our vehicle! Good thing I\'m covered!',
    insurance: 'Lion Insurance',
    likes: 352,
    comments: 26,
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    username: 'AdventureAmy',
    location: 'Kakadu National Park, Australia',
    caption: 'Spotted some crocs today! My certificate doesn\'t make me feel any safer...',
    insurance: 'Crocodile Insurance',
    likes: 189,
    comments: 37,
    imageUrl: 'https://images.unsplash.com/photo-1610058497388-5d1e6fcbb56c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    username: 'WildernessWanderer',
    location: 'Yellowstone National Park, USA',
    caption: 'Bear country! This grizzly was searching for food near our campsite. Thankfully I\'ve got my bear "insurance"!',
    insurance: 'Bear Insurance',
    likes: 274,
    comments: 18,
    imageUrl: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    username: 'DesertTrekker',
    location: 'Mojave Desert, USA',
    caption: 'Scorpion hunting at night. Bought insurance just in case!',
    insurance: 'Scorpion Insurance',
    likes: 156,
    comments: 29,
    imageUrl: 'https://images.unsplash.com/photo-1586861256632-52a3db3a26ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    username: 'DeepSeaDiver',
    location: 'Marianas Trench, Pacific Ocean',
    caption: 'Descending to the abyss. My Kraken Insurance makes me feel... exactly the same!',
    insurance: 'Kraken Insurance',
    likes: 421,
    comments: 62,
    imageUrl: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  }
];

const Gallery = () => {
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [openPhotoId, setOpenPhotoId] = useState<number | null>(null);
  const [showSocialAuthPrompt, setShowSocialAuthPrompt] = useState(false);
  const { toast } = useToast();
  
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
    
    toast({
      title: likedPosts[id] ? "Removed like" : "Added like",
      description: likedPosts[id] ? "You unliked this adventure" : "You liked this adventure",
      duration: 1500
    });
  };

  const handleSocialAuth = (platform: string) => {
    toast({
      title: `Connecting to ${platform}`,
      description: `Authenticating with ${platform} to share your adventure...`,
      duration: 3000
    });
    
    // Simulate authentication process
    setTimeout(() => {
      toast({
        title: "Authentication Successful",
        description: `Connected to ${platform}. Now you can share directly!`,
        duration: 3000
      });
      setShowSocialAuthPrompt(false);
    }, 1500);
  };
  
  const selectedPhoto = galleryItems.find(item => item.id === openPhotoId);
  
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
                  className="bg-white rounded-xl overflow-hidden shadow-card border border-apex-black/5 animate-fade-up cursor-pointer"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  onClick={() => setOpenPhotoId(item.id)}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.caption} 
                      className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(item.id);
                        }}
                      >
                        <Heart 
                          size={18} 
                          className={likedPosts[item.id] ? "fill-apex-red text-apex-red" : ""} 
                        />
                        <span>{likedPosts[item.id] ? item.likes + 1 : item.likes}</span>
                      </button>
                      
                      <button 
                        className="flex items-center gap-1 text-apex-darkgray/60 hover:text-apex-darkgray transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <MessageCircle size={18} />
                        <span>{item.comments}</span>
                      </button>
                      
                      <button
                        className="flex items-center gap-1 text-apex-darkgray/60 hover:text-apex-red transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowSocialAuthPrompt(true);
                        }}
                      >
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

      {/* Photo Detail Dialog */}
      <Dialog open={openPhotoId !== null} onOpenChange={(open) => !open && setOpenPhotoId(null)}>
        <DialogContent className="sm:max-w-3xl">
          {selectedPhoto && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between">
                    <span>{selectedPhoto.username}</span>
                    <span className="bg-apex-red text-white text-xs px-2 py-1 rounded-full">{selectedPhoto.insurance}</span>
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    {selectedPhoto.location}
                  </DialogDescription>
                </DialogHeader>
                
                <p className="my-4 text-apex-darkgray/80">{selectedPhoto.caption}</p>
                
                <div className="mt-auto pt-4 border-t flex justify-between items-center">
                  <button 
                    className="flex items-center gap-1 text-apex-darkgray/60 hover:text-apex-red transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(selectedPhoto.id);
                    }}
                  >
                    <Heart 
                      size={18} 
                      className={likedPosts[selectedPhoto.id] ? "fill-apex-red text-apex-red" : ""} 
                    />
                    <span>{likedPosts[selectedPhoto.id] ? selectedPhoto.likes + 1 : selectedPhoto.likes}</span>
                  </button>
                  
                  <button className="flex items-center gap-1 text-apex-darkgray/60 hover:text-apex-darkgray transition-colors">
                    <MessageCircle size={18} />
                    <span>{selectedPhoto.comments}</span>
                  </button>
                  
                  <button
                    className="flex items-center gap-1 text-apex-darkgray/60 hover:text-apex-red transition-colors"
                    onClick={() => setShowSocialAuthPrompt(true)}
                  >
                    <Share2 size={18} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Social Auth Dialog */}
      <Dialog open={showSocialAuthPrompt} onOpenChange={setShowSocialAuthPrompt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect Social Media</DialogTitle>
            <DialogDescription>
              Connect your social media accounts to share adventures directly
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-sm text-muted-foreground">
              Choose a platform to authenticate with to share your adventure:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => handleSocialAuth('Instagram')} variant="outline" className="justify-start">
                <img 
                  src="https://cdn.cdnlogo.com/logos/i/4/instagram.svg" 
                  alt="Instagram" 
                  className="h-5 w-5 mr-2" 
                />
                Instagram
              </Button>
              <Button onClick={() => handleSocialAuth('Facebook')} variant="outline" className="justify-start">
                <img 
                  src="https://cdn.cdnlogo.com/logos/f/83/facebook.svg" 
                  alt="Facebook" 
                  className="h-5 w-5 mr-2" 
                />
                Facebook
              </Button>
              <Button onClick={() => handleSocialAuth('Twitter')} variant="outline" className="justify-start">
                <img 
                  src="https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg" 
                  alt="Twitter" 
                  className="h-5 w-5 mr-2" 
                />
                Twitter
              </Button>
              <Button onClick={() => handleSocialAuth('TikTok')} variant="outline" className="justify-start">
                <img 
                  src="https://cdn.cdnlogo.com/logos/t/6/tiktok-logo.svg" 
                  alt="TikTok" 
                  className="h-5 w-5 mr-2" 
                />
                TikTok
              </Button>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setShowSocialAuthPrompt(false)}>
              Cancel
            </Button>
            <ShareAdventure compact={true} />
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Gallery;
