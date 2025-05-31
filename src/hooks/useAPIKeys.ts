
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useAPIKeys = () => {
  const [youtubeKey, setYoutubeKey] = useState<string>('');
  const [admobConfig, setAdmobConfig] = useState({
    appId: '',
    rewardedAdUnitId: '',
    testMode: true
  });
  const { toast } = useToast();

  // Load API keys from localStorage on mount
  useEffect(() => {
    const savedYoutubeKey = localStorage.getItem('youtube_api_key') || '';
    const savedAdmobConfig = localStorage.getItem('admob_config');
    
    setYoutubeKey(savedYoutubeKey);
    
    if (savedAdmobConfig) {
      try {
        setAdmobConfig(JSON.parse(savedAdmobConfig));
      } catch (error) {
        console.warn('Failed to parse saved AdMob config:', error);
      }
    }
  }, []);

  const saveYoutubeKey = (key: string) => {
    localStorage.setItem('youtube_api_key', key);
    setYoutubeKey(key);
    toast({
      title: "YouTube API Key Saved",
      description: "Your YouTube API configuration has been saved locally.",
    });
  };

  const saveAdmobConfig = (config: typeof admobConfig) => {
    localStorage.setItem('admob_config', JSON.stringify(config));
    setAdmobConfig(config);
    toast({
      title: "AdMob Configuration Saved", 
      description: "Your AdMob settings have been saved locally.",
    });
  };

  const testYoutubeAPI = async (apiKey: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true&key=${apiKey}`
      );
      
      if (response.ok) {
        toast({
          title: "Success!",
          description: "YouTube API key is valid and working.",
        });
        return true;
      } else {
        throw new Error('Invalid API key or insufficient permissions');
      }
    } catch (error) {
      toast({
        title: "API Test Failed",
        description: "Please check your YouTube API key and permissions.",
        variant: "destructive"
      });
      return false;
    }
  };

  const clearAPIKeys = () => {
    localStorage.removeItem('youtube_api_key');
    localStorage.removeItem('admob_config');
    setYoutubeKey('');
    setAdmobConfig({ appId: '', rewardedAdUnitId: '', testMode: true });
    
    toast({
      title: "API Keys Cleared",
      description: "All API configurations have been removed.",
    });
  };

  return {
    youtubeKey,
    admobConfig,
    saveYoutubeKey,
    saveAdmobConfig,
    testYoutubeAPI,
    clearAPIKeys,
    hasYoutubeKey: !!youtubeKey,
    hasAdmobConfig: !!(admobConfig.appId && admobConfig.rewardedAdUnitId)
  };
};
