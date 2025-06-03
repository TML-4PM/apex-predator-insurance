
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Users, ShoppingCart, Building2 } from 'lucide-react';
import { EnhancedProductGrid } from './EnhancedProductGrid';
import { EnhancedBundleGrid } from './EnhancedBundleGrid';
import { WholesalePricing } from '../wholesale/WholesalePricing';
import { PartnerApplicationForm } from '../wholesale/PartnerApplicationForm';

interface ProductPreviewTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  products: any[];
  bundleProducts: any[];
  wholesaleTiers: any[];
  onSelectProduct: (product: any) => void;
}

export const ProductPreviewTabs = ({
  activeTab,
  onTabChange,
  products,
  bundleProducts,
  wholesaleTiers,
  onSelectProduct
}: ProductPreviewTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-8">
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
        <EnhancedProductGrid 
          products={products}
          onSelectProduct={onSelectProduct}
        />
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
  );
};
