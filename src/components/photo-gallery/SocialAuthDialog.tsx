
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import ShareAdventure from '@/components/ShareAdventure';

interface SocialAuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSocialAuth: (platform: string) => void;
}

const SocialAuthDialog = ({ isOpen, onClose, onSocialAuth }: SocialAuthDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Social Media</DialogTitle>
          <DialogDescription>
            Connect your social media accounts to share adventures directly
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-muted-foreground">
            Choose a platform to authenticate with to share your adventure:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={() => onSocialAuth('Instagram')} variant="outline" className="justify-start">
              <img 
                src="https://cdn.cdnlogo.com/logos/i/4/instagram.svg" 
                alt="Instagram" 
                className="h-5 w-5 mr-2" 
              />
              Instagram
            </Button>
            <Button onClick={() => onSocialAuth('Facebook')} variant="outline" className="justify-start">
              <img 
                src="https://cdn.cdnlogo.com/logos/f/83/facebook.svg" 
                alt="Facebook" 
                className="h-5 w-5 mr-2" 
              />
              Facebook
            </Button>
            <Button onClick={() => onSocialAuth('Twitter')} variant="outline" className="justify-start">
              <img 
                src="https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg" 
                alt="Twitter" 
                className="h-5 w-5 mr-2" 
              />
              Twitter
            </Button>
            <Button onClick={() => onSocialAuth('TikTok')} variant="outline" className="justify-start">
              <img 
                src="https://cdn.cdnlogo.com/logos/t/6/tiktok-logo.svg" 
                alt="TikTok" 
                className="h-5 w-5 mr-2" 
              />
              TikTok
            </Button>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <ShareAdventure compact={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialAuthDialog;
