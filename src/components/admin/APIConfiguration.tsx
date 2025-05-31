
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Youtube, Smartphone, Key, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const APIConfiguration = () => {
  const [youtubeApiKey, setYoutubeApiKey] = useState('');
  const [admobConfig, setAdmobConfig] = useState({
    appId: '',
    rewardedAdUnitId: '',
    testMode: true
  });
  const [isTestingYoutube, setIsTestingYoutube] = useState(false);
  const [youtubeStatus, setYoutubeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const testYoutubeAPI = async () => {
    if (!youtubeApiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a YouTube API key first.",
        variant: "destructive"
      });
      return;
    }

    setIsTestingYoutube(true);
    try {
      // Test the YouTube API with a simple channel request
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true&key=${youtubeApiKey}`
      );
      
      if (response.ok) {
        setYoutubeStatus('success');
        toast({
          title: "Success!",
          description: "YouTube API key is valid and working.",
        });
      } else {
        throw new Error('Invalid API key or insufficient permissions');
      }
    } catch (error) {
      setYoutubeStatus('error');
      toast({
        title: "API Test Failed",
        description: "Please check your YouTube API key and permissions.",
        variant: "destructive"
      });
    } finally {
      setIsTestingYoutube(false);
    }
  };

  const saveYoutubeConfig = () => {
    localStorage.setItem('youtube_api_key', youtubeApiKey);
    toast({
      title: "Configuration Saved",
      description: "YouTube API configuration has been saved locally.",
    });
  };

  const saveAdmobConfig = () => {
    localStorage.setItem('admob_config', JSON.stringify(admobConfig));
    toast({
      title: "Configuration Saved",
      description: "AdMob configuration has been saved locally.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-apex-black mb-4">API Configuration</h2>
        <p className="text-apex-darkgray/70">
          Configure external APIs for enhanced functionality
        </p>
      </div>

      <Tabs defaultValue="youtube" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="youtube" className="flex items-center gap-2">
            <Youtube size={16} />
            YouTube API
          </TabsTrigger>
          <TabsTrigger value="admob" className="flex items-center gap-2">
            <Smartphone size={16} />
            AdMob Rewards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="youtube" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="text-red-600" />
                YouTube Data API v3
                {youtubeStatus === 'success' && <Badge className="bg-green-100 text-green-800">Connected</Badge>}
                {youtubeStatus === 'error' && <Badge className="bg-red-100 text-red-800">Error</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="youtube-api-key">API Key</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="youtube-api-key"
                    type="password"
                    value={youtubeApiKey}
                    onChange={(e) => setYoutubeApiKey(e.target.value)}
                    placeholder="Enter your YouTube Data API v3 key"
                    className="flex-1"
                  />
                  <Button
                    onClick={testYoutubeAPI}
                    disabled={isTestingYoutube || !youtubeApiKey.trim()}
                    variant="outline"
                  >
                    {isTestingYoutube ? 'Testing...' : 'Test'}
                  </Button>
                </div>
              </div>

              <div className="bg-apex-lightgray/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Key size={16} />
                  Setup Instructions
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-apex-darkgray/70">
                  <li>Go to the Google Cloud Console</li>
                  <li>Create or select a project</li>
                  <li>Enable the YouTube Data API v3</li>
                  <li>Create an API key in Credentials</li>
                  <li>Restrict the key to YouTube Data API v3</li>
                </ol>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={saveYoutubeConfig}
                  disabled={!youtubeApiKey.trim()}
                  className="bg-apex-red hover:bg-apex-red/90"
                >
                  Save Configuration
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('https://console.cloud.google.com/', '_blank')}
                >
                  Open Google Cloud Console
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admob" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="text-green-600" />
                AdMob Rewarded Ads
                <Badge className="bg-blue-100 text-blue-800">Beta</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="admob-app-id">App ID</Label>
                <Input
                  id="admob-app-id"
                  value={admobConfig.appId}
                  onChange={(e) => setAdmobConfig(prev => ({ ...prev, appId: e.target.value }))}
                  placeholder="ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="admob-ad-unit">Rewarded Ad Unit ID</Label>
                <Input
                  id="admob-ad-unit"
                  value={admobConfig.rewardedAdUnitId}
                  onChange={(e) => setAdmobConfig(prev => ({ ...prev, rewardedAdUnitId: e.target.value }))}
                  placeholder="ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX"
                  className="mt-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="test-mode"
                  checked={admobConfig.testMode}
                  onChange={(e) => setAdmobConfig(prev => ({ ...prev, testMode: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="test-mode" className="text-sm">
                  Use test ads (recommended for development)
                </Label>
              </div>

              <div className="bg-apex-lightgray/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle size={16} />
                  AdMob Setup Notes
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-apex-darkgray/70">
                  <li>Requires Google AdMob account setup</li>
                  <li>Ad units must be created in AdMob console</li>
                  <li>Test mode uses Google's test ad units</li>
                  <li>Production requires app store deployment</li>
                </ul>
              </div>

              <Button
                onClick={saveAdmobConfig}
                className="bg-apex-red hover:bg-apex-red/90"
              >
                Save AdMob Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default APIConfiguration;
