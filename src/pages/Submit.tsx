
import React from 'react';
import Layout from '@/components/Layout';
import OopsieSubmissionForm from '@/components/OopsieSubmissionForm';
import { Camera, TrendingUp, Youtube, Award } from 'lucide-react';

const Submit = () => {
  return (
    <Layout>
      <div className="pt-28 pb-16 bg-gradient-to-b from-apex-lightgray to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-apex-black mb-6 animate-fade-up">
              Share Your Epic Oopsie
            </h1>
            <p className="text-xl text-apex-darkgray/70 mb-8 animate-fade-up animate-delay-100">
              Turn your adventure mishaps into viral content! The best submissions get featured on our YouTube channel.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center animate-fade-up animate-delay-200">
                <div className="bg-apex-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Camera className="text-apex-red" size={24} />
                </div>
                <h3 className="font-semibold text-apex-black mb-2">Submit</h3>
                <p className="text-sm text-apex-darkgray/70">Share your oopsie with photos or videos</p>
              </div>
              
              <div className="text-center animate-fade-up animate-delay-300">
                <div className="bg-apex-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="text-apex-red" size={24} />
                </div>
                <h3 className="font-semibold text-apex-black mb-2">Go Viral</h3>
                <p className="text-sm text-apex-darkgray/70">Community votes determine viral potential</p>
              </div>
              
              <div className="text-center animate-fade-up animate-delay-400">
                <div className="bg-apex-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Youtube className="text-apex-red" size={24} />
                </div>
                <h3 className="font-semibold text-apex-black mb-2">YouTube Fame</h3>
                <p className="text-sm text-apex-darkgray/70">Best oopsies featured on our channel</p>
              </div>
              
              <div className="text-center animate-fade-up animate-delay-500">
                <div className="bg-apex-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Award className="text-apex-red" size={24} />
                </div>
                <h3 className="font-semibold text-apex-black mb-2">Get Rewarded</h3>
                <p className="text-sm text-apex-darkgray/70">Earn certificates and community recognition</p>
              </div>
            </div>
          </div>
          
          <OopsieSubmissionForm />
        </div>
      </div>
    </Layout>
  );
};

export default Submit;
