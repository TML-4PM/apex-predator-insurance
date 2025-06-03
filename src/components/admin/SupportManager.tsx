
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  MessageSquare, 
  Mail, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  User,
  Send,
  Search
} from 'lucide-react';

interface SupportTicket {
  id: string;
  customer_name: string;
  customer_email: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
  updated_at: string;
  assigned_to?: string;
}

export default function SupportManager() {
  const [tickets] = useState<SupportTicket[]>([
    {
      id: '1',
      customer_name: 'John Doe',
      customer_email: 'john@example.com',
      subject: 'Unable to download certificate',
      message: 'I purchased a certificate but the download link is not working...',
      status: 'open',
      priority: 'medium',
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      customer_name: 'Jane Smith',
      customer_email: 'jane@example.com',
      subject: 'Refund request',
      message: 'I would like to request a refund for my recent purchase...',
      status: 'in_progress',
      priority: 'high',
      created_at: '2024-01-14T15:45:00Z',
      updated_at: '2024-01-15T09:20:00Z',
      assigned_to: 'Admin'
    }
  ]);

  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [response, setResponse] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customer Support</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Being handled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Good progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3h</div>
            <p className="text-xs text-muted-foreground">Within SLA</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tickets List */}
            <Card>
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>Manage customer support requests</CardDescription>
                <div className="flex gap-2">
                  <Input placeholder="Search tickets..." className="flex-1" />
                  <Button size="sm" variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div 
                      key={ticket.id}
                      className={`border rounded-lg p-4 cursor-pointer hover:bg-gray-50 ${
                        selectedTicket?.id === ticket.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{ticket.subject}</h3>
                        <div className="flex gap-1">
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {ticket.message.substring(0, 100)}...
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {ticket.customer_name}
                        </div>
                        <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ticket Details */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedTicket ? 'Ticket Details' : 'Select Ticket'}
                </CardTitle>
                <CardDescription>
                  {selectedTicket ? 'View and respond to customer inquiry' : 'Choose a ticket to view details'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedTicket ? (
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h3 className="font-medium">{selectedTicket.subject}</h3>
                      <div className="flex gap-2 mt-2">
                        <Badge className={getPriorityColor(selectedTicket.priority)}>
                          {selectedTicket.priority}
                        </Badge>
                        <Badge className={getStatusColor(selectedTicket.status)}>
                          {selectedTicket.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Customer Information</h4>
                      <div className="text-sm space-y-1">
                        <p><strong>Name:</strong> {selectedTicket.customer_name}</p>
                        <p><strong>Email:</strong> {selectedTicket.customer_email}</p>
                        <p><strong>Created:</strong> {new Date(selectedTicket.created_at).toLocaleString()}</p>
                        {selectedTicket.assigned_to && (
                          <p><strong>Assigned to:</strong> {selectedTicket.assigned_to}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Message</h4>
                      <div className="bg-gray-50 p-3 rounded text-sm">
                        {selectedTicket.message}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Response</h4>
                      <Textarea
                        placeholder="Type your response here..."
                        rows={4}
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                      />
                      <div className="flex justify-between mt-2">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Close Ticket</Button>
                          <Button size="sm" variant="outline">Mark Resolved</Button>
                        </div>
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          Send Response
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a ticket from the list to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base Management</CardTitle>
              <CardDescription>Manage FAQ and help articles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">Common Issues</h3>
                  <Button size="sm">Add Article</Button>
                </div>
                <div className="space-y-2">
                  <div className="border rounded p-3">
                    <h4 className="font-medium">How to download certificates</h4>
                    <p className="text-sm text-gray-600">Step-by-step guide for downloading purchased certificates</p>
                  </div>
                  <div className="border rounded p-3">
                    <h4 className="font-medium">Refund policy</h4>
                    <p className="text-sm text-gray-600">Information about refunds and cancellations</p>
                  </div>
                  <div className="border rounded p-3">
                    <h4 className="font-medium">Certificate verification</h4>
                    <p className="text-sm text-gray-600">How to verify the authenticity of certificates</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Response Templates</CardTitle>
                <CardDescription>Quick response templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    Certificate Download Help
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    Refund Processing
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    Account Issues
                  </Button>
                </div>
                <Button size="sm">Manage Templates</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SLA Settings</CardTitle>
                <CardDescription>Service level agreements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Response Time (hours)</label>
                  <Input type="number" placeholder="4" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Resolution Time (hours)</label>
                  <Input type="number" placeholder="24" />
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
