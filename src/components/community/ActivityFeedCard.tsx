
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Award, 
  MapPin, 
  Camera,
  Trophy,
  Users,
  Star
} from 'lucide-react';
import type { ActivityFeed } from '@/hooks/useActivityFeed';

interface ActivityFeedCardProps {
  activity: ActivityFeed;
}

const getActivityIcon = (activityType: string) => {
  switch (activityType) {
    case 'like': return <Heart className="w-4 h-4 text-red-500" />;
    case 'comment': return <MessageCircle className="w-4 h-4 text-blue-500" />;
    case 'share': return <Share2 className="w-4 h-4 text-green-500" />;
    case 'certificate': return <Award className="w-4 h-4 text-yellow-500" />;
    case 'encounter': return <MapPin className="w-4 h-4 text-orange-500" />;
    case 'story': return <Camera className="w-4 h-4 text-purple-500" />;
    case 'achievement': return <Trophy className="w-4 h-4 text-gold-500" />;
    case 'join': return <Users className="w-4 h-4 text-indigo-500" />;
    case 'featured': return <Star className="w-4 h-4 text-pink-500" />;
    default: return <Heart className="w-4 h-4 text-gray-500" />;
  }
};

const getActivityText = (activity: ActivityFeed) => {
  const { activity_type, metadata } = activity;
  
  switch (activity_type) {
    case 'like':
      return metadata.target_title ? `liked "${metadata.target_title}"` : 'liked a post';
    case 'comment':
      return metadata.target_title ? `commented on "${metadata.target_title}"` : 'left a comment';
    case 'share':
      return metadata.target_title ? `shared "${metadata.target_title}"` : 'shared a post';
    case 'certificate':
      return `earned a certificate for ${metadata.predator_name || 'a predator encounter'}`;
    case 'encounter':
      return `reported an encounter with ${metadata.predator_name || 'a predator'}`;
    case 'story':
      return `shared an adventure story: "${metadata.story_title}"`;
    case 'achievement':
      return `unlocked achievement: ${metadata.achievement_name}`;
    case 'join':
      return 'joined the community';
    case 'featured':
      return metadata.content_type === 'story' ? 'had their story featured' : 'had their content featured';
    default:
      return 'had some activity';
  }
};

const ActivityFeedCard: React.FC<ActivityFeedCardProps> = ({ activity }) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={activity.user_profile?.avatar_url || undefined} />
            <AvatarFallback>
              {activity.user_profile?.username?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {getActivityIcon(activity.activity_type)}
              <span className="font-medium text-sm">
                {activity.user_profile?.username || 'Unknown User'}
              </span>
              <span className="text-sm text-muted-foreground">
                {getActivityText(activity)}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>
                {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
              </span>
              
              {activity.metadata.location && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{activity.metadata.location}</span>
                  </div>
                </>
              )}
              
              {activity.metadata.predator_type && (
                <>
                  <span>•</span>
                  <Badge variant="outline" className="text-xs">
                    {activity.metadata.predator_type}
                  </Badge>
                </>
              )}
            </div>
            
            {activity.metadata.description && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {activity.metadata.description}
              </p>
            )}
            
            {activity.metadata.image_url && (
              <div className="mt-2">
                <img 
                  src={activity.metadata.image_url} 
                  alt="Activity content"
                  className="rounded-lg max-w-full h-32 object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeedCard;
