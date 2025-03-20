
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
      
      <section className="py-20 bg-[#1A1F2C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-up">
              What You Get With Wildlife Shield
            </h2>
            <p className="text-xl text-white/70 mb-12 animate-fade-up animate-delay-100">
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
      
      <section className="py-20 bg-[#221F26] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1518599807935-37015b9cefcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Shark background"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.3) contrast(1.2)' }}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Don't Be Their Next Meal</h2>
              <p className="text-xl text-white/70">
                Get your Wildlife Shield certificate today. It won't save you, but it'll make everyone laugh!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform hover:scale-105 transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Great White Shark"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-2">Great White Shark</h3>
                <p className="text-white/70">
                  These apex predators can detect a single drop of blood from up to 3 miles away.
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform hover:scale-105 transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1610052178570-97bc8e3a0a7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Saltwater Crocodile"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-2">Saltwater Crocodile</h3>
                <p className="text-white/70">
                  With the strongest bite force of any animal, they can easily crush a human skull.
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform hover:scale-105 transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="African Lion"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-2">African Lion</h3>
                <p className="text-white/70">
                  Lions can leap up to 36 feet and their roar can be heard up to 5 miles away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FAQ />
    </Layout>
  );
};

export default Index;
