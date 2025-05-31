
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PartnerDashboard from '@/components/wholesale/PartnerDashboard';
import APIDocumentation from '@/components/wholesale/APIDocumentation';
import WhiteLabelConfigurator from '@/components/wholesale/WhiteLabelConfigurator';
import { 
  BarChart3, 
  Code, 
  Palette, 
  Settings, 
  HelpCircle,
  LogOut,
  Building2
} from 'lucide-react';

const PartnerPortal = () => {
  const [partnerType] = useState<'agent' | 'operator' | 'hotel'>('operator');
  
  const mockStats = {
    totalSales: 45670,
    commissionEarned: 13701,
    certificatesIssued: 1523,
    conversionRate: 12.4
  };

  return (
    <Layout>
      <div className="pt-20 min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Building2 className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-apex-black">Partner Portal</h1>
                  <p className="text-apex-darkgray/70">Adventure Travel Solutions Inc.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  Tour Operator - 50% Markup
                </Badge>
                <Button variant="outline" size="sm">
                  <HelpCircle className="mr-1" size={16} />
                  Support
                </Button>
                <Button variant="outline" size="sm">
                  <LogOut className="mr-1" size={16} />
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart3 size={16} />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center gap-2">
                <Code size={16} />
                API Docs
              </TabsTrigger>
              <TabsTrigger value="branding" className="flex items-center gap-2">
                <Palette size={16} />
                White-Label
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings size={16} />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <PartnerDashboard partnerType={partnerType} stats={mockStats} />
            </TabsContent>

            <TabsContent value="api">
              <APIDocumentation />
            </TabsContent>

            <TabsContent value="branding">
              <WhiteLabelConfigurator />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Company Name</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border rounded"
                        defaultValue="Adventure Travel Solutions Inc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Contact Email</label>
                      <input 
                        type="email" 
                        className="w-full p-2 border rounded"
                        defaultValue="contact@adventuretravel.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Billing Address</label>
                      <textarea 
                        className="w-full p-2 border rounded h-20"
                        defaultValue="123 Travel Street, Tourism City, TC 12345"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Partner Tier</label>
                      <select className="w-full p-2 border rounded">
                        <option>Tour Operator (50% Markup)</option>
                        <option>Travel Agent (30% Markup)</option>
                        <option>Hotel Chain (Volume Discounts)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button>Save Changes</Button>
                    <Button variant="outline">Reset Password</Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">API Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Webhook Endpoints</label>
                    <input 
                      type="url" 
                      className="w-full p-2 border rounded"
                      placeholder="https://yoursite.com/webhook"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Rate Limit</label>
                    <select className="w-full p-2 border rounded">
                      <option>1000 requests/hour (Standard)</option>
                      <option>5000 requests/hour (Premium)</option>
                      <option>Unlimited (Enterprise)</option>
                    </select>
                  </div>
                  <Button>Update API Settings</Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default PartnerPortal;
