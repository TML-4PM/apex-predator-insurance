
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Youtube, Play, Eye, ThumbsUp, Calendar } from 'lucide-react';
import { useYoutube } from '@/hooks/useYoutube';
import { formatDistanceToNow } from 'date-fns';

const YoutubeChannel = () => {
  const { videos, loading, fetchChannelVideos } = useYoutube();

  useEffect(() => {
    fetchChannelVideos();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Youtube className="text-red-600" size={32} />
          <div>
            <h2 className="text-2xl font-bold text-apex-black">Apex Predator Oopsies</h2>
            <p className="text-apex-darkgray/70">Our official YouTube channel featuring the best mishaps</p>
          </div>
        </div>
        <Button 
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={() => window.open('https://youtube.com/@apexpredatorinsurance', '_blank')}
        >
          <Youtube size={16} className="mr-2" />
          Subscribe
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <div className="aspect-video relative group">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Play className="text-white" size={48} />
              </div>
              <div className="absolute bottom-2 right-2">
                <Badge className="bg-black/70 text-white">
                  Video
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-bold text-apex-black mb-2 line-clamp-2">
                {video.title}
              </h3>
              <p className="text-apex-darkgray/70 text-sm mb-4 line-clamp-2">
                {video.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-apex-darkgray/60 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{formatDistanceToNow(new Date(video.publishedAt))} ago</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{video.viewCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp size={14} />
                    <span>{video.likeCount.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                  Watch
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button 
          variant="outline" 
          className="border-apex-red text-apex-red hover:bg-apex-red/10"
          onClick={() => window.open('https://youtube.com/@apexpredatorinsurance', '_blank')}
        >
          View All Videos on YouTube
        </Button>
      </div>
    </div>
  );
};

export default YoutubeChannel;
