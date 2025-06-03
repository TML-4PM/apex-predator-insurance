
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Share2, 
  Eye, 
  MapPin, 
  Calendar,
  Award,
  ExternalLink
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { AdventureStory } from '@/hooks/useAdventureStories';
import { useAdventureStories } from '@/hooks/useAdventureStories';
import { useActivityFeed } from '@/hooks/useActivityFeed';

interface AdventureStoryCardProps {
  story: AdventureStory;
}

const AdventureStoryCard: React.FC<AdventureStoryCardProps> = ({ story }) => {
  const [hasViewed, setHasViewed] = useState(false);
  const { incrementViews, incrementShares } = useAdventureStories();
  const { createActivity } = useActivityFeed();

  const handleView = () => {
    if (!hasViewed) {
      incrementViews(story.id);
      setHasViewed(true);
      createActivity('view', story.id, 'story', {
        story_title: story.title,
        predator_type: story.predator_type
      });
    }
  };

  const handleShare = () => {
    incrementShares(story.id);
    createActivity('share', story.id, 'story', {
      story_title: story.title,
      predator_type: story.predator_type
    });

    // Create shareable content
    const shareData = {
      title: `Adventure Story: ${story.title}`,
      text: `Check out this amazing predator encounter story by ${story.user_profile?.username}!`,
      url: window.location.origin + `/stories/${story.id}`
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
    }
  };

  return (
    <Card className="mb-6 hover:shadow-lg transition-all duration-300" onClick={handleView}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={story.user_profile?.avatar_url || undefined} />
              <AvatarFallback>
                {story.user_profile?.username?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg leading-tight">{story.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{story.user_profile?.username || 'Unknown User'}</span>
                <span>•</span>
                <Calendar className="w-3 h-3" />
                <span>{formatDistanceToNow(new Date(story.created_at), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
          
          {story.is_featured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <Award className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Story Content */}
        <p className="text-gray-700 leading-relaxed">{story.content}</p>

        {/* Images */}
        {story.image_urls.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {story.image_urls.slice(0, 4).map((url, index) => (
              <div key={index} className="relative">
                <img 
                  src={url} 
                  alt={`Adventure story image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                {index === 3 && story.image_urls.length > 4 && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center text-white font-semibold">
                    +{story.image_urls.length - 4} more
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tags and Location */}
        <div className="flex flex-wrap items-center gap-2">
          {story.predator_type && (
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              {story.predator_type}
            </Badge>
          )}
          
          {story.location && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{story.location}</span>
            </div>
          )}
          
          {story.certificate_id && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              <Award className="w-3 h-3 mr-1" />
              Certified
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className={`w-4 h-4 ${story.is_liked ? 'text-red-500 fill-current' : ''}`} />
              <span>{story.likes_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{story.views_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <Share2 className="w-4 h-4" />
              <span>{story.shares_count}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
            
            {story.certificate_id && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`/certificate/${story.certificate_id}`, '_blank');
                }}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                View Certificate
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdventureStoryCard;
