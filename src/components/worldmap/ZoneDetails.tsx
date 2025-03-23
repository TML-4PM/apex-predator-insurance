
import React from 'react';
import { motion } from 'framer-motion';
import { DangerZone } from '@/models/DangerZone';
import { getThreatIcon } from '@/utils/threatIcons';
import { Skull, Share2, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ZoneDetailsProps {
  zone: DangerZone;
  onClose: () => void;
}

const ZoneDetails: React.FC<ZoneDetailsProps> = ({ zone, onClose }) => {
  const { toast } = useToast();
  
  const handleShare = (platform?: string) => {
    const url = window.location.href;
    const text = `Check out the danger zone "${zone.name}" with ${zone.threat} on Apex Predator Insurance!`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(`Apex Predator Insurance - ${zone.name}`)}&summary=${encodeURIComponent(text)}`;
        break;
      case 'instagram':
        // Instagram doesn't have a direct share URL API, so we'll just copy to clipboard
        navigator.clipboard.writeText(`${text} ${url}`)
          .then(() => {
            toast({
              title: "Link copied!",
              description: "Open Instagram and paste this link in your story or post.",
            });
          });
        return;
      default:
        // Default share or copy to clipboard
        if (navigator.share) {
          navigator.share({
            title: `Apex Predator Insurance - ${zone.name}`,
            text: text,
            url: url,
          })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing:', error));
          return;
        } else {
          // Fallback for browsers that don't support navigator.share
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
          return;
        }
    }
    
    // Open share URL in a new window
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute z-20 bg-[#1A1F2C]/90 backdrop-blur-md px-5 py-4 rounded-xl shadow-xl border border-white/10 max-w-sm overflow-hidden"
      style={{ 
        left: `${zone.coordinates.x > 70 ? zone.coordinates.x - 30 : zone.coordinates.x + 5}%`, 
        top: `${zone.coordinates.y > 70 ? zone.coordinates.y - 30 : zone.coordinates.y + 5}%` 
      }}
    >
      <img
        src={zone.image}
        alt={zone.threat}
        className="w-full h-32 object-cover rounded-lg mb-3 shadow-md"
      />
      
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center h-7 w-7 rounded-lg" style={{ backgroundColor: zone.color }}>
          {getThreatIcon(zone.threat)}
        </div>
        <h3 className="text-xl font-bold text-white">{zone.name}</h3>
      </div>
      
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-apex-black/50 rounded-full mb-3">
        <Skull className="h-3.5 w-3.5 text-apex-red" />
        <p className="text-sm font-semibold text-apex-red">Threat: {zone.threat}</p>
      </div>
      
      <p className="text-white/80 text-sm">{zone.description}</p>
      
      <div className="mt-4 flex items-center justify-between">
        <button 
          onClick={onClose}
          className="text-xs font-medium text-white/60 hover:text-white transition-colors"
        >
          Close
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Share2 className="h-3.5 w-3.5 mr-1" />
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-[#1A1F2C] border border-white/10">
            <DropdownMenuItem onClick={() => handleShare('facebook')} className="flex items-center gap-2 text-white hover:bg-white/10 cursor-pointer">
              <Facebook className="h-4 w-4 text-blue-500" />
              <span>Facebook</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('instagram')} className="flex items-center gap-2 text-white hover:bg-white/10 cursor-pointer">
              <Instagram className="h-4 w-4 text-pink-500" />
              <span>Instagram</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('linkedin')} className="flex items-center gap-2 text-white hover:bg-white/10 cursor-pointer">
              <Linkedin className="h-4 w-4 text-blue-600" />
              <span>LinkedIn</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare()} className="flex items-center gap-2 text-white hover:bg-white/10 cursor-pointer">
              <Share2 className="h-4 w-4" />
              <span>Copy Link</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
};

export default ZoneDetails;
