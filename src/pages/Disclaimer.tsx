
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { ShieldAlert, AlertCircle, CheckCircle } from 'lucide-react';

const Disclaimer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="pt-28 pb-16 bg-apex-lightgray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-apex-red mb-6 text-white">
              <ShieldAlert size={28} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-apex-black mb-6 animate-fade-up">
              Legal Disclaimer
            </h1>
            <p className="text-xl text-apex-darkgray/70 mb-6 animate-fade-up animate-delay-100">
              Important information about our not-actually-insurance products.
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <div className="p-6 bg-apex-red/10 rounded-xl mb-8 flex items-start gap-4">
              <AlertCircle size={24} className="text-apex-red flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-apex-black mt-0 mb-2">This Is Not Real Insurance</h3>
                <p className="text-apex-darkgray/80 m-0">
                  Apex Predator Insurance - Wildlife Shield is a novelty gift product only. It does not provide any form of insurance, coverage, or protection. In the event of any incident, injury, or death, there will be no payout or compensation of any kind.
                </p>
              </div>
            </div>
            
            <h2>What We Actually Provide</h2>
            <p>
              When you purchase an Apex Predator Insurance product, you are buying a personalized, digital certificate that is designed for entertainment purposes only. The certificate is meant as a humorous souvenir or gift item for adventure enthusiasts.
            </p>
            
            <h2>Wildlife Safety</h2>
            <p>
              We do not encourage dangerous encounters with wildlife. All interactions with potentially dangerous animals should be conducted under professional guidance, with appropriate safety measures, and in accordance with local regulations and ethical standards for wildlife viewing.
            </p>
            
            <h2>Terms of Purchase</h2>
            <ul>
              <li>By purchasing our products, you acknowledge and agree that they are novelty items only.</li>
              <li>All sales are final due to the digital nature of our products.</li>
              <li>The personalized certificate you receive is for personal use only.</li>
              <li>You may not represent our products as actual insurance to others.</li>
              <li>We reserve the right to refuse service to anyone misrepresenting our products.</li>
            </ul>
            
            <h2>Privacy Policy</h2>
            <p>
              We collect minimal personal information (name and email) solely for the purpose of creating your personalized certificate and delivering it to you. We do not sell or share your information with third parties.
            </p>
            
            <h2>Just to be Absolutely Clear</h2>
            <div className="not-prose">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle size={24} className="text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-apex-black font-medium">This is a fun novelty item</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle size={24} className="text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-apex-black font-medium">Your purchase gets you a digital certificate</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle size={24} className="text-apex-red flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-apex-black font-medium">This is NOT actual insurance</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <AlertCircle size={24} className="text-apex-red flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-apex-black font-medium">There is NO payout for any incidents</span>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-apex-black rounded-xl text-white">
              <h3 className="text-xl font-bold text-white mt-0 mb-4">Contact Information</h3>
              <p className="text-white/80 mb-2">
                If you have any questions about this disclaimer or our products, please contact us at:
              </p>
              <a href="mailto:info@apexpredatorinsurance.com" className="text-apex-red hover:underline">
                info@apexpredatorinsurance.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Disclaimer;
