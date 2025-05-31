
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Upload, 
  Eye, 
  Download, 
  Settings,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

const WhiteLabelConfigurator = () => {
  const [branding, setBranding] = useState({
    companyName: 'Your Travel Company',
    primaryColor: '#dc2626',
    secondaryColor: '#1f2937',
    logoUrl: '',
    websiteUrl: 'https://yourtravelcompany.com',
    supportEmail: 'support@yourtravelcompany.com'
  });

  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const updateBranding = (key: string, value: string) => {
    setBranding(prev => ({ ...prev, [key]: value }));
  };

  const CertificatePreview = ({ device }: { device: 'desktop' | 'mobile' }) => (
    <div className={`${device === 'mobile' ? 'max-w-sm' : 'max-w-lg'} mx-auto`}>
      <div 
        className="border-2 rounded-xl p-6 text-center"
        style={{ 
          borderColor: branding.primaryColor,
          background: `linear-gradient(135deg, ${branding.primaryColor}10 0%, ${branding.secondaryColor}10 100%)`
        }}
      >
        {/* Header */}
        <div className="mb-4">
          {branding.logoUrl ? (
            <img src={branding.logoUrl} alt="Logo" className="h-12 mx-auto mb-2" />
          ) : (
            <div 
              className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: branding.primaryColor }}
            >
              {branding.companyName.charAt(0)}
            </div>
          )}
          <h3 className="font-bold text-lg" style={{ color: branding.secondaryColor }}>
            {branding.companyName}
          </h3>
          <p className="text-sm text-gray-600">Adventure Insurance Certificate</p>
        </div>

        {/* Certificate Content */}
        <div className="mb-4">
          <div className="text-4xl mb-2">🦈</div>
          <h4 className="font-bold text-xl mb-1" style={{ color: branding.primaryColor }}>
            Great White Shark
          </h4>
          <p className="text-sm text-gray-600 mb-3">Certificate of Survival</p>
          
          <div 
            className="border-t border-b py-3 my-3"
            style={{ borderColor: branding.primaryColor }}
          >
            <p className="font-bold text-lg">John Doe</p>
            <p className="text-sm text-gray-600">Certificate Holder</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500">
          <p>Certificate ID: WLS-2024-001234</p>
          <p>Issued: {new Date().toLocaleDateString()}</p>
          <p className="mt-2">{branding.websiteUrl}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold text-apex-black mb-2">White-Label Configurator</h1>
        <p className="text-apex-darkgray/70">
          Customize the appearance of certificates to match your brand identity.
        </p>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Brand Configuration</h3>
            
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={branding.companyName}
                    onChange={(e) => updateBranding('companyName', e.target.value)}
                    placeholder="Your Travel Company"
                  />
                </div>

                <div>
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="logoUrl"
                      value={branding.logoUrl}
                      onChange={(e) => updateBranding('logoUrl', e.target.value)}
                      placeholder="https://yoursite.com/logo.png"
                    />
                    <Button variant="outline">
                      <Upload size={16} />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: 200x200px PNG with transparent background
                  </p>
                </div>

                <div>
                  <Label htmlFor="websiteUrl">Website URL</Label>
                  <Input
                    id="websiteUrl"
                    value={branding.websiteUrl}
                    onChange={(e) => updateBranding('websiteUrl', e.target.value)}
                    placeholder="https://yourtravelcompany.com"
                  />
                </div>
              </TabsContent>

              <TabsContent value="colors" className="space-y-4">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={branding.primaryColor}
                      onChange={(e) => updateBranding('primaryColor', e.target.value)}
                      className="w-16"
                    />
                    <Input
                      value={branding.primaryColor}
                      onChange={(e) => updateBranding('primaryColor', e.target.value)}
                      placeholder="#dc2626"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={branding.secondaryColor}
                      onChange={(e) => updateBranding('secondaryColor', e.target.value)}
                      className="w-16"
                    />
                    <Input
                      value={branding.secondaryColor}
                      onChange={(e) => updateBranding('secondaryColor', e.target.value)}
                      placeholder="#1f2937"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded border text-center">
                    <div 
                      className="w-8 h-8 rounded mx-auto mb-2"
                      style={{ backgroundColor: branding.primaryColor }}
                    />
                    <p className="text-xs">Primary</p>
                  </div>
                  <div className="p-3 rounded border text-center">
                    <div 
                      className="w-8 h-8 rounded mx-auto mb-2"
                      style={{ backgroundColor: branding.secondaryColor }}
                    />
                    <p className="text-xs">Secondary</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div>
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    value={branding.supportEmail}
                    onChange={(e) => updateBranding('supportEmail', e.target.value)}
                    placeholder="support@yourtravelcompany.com"
                  />
                </div>

                <div>
                  <Label>Certificate Template</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button className="p-3 border rounded text-sm hover:bg-gray-50 border-blue-500 bg-blue-50">
                      Modern
                    </button>
                    <button className="p-3 border rounded text-sm hover:bg-gray-50">
                      Classic
                    </button>
                  </div>
                </div>

                <div>
                  <Label>Additional Features</Label>
                  <div className="space-y-2 mt-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      QR Code for verification
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Watermark protection
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Custom footer text
                    </label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 mt-6">
              <Button>Save Configuration</Button>
              <Button variant="outline">
                <Download className="mr-2" size={16} />
                Export Settings
              </Button>
            </div>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Live Preview</h3>
              <div className="flex gap-2">
                <Button
                  variant={previewDevice === 'desktop' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewDevice('desktop')}
                >
                  <Monitor size={16} />
                </Button>
                <Button
                  variant={previewDevice === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewDevice('mobile')}
                >
                  <Smartphone size={16} />
                </Button>
              </div>
            </div>

            <div className="min-h-96 flex items-center justify-center bg-gray-50 rounded-lg p-4">
              <CertificatePreview device={previewDevice} />
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1">
                <Eye className="mr-2" size={16} />
                Full Preview
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="mr-2" size={16} />
                Download Sample
              </Button>
            </div>
          </Card>

          {/* Configuration Summary */}
          <Card className="p-4">
            <h4 className="font-semibold mb-3">Configuration Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Company:</span>
                <span className="font-medium">{branding.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span>Primary Color:</span>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: branding.primaryColor }}
                  />
                  <span className="font-mono">{branding.primaryColor}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Template:</span>
                <Badge variant="outline">Modern</Badge>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <Badge className="bg-green-500 text-white">Active</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WhiteLabelConfigurator;
