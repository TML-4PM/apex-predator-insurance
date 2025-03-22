
import React from 'react';
import { motion } from 'framer-motion';
import { DangerZone } from '@/models/DangerZone';
import { getThreatIcon } from '@/utils/threatIcons';
import { AlertTriangle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ZoneDetailsProps {
  zone: DangerZone;
  onClose: () => void;
}

const ZoneDetails: React.FC<ZoneDetailsProps> = ({ zone, onClose }) => {
  const { toast } = useToast();
  
  const handleShare = () => {
    const url = window.location.href;
    const text = `Check out the danger zone "${zone.name}" with ${zone.threat} on Apex Predator Insurance!`;
    
    if (navigator.share) {
      navigator.share({
        title: `Apex Predator Insurance - ${zone.name}`,
        text: text,
        url: url,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing:', error));
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
        <AlertTriangle className="h-3.5 w-3.5 text-apex-red" />
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
        
        <Button 
          size="sm" 
          variant="outline" 
          className="border-white/20 text-white hover:bg-white/10"
          onClick={handleShare}
        >
          <Share2 className="h-3.5 w-3.5 mr-1" />
          Share
        </Button>
      </div>
    </motion.div>
  );
};

export default ZoneDetails;
