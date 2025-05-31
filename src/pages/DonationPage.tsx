
import React from 'react';
import Layout from '@/components/Layout';
import DonationForm from '@/components/DonationForm';
import DonationTiers from '@/components/DonationTiers';
import DonorRecognition from '@/components/DonorRecognition';
import { Heart, Shield, Users, Target } from 'lucide-react';

const DonationPage = () => {
  return (
    <Layout>
      <div className="pt-28 pb-16 bg-gradient-to-b from-apex-lightgray to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-apex-black mb-6 animate-fade-up">
                Support Apex Predator Insurance
              </h1>
              <p className="text-xl text-apex-darkgray/70 mb-8 animate-fade-up animate-delay-100">
                Help us protect adventurers worldwide with innovative insurance solutions
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="text-center animate-fade-up animate-delay-200">
                  <div className="bg-apex-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Shield className="text-apex-red" size={24} />
                  </div>
                  <h3 className="font-semibold text-apex-black mb-2">Protection</h3>
                  <p className="text-sm text-apex-darkgray/70">Real coverage for real adventures</p>
                </div>
                
                <div className="text-center animate-fade-up animate-delay-300">
                  <div className="bg-apex-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Users className="text-apex-red" size={24} />
                  </div>
                  <h3 className="font-semibold text-apex-black mb-2">Community</h3>
                  <p className="text-sm text-apex-darkgray/70">Supporting adventurers globally</p>
                </div>
                
                <div className="text-center animate-fade-up animate-delay-400">
                  <div className="bg-apex-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Target className="text-apex-red" size={24} />
                  </div>
                  <h3 className="font-semibold text-apex-black mb-2">Innovation</h3>
                  <p className="text-sm text-apex-darkgray/70">Cutting-edge insurance technology</p>
                </div>
                
                <div className="text-center animate-fade-up animate-delay-500">
                  <div className="bg-apex-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Heart className="text-apex-red" size={24} />
                  </div>
                  <h3 className="font-semibold text-apex-black mb-2">Impact</h3>
                  <p className="text-sm text-apex-darkgray/70">Making adventures safer for everyone</p>
                </div>
              </div>
            </div>

            {/* Donation Tiers */}
            <div className="mb-12">
              <DonationTiers />
            </div>

            {/* Donation Form */}
            <div className="mb-12">
              <DonationForm />
            </div>

            {/* Donor Recognition */}
            <DonorRecognition />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonationPage;
