
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Instagram, Twitter, Facebook } from 'lucide-react';

const SocialShareButtons = () => {
  const shareText = "Just got my Apex Predator Insurance certificate! 🦁 Ready for any wildlife adventure! #ApexPredatorProofGlobal #WildlifeShield";
  const shareUrl = window.location.origin;

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const shareToInstagram = () => {
    // Instagram doesn't support direct sharing via URL, so we'll copy text
    navigator.clipboard.writeText(shareText + '\n' + shareUrl);
    alert('Caption copied! Open Instagram and paste it with your certificate photo 📸');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Apex Predator Insurance Certificate',
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText + '\n' + shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button
        onClick={shareToTwitter}
        variant="outline"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        <Twitter className="mr-2 h-4 w-4" />
        Twitter
      </Button>
      
      <Button
        onClick={shareToFacebook}
        variant="outline"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        <Facebook className="mr-2 h-4 w-4" />
        Facebook
      </Button>
      
      <Button
        onClick={shareToInstagram}
        variant="outline"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        <Instagram className="mr-2 h-4 w-4" />
        Instagram
      </Button>
      
      <Button
        onClick={handleNativeShare}
        variant="outline"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
    </div>
  );
};

export default SocialShareButtons;
