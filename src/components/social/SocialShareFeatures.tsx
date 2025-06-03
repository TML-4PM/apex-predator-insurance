
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Share2, 
  Download, 
  Eye, 
  Heart, 
  MessageCircle,
  Trophy,
  Camera,
  Video,
  Instagram,
  Youtube,
  Zap
} from 'lucide-react';
import ShareAdventure from '@/components/ShareAdventure';

interface SocialShareFeaturesProps {
  certificate: {
    id: string;
    name: string;
    type: string;
    image_url?: string;
    user_name: string;
    earned_at: string;
  };
  socialStats: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
  };
}

const SocialShareFeatures = ({ certificate, socialStats }: SocialShareFeaturesProps) => {
  const [activeTemplate, setActiveTemplate] = useState('story');

  const shareTemplates = [
    {
      id: 'story',
      name: 'Instagram Story',
      platform: 'instagram',
      template: `🦈 Just survived another adventure! Got my ${certificate.name} certificate from @ApexPredatorInsurance! Who else is ready for the wild? #WildlifeShield #AdventureReady #SurviveTheWild`,
      style: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500',
      icon: Instagram
    },
    {
      id: 'post',
      name: 'Social Media Post',
      platform: 'general',
      template: `🏆 Achievement Unlocked! I'm now officially protected against ${certificate.name}! Nature's deadliest vs me - bring it on! 💪 #FearlessExplorer #WildlifeInsurance`,
      style: 'bg-gradient-to-br from-blue-500 to-purple-600',
      icon: Share2
    },
    {
      id: 'video',
      name: 'Video Content',
      platform: 'youtube',
      template: `🎥 Creating content about my ${certificate.name} adventure! This certificate saved my trip - literally! Watch my full story and get yours at ApexPredatorInsurance.com`,
      style: 'bg-gradient-to-br from-red-500 to-pink-600',
      icon: Youtube
    },
    {
      id: 'viral',
      name: 'Viral Challenge',
      platform: 'tiktok',
      template: `⚡ Starting the #WildlifeShieldChallenge! Show me your most extreme adventure plans and tag 3 friends who need insurance! ${certificate.name} ✅`,
      style: 'bg-gradient-to-br from-black via-gray-800 to-purple-900',
      icon: Zap
    }
  ];

  return (
    <div className="space-y-6">
      {/* Certificate Social Stats */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-apex-red" />
            Social Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <Eye className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-apex-black">{socialStats.views.toLocaleString()}</div>
              <div className="text-sm text-apex-darkgray/60">Views</div>
            </div>
            <div className="text-center">
              <Heart className="h-6 w-6 text-pink-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-apex-black">{socialStats.likes.toLocaleString()}</div>
              <div className="text-sm text-apex-darkgray/60">Likes</div>
            </div>
            <div className="text-center">
              <Share2 className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-apex-black">{socialStats.shares.toLocaleString()}</div>
              <div className="text-sm text-apex-darkgray/60">Shares</div>
            </div>
            <div className="text-center">
              <MessageCircle className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-apex-black">{socialStats.comments.toLocaleString()}</div>
              <div className="text-sm text-apex-darkgray/60">Comments</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Viral Share Templates */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Viral Share Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTemplate} onValueChange={setActiveTemplate}>
            <TabsList className="grid w-full grid-cols-4">
              {shareTemplates.map((template) => (
                <TabsTrigger key={template.id} value={template.id} className="text-xs">
                  {template.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {shareTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <TabsContent key={template.id} value={template.id} className="mt-6">
                  <div className="space-y-4">
                    {/* Template Preview */}
                    <div className={`${template.style} p-6 rounded-xl text-white relative overflow-hidden`}>
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <Icon className="h-6 w-6" />
                          <Badge variant="outline" className="border-white/30 text-white">
                            {template.platform}
                          </Badge>
                        </div>
                        <p className="text-lg leading-relaxed">{template.template}</p>
                        
                        {certificate.image_url && (
                          <div className="mt-4 rounded-lg overflow-hidden border-2 border-white/20">
                            <img
                              src={certificate.image_url}
                              alt={certificate.name}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full"></div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <ShareAdventure
                        title={`${certificate.name} Certificate`}
                        text={template.template}
                        predatorType={certificate.type}
                        compact={false}
                      />
                      
                      <Button variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download Template
                      </Button>
                      
                      <Button variant="outline" className="flex-1">
                        <Camera className="h-4 w-4 mr-2" />
                        Create Story
                      </Button>
                    </div>

                    {/* Platform-specific tips */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-apex-black mb-2">💡 Pro Tips for {template.platform}</h4>
                      <ul className="text-sm text-apex-darkgray/70 space-y-1">
                        {template.platform === 'instagram' && (
                          <>
                            <li>• Use bright, high-contrast images for stories</li>
                            <li>• Add interactive stickers and polls</li>
                            <li>• Tag @ApexPredatorInsurance for repost chances</li>
                          </>
                        )}
                        {template.platform === 'youtube' && (
                          <>
                            <li>• Create a compelling thumbnail with your certificate</li>
                            <li>• Include "wildlife insurance" in your title and tags</li>
                            <li>• Share your adventure story in the first 30 seconds</li>
                          </>
                        )}
                        {template.platform === 'tiktok' && (
                          <>
                            <li>• Use trending audio and effects</li>
                            <li>• Show before/after your adventure preparation</li>
                            <li>• Create a challenge others can participate in</li>
                          </>
                        )}
                        {template.platform === 'general' && (
                          <>
                            <li>• Post during peak engagement hours (7-9pm)</li>
                            <li>• Use 3-5 relevant hashtags for best reach</li>
                            <li>• Engage with comments within the first hour</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>

      {/* Engagement Rewards */}
      <Card className="border-none shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-500 p-3 rounded-full">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-apex-black mb-2">🎁 Viral Rewards Program</h3>
              <p className="text-apex-darkgray/70 mb-4">
                Earn rewards when your certificate shares go viral! Get discounts, exclusive access, and special recognition.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-lg font-bold text-yellow-600">100+ Shares</div>
                  <div className="text-sm text-apex-darkgray/60">10% off next certificate</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-lg font-bold text-orange-600">1K+ Engagement</div>
                  <div className="text-sm text-apex-darkgray/60">Free premium upgrade</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-lg font-bold text-red-600">10K+ Views</div>
                  <div className="text-sm text-apex-darkgray/60">Brand ambassador program</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialShareFeatures;
