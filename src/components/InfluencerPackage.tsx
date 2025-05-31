
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Camera, Instagram, Youtube, TikTok, CheckCircle, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const InfluencerPackage = () => {
  const [socialHandle, setSocialHandle] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [followers, setFollowers] = useState('');
  const { toast } = useToast();

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600' },
    { id: 'tiktok', name: 'TikTok', icon: TikTok, color: 'from-black to-gray-800' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'from-red-500 to-red-600' }
  ];

  const influencerPerks = [
    { icon: Camera, title: 'Custom Branded Certificates', desc: 'Your logo on the certificate' },
    { icon: Star, title: 'Priority Customer Support', desc: '24/7 dedicated support line' },
    { icon: CheckCircle, title: 'Content Creation Kit', desc: 'Templates, hashtags, and graphics' },
    { icon: Instagram, title: 'Cross-Platform Templates', desc: 'Stories, posts, and video formats' }
  ];

  const getDiscountTier = (followerCount: string) => {
    const count = parseInt(followerCount.replace(/,/g, ''));
    if (count >= 100000) return { discount: 75, tier: 'Mega Influencer', color: 'gold' };
    if (count >= 50000) return { discount: 60, tier: 'Major Influencer', color: 'purple' };
    if (count >= 10000) return { discount: 40, tier: 'Rising Star', color: 'blue' };
    if (count >= 1000) return { discount: 25, tier: 'Micro Influencer', color: 'green' };
    return { discount: 0, tier: 'Creator', color: 'gray' };
  };

  const discountInfo = getDiscountTier(followers);

  const applyForInfluencerStatus = () => {
    if (!socialHandle || !followers) {
      toast({
        title: "Complete your application",
        description: "Please fill in your social handle and follower count",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Application Submitted! 🌟",
      description: `We'll review your ${platform} profile and get back to you within 24 hours`,
    });
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Star className="text-amber-600" size={24} />
          <h3 className="text-2xl font-bold text-apex-black">Creator Program</h3>
        </div>
        <p className="text-apex-darkgray/70">Special rates and perks for content creators</p>
        <Badge className="bg-amber-600 text-white mt-2">Invite Only</Badge>
      </div>

      {/* Platform Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-apex-black mb-3">
          Primary Platform
        </label>
        <div className="grid grid-cols-3 gap-2">
          {platforms.map((p) => (
            <Button
              key={p.id}
              variant={platform === p.id ? "default" : "outline"}
              onClick={() => setPlatform(p.id)}
              className={`relative ${platform === p.id ? `bg-gradient-to-r ${p.color} text-white` : ''}`}
            >
              <p.icon size={16} className="mr-2" />
              {p.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Social Handle Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-apex-black mb-2">
            Social Handle
          </label>
          <Input
            type="text"
            placeholder="@yourusername"
            value={socialHandle}
            onChange={(e) => setSocialHandle(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-apex-black mb-2">
            Follower Count
          </label>
          <Input
            type="text"
            placeholder="e.g., 10,000"
            value={followers}
            onChange={(e) => setFollowers(e.target.value)}
          />
        </div>
      </div>

      {/* Discount Display */}
      {followers && (
        <div className="bg-white rounded-lg p-4 mb-6 border border-amber-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge className={`bg-${discountInfo.color}-600 text-white`}>
                {discountInfo.tier}
              </Badge>
              {discountInfo.discount > 0 && (
                <Badge className="bg-apex-red text-white">
                  {discountInfo.discount}% OFF
                </Badge>
              )}
            </div>
          </div>
          
          {discountInfo.discount > 0 ? (
            <div className="text-center">
              <p className="text-sm text-apex-darkgray/70 mb-1">Your creator price</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-apex-black">
                  ${(9.99 * (1 - discountInfo.discount / 100)).toFixed(2)}
                </span>
                <span className="text-lg text-apex-darkgray/60 line-through">$9.99</span>
              </div>
            </div>
          ) : (
            <p className="text-center text-apex-darkgray/70">
              Apply to unlock creator discounts
            </p>
          )}
        </div>
      )}

      {/* Creator Perks */}
      <div className="mb-6">
        <h4 className="font-bold text-apex-black mb-4 text-center">Creator Perks Included</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {influencerPerks.map((perk, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-amber-200">
              <perk.icon className="text-amber-600 mt-1" size={16} />
              <div>
                <p className="font-medium text-apex-black text-sm">{perk.title}</p>
                <p className="text-xs text-apex-darkgray/70">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Button */}
      <Button 
        onClick={applyForInfluencerStatus}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white"
        size="lg"
      >
        <Camera className="mr-2" size={16} />
        Apply for Creator Program
      </Button>

      {/* Fine Print */}
      <div className="mt-4 text-center">
        <p className="text-xs text-apex-darkgray/60">
          Applications reviewed within 24 hours. Must have public profile and travel-related content.
        </p>
      </div>
    </Card>
  );
};

export default InfluencerPackage;
