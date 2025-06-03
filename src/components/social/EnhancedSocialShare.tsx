
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Share2, 
  Twitter, 
  Facebook, 
  Instagram, 
  Link2, 
  Download,
  QrCode,
  Check,
  Copy
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EnhancedSocialShareProps {
  type: 'certificate' | 'story' | 'encounter';
  data: {
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    predatorType?: string;
    location?: string;
    username?: string;
  };
  onShare?: (platform: string) => void;
}

const EnhancedSocialShare: React.FC<EnhancedSocialShareProps> = ({ type, data, onShare }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const baseUrl = window.location.origin;
  const shareUrl = `${baseUrl}/${type}/${data.id}`;
  
  const getShareText = () => {
    switch (type) {
      case 'certificate':
        return `🏆 I just earned my ${data.predatorType} survival certificate from Apex Predator Insurance! ${data.location ? `📍 ${data.location}` : ''} #ApexPredator #Survival #Adventure`;
      case 'story':
        return `🦈 Just shared my incredible predator encounter story: "${data.title}" ${data.predatorType ? `🐻 ${data.predatorType}` : ''} #AdventureStory #PredatorEncounter`;
      case 'encounter':
        return `⚠️ Survived an encounter with ${data.predatorType}! ${data.location ? `📍 ${data.location}` : ''} Check out my story! #Survival #Wildlife #Adventure`;
      default:
        return `Check out this amazing predator encounter experience! #ApexPredator`;
    }
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent(shareUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    onShare?.('twitter');
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    onShare?.('facebook');
  };

  const shareToInstagram = () => {
    // Instagram doesn't support direct URL sharing, so we copy the content
    copyToClipboard();
    toast({
      title: "Content Copied!",
      description: "Share text copied. You can now paste it in your Instagram story or post!",
    });
    onShare?.('instagram');
  };

  const copyToClipboard = async () => {
    const shareText = `${getShareText()}\n\n${shareUrl}`;
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Share content copied to clipboard",
    });
  };

  const generateQRCode = () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`;
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head><title>QR Code - ${data.title}</title></head>
          <body style="display: flex; flex-direction: column; align-items: center; padding: 20px; font-family: Arial;">
            <h2>Scan to view: ${data.title}</h2>
            <img src="${qrUrl}" alt="QR Code" style="border: 1px solid #ccc; padding: 10px;" />
            <p style="text-align: center; margin-top: 10px; word-break: break-all;">${shareUrl}</p>
          </body>
        </html>
      `);
    }
    onShare?.('qrcode');
  };

  const nativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data.title,
        text: getShareText(),
        url: shareUrl,
      });
      onShare?.('native');
    } else {
      copyToClipboard();
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Share Your {type === 'certificate' ? 'Certificate' : type === 'story' ? 'Story' : 'Encounter'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Preview */}
        <div className="p-3 bg-muted rounded-lg">
          <div className="flex items-start gap-3">
            {data.imageUrl && (
              <img 
                src={data.imageUrl} 
                alt="Share preview"
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm leading-tight">{data.title}</h4>
              {data.description && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {data.description}
                </p>
              )}
              <div className="flex items-center gap-1 mt-2">
                {data.predatorType && (
                  <Badge variant="outline" className="text-xs">
                    {data.predatorType}
                  </Badge>
                )}
                {data.location && (
                  <Badge variant="outline" className="text-xs">
                    📍 {data.location}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={shareToTwitter}
            className="flex items-center gap-2"
          >
            <Twitter className="w-4 h-4 text-blue-400" />
            Twitter
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={shareToFacebook}
            className="flex items-center gap-2"
          >
            <Facebook className="w-4 h-4 text-blue-600" />
            Facebook
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={shareToInstagram}
            className="flex items-center gap-2"
          >
            <Instagram className="w-4 h-4 text-pink-500" />
            Instagram
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={generateQRCode}
            className="flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            QR Code
          </Button>
        </div>

        {/* Additional Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={copyToClipboard}
            className="flex-1"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
          
          {navigator.share && (
            <Button
              onClick={nativeShare}
              className="flex-1"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          )}
        </div>

        {/* Share Statistics */}
        <div className="text-xs text-muted-foreground text-center">
          💡 Tip: Share your adventures to earn social engagement points!
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedSocialShare;
