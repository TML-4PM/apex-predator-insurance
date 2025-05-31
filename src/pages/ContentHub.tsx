
import React from 'react';
import Layout from '@/components/Layout';
import ContentAutomationDashboard from '@/components/ContentAutomationDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Globe, Zap, TrendingUp } from 'lucide-react';

const ContentHub = () => {
  return (
    <Layout>
      <div className="pt-28 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-apex-black mb-6 animate-fade-up">
                Content Automation Hub
              </h1>
              <p className="text-xl text-apex-darkgray/70 mb-8 animate-fade-up animate-delay-100">
                Automated content discovery and curation using free-tier APIs to keep your site fresh with adventure mishaps.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center animate-fade-up animate-delay-200">
                <Badge className="bg-orange-500 text-white">Reddit Integration</Badge>
                <Badge className="bg-blue-500 text-white">AI Processing</Badge>
                <Badge className="bg-green-500 text-white">Auto-Categorization</Badge>
                <Badge className="bg-purple-500 text-white">Free APIs Only</Badge>
              </div>
            </div>

            {/* Features Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Globe className="mx-auto mb-4 text-blue-500" size={32} />
                  <h3 className="font-bold text-apex-black mb-2">Content Discovery</h3>
                  <p className="text-sm text-apex-darkgray/70">
                    Crawl Reddit, RSS feeds, and social media for adventure mishaps
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Bot className="mx-auto mb-4 text-purple-500" size={32} />
                  <h3 className="font-bold text-apex-black mb-2">AI Enhancement</h3>
                  <p className="text-sm text-apex-darkgray/70">
                    Automatic categorization, image selection, and content optimization
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Zap className="mx-auto mb-4 text-yellow-500" size={32} />
                  <h3 className="font-bold text-apex-black mb-2">Real-time Processing</h3>
                  <p className="text-sm text-apex-darkgray/70">
                    Continuous content pipeline with confidence scoring
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <TrendingUp className="mx-auto mb-4 text-green-500" size={32} />
                  <h3 className="font-bold text-apex-black mb-2">Viral Potential</h3>
                  <p className="text-sm text-apex-darkgray/70">
                    Identify trending content and viral opportunities
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard */}
            <ContentAutomationDashboard />

            {/* API Status */}
            <Card className="mt-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="text-blue-500" />
                  Free API Status & Limits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Reddit API</h4>
                    <p className="text-sm text-green-700">
                      Public JSON endpoints - Unlimited with rate limiting
                    </p>
                    <Badge className="mt-2 bg-green-500 text-white">Active</Badge>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Unsplash API</h4>
                    <p className="text-sm text-blue-700">
                      50 requests/hour - Image sourcing
                    </p>
                    <Badge className="mt-2 bg-blue-500 text-white">Active</Badge>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">AI Processing</h4>
                    <p className="text-sm text-purple-700">
                      Local algorithms - Content enhancement
                    </p>
                    <Badge className="mt-2 bg-purple-500 text-white">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContentHub;
