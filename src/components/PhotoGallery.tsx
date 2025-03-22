
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart, MessageCircle } from 'lucide-react';
import ShareAdventure from '@/components/ShareAdventure';

const galleryItems = [
  {
    id: 1,
    username: 'SharkDiver23',
    location: 'Great Barrier Reef, Australia',
    caption: 'Just got my Shark Insurance! Ready for tomorrow\'s cage dive!',
    insurance: 'Shark Insurance',
    likes: 247,
    comments: 42,
    imageUrl: 'https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?q=80&w=1000',
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
  }
];

const PhotoGallery = () => {
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [openPhotoId, setOpenPhotoId] = useState<number | null>(null);
  
  const toggleLike = (id: number) => {
    setLikedPosts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const selectedPhoto = galleryItems.find(item => item.id === openPhotoId);
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-apex-black mb-6 animate-fade-up">
            Adventure Snapshots
          </h2>
          <p className="text-xl text-apex-darkgray/70 animate-fade-up animate-delay-100 mb-8">
            See real adventures from our community of thrill-seekers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div 
              key={item.id}
              className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setOpenPhotoId(item.id)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold">{item.username}</h3>
                <p className="text-white/80 text-sm">{item.location}</p>
                <div className="flex items-center mt-2">
                  <span className="bg-apex-red text-white text-xs px-2 py-1 rounded-full">{item.insurance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="inline-flex items-center justify-center px-6 py-3 bg-apex-lightgray hover:bg-apex-lightgray/70 text-apex-darkgray rounded-lg transition-all duration-300">
            View All Adventures
          </button>
        </div>
      </div>
      
      <Dialog open={openPhotoId !== null} onOpenChange={(open) => !open && setOpenPhotoId(null)}>
        <DialogContent className="sm:max-w-3xl">
          {selectedPhoto && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
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
                  
                  <ShareAdventure 
                    compact={true} 
                    predatorType={selectedPhoto.insurance.replace(' Insurance', '')}
                    text={`Check out this ${selectedPhoto.insurance.replace(' Insurance', '')} adventure!`}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PhotoGallery;
