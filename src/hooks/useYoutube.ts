
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
}

export const useYoutube = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const generateVideoFromOopsie = async (oopsieData: any) => {
    setUploading(true);
    try {
      // Call edge function to generate video and upload to YouTube
      const response = await fetch('/api/youtube/upload-oopsie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(oopsieData)
      });

      if (!response.ok) throw new Error('Failed to generate video');

      const data = await response.json();

      toast({
        title: "Video Generated!",
        description: "Your oopsie has been turned into a YouTube video.",
      });

      return data;
    } catch (error) {
      console.error('Error generating YouTube video:', error);
      toast({
        title: "Error",
        description: "Failed to generate YouTube video.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const fetchChannelVideos = async () => {
    setLoading(true);
    try {
      // Simulate API call - in real implementation, this would call YouTube API
      const mockVideos: YouTubeVideo[] = [
        {
          id: '1',
          title: 'Top 10 AI Fails This Week - Apex Predator Insurance Claims',
          description: 'Watch the funniest AI prediction fails that led to actual insurance claims!',
          thumbnailUrl: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=480&h=360&fit=crop',
          publishedAt: new Date().toISOString(),
          viewCount: 15420,
          likeCount: 892
        },
        {
          id: '2',
          title: 'Bear Encounter Gone Wrong - Real Customer Story',
          description: 'A customer shares their hilarious bear insurance claim story.',
          thumbnailUrl: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=480&h=360&fit=crop',
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          viewCount: 8934,
          likeCount: 456
        }
      ];

      setVideos(mockVideos);
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      toast({
        title: "Error",
        description: "Failed to load YouTube videos.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    videos,
    loading,
    uploading,
    generateVideoFromOopsie,
    fetchChannelVideos
  };
};
