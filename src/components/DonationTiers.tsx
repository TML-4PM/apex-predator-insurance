
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coffee, Heart, Star, Crown, Trophy, Zap, Shield, Gem } from 'lucide-react';

const donationTiers = [
  {
    id: 'coffee',
    name: 'Coffee Fund',
    amount: 5,
    icon: Coffee,
    description: 'Keep our team caffeinated',
    benefits: ['Our gratitude', 'Digital thank you'],
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600'
  },
  {
    id: 'supporter',
    name: 'Supporter',
    amount: 10,
    icon: Heart,
    description: 'Show your support for our mission',
    benefits: ['Supporter badge', 'Email updates', 'Community access'],
    color: 'bg-red-50 border-red-200',
    iconColor: 'text-red-600'
  },
  {
    id: 'featured',
    name: 'Featured Fail Boost',
    amount: 15,
    icon: Zap,
    description: 'Boost your submission to featured status',
    benefits: ['Featured placement', 'Priority review', 'Special mention'],
    color: 'bg-yellow-50 border-yellow-200',
    iconColor: 'text-yellow-600'
  },
  {
    id: 'boost',
    name: 'Premium Boost',
    amount: 25,
    icon: Star,
    description: 'Mid-tier support with premium perks',
    benefits: ['Premium badge', 'Early access', 'Exclusive content'],
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600'
  },
  {
    id: 'badge',
    name: 'Custom Badge',
    amount: 50,
    icon: Shield,
    description: 'Get a special donor recognition badge',
    benefits: ['Custom badge', 'Profile highlight', 'VIP status'],
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600'
  },
  {
    id: 'superfan',
    name: 'Super Fan',
    amount: 100,
    icon: Trophy,
    description: 'For our biggest supporters',
    benefits: ['Super Fan badge', 'Direct access', 'Monthly updates'],
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600',
    popular: true
  },
  {
    id: 'server',
    name: 'Server Savior',
    amount: 250,
    icon: Crown,
    description: 'Help keep our servers running',
    benefits: ['Server Savior title', 'Beta access', 'Feature requests'],
    color: 'bg-indigo-50 border-indigo-200',
    iconColor: 'text-indigo-600'
  },
  {
    id: 'vip',
    name: 'VIP Access',
    amount: 500,
    icon: Gem,
    description: 'Premium VIP experience',
    benefits: ['VIP badge', 'Private community', 'Direct feedback line'],
    color: 'bg-pink-50 border-pink-200',
    iconColor: 'text-pink-600'
  },
  {
    id: 'legend',
    name: 'Legend',
    amount: 1000,
    icon: Crown,
    description: 'Legendary supporter status',
    benefits: ['Legend status', 'Hall of Fame', 'Advisory input'],
    color: 'bg-orange-50 border-orange-200',
    iconColor: 'text-orange-600'
  },
  {
    id: 'halloffame',
    name: 'Hall of Fame',
    amount: 1000000,
    icon: Crown,
    description: 'Ultimate supporter recognition',
    benefits: ['Permanent recognition', 'Co-founder status', 'Naming rights'],
    color: 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300',
    iconColor: 'text-yellow-600'
  }
];

interface DonationTiersProps {
  onSelectTier?: (tier: typeof donationTiers[0]) => void;
}

const DonationTiers = ({ onSelectTier }: DonationTiersProps) => {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-apex-black mb-4">Choose Your Support Level</h2>
        <p className="text-lg text-apex-darkgray/70">Every contribution helps us build better protection for adventurers</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {donationTiers.map((tier) => {
          const IconComponent = tier.icon;
          return (
            <Card key={tier.id} className={`relative ${tier.color} hover:shadow-lg transition-shadow duration-300`}>
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-apex-red text-white">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-white flex items-center justify-center`}>
                  <IconComponent className={tier.iconColor} size={24} />
                </div>
                <CardTitle className="text-lg font-bold">{tier.name}</CardTitle>
                <div className="text-2xl font-bold text-apex-red">
                  ${tier.amount.toLocaleString()}
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-apex-darkgray/70 mb-4">{tier.description}</p>
                <ul className="text-xs text-left space-y-1 mb-4">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-apex-red rounded-full mr-2"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => onSelectTier?.(tier)}
                  className="w-full bg-apex-red hover:bg-apex-red/90"
                  size="sm"
                >
                  Donate ${tier.amount}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DonationTiers;
