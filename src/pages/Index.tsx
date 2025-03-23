
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import InsurancePlans from '@/components/InsurancePlans';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import WorldMap from '@/components/WorldMap';
import SendSampleCertificates from '@/components/SendSampleCertificates';
import MobileApp from '@/components/MobileApp';

const Index = () => (
  <Layout>
    <Hero />
    <div className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <InsurancePlans />
      </div>
    </div>
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-apex-black text-center mb-12">
          Explore Predator Danger Zones
        </h2>
        <WorldMap />
      </div>
    </div>
    <div className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="text-3xl font-bold text-apex-black text-center mb-12">
          Sample Our Certificates
        </h2>
        <SendSampleCertificates />
      </div>
    </div>
    <MobileApp />
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Testimonials />
      </div>
    </div>
    <div className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <FAQ />
      </div>
    </div>
    <div className="py-16 bg-apex-red/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <ContactForm />
      </div>
    </div>
  </Layout>
);

export default Index;
