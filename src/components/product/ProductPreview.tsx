
import React, { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { ProductPreviewHeader } from './ProductPreviewHeader';
import { ProductPreviewTabs } from './ProductPreviewTabs';
import { ProductSelection } from './ProductSelection';
import { CartSummary } from './CartSummary';

const ProductPreview = () => {
  const { products, bundleProducts, wholesaleTiers, loading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showRiskCard, setShowRiskCard] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [finalPrice, setFinalPrice] = useState(9.99);
  const [cart, setCart] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('individual');

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
      <ProductPreviewHeader totalProducts={products.length} />

      <ProductPreviewTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        products={products}
        bundleProducts={bundleProducts}
        wholesaleTiers={wholesaleTiers}
        onSelectProduct={handleSelectProduct}
      />

      {activeTab === 'individual' && (
        <ProductSelection
          selectedProduct={selectedProduct}
          discountApplied={discountApplied}
          finalPrice={finalPrice}
          showRiskCard={showRiskCard}
          onShowRiskCard={setShowRiskCard}
          onDiscountApplied={handleDiscountApplied}
        />
      )}

      <CartSummary cart={cart} />
    </section>
  );
};

export default ProductPreview;
