
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Users, Crown, ShoppingCart, Building2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { EnhancedProductGrid } from './EnhancedProductGrid';
import { EnhancedBundleGrid } from './EnhancedBundleGrid';
import { WholesalePricing } from '../wholesale/WholesalePricing';
import { PartnerApplicationForm } from '../wholesale/PartnerApplicationForm';
import DynamicRiskCard from '@/components/DynamicRiskCard';
import RewardedAdDiscount from '@/components/RewardedAdDiscount';

const ProductPreview = () => {
  const { products, bundleProducts, wholesaleTiers, loading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showRiskCard, setShowRiskCard] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [finalPrice, setFinalPrice] = useState(9.99);
  const [cart, setCart] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('individual');

  const handleAddToCart = (product: any) => {
    setCart(prev => [...prev, product]);
    // You could add a toast here
  };

  const handleSelectProduct = (product: any) => {
    setSelectedProduct(product);
    setFinalPrice(discountApplied ? product.base_price * 0.8 : product.base_price);
  };

  const handleDiscountApplied = (discountPercentage: number) => {
    setDiscountApplied(true);
    if (selectedProduct) {
      setFinalPrice(selectedProduct.base_price * (1 - discountPercentage / 100));
    }
  };

  if (loading) {
    return (
      <section className="mb-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apex-red mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-apex-black mb-4">
          Complete Predator Insurance Collection
        </h2>
        <p className="text-apex-darkgray/70 max-w-2xl mx-auto mb-6">
          All {products.length} apex predators now available at $9.99 each, with category bundles, 
          wholesale pricing, and white-label partnership opportunities.
        </p>
        
        {/* Pricing highlights */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
            Individual: $9.99 each
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
            Bundles: Save up to $589
          </div>
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
            Wholesale: 40% off bulk orders
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="individual" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Individual Plans
          </TabsTrigger>
          <TabsTrigger value="bundles" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Bundle Collections
          </TabsTrigger>
          <TabsTrigger value="wholesale" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Wholesale
          </TabsTrigger>
          <TabsTrigger value="partner" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Become a Partner
          </TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-8">
          {/* Individual Products */}
          <EnhancedProductGrid 
            products={products}
            onSelectProduct={handleSelectProduct}
          />

          {/* Rewarded Ad Discount */}
          <div className="mb-8">
            <RewardedAdDiscount 
              originalPrice={9.99}
              onDiscountApplied={handleDiscountApplied}
            />
          </div>

          {/* Selected Product Preview */}
          {selectedProduct && (
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-apex-black mb-2">
                  {selectedProduct.name} Insurance Preview
                </h3>
                <div className="flex items-center justify-center gap-4">
                  <div className="bg-apex-red text-white px-3 py-1 rounded-full text-sm">
                    Danger Level: {selectedProduct.danger_level}/5
                  </div>
                  <div className={`text-white px-3 py-1 rounded-full text-sm ${discountApplied ? 'bg-green-600' : 'bg-blue-600'}`}>
                    Price: ${finalPrice.toFixed(2)}
                    {discountApplied && (
                      <span className="ml-1 line-through text-gray-300">
                        ${selectedProduct.base_price}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-6 items-center">
                <div className="flex-1">
                  <div className="text-6xl text-center mb-4">
                    {selectedProduct.icon}
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-apex-black mb-2">
                      {selectedProduct.name} Encounter Coverage
                    </h4>
                    <p className="text-apex-darkgray/70 mb-4">
                      {selectedProduct.description}
                    </p>
                    
                    <Button 
                      onClick={() => setShowRiskCard(true)}
                      className="bg-apex-red hover:bg-apex-red/90 text-white"
                    >
                      Generate Risk Card
                    </Button>
                  </div>
                </div>

                {showRiskCard && (
                  <div className="flex-1">
                    <DynamicRiskCard
                      animal={selectedProduct.name}
                      riskScore={selectedProduct.danger_level * 20} // Convert to percentage
                      quoteCost={`$${finalPrice.toFixed(2)}`}
                      onCardGenerated={(url) => {
                        console.log('Risk card generated:', url);
                      }}
                    />
                  </div>
                )}
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="bundles">
          <div className="space-y-8">
            {/* Bundle Collection Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-apex-black mb-4">
                🎁 Bundle Collections - Maximum Savings!
              </h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Save hundreds with our curated collections! From regional adventures to experience-based packages, 
                find the perfect bundle for your next expedition.
              </p>
            </div>

            <EnhancedBundleGrid 
              bundles={bundleProducts}
              onSelectBundle={(bundle) => {
                console.log('Selected bundle:', bundle);
                // Handle bundle selection
              }}
            />
          </div>
        </TabsContent>

        <TabsContent value="wholesale">
          <WholesalePricing 
            tiers={wholesaleTiers}
            onSelectTier={(tier) => {
              console.log('Selected tier:', tier);
              // Handle tier selection
            }}
          />
        </TabsContent>

        <TabsContent value="partner">
          <PartnerApplicationForm />
        </TabsContent>
      </Tabs>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <Card className="fixed bottom-4 right-4 p-4 shadow-lg bg-white border-2 border-apex-red">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-apex-red" />
            <span className="font-semibold text-apex-black">{cart.length} items in cart</span>
            <Button size="sm" className="bg-apex-red hover:bg-apex-red/90 text-white ml-2">
              Checkout
            </Button>
          </div>
        </Card>
      )}
    </section>
  );
};

export default ProductPreview;
