
import React from 'react';
import PhotoGrid from '@/components/photo-gallery/PhotoGrid';
import PhotoDetailDialog from '@/components/photo-gallery/PhotoDetailDialog';
import SocialAuthDialog from '@/components/photo-gallery/SocialAuthDialog';
import { usePhotoGallery } from '@/hooks/usePhotoGallery';
import { galleryItems } from '@/data/galleryItems';

const PhotoGallery = () => {
  const {
    likedPosts,
    openPhotoId,
    setOpenPhotoId,
    showSocialAuthPrompt,
    setShowSocialAuthPrompt,
    toggleLike,
    handleSocialAuth
  } = usePhotoGallery();
  
  const selectedPhoto = galleryItems.find(item => item.id === openPhotoId);
  
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 animate-fade-up">
            Adventure Snapshots
          </h2>
          <p className="text-xl text-muted-foreground animate-fade-up stagger-1 mb-8">
            See real adventures from our community of thrill-seekers.
          </p>
        </div>
        
        <PhotoGrid 
          items={galleryItems}
          onPhotoClick={setOpenPhotoId}
        />
        
        <div className="mt-12 text-center">
          <button className="inline-flex items-center justify-center px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-all duration-300 hover:scale-105 shadow-card">
            View All Adventures
          </button>
        </div>
      </div>
      
      <PhotoDetailDialog
        selectedPhoto={selectedPhoto}
        isOpen={openPhotoId !== null}
        onClose={() => setOpenPhotoId(null)}
        likedPosts={likedPosts}
        onToggleLike={toggleLike}
        onShare={() => setShowSocialAuthPrompt(true)}
      />
      
      <SocialAuthDialog
        isOpen={showSocialAuthPrompt}
        onClose={() => setShowSocialAuthPrompt(false)}
        onSocialAuth={handleSocialAuth}
      />
    </section>
  );
};

export default PhotoGallery;
