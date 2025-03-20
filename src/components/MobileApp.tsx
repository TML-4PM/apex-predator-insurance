
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Smartphone, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

const MobileApp = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-apex-lightgray to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-apex-red/10 text-apex-red text-sm mb-6">
                <Smartphone size={16} />
                <span>Wildlife Shield Mobile</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-apex-black mb-6">
                Take Your Adventure Protection on the Go
              </h2>
              <p className="text-xl text-apex-darkgray/70 mb-8">
                Our mobile app lets you access your predator certificates and policy details anytime, anywhere. Even when you're being chased by a bear (not that it will help).
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <Check className="h-5 w-5 text-apex-red" />
                  </div>
                  <p className="text-apex-darkgray">Access your policy information even in remote locations (internet required, obviously)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <Check className="h-5 w-5 text-apex-red" />
                  </div>
                  <p className="text-apex-darkgray">Share your certificates directly to social media</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <Check className="h-5 w-5 text-apex-red" />
                  </div>
                  <p className="text-apex-darkgray">Access our interactive danger map to find predator hotspots</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <Check className="h-5 w-5 text-apex-red" />
                  </div>
                  <p className="text-apex-darkgray">Emergency button that does absolutely nothing</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-apex-red/10 border border-apex-red/20 px-6 py-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-apex-red" />
                    <h3 className="text-lg font-medium text-apex-red">Coming Soon</h3>
                  </div>
                  <p className="text-apex-darkgray text-sm">
                    Our iOS and Android apps are currently in development. Stay tuned for their release!
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 perspective relative">
            <div className="relative mx-auto w-72 h-[500px] rotate-y-[-10deg] transform3d shadow-2xl rounded-[40px] border-8 border-apex-black/90 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560953814-2cee1d7cdc6c?q=80&w=387&auto=format&fit=crop" 
                alt="Wildlife Shield App"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-apex-black/80 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-apex-red/20 backdrop-blur-md p-2 rounded-full">
                      <ShieldCheck className="h-8 w-8 text-apex-red" />
                    </div>
                    <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium">Premium</div>
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-2">Shark Certificate</h3>
                  <p className="text-white/80 text-sm mb-4">Your certificate is ready to share</p>
                  <button className="w-full bg-white/20 backdrop-blur-md text-white py-3 rounded-full flex items-center justify-center">
                    View Certificate <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-apex-black/90 rounded-b-xl"></div>
            </div>
            
            <div className="absolute top-1/2 -right-8 transform rotate-y-[-10deg] transform3d -translate-y-3/4 w-72 h-[500px] shadow-2xl rounded-[40px] border-8 border-apex-black/90 overflow-hidden opacity-30">
              <div className="absolute inset-0 bg-apex-black/20"></div>
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-apex-red text-white px-4 py-2 rounded-full shadow-lg">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span className="font-medium text-sm">Coming Soon for iOS & Android</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;
