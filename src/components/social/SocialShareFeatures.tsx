
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Share2, 
  Download, 
  Eye, 
  Heart, 
  MessageCircle, 
  Trophy,
  Copy,
  Instagram,
  Facebook,
  Twitter,
  Camera,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Certificate {
  id: string;
  name: string;
  type: string;
  image_url: string;
  user_name: string;
  earned_at: string;
}

interface SocialStats {
  views: number;
  likes: number;
  shares: number;
  comments: number;
}

interface SocialShareFeaturesProps {
  certificate: Certificate;
  socialStats: SocialStats;
}

const SocialShareFeatures = ({ certificate, socialStats }: SocialShareFeaturesProps) => {
  const [shareText, setShareText] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();

  const shareTemplates = [
    {
      id: 'adventure',
      title: 'Adventure Story',
      template: `🦈 Just earned my ${certificate.name} certificate! Another thrilling adventure completed with @ApexPredatorInsurance protection. Who's ready for their next wild encounter? #AdventureProtected #WildlifeInsurance`
    },
    {
      id: 'achievement',
      title: 'Achievement Unlock',
      template: `🏆 ACHIEVEMENT UNLOCKED: ${certificate.name}! 🎉 Protected by the best, ready for the wildest adventures. What's your next predator encounter? #CertifiedAdventurer #ApexProtection`
    },
    {
      id: 'motivation',
      title: 'Motivational',
      template: `Don't let fear hold you back from incredible experiences! With my ${certificate.name} certificate, I'm ready for anything nature throws at me. What adventure are you planning? 🌍✨ #FearlessAdventure #ProtectedExplorer`
    }
  ];

  const handleShare = async (platform: string) => {
    setIsSharing(true);
    
    const text = shareText || shareTemplates[0].template;
    const url = window.location.href;
    
    try {
      switch (platform) {
        case 'copy':
          await navigator.clipboard.writeText(`${text}\n\n${url}`);
          toast({
            title: "Copied to clipboard!",
            description: "Share text has been copied to your clipboard."
          });
          break;
          
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
          break;
          
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
          break;
          
        case 'instagram':
          toast({
            title: "Instagram sharing",
            description: "Open Instagram and paste from your clipboard to share!"
          });
          await navigator.clipboard.writeText(text);
          break;
          
        default:
          if (navigator.share) {
            await navigator.share({
              title: certificate.name,
              text: text,
              url: url
            });
          }
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Sharing failed",
        description: "Could not share your certificate",
        variant: "destructive"
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Certificate Preview */}
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={certificate.image_url}
            alt={certificate.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-5 w-5" />
              <Badge className="bg-apex-red text-white">Certified</Badge>
            </div>
            <h2 className="text-2xl font-bold">{certificate.name}</h2>
            <p className="text-white/80">Earned by {certificate.user_name}</p>
          </div>
        </div>
      </Card>

      {/* Social Stats */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Certificate Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <Eye className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-apex-black">{socialStats.views}</div>
              <div className="text-sm text-apex-darkgray/60">Views</div>
            </div>
            
            <div className="text-center">
              <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-apex-black">{socialStats.likes}</div>
              <div className="text-sm text-apex-darkgray/60">Likes</div>
            </div>
            
            <div className="text-center">
              <Share2 className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-apex-black">{socialStats.shares}</div>
              <div className="text-sm text-apex-darkgray/60">Shares</div>
            </div>
            
            <div className="text-center">
              <MessageCircle className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-apex-black">{socialStats.comments}</div>
              <div className="text-sm text-apex-darkgray/60">Comments</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Share Templates */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-green-500" />
            Share Your Achievement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Template Selection */}
          <div className="space-y-3">
            <h4 className="font-medium text-apex-black">Choose a sharing template:</h4>
            <div className="grid gap-3">
              {shareTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-3 border border-apex-lightgray rounded-lg cursor-pointer hover:bg-apex-lightgray/50 transition-colors"
                  onClick={() => setShareText(template.template)}
                >
                  <h5 className="font-medium text-apex-black mb-1">{template.title}</h5>
                  <p className="text-sm text-apex-darkgray/70 line-clamp-2">{template.template}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Text */}
          <div className="space-y-2">
            <h4 className="font-medium text-apex-black">Customize your message:</h4>
            <Textarea
              placeholder="Write your own adventure story or customize the template above..."
              value={shareText}
              onChange={(e) => setShareText(e.target.value)}
              className="min-h-[100px]"
            />
            <p className="text-xs text-apex-darkgray/60">
              {shareText.length}/280 characters
            </p>
          </div>

          {/* Share Buttons */}
          <div className="space-y-4">
            <h4 className="font-medium text-apex-black">Share on social media:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                onClick={() => handleShare('twitter')}
                disabled={isSharing}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              
              <Button
                onClick={() => handleShare('facebook')}
                disabled={isSharing}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              
              <Button
                onClick={() => handleShare('instagram')}
                disabled={isSharing}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Instagram className="h-4 w-4 mr-2" />
                Instagram
              </Button>
              
              <Button
                onClick={() => handleShare('copy')}
                disabled={isSharing}
                variant="outline"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
            <Button variant="outline" className="flex-1">
              <Camera className="h-4 w-4 mr-2" />
              Create Story
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialShareFeatures;
