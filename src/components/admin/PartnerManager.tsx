
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  CheckCircle, 
  XCircle, 
  Clock,
  DollarSign,
  Settings,
  Users
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PartnerApplication {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  business_type: string;
  status: string;
  created_at: string;
  expected_monthly_volume?: number;
  website_url?: string;
}

interface PartnerAccount {
  id: string;
  company_name: string;
  contact_email: string;
  partner_code: string;
  commission_rate?: number;
  total_orders: number;
  total_revenue: number;
  is_active: boolean;
}

export default function PartnerManager() {
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [partners, setPartners] = useState<PartnerAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [applicationsData, partnersData] = await Promise.all([
        supabase.from('partner_applications').select('*').order('created_at', { ascending: false }),
        supabase.from('partner_accounts').select('*').order('created_at', { ascending: false })
      ]);

      setApplications(applicationsData.data || []);
      setPartners(partnersData.data || []);
    } catch (error) {
      console.error('Error fetching partner data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationAction = async (applicationId: string, action: 'approve' | 'reject') => {
    try {
      if (action === 'approve') {
        const application = applications.find(app => app.id === applicationId);
        if (application) {
          // Create partner account
          const partnerCode = `WS${Date.now().toString().slice(-6)}`;
          await supabase.from('partner_accounts').insert({
            application_id: applicationId,
            company_name: application.company_name,
            contact_email: application.email,
            partner_code: partnerCode,
            commission_rate: 0.25, // 25% default commission
            is_active: true
          });
        }
      }

      // Update application status
      await supabase
        .from('partner_applications')
        .update({ status: action === 'approve' ? 'approved' : 'rejected' })
        .eq('id', applicationId);

      fetchData();
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Partner Management</h1>
        <Button onClick={fetchData}>Refresh Data</Button>
      </div>

      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="partners">Active Partners</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Partner Applications</CardTitle>
              <CardDescription>Review and manage incoming partnership requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Business Type</TableHead>
                    <TableHead>Expected Volume</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{application.company_name}</div>
                          {application.website_url && (
                            <div className="text-sm text-gray-500 flex items-center">
                              <Globe className="h-3 w-3 mr-1" />
                              {application.website_url}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{application.contact_name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {application.email}
                          </div>
                          {application.phone && (
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {application.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{application.business_type}</TableCell>
                      <TableCell>
                        {application.expected_monthly_volume ? 
                          `${application.expected_monthly_volume}/month` : 
                          'Not specified'
                        }
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {application.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleApplicationAction(application.id, 'approve')}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleApplicationAction(application.id, 'reject')}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partners" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Partners</CardTitle>
              <CardDescription>Manage existing partner accounts and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Partner Code</TableHead>
                    <TableHead>Commission Rate</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners.map((partner) => (
                    <TableRow key={partner.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{partner.company_name}</div>
                          <div className="text-sm text-gray-500">{partner.contact_email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {partner.partner_code}
                        </code>
                      </TableCell>
                      <TableCell>
                        {partner.commission_rate ? 
                          `${(partner.commission_rate * 100).toFixed(1)}%` : 
                          'Not set'
                        }
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{partner.total_orders} orders</div>
                          <div className="text-sm text-gray-500">
                            ${(partner.total_revenue / 100).toFixed(2)} revenue
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={partner.is_active ? 'default' : 'secondary'}>
                          {partner.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <DollarSign className="h-4 w-4 mr-1" />
                            Payouts
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Commission Settings</CardTitle>
                <CardDescription>Configure default commission rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Default Commission Rate</label>
                  <Input type="number" placeholder="25" />
                  <p className="text-xs text-gray-500 mt-1">Percentage of sale value</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Minimum Payout Threshold</label>
                  <Input type="number" placeholder="100" />
                  <p className="text-xs text-gray-500 mt-1">Minimum amount before payout</p>
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>White Label Configuration</CardTitle>
                <CardDescription>Manage white label features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Enable White Label</label>
                  <Input type="checkbox" />
                  <p className="text-xs text-gray-500 mt-1">Allow partners to customize branding</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Custom Domain Support</label>
                  <Input type="checkbox" />
                  <p className="text-xs text-gray-500 mt-1">Enable partner custom domains</p>
                </div>
                <Button>Update Configuration</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
