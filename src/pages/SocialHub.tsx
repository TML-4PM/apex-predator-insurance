
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Activity, 
  Camera, 
  Users, 
  Gift,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import RealTimeActivityFeed from '@/components/community/RealTimeActivityFeed';
import CreateAdventureStory from '@/components/social/CreateAdventureStory';
import AdventureStoryCard from '@/components/social/AdventureStoryCard';
import ReferralDashboard from '@/components/social/ReferralDashboard';
import OnlineUsersIndicator from '@/components/OnlineUsersIndicator';
import { useAdventureStories } from '@/hooks/useAdventureStories';
import { useEnhancedUserPresence } from '@/hooks/useEnhancedUserPresence';

const SocialHub = () => {
  const [activeTab, setActiveTab] = useState('activity');
  const { stories: featuredStories } = useAdventureStories(true);
  const { stories: allStories } = useAdventureStories(false);
  const { updateActivityStatus } = useEnhancedUserPresence();

  // Update user activity status when they visit different tabs
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    updateActivityStatus(`viewing-${tab}`, undefined, { section: tab });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Community Hub
          </h1>
          <p className="text-lg text-muted-foreground">
            Connect with fellow adventurers, share your stories, and earn rewards
          </p>
        </div>

        {/* Online Users Indicator */}
        <div className="mb-6">
          <OnlineUsersIndicator />
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Live Feed</span>
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">Stories</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Community</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              <span className="hidden sm:inline">Rewards</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-6">
            <RealTimeActivityFeed />
          </TabsContent>

          <TabsContent value="stories" className="space-y-6">
            {/* Story Creation */}
            <CreateAdventureStory />

            {/* Featured Stories */}
            {featuredStories.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    Featured Adventure Stories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {featuredStories.map((story) => (
                      <AdventureStoryCard key={story.id} story={story} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Stories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Recent Adventure Stories
                </CardTitle>
              </CardHeader>
              <CardContent>
                {allStories.length === 0 ? (
                  <div className="text-center py-12">
                    <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-medium mb-2">No stories yet</h3>
                    <p className="text-muted-foreground">
                      Be the first to share your predator encounter adventure!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {allStories.map((story) => (
                      <AdventureStoryCard key={story.id} story={story} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Community Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Community Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{allStories.length}</div>
                      <div className="text-sm text-muted-foreground">Stories Shared</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {allStories.reduce((sum, story) => sum + story.views_count, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Views</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {allStories.reduce((sum, story) => sum + story.likes_count, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Likes</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {allStories.reduce((sum, story) => sum + story.shares_count, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Shares</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Contributors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Array.from(new Set(allStories.map(s => s.user_profile?.username).filter(Boolean)))
                      .slice(0, 5)
                      .map((username, index) => (
                        <div key={username} className="flex items-center gap-3 p-2 rounded-lg bg-muted">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <span className="font-medium">{username}</span>
                          <div className="ml-auto text-sm text-muted-foreground">
                            {allStories.filter(s => s.user_profile?.username === username).length} stories
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <ReferralDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SocialHub;
