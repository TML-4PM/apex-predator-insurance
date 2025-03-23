
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Check, Twitter, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SocialMediaLinks from './SocialMediaLinks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ShareAdventureProps {
  title?: string;
  text?: string;
  url?: string;
  className?: string;
  predatorType?: string;
  compact?: boolean;
}

const ShareAdventure = ({ 
  title = "Apex Predator Insurance Adventure", 
  text = "Check out my adventure with Apex Predator Insurance!", 
  url = window.location.href,
  className = "",
  predatorType,
  compact = false
}: ShareAdventureProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // If predator type is provided, customize the share message
  const shareText = predatorType 
    ? `I just got $50K insurance against ${predatorType} attacks! Will I survive my next adventure? #WildlifeShield #SurviveTheWild` 
    : text;

  const handleShare = async () => {
    // Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url,
        });
        console.log('Shared successfully');
        toast({
          title: "Shared!",
          description: "Your adventure has been shared successfully.",
        });
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
    navigator.clipboard.writeText(`${shareText} ${url}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        
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

  const shareOnPlatform = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(shareText);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'instagram':
        // Instagram doesn't have a direct share API, so copy to clipboard with special instructions
        navigator.clipboard.writeText(`${shareText} ${url}`);
        toast({
          title: "Copy for Instagram",
          description: "Link copied! Open Instagram and paste this in your bio or story.",
        });
        
        // Show social authentication prompt for direct sharing
        toast({
          title: "Instagram Sharing",
          description: "For direct Instagram sharing, connect your account in settings.",
          duration: 5000,
        });
        return;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText} ${encodedUrl}`;
        break;
      default:
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      toast({
        title: `Shared on ${platform}`,
        description: "Your adventure is being shared!",
      });
    }
  };

  const promptSocialAuth = () => {
    toast({
      title: "Connect Social Accounts",
      description: "To share directly to social media, connect your accounts first.",
      duration: 5000,
    });
  };

  return (
    <div className={`${className}`}>
      {compact ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="bg-apex-red/10 hover:bg-apex-red/20 text-apex-red border-apex-red/30 flex items-center gap-2"
              size="sm"
            >
              <Share2 size={16} />
              <span>Share</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => shareOnPlatform('twitter')} className="flex items-center gap-2 cursor-pointer">
              <Twitter className="h-4 w-4 text-[#1DA1F2]" />
              <span>Twitter</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareOnPlatform('facebook')} className="flex items-center gap-2 cursor-pointer">
              <Facebook className="h-4 w-4 text-[#1877F2]" />
              <span>Facebook</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareOnPlatform('instagram')} className="flex items-center gap-2 cursor-pointer">
              <Instagram className="h-4 w-4 text-[#E1306C]" />
              <span>Instagram</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareOnPlatform('whatsapp')} className="flex items-center gap-2 cursor-pointer">
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={fallbackShare} className="flex items-center gap-2 cursor-pointer">
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Link</span>
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
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
              onClickAction={promptSocialAuth}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ShareAdventure;
