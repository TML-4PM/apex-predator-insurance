
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Play, Code, Book, Zap } from 'lucide-react';

const APIDocumentation = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('create-certificate');

  const endpoints = {
    'create-certificate': {
      method: 'POST',
      path: '/v1/certificates',
      description: 'Create a new adventure insurance certificate',
      request: `{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "certificate_type": "shark",
  "partner_reference": "booking-123",
  "custom_branding": {
    "company_name": "Your Travel Co",
    "logo_url": "https://yoursite.com/logo.png"
  }
}`,
      response: `{
  "id": "cert_1234567890",
  "certificate_url": "https://certificates.wildlifeshield.com/cert_1234567890",
  "download_url": "https://certificates.wildlifeshield.com/cert_1234567890.pdf",
  "status": "generated",
  "customer_name": "John Doe",
  "certificate_type": "shark",
  "created_at": "2024-01-15T10:30:00Z"
}`
    },
    'get-certificate': {
      method: 'GET',
      path: '/v1/certificates/{id}',
      description: 'Retrieve an existing certificate',
      request: null,
      response: `{
  "id": "cert_1234567890",
  "certificate_url": "https://certificates.wildlifeshield.com/cert_1234567890",
  "download_url": "https://certificates.wildlifeshield.com/cert_1234567890.pdf",
  "status": "generated",
  "customer_name": "John Doe",
  "certificate_type": "shark",
  "created_at": "2024-01-15T10:30:00Z"
}`
    },
    'list-certificates': {
      method: 'GET',
      path: '/v1/certificates',
      description: 'List all certificates for your account',
      request: null,
      response: `{
  "data": [
    {
      "id": "cert_1234567890",
      "customer_name": "John Doe",
      "certificate_type": "shark",
      "status": "generated",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "has_more": false,
  "total": 1
}`
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const currentEndpoint = endpoints[selectedEndpoint as keyof typeof endpoints];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-apex-black">API Documentation</h1>
          <Badge className="bg-green-500 text-white">v1.0</Badge>
        </div>
        <p className="text-apex-darkgray/70">
          Complete API reference for integrating Wildlife Shield certificates into your platform.
        </p>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <Card className="p-4">
          <h3 className="font-bold mb-3">Endpoints</h3>
          <div className="space-y-1">
            {Object.entries(endpoints).map(([key, endpoint]) => (
              <button
                key={key}
                onClick={() => setSelectedEndpoint(key)}
                className={`w-full text-left p-2 rounded text-sm transition-colors ${
                  selectedEndpoint === key 
                    ? 'bg-apex-red text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{endpoint.path}</span>
                  <Badge variant="outline" className="text-xs">
                    {endpoint.method}
                  </Badge>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t">
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <div className="space-y-1 text-sm">
              <a href="#authentication" className="block text-blue-600 hover:underline">
                Authentication
              </a>
              <a href="#errors" className="block text-blue-600 hover:underline">
                Error Handling
              </a>
              <a href="#webhooks" className="block text-blue-600 hover:underline">
                Webhooks
              </a>
              <a href="#sdks" className="block text-blue-600 hover:underline">
                SDKs
              </a>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold flex items-center">
                  <Badge className="mr-2 bg-blue-600">{currentEndpoint.method}</Badge>
                  {currentEndpoint.path}
                </h2>
                <p className="text-apex-darkgray/70 mt-1">{currentEndpoint.description}</p>
              </div>
              <Button variant="outline" size="sm">
                <Play className="mr-1" size={14} />
                Try It
              </Button>
            </div>

            <Tabs defaultValue="request" className="space-y-4">
              <TabsList>
                {currentEndpoint.request && <TabsTrigger value="request">Request</TabsTrigger>}
                <TabsTrigger value="response">Response</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
              </TabsList>

              {currentEndpoint.request && (
                <TabsContent value="request" className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Request Body</h4>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(currentEndpoint.request!)}>
                        <Copy size={14} />
                      </Button>
                    </div>
                    <pre className="bg-slate-50 p-4 rounded-lg text-sm overflow-x-auto">
                      {currentEndpoint.request}
                    </pre>
                  </div>
                </TabsContent>
              )}

              <TabsContent value="response" className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Response</h4>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(currentEndpoint.response)}>
                      <Copy size={14} />
                    </Button>
                  </div>
                  <pre className="bg-slate-50 p-4 rounded-lg text-sm overflow-x-auto">
                    {currentEndpoint.response}
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="examples" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">cURL</h4>
                    <pre className="bg-slate-50 p-4 rounded-lg text-sm overflow-x-auto">
{`curl -X ${currentEndpoint.method} https://api.wildlifeshield.com${currentEndpoint.path} \\
  -H "Authorization: Bearer wls_sk_live_..." \\
  -H "Content-Type: application/json" \\${currentEndpoint.request ? `
  -d '${currentEndpoint.request.replace(/\n/g, ' ')}'` : ''}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">JavaScript</h4>
                    <pre className="bg-slate-50 p-4 rounded-lg text-sm overflow-x-auto">
{`const response = await fetch('https://api.wildlifeshield.com${currentEndpoint.path}', {
  method: '${currentEndpoint.method}',
  headers: {
    'Authorization': 'Bearer wls_sk_live_...',
    'Content-Type': 'application/json'
  }${currentEndpoint.request ? `,
  body: JSON.stringify(${currentEndpoint.request.replace(/\n/g, ' ')})` : ''}
});`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">PHP</h4>
                    <pre className="bg-slate-50 p-4 rounded-lg text-sm overflow-x-auto">
{`$client = new WildlifeShield\\Client('wls_sk_live_...');

$certificate = $client->certificates->${selectedEndpoint === 'create-certificate' ? 'create' : 'retrieve'}(${
  currentEndpoint.request ? `[
  'customer_name' => 'John Doe',
  'certificate_type' => 'shark'
]` : "'cert_1234567890'"
});`}
                    </pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Authentication Section */}
          <Card className="p-6 mt-6" id="authentication">
            <h3 className="text-lg font-bold mb-3">Authentication</h3>
            <p className="text-apex-darkgray/70 mb-4">
              All API requests must include your API key in the Authorization header.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg">
              <pre className="text-sm">Authorization: Bearer wls_sk_live_your_api_key_here</pre>
            </div>
          </Card>

          {/* Error Handling */}
          <Card className="p-6 mt-6" id="errors">
            <h3 className="text-lg font-bold mb-3">Error Handling</h3>
            <div className="space-y-3">
              <div className="border rounded p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">400 Bad Request</span>
                  <Badge variant="destructive">Client Error</Badge>
                </div>
                <p className="text-sm text-gray-600">Invalid request parameters</p>
              </div>
              <div className="border rounded p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">401 Unauthorized</span>
                  <Badge variant="destructive">Auth Error</Badge>
                </div>
                <p className="text-sm text-gray-600">Invalid or missing API key</p>
              </div>
              <div className="border rounded p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">429 Too Many Requests</span>
                  <Badge variant="outline">Rate Limit</Badge>
                </div>
                <p className="text-sm text-gray-600">Rate limit exceeded</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default APIDocumentation;
