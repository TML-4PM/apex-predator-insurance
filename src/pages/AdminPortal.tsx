
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Building2, 
  HeadphonesIcon, 
  LogOut,
  Shield
} from 'lucide-react';
import AdminDashboard from '@/components/admin/AdminDashboard';
import ContentManager from '@/components/admin/ContentManager';
import PartnerManager from '@/components/admin/PartnerManager';
import SupportManager from '@/components/admin/SupportManager';

export default function AdminPortal() {
  const { user, isAdmin, loading } = useAdminAuth();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-apex-red"></div>
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-apex-red rounded-lg flex items-center justify-center">
                  <Shield className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Admin Portal</h1>
                  <p className="text-gray-600">Wildlife Shield Insurance Management</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Exit Admin
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <Tabs defaultValue="dashboard" className="w-full">
            <div className="border-b bg-white sticky top-20 z-10">
              <TabsList className="grid w-full grid-cols-4 h-12 bg-transparent border-none">
                <TabsTrigger 
                  value="dashboard" 
                  className="flex items-center gap-2 data-[state=active]:bg-apex-red data-[state=active]:text-white"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="content" 
                  className="flex items-center gap-2 data-[state=active]:bg-apex-red data-[state=active]:text-white"
                >
                  <FileText size={16} />
                  Content
                </TabsTrigger>
                <TabsTrigger 
                  value="partners" 
                  className="flex items-center gap-2 data-[state=active]:bg-apex-red data-[state=active]:text-white"
                >
                  <Building2 size={16} />
                  Partners
                </TabsTrigger>
                <TabsTrigger 
                  value="support" 
                  className="flex items-center gap-2 data-[state=active]:bg-apex-red data-[state=active]:text-white"
                >
                  <HeadphonesIcon size={16} />
                  Support
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="dashboard" className="mt-0">
              <AdminDashboard />
            </TabsContent>

            <TabsContent value="content" className="mt-0">
              <ContentManager />
            </TabsContent>

            <TabsContent value="partners" className="mt-0">
              <PartnerManager />
            </TabsContent>

            <TabsContent value="support" className="mt-0">
              <SupportManager />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
