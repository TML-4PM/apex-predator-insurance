
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, Gift, ArrowRight, Percent } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GroupPurchaseProps {
  basePrice?: number;
  planName?: string;
}

const GroupPurchase = ({ basePrice = 9.99, planName = 'Shark Insurance' }: GroupPurchaseProps) => {
  const [groupSize, setGroupSize] = useState(3);
  const [friendEmails, setFriendEmails] = useState(['', '', '']);
  const { toast } = useToast();

  const discountTiers = [
    { size: 2, discount: 10, label: 'Buddy Deal' },
    { size: 3, discount: 15, label: 'Squad Survival' },
    { size: 5, discount: 25, label: 'Crew Adventure' },
    { size: 10, discount: 35, label: 'Epic Group' }
  ];

  const getCurrentDiscount = () => {
    const tier = discountTiers.reverse().find(tier => groupSize >= tier.size);
    return tier || { size: 1, discount: 0, label: 'Solo' };
  };

  const currentTier = getCurrentDiscount();
  const discountedPrice = basePrice * (1 - currentTier.discount / 100);
  const totalSavings = (basePrice - discountedPrice) * groupSize;

  const handleGroupSizeChange = (size: number) => {
    setGroupSize(size);
    const newEmails = Array(size).fill('').map((_, i) => friendEmails[i] || '');
    setFriendEmails(newEmails);
  };

  const sendGroupInvites = () => {
    const validEmails = friendEmails.filter(email => email.trim());
    if (validEmails.length === 0) {
      toast({
        title: "Add friend emails",
        description: "Enter at least one friend's email to send invites",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Invites Sent! 🚀",
      description: `Sent ${validEmails.length} invites with your ${currentTier.discount}% group discount`,
    });
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Users className="text-purple-600" size={24} />
          <h3 className="text-2xl font-bold text-apex-black">Squad Up & Save!</h3>
        </div>
        <p className="text-apex-darkgray/70">The more friends who survive together, the more everyone saves</p>
      </div>

      {/* Group Size Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-apex-black mb-3">
          How many adventurers in your group?
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[2, 3, 5, 10].map((size) => (
            <Button
              key={size}
              variant={groupSize === size ? "default" : "outline"}
              onClick={() => handleGroupSizeChange(size)}
              className={`relative ${groupSize === size ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
            >
              {size}+
              {discountTiers.find(t => t.size === size) && (
                <Badge className="absolute -top-2 -right-2 bg-apex-red text-white text-xs">
                  {discountTiers.find(t => t.size === size)?.discount}%
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Current Deal Display */}
      <div className="bg-white rounded-lg p-4 mb-6 border border-purple-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Gift className="text-purple-600" size={20} />
            <span className="font-bold text-apex-black">{currentTier.label}</span>
            <Badge className="bg-purple-600 text-white">{currentTier.discount}% OFF</Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-apex-darkgray/70">Price per person</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-bold text-apex-black">${discountedPrice.toFixed(2)}</span>
              {currentTier.discount > 0 && (
                <span className="text-sm text-apex-darkgray/60 line-through">${basePrice.toFixed(2)}</span>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm text-apex-darkgray/70">Total savings</p>
            <p className="text-lg font-bold text-green-600">${totalSavings.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Friend Invites */}
      <div className="space-y-3 mb-6">
        <label className="block text-sm font-medium text-apex-black">
          Invite your adventure crew:
        </label>
        {friendEmails.map((email, index) => (
          <Input
            key={index}
            type="email"
            placeholder={`Friend ${index + 1}'s email`}
            value={email}
            onChange={(e) => {
              const newEmails = [...friendEmails];
              newEmails[index] = e.target.value;
              setFriendEmails(newEmails);
            }}
            className="text-sm"
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <Button 
          onClick={sendGroupInvites}
          className="bg-purple-600 hover:bg-purple-700 text-white"
          size="lg"
        >
          <Users className="mr-2" size={16} />
          Send Group Invites
        </Button>
        
        <div className="text-center">
          <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
            Skip Group - Buy Solo
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </div>

      {/* Social Proof */}
      <div className="mt-6 pt-4 border-t border-purple-200">
        <div className="flex items-center justify-center gap-4 text-sm text-apex-darkgray/70">
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>2,847 groups</span>
          </div>
          <div className="flex items-center gap-1">
            <Percent size={14} />
            <span>saved this month</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GroupPurchase;
