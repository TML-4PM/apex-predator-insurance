
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2, Copy, Youtube, Instagram, MessageCircle, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generatePlatformCaption, useWebShareAPI } from '@/utils/socialSharing';

interface EnhancedShareButtonProps {
  oopsie: {
    id: string;
    title: string;
    description: string;
    category: string;
    image_url?: string;
  };
  className?: string;
}

const EnhancedShareButton = ({ oopsie, className = "" }: EnhancedShareButtonProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { canShare, share } = useWebShareAPI();

  const shareUrl = `${window.location.origin}/oopsie/${oopsie.id}`;

  const handleNativeShare = async () => {
    const caption = generatePlatformCaption('default', oopsie.title, oopsie.description, oopsie.category);
    
    const success = await share({
      title: oopsie.title,
      text: caption,
      url: shareUrl
    });

    if (success) {
      toast({
        title: "Shared!",
        description: "Your oopsie has been shared successfully.",
      });
    } else {
      handleCopyLink();
    }
  };

  const handlePlatformShare = (platform: string) => {
    const caption = generatePlatformCaption(platform, oopsie.title, oopsie.description, oopsie.category);
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedCaption = encodeURIComponent(caption);
    
    let platformUrl = '';
    
    switch (platform) {
      case 'instagram':
        // Instagram doesn't have direct sharing, so copy to clipboard
        navigator.clipboard.writeText(`${caption} ${shareUrl}`);
        toast({
          title: "Copied for Instagram!",
          description: "Caption copied. Open Instagram to share in your story or post.",
          duration: 4000
        });
        return;
        
      case 'tiktok':
        // TikTok doesn't have direct URL sharing, copy to clipboard
        navigator.clipboard.writeText(`${caption} ${shareUrl}`);
        toast({
          title: "Copied for TikTok!",
          description: "Caption copied. Create your TikTok video and add this in the description.",
          duration: 4000
        });
        return;
        
      case 'twitter':
        platformUrl = `https://twitter.com/intent/tweet?text=${encodedCaption}&url=${encodedUrl}`;
        break;
        
      case 'facebook':
        platformUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedCaption}`;
        break;
        
      case 'whatsapp':
        platformUrl = `https://wa.me/?text=${encodedCaption} ${encodedUrl}`;
        break;
        
      case 'youtube':
        toast({
          title: "YouTube Upload",
          description: "This oopsie will be featured in our next compilation video!",
          duration: 3000
        });
        return;
    }
    
    if (platformUrl) {
      window.open(platformUrl, '_blank', 'width=600,height=400');
      toast({
        title: `Shared to ${platform}!`,
        description: "Your oopsie is being shared.",
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        
        toast({
          title: "Link copied!",
          description: "Share link has been copied to your clipboard.",
        });
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "Could not copy the share link.",
          variant: "destructive"
        });
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className={`bg-apex-red/10 hover:bg-apex-red/20 text-apex-red border-apex-red/30 ${className}`}
        >
          <Share2 size={16} className="mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {canShare && (
          <DropdownMenuItem onClick={handleNativeShare} className="flex items-center gap-2 cursor-pointer">
            <Share2 className="h-4 w-4" />
            <span>Share (Native)</span>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem onClick={() => handlePlatformShare('youtube')} className="flex items-center gap-2 cursor-pointer">
          <Youtube className="h-4 w-4 text-red-600" />
          <span>Add to YouTube</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handlePlatformShare('instagram')} className="flex items-center gap-2 cursor-pointer">
          <Instagram className="h-4 w-4 text-pink-600" />
          <span>Instagram</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handlePlatformShare('tiktok')} className="flex items-center gap-2 cursor-pointer">
          <div className="h-4 w-4 bg-black rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">T</span>
          </div>
          <span>TikTok</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handlePlatformShare('twitter')} className="flex items-center gap-2 cursor-pointer">
          <div className="h-4 w-4 bg-black rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">X</span>
          </div>
          <span>X (Twitter)</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handlePlatformShare('facebook')} className="flex items-center gap-2 cursor-pointer">
          <div className="h-4 w-4 bg-blue-600 rounded-sm"></div>
          <span>Facebook</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handlePlatformShare('whatsapp')} className="flex items-center gap-2 cursor-pointer">
          <MessageCircle className="h-4 w-4 text-green-600" />
          <span>WhatsApp</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleCopyLink} className="flex items-center gap-2 cursor-pointer">
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
  );
};

export default EnhancedShareButton;
