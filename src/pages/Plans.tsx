
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
      <div className="pt-28 pb-16 bg-apex-lightgray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-apex-black mb-6 animate-fade-up">
              Choose Your Wildlife Shield
            </h1>
            <p className="text-xl text-apex-darkgray/70 mb-6 animate-fade-up animate-delay-100">
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
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-apex-black mb-6">
              How It Works
            </h2>
            <p className="text-xl text-apex-darkgray/70 mb-12">
              Getting your Wildlife Shield certificate is quick and easy.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-apex-red/10 text-apex-red flex items-center justify-center mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold text-apex-black mb-2">Choose Your Predator</h3>
                <p className="text-apex-darkgray/70">
                  Select from our range of deadly predators or get the complete pack.
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-apex-red/10 text-apex-red flex items-center justify-center mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-apex-black mb-2">Personalize It</h3>
                <p className="text-apex-darkgray/70">
                  Add your name or gift recipient's details to customize the certificate.
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-apex-red/10 text-apex-red flex items-center justify-center mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-apex-black mb-2">Download & Share</h3>
                <p className="text-apex-darkgray/70">
                  Get your digital certificate instantly and share it with friends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Plans;
