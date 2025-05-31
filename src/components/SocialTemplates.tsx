
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Download, Share2, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialTemplatesProps {
  predatorType?: string;
  userName?: string;
  destination?: string;
}

const SocialTemplates = ({ predatorType = 'Shark', userName = 'Adventurer', destination = 'Bali' }: SocialTemplatesProps) => {
  const { toast } = useToast();
  const [copiedTemplate, setCopiedTemplate] = useState<number | null>(null);

  const templates = [
    {
      type: 'Pre-Adventure',
      emoji: '🎯',
      text: `Going ${predatorType.toLowerCase()} diving in ${destination} tomorrow! 🦈 Got my $50K insurance ready 💪 Who else thinks I'm crazy? #AdventureInsured #SurviveThis #${destination}Adventure`,
      hashtags: ['#AdventureInsured', '#SurviveThis', `#${destination}Adventure`, '#WildlifeShield']
    },
    {
      type: 'Post-Purchase',
      emoji: '✅',
      text: `Just got $50K ${predatorType.toLowerCase()} insurance for my ${destination} trip! 🦈 Certificate looks sick! Now accepting bets on my survival odds 😎 #SharkSurvivor #AdventureMode #${destination}`,
      hashtags: ['#SharkSurvivor', '#AdventureMode', '#InsuranceGoals', '#TravelSmart']
    },
    {
      type: 'Post-Adventure',
      emoji: '🏆',
      text: `SURVIVED! ${predatorType} diving in ${destination} complete ✅ Certificate was worth every penny! Who's ready for the next adventure? 🔥 #SurvivedThe${predatorType} #NextLevel #AdventureWin`,
      hashtags: [`#SurvivedThe${predatorType}`, '#NextLevel', '#AdventureWin', '#CertificateWorthy']
    },
    {
      type: 'Group Challenge',
      emoji: '👥',
      text: `Squad goals: All 5 of us got ${predatorType.toLowerCase()} insurance for ${destination}! 🦈 Last one to post their certificate buys drinks 🍻 #SquadSurvival #GroupGoals #${destination}Squad`,
      hashtags: ['#SquadSurvival', '#GroupGoals', `#${destination}Squad`, '#FriendsWhoSurvive']
    }
  ];

  const copyTemplate = (templateIndex: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplate(templateIndex);
    
    toast({
      title: "Template copied!",
      description: "Paste it into your social media post",
    });
    
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-apex-black mb-2">
          📱 Ready-to-Share Templates
        </h3>
        <p className="text-apex-darkgray/70">
          Copy these viral-ready captions for your social media posts
        </p>
      </div>

      <div className="grid gap-4">
        {templates.map((template, index) => (
          <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{template.emoji}</span>
                <Badge variant="outline" className="font-medium">
                  {template.type}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyTemplate(index, template.text)}
                className="flex items-center gap-1"
              >
                {copiedTemplate === index ? (
                  <>
                    <Check className="h-3 w-3 text-green-500" />
                    <span className="text-green-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>
            
            <p className="text-sm text-apex-darkgray mb-3 leading-relaxed">
              {template.text}
            </p>
            
            <div className="flex flex-wrap gap-1">
              {template.hashtags.map((hashtag, hashIndex) => (
                <Badge key={hashIndex} variant="secondary" className="text-xs">
                  {hashtag}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="text-center">
          <h4 className="font-bold text-apex-black mb-2">📈 Pro Tips for Maximum Engagement</h4>
          <ul className="text-sm text-apex-darkgray/80 space-y-1">
            <li>• Post your certificate in Stories with location tag</li>
            <li>• Use countdown stickers for departure dates</li>
            <li>• Tag friends to create group FOMO</li>
            <li>• Share in travel groups and communities</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default SocialTemplates;
