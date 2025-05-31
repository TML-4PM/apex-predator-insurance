
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign,
  Download,
  Copy,
  Settings,
  BarChart3,
  Globe,
  Palette
} from 'lucide-react';

interface PartnerStats {
  totalSales: number;
  commissionEarned: number;
  certificatesIssued: number;
  conversionRate: number;
}

interface PartnerDashboardProps {
  partnerType: 'agent' | 'operator' | 'hotel';
  stats: PartnerStats;
}

const PartnerDashboard = ({ partnerType, stats }: PartnerDashboardProps) => {
  const [apiKey, setApiKey] = useState('wls_sk_test_4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r');
  const [webhookUrl, setWebhookUrl] = useState('');

  const tierConfig = {
    agent: {
      name: 'Travel Agent',
      markup: '30%',
      color: 'from-blue-500 to-cyan-500',
      features: ['Basic branding', 'Customer management', 'Email support']
    },
    operator: {
      name: 'Tour Operator',
      markup: '50%',
      color: 'from-purple-500 to-pink-500',
      features: ['Full white-label', 'Custom certificates', 'API integration', 'Priority support']
    },
    hotel: {
      name: 'Hotel Chain',
      markup: 'Volume discounts up to 60%',
      color: 'from-amber-500 to-red-500',
      features: ['Enterprise dashboard', 'Multi-location support', 'Custom integrations', 'Dedicated account manager']
    }
  };

  const config = tierConfig[partnerType];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Partner Info Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-apex-black mb-2">Partner Dashboard</h1>
            <Badge className={`bg-gradient-to-r ${config.color} text-white`}>
              {config.name} - {config.markup} Markup
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-sm text-apex-darkgray/70">Partner ID</p>
            <p className="font-mono text-sm">PTR-{partnerType.toUpperCase()}-001</p>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center">
            <DollarSign className="text-green-500 mr-2" size={20} />
            <div>
              <p className="text-sm text-apex-darkgray/70">Total Sales</p>
              <p className="text-xl font-bold">${stats.totalSales.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <TrendingUp className="text-blue-500 mr-2" size={20} />
            <div>
              <p className="text-sm text-apex-darkgray/70">Commission Earned</p>
              <p className="text-xl font-bold">${stats.commissionEarned.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <Users className="text-purple-500 mr-2" size={20} />
            <div>
              <p className="text-sm text-apex-darkgray/70">Certificates Issued</p>
              <p className="text-xl font-bold">{stats.certificatesIssued.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <BarChart3 className="text-orange-500 mr-2" size={20} />
            <div>
              <p className="text-sm text-apex-darkgray/70">Conversion Rate</p>
              <p className="text-xl font-bold">{stats.conversionRate}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="integration" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="integration">API Integration</TabsTrigger>
          <TabsTrigger value="branding">White-Label</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Tools</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="integration" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">API Integration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">API Key</label>
                <div className="flex gap-2">
                  <Input value={apiKey} readOnly className="font-mono text-sm" />
                  <Button variant="outline" onClick={() => copyToClipboard(apiKey)}>
                    <Copy size={16} />
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Webhook URL (Optional)</label>
                <Input 
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://your-site.com/webhook"
                />
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Quick Start Code</h4>
                <pre className="text-sm overflow-x-auto">
{`// Create certificate
const response = await fetch('https://api.wildlifeshield.com/v1/certificates', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    customer_name: 'John Doe',
    certificate_type: 'shark',
    partner_reference: 'booking-123'
  })
});`}
                </pre>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">White-Label Customization</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Brand Settings</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Company Name</label>
                    <Input placeholder="Your Travel Company" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Primary Color</label>
                    <div className="flex gap-2">
                      <Input type="color" value="#dc2626" className="w-16" />
                      <Input value="#dc2626" placeholder="#dc2626" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Logo URL</label>
                    <Input placeholder="https://yoursite.com/logo.png" />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Certificate Preview</h4>
                <div className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Building2 className="text-white" size={20} />
                    </div>
                    <h5 className="font-bold">Your Travel Company</h5>
                    <p className="text-sm text-gray-600 mb-2">Certificate of Survival</p>
                    <div className="text-2xl mb-2">🦈</div>
                    <p className="text-xs">Great White Shark Encounter</p>
                    <p className="text-xs font-semibold">John Doe</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Button className="mt-4">Save Branding</Button>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Dynamic Pricing Tools</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Base Pricing</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>Individual Certificate</span>
                    <span className="font-semibold">$9.99</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>Your Markup ({config.markup})</span>
                    <span className="font-semibold text-green-600">+$2.99</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded">
                    <span className="font-semibold">Your Selling Price</span>
                    <span className="font-bold text-green-600">$12.98</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Volume Discounts</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>1-10 certificates</span>
                    <span>Standard pricing</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>11-50 certificates</span>
                    <span className="text-green-600">5% discount</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>51+ certificates</span>
                    <span className="text-green-600">10% discount</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Sales Analytics</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Top Selling Certificates</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 border rounded">
                    <span className="flex items-center"><span className="mr-2">🦈</span> Shark Insurance</span>
                    <span className="font-semibold">234 sold</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border rounded">
                    <span className="flex items-center"><span className="mr-2">🐻</span> Bear Insurance</span>
                    <span className="font-semibold">189 sold</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border rounded">
                    <span className="flex items-center"><span className="mr-2">🦁</span> Lion Insurance</span>
                    <span className="font-semibold">156 sold</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Recent Activity</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-2 border rounded">
                    <p><span className="font-semibold">Sarah Johnson</span> purchased Shark Insurance</p>
                    <p className="text-gray-500">2 minutes ago • +$2.99 commission</p>
                  </div>
                  <div className="p-2 border rounded">
                    <p><span className="font-semibold">Travel Group (5)</span> purchased Bundle</p>
                    <p className="text-gray-500">15 minutes ago • +$14.95 commission</p>
                  </div>
                  <div className="p-2 border rounded">
                    <p><span className="font-semibold">Mike Chen</span> purchased Bear Insurance</p>
                    <p className="text-gray-500">1 hour ago • +$2.99 commission</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <Download className="mr-2" size={16} />
            Download SDK
          </Button>
          <Button variant="outline">
            <Globe className="mr-2" size={16} />
            View Documentation
          </Button>
          <Button variant="outline">
            <Palette className="mr-2" size={16} />
            Customize Certificates
          </Button>
          <Button variant="outline">
            <Settings className="mr-2" size={16} />
            Account Settings
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PartnerDashboard;
