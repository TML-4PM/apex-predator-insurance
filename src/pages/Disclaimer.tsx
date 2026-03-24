
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { 
  ShieldAlert, 
  AlertCircle, 
  FileText, 
  AlertTriangle, 
  Clock, 
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Disclaimer = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="pt-28 pb-16 bg-gradient-to-b from-[#1A1F2C] to-[#221F26]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-apex-red mb-6 text-white">
              <FileText size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-up">
              Important Disclaimer
            </h1>
            <p className="text-xl text-white/70 mb-8 animate-fade-up animate-delay-100">
              Please read this before purchasing
            </p>
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full inline-flex items-center text-white/80">
                <Clock className="h-5 w-5 mr-2" /> 
                <span>Last Updated: March 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Primary Disclaimer */}
            <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-xl mb-12 overflow-hidden shadow-lg border border-amber-200">
              <div className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <AlertCircle size={24} className="text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-apex-black mt-0 mb-2">This Is NOT Real Insurance</h3>
                    <p className="text-apex-darkgray/80 m-0 text-lg">
                      Apex Predator Insurance certificates are <strong>novelty entertainment products only</strong>. They are designed as fun, shareable gifts and conversation starters about the world's most dangerous animals.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/3 p-3">
                  <div className="bg-white rounded-lg p-4 h-full shadow-sm flex flex-col items-center text-center">
                    <ShieldAlert className="h-10 w-10 text-amber-600 mb-3" />
                    <h4 className="font-bold mb-1">No Coverage</h4>
                    <p className="text-sm text-apex-darkgray/70">No actual insurance, financial protection, or regulated benefit is provided</p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 p-3">
                  <div className="bg-white rounded-lg p-4 h-full shadow-sm flex flex-col items-center text-center">
                    <AlertTriangle className="h-10 w-10 text-amber-600 mb-3" />
                    <h4 className="font-bold mb-1">No Claims</h4>
                    <p className="text-sm text-apex-darkgray/70">No claims can be made against these certificates under any circumstances</p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 p-3">
                  <div className="bg-white rounded-lg p-4 h-full shadow-sm flex flex-col items-center text-center">
                    <ShieldCheck className="h-10 w-10 text-amber-600 mb-3" />
                    <h4 className="font-bold mb-1">Entertainment Only</h4>
                    <p className="text-sm text-apex-darkgray/70">Certificates are novelty items for fun, gifting, and social sharing</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none space-y-12">
              {/* What You're Buying */}
              <div>
                <h2 className="text-3xl font-bold text-apex-black mb-4 flex items-center">
                  <ShieldCheck className="h-6 w-6 text-apex-red mr-2" /> What You're Buying
                </h2>
                <div className="bg-white rounded-lg">
                  <p>
                    When you purchase an Apex Predator Insurance certificate, you receive a beautifully designed, personalised novelty certificate featuring your chosen deadly animal. These certificates are:
                  </p>
                  <ul className="space-y-2 my-4">
                    <li>🎁 Perfect as unique gifts for adventurers and wildlife enthusiasts</li>
                    <li>📸 Designed to be shared on social media</li>
                    <li>🎭 A fun conversation starter about dangerous wildlife</li>
                    <li>🌍 Based on real predator research data from around the world</li>
                  </ul>
                  <p>
                    <strong>They are NOT:</strong> Insurance policies, financial products, or regulated instruments of any kind. They carry no monetary value beyond the purchase price of the novelty item itself.
                  </p>
                </div>
              </div>

              {/* The Fun Part */}
              <div>
                <h2 className="text-3xl font-bold text-apex-black mb-4 flex items-center">
                  <ShieldAlert className="h-6 w-6 text-apex-red mr-2" /> The Fun Part
                </h2>
                <div className="bg-white rounded-lg">
                  <p>
                    Our certificates feature real data about the world's deadliest animals — danger levels, habitats, fun facts, and survival statistics. This information comes from our predator research database of 85+ species.
                  </p>
                  
                  <div className="bg-white shadow-md rounded-lg border border-apex-lightgray p-6 my-6">
                    <h4 className="text-lg font-bold mb-4">Certificate categories include:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center bg-apex-lightgray rounded-lg p-3">
                        <span className="text-2xl mr-3">🦈</span>
                        <span>Marine predators</span>
                      </div>
                      <div className="flex items-center bg-apex-lightgray rounded-lg p-3">
                        <span className="text-2xl mr-3">🐆</span>
                        <span>Big cats</span>
                      </div>
                      <div className="flex items-center bg-apex-lightgray rounded-lg p-3">
                        <span className="text-2xl mr-3">🐊</span>
                        <span>Reptiles</span>
                      </div>
                      <div className="flex items-center bg-apex-lightgray rounded-lg p-3">
                        <span className="text-2xl mr-3">🐻</span>
                        <span>Bears & large mammals</span>
                      </div>
                      <div className="flex items-center bg-apex-lightgray rounded-lg p-3">
                        <span className="text-2xl mr-3">🦅</span>
                        <span>Birds of prey</span>
                      </div>
                      <div className="flex items-center bg-apex-lightgray rounded-lg p-3">
                        <span className="text-2xl mr-3">🦂</span>
                        <span>Venomous insects</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Regulatory Notice */}
              <div>
                <h2 className="text-3xl font-bold text-apex-black mb-4 flex items-center">
                  <AlertTriangle className="h-6 w-6 text-apex-red mr-2" /> Regulatory Notice
                </h2>
                <div className="bg-white rounded-lg">
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                    <p className="font-medium text-apex-black mb-2">
                      Apex Predator Insurance is operated by Tech 4 Humanity Pty Ltd (ABN 61 605 746 618).
                    </p>
                    <p className="text-apex-darkgray/80 mb-2">
                      This product is <strong>not regulated by ASIC, APRA, or any financial regulatory authority</strong>. It is not a financial product, insurance product, or investment product.
                    </p>
                    <p className="text-apex-darkgray/80">
                      If you need actual travel insurance or life insurance, please consult a licensed financial adviser or insurance provider.
                    </p>
                  </div>
                </div>
              </div>

              {/* Refunds */}
              <div>
                <h2 className="text-3xl font-bold text-apex-black mb-4">Refund Policy</h2>
                <div className="bg-[#F1F0FB] p-6 rounded-lg">
                  <p className="mb-0">
                    Given the digital nature of our novelty certificates, we generally do not offer refunds once a purchase is completed. If you have any issues with your purchase, please contact us within 14 days at <a href="mailto:contact@tech4humanity.com.au" className="text-apex-red hover:underline">contact@tech4humanity.com.au</a>.
                  </p>
                </div>
              </div>
              
              {/* CTA */}
              <div className="mt-12 p-8 bg-gradient-to-r from-[#1A1F2C] to-[#221F26] rounded-xl text-white shadow-lg">
                <h3 className="text-2xl font-bold text-white mt-0 mb-6">Ready for Some Fun?</h3>
                <p className="text-white/80 mb-6">
                  Browse our collection of novelty predator certificates — perfect as gifts, conversation starters, or just to show off your knowledge of the world's deadliest animals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/plans')}
                    className="bg-apex-red hover:bg-apex-red/90 text-lg py-6"
                    size="lg"
                  >
                    Browse Certificates
                  </Button>
                  <Button 
                    onClick={() => navigate('/')}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 text-lg py-6"
                    size="lg"
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Disclaimer;
