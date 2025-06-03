
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Trophy, 
  Zap, 
  Camera, 
  Target,
  TrendingUp,
  Heart,
  MessageCircle
} from 'lucide-react';
import EnhancedCommunityFeed from '@/components/social/EnhancedCommunityFeed';
import UserProfile from '@/components/social/UserProfile';
import SocialShareFeatures from '@/components/social/SocialShareFeatures';
import GamificationSystem from '@/components/social/GamificationSystem';

const SocialHub = () => {
  const [activeTab, setActiveTab] = useState('feed');

  // Mock data - in real app, this would come from your hooks/API
  const mockUserStats = {
    certificates: 12,
    posts: 34,
    followers: 156,
    following: 89,
    likes_received: 892,
    adventures_completed: 28
  };

  const mockAchievements = [
    {
      id: '1',
      name: 'First Steps',
      description: 'Shared your first adventure story',
      icon: '🚀',
      earned_at: '2024-01-15'
    },
    {
      id: '2',
      name: 'Social Butterfly',
      description: 'Received 100+ likes on your posts',
      icon: '🦋',
      earned_at: '2024-02-01'
    }
  ];

  const mockCertificate = {
    id: 'cert-123',
    name: 'Great White Shark Protection',
    type: 'Marine Predator',
    image_url: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=500',
    user_name: 'Adventure Seeker',
    earned_at: '2024-03-01'
  };

  const mockSocialStats = {
    views: 1250,
    likes: 89,
    shares: 23,
    comments: 12
  };

  const mockChallenges = [
    {
      id: '1',
      title: 'Weekend Warrior',
      description: 'Share 3 adventure stories this weekend',
      progress: 1,
      total: 3,
      reward: '50 XP',
      difficulty: 'easy' as const,
      timeLeft: '2 days',
      category: 'Social'
    },
    {
      id: '2',
      title: 'Certificate Collector',
      description: 'Earn 5 different animal protection certificates',
      progress: 3,
      total: 5,
      reward: '200 XP + Badge',
      difficulty: 'medium' as const,
      timeLeft: '1 week',
      category: 'Adventures'
    }
  ];

  const mockUser = {
    id: 'user-123',
    username: 'adventure_seeker',
    full_name: 'Alex Adventure',
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces',
    bio: 'Thrill-seeker, wildlife enthusiast, and certified adventurer. Always ready for the next challenge!',
    location: 'California, USA',
    created_at: '2023-01-01'
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-white to-apex-lightgray pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-apex-black mb-4">
              Adventure Social Hub
            </h1>
            <p className="text-xl text-apex-darkgray/70 max-w-2xl mx-auto">
              Connect with fellow adventurers, share your stories, and build your reputation in the wildlife community.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-800">{mockUserStats.followers}</div>
              <div className="text-sm text-blue-600">Followers</div>
            </Card>
            
            <Card className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <Trophy className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-800">{mockUserStats.certificates}</div>
              <div className="text-sm text-green-600">Certificates</div>
            </Card>
            
            <Card className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <Heart className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-800">{mockUserStats.likes_received}</div>
              <div className="text-sm text-purple-600">Total Likes</div>
            </Card>
            
            <Card className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <Camera className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-800">{mockUserStats.posts}</div>
              <div className="text-sm text-orange-600">Posts Shared</div>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="feed" className="flex items-center gap-2">
                <MessageCircle size={16} />
                Community
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <Users size={16} />
                Profile
              </TabsTrigger>
              <TabsTrigger value="sharing" className="flex items-center gap-2">
                <Camera size={16} />
                Share & Create
              </TabsTrigger>
              <TabsTrigger value="challenges" className="flex items-center gap-2">
                <Target size={16} />
                Challenges
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                <TrendingUp size={16} />
                Leaderboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feed">
              <EnhancedCommunityFeed />
            </TabsContent>

            <TabsContent value="profile">
              <UserProfile
                user={mockUser}
                stats={mockUserStats}
                achievements={mockAchievements}
                isOwnProfile={true}
              />
            </TabsContent>

            <TabsContent value="sharing">
              <SocialShareFeatures
                certificate={mockCertificate}
                socialStats={mockSocialStats}
              />
            </TabsContent>

            <TabsContent value="challenges">
              <GamificationSystem
                userLevel={5}
                xp={2450}
                xpToNext={3000}
                activeChallenges={mockChallenges}
                achievements={mockAchievements}
                leaderboardPosition={23}
                streak={7}
              />
            </TabsContent>

            <TabsContent value="leaderboard">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                    Community Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Trophy className="h-16 w-16 text-apex-darkgray/40 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-apex-black mb-2">
                      Global Rankings Coming Soon!
                    </h3>
                    <p className="text-apex-darkgray/60 mb-6">
                      Compete with adventurers worldwide and climb the ranks.
                    </p>
                    <Button className="bg-apex-red hover:bg-apex-red/90">
                      Join Beta Testing
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default SocialHub;
