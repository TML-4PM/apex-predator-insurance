
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SocialMediaLinks from './SocialMediaLinks';

interface ShareAdventureProps {
  title?: string;
  text?: string;
  url?: string;
  className?: string;
}

const ShareAdventure = ({ 
  title = "Apex Predator Insurance Adventure", 
  text = "Check out my adventure with Apex Predator Insurance!", 
  url = window.location.href,
  className = ""
}: ShareAdventureProps) => {
  const { toast } = useToast();

  const handleShare = async () => {
    // Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        console.log('Shared successfully');
      } catch (error) {
        console.log('Error sharing:', error);
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    // Fallback to clipboard copy
    navigator.clipboard.writeText(`${text} ${url}`)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "Share link has been copied to your clipboard.",
        });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({
          title: "Sharing failed",
          description: "Could not copy the share link.",
          variant: "destructive"
        });
      });
  };

  return (
    <div className={`${className}`}>
      <Button 
        onClick={handleShare}
        variant="outline" 
        className="bg-apex-red/10 hover:bg-apex-red/20 text-apex-red border-apex-red/30 flex items-center gap-2"
      >
        <Share2 size={16} />
        <span>Share Adventure</span>
      </Button>
      
      <div className="mt-4">
        <p className="text-sm text-apex-darkgray/70 mb-2">Or share directly:</p>
        <SocialMediaLinks 
          iconSize={18} 
          color="text-apex-darkgray/70" 
          className="justify-start"
        />
      </div>
    </div>
  );
};

export default ShareAdventure;
