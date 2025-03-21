
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import InsurancePlans from '@/components/InsurancePlans';
import { ShoppingCart } from 'lucide-react';

const Plans = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="pt-24 pb-12 bg-apex-lightgray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-apex-black mb-4 animate-fade-up">
              Choose Your Wildlife Shield
            </h1>
            <p className="text-lg text-apex-darkgray/70 mb-4 animate-fade-up animate-delay-100">
              Each plan comes with a personalized certificate to commemorate your adventurous spirit.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-apex-red/10 text-apex-red text-sm animate-fade-up animate-delay-200">
              <ShoppingCart size={16} />
              <span>All plans start at just $9.99</span>
            </div>
          </div>
        </div>
      </div>
      
      <InsurancePlans />
    </Layout>
  );
};

export default Plans;
