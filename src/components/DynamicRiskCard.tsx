
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Download, Share2, Instagram, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface DynamicRiskCardProps {
  animal?: string;
  userName?: string;
  riskScore?: number;
  quoteCost?: string;
  onCardGenerated?: (url: string) => void;
}

const DynamicRiskCard: React.FC<DynamicRiskCardProps> = ({
  animal = 'Shark',
  userName = '',
  riskScore = 85,
  quoteCost = '$29',
  onCardGenerated
}) => {
  const [cardUrl, setCardUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [customName, setCustomName] = useState(userName);
  const { toast } = useToast();

  const generateCard = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-risk-card', {
        body: new URLSearchParams({
          animal: animal,
          riskScore: riskScore.toString(),
          userName: customName || 'Adventure Seeker',
          quoteCost: quoteCost
        })
      });

      if (error) throw error;

      const generatedUrl = data.url;
      setCardUrl(generatedUrl);
      
      // Update OG meta tags
      updateOGMetaTags(generatedUrl);
      
      if (onCardGenerated) {
        onCardGenerated(generatedUrl);
      }

      // Fire dataLayer event for analytics
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'risk_card_generated',
          animal: animal,
          risk_score: riskScore,
          user_name: customName
        });
      }

      toast({
        title: "Risk Card Generated!",
        description: "Your personalized risk assessment is ready to share.",
      });

    } catch (error) {
      console.error('Error generating card:', error);
      toast({
        title: "Generation Failed",
        description: "Could not generate your risk card. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOGMetaTags = (imageUrl: string) => {
    // Update or create OG image meta tag
    let ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', imageUrl);

    // Update other OG tags
    const updateOrCreateMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateOrCreateMeta('og:title', `${animal} Risk Assessment - Apex Predator Insurance`);
    updateOrCreateMeta('og:description', `${customName || 'Adventure Seeker'} has a ${riskScore}% risk level for ${animal} encounters. Get covered for just ${quoteCost}!`);
    updateOrCreateMeta('og:type', 'website');
  };

  const downloadCard = () => {
    if (!cardUrl) return;

    const link = document.createElement('a');
    link.href = cardUrl;
    link.download = `${animal}-risk-card-${customName || 'adventure-seeker'}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Downloaded!",
      description: "Your risk card has been downloaded.",
    });
  };

  const shareToInstagram = () => {
    if (!cardUrl) return;

    // Try Instagram app deep link first
    const instagramUrl = `instagram://story-camera?source_url=${encodeURIComponent(cardUrl)}`;
    
    // Create a temporary link to test if Instagram app is available
    const testLink = document.createElement('a');
    testLink.href = instagramUrl;
    
    try {
      testLink.click();
      
      // Fire analytics event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'share_to_instagram',
          animal: animal,
          risk_score: riskScore
        });
      }
      
      toast({
        title: "Opening Instagram",
        description: "Your risk card is ready to share on Instagram Stories!",
      });
    } catch (error) {
      // Fallback: copy image URL to clipboard
      navigator.clipboard.writeText(cardUrl).then(() => {
        toast({
          title: "Image URL Copied",
          description: "Paste this in Instagram Stories or open Instagram manually.",
        });
      });
    }
  };

  const shareGeneral = async () => {
    if (!cardUrl) return;

    const shareData = {
      title: `${animal} Risk Assessment - Apex Predator Insurance`,
      text: `I have a ${riskScore}% risk level for ${animal} encounters! Check out my coverage assessment.`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast({
          title: "Shared!",
          description: "Your risk card has been shared successfully.",
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        toast({
          title: "Link Copied",
          description: "Share link copied to clipboard.",
        });
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      toast({
        title: "Link Copied",
        description: "Share link copied to clipboard.",
      });
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-apex-black mb-2">
          Generate Your Risk Card
        </h3>
        <p className="text-apex-darkgray/70">
          Create a personalized risk assessment card perfect for social sharing
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-apex-black mb-2">
            Your Name (for the card)
          </label>
          <Input
            placeholder="Enter your name"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
          />
        </div>

        <Button 
          onClick={generateCard}
          disabled={loading}
          className="w-full bg-apex-red hover:bg-apex-red/90 text-white"
        >
          {loading ? 'Generating...' : 'Generate Risk Card'}
        </Button>
      </div>

      {cardUrl && (
        <div className="space-y-4">
          <div id="risk-card" className="border rounded-lg overflow-hidden">
            <img 
              src={cardUrl} 
              alt={`${animal} Risk Assessment Card`}
              className="w-full h-auto"
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={downloadCard}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Download Card
            </Button>

            <Button
              onClick={shareToInstagram}
              variant="outline"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:from-purple-600 hover:to-pink-600"
            >
              <Instagram size={16} />
              Share to Instagram
            </Button>

            <Button
              onClick={shareGeneral}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Share2 size={16} />
              Share
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-apex-darkgray/70 mb-2">
              Direct links for sharing:
            </p>
            <div className="space-y-2">
              <a 
                id="download-risk-card"
                href={cardUrl} 
                download={`${animal}-risk-card.svg`}
                className="block text-blue-600 hover:underline text-sm"
              >
                📥 Download Risk Card
              </a>
              <a 
                id="share-to-insta"
                href={`instagram://story-camera?source_url=${encodeURIComponent(cardUrl)}`}
                className="block text-pink-600 hover:underline text-sm"
              >
                📱 Share to Instagram Stories
              </a>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DynamicRiskCard;
