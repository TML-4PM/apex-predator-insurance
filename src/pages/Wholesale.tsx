
import React from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useProducts } from '@/hooks/useProducts';
import { WholesalePricing } from '@/components/wholesale/WholesalePricing';
import { PartnerApplicationForm } from '@/components/wholesale/PartnerApplicationForm';
import { Building2, Users, Crown, Handshake, Target, DollarSign } from 'lucide-react';

const Wholesale = () => {
  const { wholesaleTiers, loading } = useProducts();

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      title: "Volume Discounts",
      description: "Up to 40% off retail prices with our bulk pricing tiers"
    },
    {
      icon: <Crown className="w-8 h-8 text-purple-600" />,
      title: "White-Label Solutions",
      description: "Custom branding and domain options for enterprise partners"
    },
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Marketing Support",
      description: "Co-marketing opportunities and promotional materials"
    },
    {
      icon: <Handshake className="w-8 h-8 text-orange-600" />,
      title: "Dedicated Support",
      description: "Personal account managers for enterprise accounts"
    }
  ];

  const handleApplyTabClick = () => {
    // Find the tab element and trigger its click programmatically
    const applyTab = document.querySelector('[data-value="apply"]');
    if (applyTab && applyTab instanceof HTMLElement) {
      applyTab.click();
    }
  };

  return (
    <Layout>
      <div className="pt-20 min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Building2 className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-apex-black mb-4">
              Wholesale & Partnership Program
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our global network of travel agencies, tour operators, and adventure companies. 
              Offer Apex Predator Insurance to your customers with exclusive wholesale pricing and white-label solutions.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="pricing" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pricing" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Wholesale Pricing
              </TabsTrigger>
              <TabsTrigger value="apply" className="flex items-center gap-2" data-value="apply">
                <Building2 className="w-4 h-4" />
                Become a Partner
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pricing">
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-apex-black mb-4">Choose Your Wholesale Tier</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Our flexible pricing structure grows with your business. Start small and scale up as your volume increases.
                  </p>
                </div>
                
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apex-red mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading pricing tiers...</p>
                  </div>
                ) : (
                  <WholesalePricing 
                    tiers={wholesaleTiers}
                    onSelectTier={(tier) => {
                      console.log('Selected tier:', tier);
                      // Handle tier selection - could open contact form or checkout
                    }}
                  />
                )}

                {/* Additional Information */}
                <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-apex-black mb-4">Ready to Get Started?</h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                      Our wholesale program is designed to help your business grow while providing your customers 
                      with essential travel protection. Apply today to unlock exclusive pricing and partnership benefits.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        onClick={handleApplyTabClick}
                        className="bg-apex-red hover:bg-apex-red/90 text-white px-8 py-3 rounded-lg font-semibold"
                      >
                        Apply for Partnership
                      </button>
                      <button className="border border-apex-red text-apex-red hover:bg-apex-red/10 px-8 py-3 rounded-lg font-semibold">
                        Schedule a Demo
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="apply" data-tab="apply">
              <PartnerApplicationForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Wholesale;
