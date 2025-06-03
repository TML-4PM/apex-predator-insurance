
import React from 'react';
import Layout from '@/components/Layout';
import MerchandiseStore from '@/components/MerchandiseStore';
import EnhancedCertificateSystem from '@/components/EnhancedCertificateSystem';
import ApexPredatorInsurance from '@/components/ApexPredatorInsurance';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Award, Package, Shield, Crown, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Store = () => {
  return (
    <Layout>
      <div className="pt-28 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Enhanced Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center items-center gap-2 mb-4">
                <Crown className="w-8 h-8 text-yellow-500" />
                <h1 className="text-4xl md:text-5xl font-bold text-apex-black animate-fade-up">
                  Wildlife Shield Store
                </h1>
                <Crown className="w-8 h-8 text-yellow-500" />
              </div>
              <p className="text-xl text-apex-darkgray/70 mb-6 animate-fade-up animate-delay-100">
                Everything you need to survive your next adventure - from certificates to survival gear.
              </p>
              
              {/* Featured Deals Banner */}
              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-4 mb-8 animate-fade-up animate-delay-200">
                <div className="flex flex-wrap justify-center items-center gap-4 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    <span className="font-bold">NEW COLLECTIONS AVAILABLE!</span>
                  </div>
                  <Badge className="bg-white text-red-600 font-bold">
                    Save up to $589 with bundles
                  </Badge>
                  <Badge className="bg-yellow-400 text-black font-bold">
                    Regional & Seasonal packs now live
                  </Badge>
                </div>
              </div>
            </div>

            {/* Store Navigation */}
            <Tabs defaultValue="insurance" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="insurance" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Insurance</span>
                  <Badge className="bg-red-600 text-white text-xs ml-1">HOT</Badge>
                </TabsTrigger>
                <TabsTrigger value="certificates" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span className="hidden sm:inline">Certificates</span>
                </TabsTrigger>
                <TabsTrigger value="merchandise" className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="hidden sm:inline">Merchandise</span>
                </TabsTrigger>
                <TabsTrigger value="bundles" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span className="hidden sm:inline">Bundles</span>
                  <Badge className="bg-green-600 text-white text-xs ml-1">SAVE</Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="insurance">
                <div className="mb-6">
                  <div className="text-center bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">
                      🦈 Individual Plans - $9.99 Each
                    </h3>
                    <p className="text-blue-700">
                      Choose from 79 different apex predators. Perfect for specific adventures or as unique gifts!
                    </p>
                  </div>
                </div>
                <ApexPredatorInsurance />
              </TabsContent>

              <TabsContent value="certificates">
                <EnhancedCertificateSystem />
              </TabsContent>

              <TabsContent value="merchandise">
                <MerchandiseStore />
              </TabsContent>

              <TabsContent value="bundles">
                <div className="space-y-8">
                  {/* Bundle Collection Showcase */}
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-apex-black mb-4">
                      🎁 Bundle Collections - Maximum Savings!
                    </h3>
                    <p className="text-gray-600 max-w-3xl mx-auto mb-6">
                      Save hundreds with our curated collections! From regional adventures to experience-based packages.
                    </p>
                    
                    {/* Savings Highlight */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg">
                        <div className="text-2xl font-bold">$589</div>
                        <div className="text-sm">Maximum Savings</div>
                        <div className="text-xs opacity-90">Ultimate Collection</div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-lg">
                        <div className="text-2xl font-bold">11+</div>
                        <div className="text-sm">Bundle Options</div>
                        <div className="text-xs opacity-90">Regional & Seasonal</div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg">
                        <div className="text-2xl font-bold">79</div>
                        <div className="text-sm">Total Animals</div>
                        <div className="text-xs opacity-90">Complete Collection</div>
                      </div>
                    </div>
                  </div>

                  {/* Bundle Categories Preview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-orange-100 to-red-100 border border-orange-200 rounded-lg p-6 text-center">
                      <div className="text-4xl mb-3">🌍</div>
                      <h4 className="font-bold text-lg mb-2">Regional Collections</h4>
                      <p className="text-sm text-gray-600 mb-3">African Safari, Amazon, Australian Outback & more</p>
                      <Badge className="bg-orange-600 text-white">5 Collections</Badge>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200 rounded-lg p-6 text-center">
                      <div className="text-4xl mb-3">🌡️</div>
                      <h4 className="font-bold text-lg mb-2">Seasonal Packs</h4>
                      <p className="text-sm text-gray-600 mb-3">Summer Adventure & Winter Survival collections</p>
                      <Badge className="bg-blue-600 text-white">2 Collections</Badge>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200 rounded-lg p-6 text-center">
                      <div className="text-4xl mb-3">⭐</div>
                      <h4 className="font-bold text-lg mb-2">Experience Levels</h4>
                      <p className="text-sm text-gray-600 mb-3">Beginner to Extreme Explorer packages</p>
                      <Badge className="bg-purple-600 text-white">3 Collections</Badge>
                    </div>
                    
                    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-lg p-6 text-center">
                      <div className="text-4xl mb-3">🏆</div>
                      <h4 className="font-bold text-lg mb-2">Ultimate Collection</h4>
                      <p className="text-sm text-gray-600 mb-3">All 79 predators - maximum bragging rights</p>
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">PREMIUM</Badge>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center mt-8">
                    <p className="text-gray-600 mb-4">
                      Ready to explore our bundle collections? Check out the full selection in our insurance section!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <button 
                        onClick={() => {
                          const insuranceTab = document.querySelector('[value="insurance"]') as HTMLElement;
                          insuranceTab?.click();
                        }}
                        className="bg-apex-red hover:bg-apex-red/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        View All Bundles
                      </button>
                      <button className="border-2 border-apex-red text-apex-red hover:bg-apex-red hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                        Compare Savings
                      </button>
                    </div>
                  </div>
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
