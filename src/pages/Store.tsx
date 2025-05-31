
import React from 'react';
import Layout from '@/components/Layout';
import MerchandiseStore from '@/components/MerchandiseStore';
import EnhancedCertificateSystem from '@/components/EnhancedCertificateSystem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Award, Package, Zap } from 'lucide-react';

const Store = () => {
  return (
    <Layout>
      <div className="pt-28 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-apex-black mb-6 animate-fade-up">
                Wildlife Shield Store
              </h1>
              <p className="text-xl text-apex-darkgray/70 mb-8 animate-fade-up animate-delay-100">
                Everything you need to survive your next adventure - from certificates to survival gear.
              </p>
            </div>

            {/* Store Navigation */}
            <Tabs defaultValue="certificates" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="certificates" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Certificates
                </TabsTrigger>
                <TabsTrigger value="merchandise" className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Merchandise
                </TabsTrigger>
                <TabsTrigger value="bundles" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Bundles
                </TabsTrigger>
                <TabsTrigger value="premium" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Premium
                </TabsTrigger>
              </TabsList>

              <TabsContent value="certificates">
                <EnhancedCertificateSystem />
              </TabsContent>

              <TabsContent value="merchandise">
                <MerchandiseStore />
              </TabsContent>

              <TabsContent value="bundles">
                <div className="text-center py-16">
                  <h3 className="text-2xl font-bold mb-4">Bundle Deals Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Save big with our survival bundle packages combining certificates, gear, and training.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="premium">
                <div className="text-center py-16">
                  <h3 className="text-2xl font-bold mb-4">Premium Experiences</h3>
                  <p className="text-muted-foreground">
                    VR experiences, guided tours, and exclusive survival training coming soon.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Store;
