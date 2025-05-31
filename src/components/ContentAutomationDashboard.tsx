
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useContentAutomation } from '@/hooks/useContentAutomation';
import { 
  RefreshCw, 
  Bot, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Globe,
  TrendingUp,
  Zap
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const ContentAutomationDashboard = () => {
  const { 
    automatedContent, 
    loading, 
    lastCrawl, 
    crawlRedditContent, 
    processContentWithAI, 
    approveContent 
  } = useContentAutomation();

  const [selectedCategory, setSelectedCategory] = useState('all');

  const pendingContent = automatedContent.filter(c => c.status === 'pending');
  const approvedContent = automatedContent.filter(c => c.status === 'approved');

  const categoryColors = {
    'ai_fail': 'bg-purple-100 text-purple-800',
    'adventure_gone_wrong': 'bg-orange-100 text-orange-800',
    'wildlife_encounter': 'bg-green-100 text-green-800',
    'equipment_failure': 'bg-red-100 text-red-800',
    'other': 'bg-gray-100 text-gray-800'
  };

  const confidenceColor = (score?: number) => {
    if (!score) return 'text-gray-600';
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-apex-black">Content Automation Hub</h2>
          <p className="text-apex-darkgray/70 mt-2">
            Automated content discovery and processing using free-tier APIs
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={crawlRedditContent} 
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <RefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} size={16} />
            Crawl Reddit
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="text-blue-500" size={20} />
              <div>
                <p className="text-sm text-apex-darkgray/70">Pending Review</p>
                <p className="text-2xl font-bold text-apex-black">{pendingContent.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              <div>
                <p className="text-sm text-apex-darkgray/70">Approved</p>
                <p className="text-2xl font-bold text-apex-black">{approvedContent.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-purple-500" size={20} />
              <div>
                <p className="text-sm text-apex-darkgray/70">Avg Confidence</p>
                <p className="text-2xl font-bold text-apex-black">
                  {automatedContent.length > 0 
                    ? Math.round(automatedContent.reduce((sum, c) => sum + (c.confidence_score || 0), 0) / automatedContent.length * 100)
                    : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="text-yellow-500" size={20} />
              <div>
                <p className="text-sm text-apex-darkgray/70">Last Crawl</p>
                <p className="text-sm font-semibold text-apex-black">
                  {lastCrawl ? formatDistanceToNow(lastCrawl) + ' ago' : 'Never'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">Pending Review ({pendingContent.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved Content ({approvedContent.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingContent.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bot className="mx-auto mb-4 text-apex-darkgray/40" size={48} />
                <h3 className="text-lg font-semibold text-apex-black mb-2">No Pending Content</h3>
                <p className="text-apex-darkgray/70">Run a crawl to discover new incidents</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {pendingContent.map((content) => (
                <Card key={content.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-apex-black mb-2">{content.title}</h3>
                        <p className="text-apex-darkgray/70 text-sm mb-3 line-clamp-3">
                          {content.description}
                        </p>
                        
                        <div className="flex items-center gap-3 text-sm text-apex-darkgray/60">
                          <div className="flex items-center gap-1">
                            <Globe size={12} />
                            <span>{content.source_platform || 'Unknown'}</span>
                          </div>
                          <span>•</span>
                          <span>{content.discovery_date ? formatDistanceToNow(new Date(content.discovery_date)) + ' ago' : 'Unknown'}</span>
                          <span>•</span>
                          <span className={confidenceColor(content.confidence_score)}>
                            {Math.round((content.confidence_score || 0) * 100)}% confidence
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        <Badge className={categoryColors[content.category as keyof typeof categoryColors] || categoryColors.other}>
                          {content.category.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => content.source_url && window.open(content.source_url, '_blank')}
                        disabled={!content.source_url}
                      >
                        View Source
                      </Button>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => processContentWithAI(content.id)}
                        >
                          <Bot className="mr-1" size={14} />
                          Enhance
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => approveContent(content.id)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <CheckCircle className="mr-1" size={14} />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="grid gap-4">
            {approvedContent.slice(0, 10).map((content) => (
              <Card key={content.id} className="border-green-200 bg-green-50/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-apex-black">{content.title}</h4>
                      <p className="text-sm text-apex-darkgray/70 mt-1">
                        {content.description.substring(0, 100)}...
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500 text-white">Live</Badge>
                      <Badge variant="outline">{content.source_platform || 'Unknown'}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentAutomationDashboard;
