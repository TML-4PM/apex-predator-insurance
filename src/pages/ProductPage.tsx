
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ProductHero from '@/components/product/ProductHero';
import ProductPreview from '@/components/product/ProductPreview';
import ProductFeatures from '@/components/product/ProductFeatures';
import ProductProcess from '@/components/product/ProductProcess';
import ProductFAQ from '@/components/product/ProductFAQ';
import PremiumUpsell from '@/components/product/PremiumUpsell';
import SocialShareButtons from '@/components/product/SocialShareButtons';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Heart } from 'lucide-react';

const ProductPage = () => {
  const [selectedPredator, setSelectedPredator] = useState('Lion');

  return (
    <Layout>
      {/* Product Hero */}
      <ProductHero />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Product Preview Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-apex-black mb-8 text-center">
              What It Looks Like
            </h2>
            <ProductPreview selectedPredator={selectedPredator} />
          </section>

          {/* Delivery Options */}
          <section className="mb-16 bg-slate-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-apex-black mb-8 text-center">
              Delivery Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📧</span>
                  </div>
                  <h3 className="text-xl font-bold">Instant Email Delivery</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Download link sent instantly after purchase. Print at home, share on social, or view on any device.
                </p>
                <div className="text-apex-red font-bold text-lg">FREE</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  <h3 className="text-xl font-bold">Premium Print & Post</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Printed on 200 gsm archival matte, shipped in clear sleeve. Delivery within 5–7 business days (metro).
                </p>
                <div className="text-apex-red font-bold text-lg">AU $9.95</div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <ProductFeatures />
          
          {/* How It Works */}
          <ProductProcess />
          
          {/* Premium Upsell */}
          <PremiumUpsell />
          
          {/* FAQ Section */}
          <ProductFAQ />
          
          {/* CTA Section */}
          <section className="text-center py-16 bg-gradient-to-br from-apex-red to-apex-yellow rounded-xl text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Become an Apex Predator?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of adventurers who've claimed their wildlife shield
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button size="lg" className="bg-white text-apex-red hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Get Your Certificate Now
              </Button>
              
              <div className="flex items-center gap-2 text-white/90">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span>4.8/5 from 2,847+ adventurers</span>
              </div>
            </div>
            
            <SocialShareButtons />
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
