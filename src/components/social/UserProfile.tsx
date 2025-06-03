
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Trophy, 
  Heart, 
  Users, 
  Calendar,
  Camera,
  Target,
  Zap
} from 'lucide-react';

interface UserProfileProps {
  user: {
    id: string;
    username: string;
    full_name?: string;
    avatar_url?: string;
    bio?: string;
    location?: string;
    created_at: string;
  };
  stats: {
    certificates: number;
    posts: number;
    followers: number;
    following: number;
    likes_received: number;
    adventures_completed: number;
  };
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    earned_at: string;
  }>;
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onMessage?: () => void;
}

const UserProfile = ({ 
  user, 
  stats, 
  achievements, 
  isOwnProfile = false,
  isFollowing = false,
  onFollow,
  onMessage
}: UserProfileProps) => {
  const memberSince = new Date(user.created_at).getFullYear();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-apex-red to-orange-500"></div>
        <CardContent className="relative pt-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 sm:-mt-12">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback className="text-2xl">
                {user.username?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div>
                <h1 className="text-2xl font-bold text-apex-black">
                  {user.full_name || user.username}
                </h1>
                <p className="text-apex-darkgray/70">@{user.username}</p>
              </div>
              
              {user.bio && (
                <p className="text-apex-darkgray">{user.bio}</p>
              )}
              
              <div className="flex items-center gap-4 text-sm text-apex-darkgray/60">
                {user.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{user.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>Member since {memberSince}</span>
                </div>
              </div>
            </div>
            
            {!isOwnProfile && (
              <div className="flex gap-2">
                <Button
                  onClick={onFollow}
                  variant={isFollowing ? "outline" : "default"}
                  className={isFollowing ? "" : "bg-apex-red hover:bg-apex-red/90"}
                >
                  <Users size={16} className="mr-1" />
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="outline" onClick={onMessage}>
                  Message
                </Button>
              </div>
            )}
            
            {isOwnProfile && (
              <Button variant="outline">
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="text-center p-4">
          <Trophy className="h-6 w-6 text-apex-red mx-auto mb-2" />
          <div className="text-2xl font-bold text-apex-black">{stats.certificates}</div>
          <div className="text-sm text-apex-darkgray/60">Certificates</div>
        </Card>
        
        <Card className="text-center p-4">
          <Camera className="h-6 w-6 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-apex-black">{stats.posts}</div>
          <div className="text-sm text-apex-darkgray/60">Posts</div>
        </Card>
        
        <Card className="text-center p-4">
          <Users className="h-6 w-6 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-apex-black">{stats.followers}</div>
          <div className="text-sm text-apex-darkgray/60">Followers</div>
        </Card>
        
        <Card className="text-center p-4">
          <Users className="h-6 w-6 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-apex-black">{stats.following}</div>
          <div className="text-sm text-apex-darkgray/60">Following</div>
        </Card>
        
        <Card className="text-center p-4">
          <Heart className="h-6 w-6 text-pink-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-apex-black">{stats.likes_received}</div>
          <div className="text-sm text-apex-darkgray/60">Likes</div>
        </Card>
        
        <Card className="text-center p-4">
          <Target className="h-6 w-6 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-apex-black">{stats.adventures_completed}</div>
          <div className="text-sm text-apex-darkgray/60">Adventures</div>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          {achievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-apex-black">{achievement.name}</h4>
                    <p className="text-sm text-apex-darkgray/60">{achievement.description}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    New
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Trophy className="h-12 w-12 text-apex-darkgray/40 mx-auto mb-4" />
              <h3 className="font-medium text-apex-black mb-2">No achievements yet</h3>
              <p className="text-apex-darkgray/60">
                Complete adventures and earn certificates to unlock achievements!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
