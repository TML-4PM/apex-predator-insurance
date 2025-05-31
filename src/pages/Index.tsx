
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import InsurancePlans from '@/components/InsurancePlans';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import WorldMap from '@/components/WorldMap';
import MobileApp from '@/components/MobileApp';
import Blog from '@/components/Blog';
import OopsieGallery from '@/components/OopsieGallery';
import { Button } from '@/components/ui/button';
import { Camera, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <MobileApp />
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Testimonials />
      </div>
    </div>
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-apex-black mb-6 animate-fade-up">
            Epic Adventure Oopsies
          </h2>
          <p className="text-xl text-apex-darkgray/70 animate-fade-up animate-delay-100 mb-8">
            See the funniest adventure mishaps and AI prediction fails from our community.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/submit">
              <Button className="bg-apex-red hover:bg-apex-red/90">
                <Camera size={16} className="mr-2" />
                Share Your Oopsie
              </Button>
            </Link>
            <Link to="/oopsies">
              <Button variant="outline" className="border-apex-red text-apex-red hover:bg-apex-red/10">
                <TrendingUp size={16} className="mr-2" />
                View All Oopsies
              </Button>
            </Link>
          </div>
        </div>
        
        <OopsieGallery showFeatured={true} limit={6} />
        
        <div className="mt-12 text-center">
          <Link to="/oopsies">
            <Button variant="outline" className="border-apex-red text-apex-red hover:bg-apex-red/10">
              View All Adventures
            </Button>
          </Link>
        </div>
      </div>
    </section>
    <Blog />
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
