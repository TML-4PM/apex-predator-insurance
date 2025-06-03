
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Filter, 
  Zap, 
  Clock, 
  TrendingUp,
  Users,
  Sparkles
} from 'lucide-react';
import { useActivityFeed } from '@/hooks/useActivityFeed';
import { useEnhancedUserPresence } from '@/hooks/useEnhancedUserPresence';
import ActivityFeedCard from './ActivityFeedCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const RealTimeActivityFeed = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const { activities, loading } = useActivityFeed(20);
  const { onlineUsers, onlineCount } = useEnhancedUserPresence();

  const filteredActivities = activities.filter(activity => {
    if (activeTab === 'all') return true;
    if (activeTab === 'encounters') return ['encounter', 'certificate'].includes(activity.activity_type);
    if (activeTab === 'social') return ['like', 'comment', 'share', 'story'].includes(activity.activity_type);
    if (activeTab === 'achievements') return ['achievement', 'featured'].includes(activity.activity_type);
    return true;
  });

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

  return (
    <div className="space-y-6">
      {/* Live Activity Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-lg text-blue-900">Live Community Activity</CardTitle>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                Live
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <Users className="w-4 h-4" />
                <span>{onlineCount} online</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-1" />
                Filters
              </Button>
            </div>
          </div>
          
          {/* Online Users Preview */}
          {onlineUsers.length > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-sm text-blue-700">Active explorers:</span>
              <div className="flex -space-x-2">
                {onlineUsers.slice(0, 8).map((user) => (
                  <Avatar key={user.user_id} className="w-6 h-6 border-2 border-white">
                    <AvatarImage src={user.avatar_url} alt={user.username} />
                    <AvatarFallback className="text-xs">
                      {user.username[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {onlineUsers.length > 8 && (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 border-2 border-white text-xs font-medium text-gray-600">
                    +{onlineUsers.length - 8}
                  </div>
                )}
              </div>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Activity Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b px-6 pt-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  All Activity
                </TabsTrigger>
                <TabsTrigger value="encounters" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Encounters
                </TabsTrigger>
                <TabsTrigger value="social" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Social
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Achievements
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value={activeTab} className="mt-0">
                {filteredActivities.length === 0 ? (
                  <div className="text-center py-12">
                    <Activity className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-medium mb-2">No activity yet</h3>
                    <p className="text-muted-foreground">
                      Be the first to share an adventure or engage with the community!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-0">
                    {filteredActivities.map((activity) => (
                      <ActivityFeedCard key={activity.id} activity={activity} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeActivityFeed;
