import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, User, FileText, CreditCard, LogOut, Award, Share2, BarChart3 } from 'lucide-react';
import CertificateManager from '@/components/certificate/CertificateManager';
import SocialSharingPanel from '@/components/certificate/SocialSharingPanel';
import OrderHistory from '@/components/order/OrderHistory';
import UserAnalytics from '@/components/dashboard/UserAnalytics';
import PaymentMethodsManager from '@/components/dashboard/PaymentMethodsManager';

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-apex-red"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  const userDisplayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-apex-black">Dashboard</h1>
              <p className="text-apex-darkgray/70">Welcome back, {userDisplayName}</p>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Analytics Overview */}
          <div className="mb-8">
            <UserAnalytics />
          </div>

          <Tabs defaultValue="certificates" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="sharing">Social</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="certificates" className="space-y-6">
              <CertificateManager />
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <OrderHistory />
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <PaymentMethodsManager />
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-apex-red" />
                    Spending Summary
                  </CardTitle>
                  <CardDescription>
                    Your purchase history and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Detailed spending analytics coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-apex-red" />
                      Profile
                    </CardTitle>
                    <CardDescription>
                      Manage your account settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">Email: {user.email}</p>
                      <p className="text-sm text-gray-600">
                        Member since: {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button className="w-full">Edit Profile</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-apex-red" />
                      Account Security
                    </CardTitle>
                    <CardDescription>
                      Manage your security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">Change Password</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-apex-red" />
                      Achievements
                    </CardTitle>
                    <CardDescription>
                      Your survival milestones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span className="text-sm">First Certificate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Share2 className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Social Sharer</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sharing" className="space-y-6">
              <SocialSharingPanel
                certificateName="Adventure Insurance"
                certificateId="sample-cert-id"
                userName={userDisplayName}
              />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-apex-red" />
                    Detailed Analytics
                  </CardTitle>
                  <CardDescription>
                    Comprehensive insights into your Wildlife Shield journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Advanced analytics dashboard coming soon</p>
                    <p className="text-sm mt-2">Track your survival progress, certificate sharing stats, and more</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-apex-red" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button>Buy Certificate</Button>
                <Button variant="outline">View Gallery</Button>
                <Button variant="outline">Browse Plans</Button>
                <Button variant="outline">Verify Certificate</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
