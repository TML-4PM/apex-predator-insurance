
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
        
        <PhotoGrid 
          items={galleryItems}
          onPhotoClick={setOpenPhotoId}
        />
        
        <div className="mt-12 text-center">
          <button className="inline-flex items-center justify-center px-6 py-3 bg-apex-lightgray hover:bg-apex-lightgray/70 text-apex-darkgray rounded-lg transition-all duration-300">
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
