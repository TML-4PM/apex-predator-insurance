
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import InsurancePlans from '@/components/InsurancePlans';
import Certificate from '@/components/Certificate';
import FAQ from '@/components/FAQ';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Hero />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-apex-black mb-6 animate-fade-up">
              What You Get With Wildlife Shield
            </h2>
            <p className="text-xl text-apex-darkgray/70 mb-12 animate-fade-up animate-delay-100">
              A beautiful, personalized certificate for the adventure-seeker in your life.
              Perfect for gifts, jokes, and social media laughs.
            </p>
          </div>
          
          <div className="mt-12">
            <Certificate />
          </div>
        </div>
      </section>
      
      <InsurancePlans />
      
      <FAQ />
    </Layout>
  );
};

export default Index;
