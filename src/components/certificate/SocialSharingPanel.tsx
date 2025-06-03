
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Share2, 
  Copy, 
  Check, 
  Facebook, 
  Twitter, 
  Instagram, 
  MessageCircle,
  Mail,
  Camera,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialSharingPanelProps {
  certificateName: string;
  certificateId: string;
  userName: string;
  onTemplateSelect?: (template: string) => void;
}

const socialTemplates = [
  {
    id: 'adventure',
    name: 'Adventure Ready',
    platform: 'instagram',
    template: "Just got my {certificateName} from @ApexPredatorInsurance! 🦈🐊 Who else is adventure-ready? #WildlifeShield #AdventureInsured #SurviveTheWild",
    icon: Instagram,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  {
    id: 'fearless',
    name: 'Fearless Explorer',
    platform: 'twitter',
    template: "I'm officially protected against {certificateName}! 💪 Nature's deadliest vs me - bring it on! 🦁 #FearlessExplorer #WildlifeInsurance",
    icon: Twitter,
    color: 'bg-blue-500'
  },
  {
    id: 'survival',
    name: 'Survival Expert',
    platform: 'facebook',
    template: "Guess who just leveled up their survival game? 🎯 Got my {certificateName} certificate - because being prepared is everything! Who's joining me on the next adventure?",
    icon: Facebook,
    color: 'bg-blue-600'
  },
  {
    id: 'bragging',
    name: 'Bragging Rights',
    platform: 'whatsapp',
    template: "Not to brag, but I'm now officially insured against {certificateName} 😎 Check out my certificate: {shareUrl}",
    icon: MessageCircle,
    color: 'bg-green-500'
  }
];

export default function SocialSharingPanel({ 
  certificateName, 
  certificateId, 
  userName,
  onTemplateSelect 
}: SocialSharingPanelProps) {
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const { toast } = useToast();

  const shareUrl = `${window.location.origin}/certificate/verify?id=${certificateId}`;

  const copyTemplate = async (template: any) => {
    const text = template.template
      .replace('{certificateName}', certificateName)
      .replace('{userName}', userName)
      .replace('{shareUrl}', shareUrl);
    
    await navigator.clipboard.writeText(text);
    setCopiedTemplate(template.id);
    
    toast({
      title: "Template Copied!",
      description: "Social media template copied to clipboard",
    });
    
    setTimeout(() => setCopiedTemplate(null), 3000);
  };

  const copyShareLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    
    toast({
      title: "Link Copied!",
      description: "Certificate verification link copied to clipboard",
    });
    
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const shareToPlatform = (platform: string, text: string) => {
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    let platformUrl = '';
    
    switch (platform) {
      case 'twitter':
        platformUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'facebook':
        platformUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'whatsapp':
        platformUrl = `https://wa.me/?text=${encodedText} ${encodedUrl}`;
        break;
      case 'email':
        platformUrl = `mailto:?subject=Check out my certificate&body=${encodedText} ${encodedUrl}`;
        break;
    }
    
    if (platformUrl) {
      window.open(platformUrl, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-apex-red" />
            Share Your Achievement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <span className="text-sm flex-1 font-mono">{shareUrl}</span>
            <Button
              onClick={copyShareLink}
              size="sm"
              variant="outline"
            >
              {copiedLink ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => shareToPlatform('twitter', `I just got my ${certificateName}!`)}
              size="sm"
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Twitter className="h-4 w-4 mr-1" />
              Twitter
            </Button>
            <Button
              onClick={() => shareToPlatform('facebook', `Check out my ${certificateName} certificate!`)}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Facebook className="h-4 w-4 mr-1" />
              Facebook
            </Button>
            <Button
              onClick={() => shareToPlatform('whatsapp', `I got my ${certificateName} certificate!`)}
              size="sm"
              className="bg-green-500 hover:bg-green-600"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              WhatsApp
            </Button>
            <Button
              onClick={() => shareToPlatform('email', `Check out my ${certificateName} certificate!`)}
              size="sm"
              variant="outline"
            >
              <Mail className="h-4 w-4 mr-1" />
              Email
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Viral Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialTemplates.map((template) => {
              const Icon = template.icon;
              const text = template.template
                .replace('{certificateName}', certificateName)
                .replace('{userName}', userName)
                .replace('{shareUrl}', shareUrl);
              
              return (
                <Card key={template.id} className="relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-16 h-16 ${template.color} opacity-10 rounded-bl-full`}></div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{template.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {template.platform}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                      {text}
                    </p>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => copyTemplate(template)}
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        {copiedTemplate === template.id ? (
                          <Check className="h-3 w-3 mr-1 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3 mr-1" />
                        )}
                        Copy
                      </Button>
                      <Button
                        onClick={() => shareToPlatform(template.platform, text)}
                        size="sm"
                        className={template.color}
                      >
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6 text-center">
          <Camera className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-purple-900 mb-2">Pro Sharing Tips</h3>
          <div className="text-sm text-purple-700 space-y-1">
            <p>• Screenshot your certificate for Instagram stories</p>
            <p>• Tag @ApexPredatorInsurance for a chance to be featured</p>
            <p>• Use hashtags #WildlifeShield #AdventureInsured #SurviveTheWild</p>
            <p>• Share before your adventure for maximum engagement!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
