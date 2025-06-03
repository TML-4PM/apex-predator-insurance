
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Gift, 
  Copy, 
  Share2, 
  Trophy, 
  Star,
  Users,
  Coins,
  TrendingUp,
  Check
} from 'lucide-react';
import { useReferralSystem } from '@/hooks/useReferralSystem';
import { useToast } from '@/hooks/use-toast';

const getTierInfo = (tier: string) => {
  switch (tier) {
    case 'bronze':
      return { color: 'bg-amber-600', next: 'silver', pointsNeeded: 1000, benefits: ['5% bonus points', 'Priority support'] };
    case 'silver':
      return { color: 'bg-gray-400', next: 'gold', pointsNeeded: 5000, benefits: ['10% bonus points', 'Exclusive content', 'Early access'] };
    case 'gold':
      return { color: 'bg-yellow-500', next: 'platinum', pointsNeeded: 10000, benefits: ['15% bonus points', 'VIP support', 'Beta features'] };
    case 'platinum':
      return { color: 'bg-purple-600', next: null, pointsNeeded: null, benefits: ['20% bonus points', 'Personal account manager', 'Custom features'] };
    default:
      return { color: 'bg-gray-500', next: 'bronze', pointsNeeded: 100, benefits: [] };
  }
};

const ReferralDashboard = () => {
  const [referralCodeInput, setReferralCodeInput] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const {
    userRewards,
    referralCode,
    loading,
    createReferralCode,
    processReferral,
    initializeRewards,
    isCreatingCode,
    isProcessingReferral
  } = useReferralSystem();

  const tierInfo = getTierInfo(userRewards?.tier_level || 'bronze');
  const progressToNext = tierInfo.pointsNeeded 
    ? Math.min(100, (userRewards?.total_points_earned || 0) / tierInfo.pointsNeeded * 100)
    : 100;

  const copyReferralCode = async () => {
    if (referralCode) {
      await navigator.clipboard.writeText(referralCode.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Referral code copied to clipboard",
      });
    }
  };

  const shareReferralCode = () => {
    if (referralCode) {
      const shareData = {
        title: 'Join Apex Predator Insurance!',
        text: `Use my referral code ${referralCode.code} to get bonus points when you sign up for Apex Predator Insurance!`,
        url: `${window.location.origin}?ref=${referralCode.code}`
      };

      if (navigator.share) {
        navigator.share(shareData);
      } else {
        copyReferralCode();
      }
    }
  };

  const handleProcessReferral = () => {
    if (referralCodeInput.trim()) {
      processReferral(referralCodeInput.trim());
      setReferralCodeInput('');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!userRewards) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Welcome to Rewards!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Join our rewards program to earn points and unlock exclusive benefits!
          </p>
          <Button onClick={initializeRewards}>
            <Gift className="w-4 h-4 mr-2" />
            Join Rewards Program
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rewards Overview */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Your Rewards Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className={`${tierInfo.color} text-white`}>
                  {userRewards.tier_level.toUpperCase()}
                </Badge>
                <span className="text-2xl font-bold">{userRewards.points_balance}</span>
                <Coins className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-sm text-muted-foreground">
                Total earned: {userRewards.total_points_earned} points
              </p>
            </div>
            
            {tierInfo.next && (
              <div className="text-right">
                <p className="text-sm font-medium">Next: {tierInfo.next}</p>
                <p className="text-xs text-muted-foreground">
                  {tierInfo.pointsNeeded - userRewards.total_points_earned} points to go
                </p>
              </div>
            )}
          </div>

          {tierInfo.next && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress to {tierInfo.next}</span>
                <span>{progressToNext.toFixed(0)}%</span>
              </div>
              <Progress value={progressToNext} className="h-2" />
            </div>
          )}

          <div className="flex flex-wrap gap-1">
            {tierInfo.benefits.map((benefit, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                <Star className="w-3 h-3 mr-1" />
                {benefit}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Referral System */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your Referral Code */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Your Referral Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {referralCode ? (
              <>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <code className="text-lg font-mono font-bold">
                      {referralCode.code}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyReferralCode}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Uses: {referralCode.uses_count}/{referralCode.max_uses || '∞'}</span>
                  <span>50 points per referral</span>
                </div>

                <div className="flex gap-2">
                  <Button onClick={copyReferralCode} className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button variant="outline" onClick={shareReferralCode}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-muted-foreground">
                  Create your referral code to start earning bonus points!
                </p>
                <Button
                  onClick={createReferralCode}
                  disabled={isCreatingCode}
                  className="w-full"
                >
                  {isCreatingCode ? 'Creating...' : 'Create Referral Code'}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Use Referral Code */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Have a Referral Code?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                value={referralCodeInput}
                onChange={(e) => setReferralCodeInput(e.target.value)}
                placeholder="Enter referral code"
                className="mb-2"
              />
              <Button
                onClick={handleProcessReferral}
                disabled={!referralCodeInput.trim() || isProcessingReferral}
                className="w-full"
              >
                {isProcessingReferral ? 'Processing...' : 'Apply Code'}
              </Button>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 text-green-800 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">Earn 50 bonus points!</span>
              </div>
              <p className="text-xs text-green-600 mt-1">
                Both you and your referrer get rewarded
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReferralDashboard;
