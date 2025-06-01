
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const usePhotoGallery = () => {
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [openPhotoId, setOpenPhotoId] = useState<number | null>(null);
  const [showSocialAuthPrompt, setShowSocialAuthPrompt] = useState(false);
  const { toast } = useToast();
  
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

  return {
    likedPosts,
    openPhotoId,
    setOpenPhotoId,
    showSocialAuthPrompt,
    setShowSocialAuthPrompt,
    toggleLike,
    handleSocialAuth
  };
};
