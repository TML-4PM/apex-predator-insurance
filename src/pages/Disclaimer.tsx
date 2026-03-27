
import React, { useEffect } from 'react';

import { 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Disclaimer = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="pt-28 pb-16 bg-gradient-to-b from-[#1A1F2C] to-[#221F26]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-apex-red mb-6 text-white">
              <FileText size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-up">
              Policy Terms & Conditions
            </h1>
            <p className="text-xl text-white/70 mb-8 animate-fade-up animate-delay-100">
              Wildlife Shield Insurance — Full Policy Details
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
            {/* Policy Overview */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl mb-12 overflow-hidden shadow-lg border border-green-200">
              <div className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <ShieldCheck size={24} className="text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-apex-black mt-0 mb-2">Wildlife Shield Policy Overview</h3>
                    <p className="text-apex-darkgray/80 m-0 text-lg">
                      Apex Predator Insurance provides a <strong>$50,000 accidental death benefit</strong> for encounters with covered predator species. Policies are valid for 12 months from the date of purchase.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/3 p-3">
                  <div className="bg-white rounded-lg p-4 h-full shadow-sm flex flex-col items-center text-center">
                    <ShieldCheck className="h-10 w-10 text-green-600 mb-3" />
                    <h4 className="font-bold mb-1">$50,000 Benefit</h4>
                    <p className="text-sm text-apex-darkgray/70">Accidental death benefit for covered predator encounters</p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 p-3">
                  <div className="bg-white rounded-lg p-4 h-full shadow-sm flex flex-col items-center text-center">
                    <Clock className="h-10 w-10 text-green-600 mb-3" />
                    <h4 className="font-bold mb-1">12-Month Coverage</h4>
                    <p className="text-sm text-apex-darkgray/70">Active from date of purchase with worldwide coverage</p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 p-3">
                  <div className="bg-white rounded-lg p-4 h-full shadow-sm flex flex-col items-center text-center">
                    <CheckCircle className="h-10 w-10 text-green-600 mb-3" />
                    <h4 className="font-bold mb-1">30-Day Cooling Off</h4>
                    <p className="text-sm text-apex-darkgray/70">Full refund available within 30 days if no claim has been made</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none space-y-12">
              {/* Coverage Details */}
              <div>
                <h2 className="text-3xl font-bold text-apex-black mb-4 flex items-center">
                  <ShieldCheck className="h-6 w-6 text-apex-red mr-2" /> Coverage Details
                </h2>
                <div className="bg-white rounded-lg">
                  <p>
                    Your Wildlife Shield policy covers accidental death resulting from a direct encounter with any of our 85+ covered predator species. Coverage includes:
                  </p>
                  <ul className="space-y-2 my-4">
                    <li>✅ $50,000 accidental death benefit payable to your nominated beneficiary</li>
                    <li>✅ Worldwide coverage — no geographic restrictions</li>
                    <li>✅ 85+ predator species across marine, terrestrial, reptile, aerial, and insect categories</li>
                    <li>✅ Individual species policies or full bundle coverage available</li>
                    <li>✅ Digital policy documents delivered instantly via email</li>
                    <li>✅ Personalised coverage certificate included with every policy</li>
                  </ul>
                </div>
              </div>

              {/* Covered Species */}
              <div>
                <h2 className="text-3xl font-bold text-apex-black mb-4 flex items-center">
                  <ShieldCheck className="h-6 w-6 text-apex-red mr-2" /> Covered Species Categories
                </h2>
                <div className="bg-white rounded-lg">
                  <p>
                    Our policies cover encounters with predator species across the following categories:
                  </p>
                  
                  <div className="bg-white shadow-md rounded-lg border border-apex-lightgray p-6 my-6">
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
                  <p>
                    For a full list of covered species, visit our <a href="/gallery" className="text-apex-red hover:underline">Predator Gallery</a>.
                  </p>
                </div>
              </div>

              {/* Exclusions */}
              <div>
                <h2 className="text-3xl font-bold text-apex-black mb-4 flex items-center">
                  <AlertTriangle className="h-6 w-6 text-apex-red mr-2" /> Policy Exclusions
                </h2>
                <div className="bg-white rounded-lg">
                  <p>The following are excluded from coverage under this policy:</p>
                  <ul className="space-y-2 my-4">
                    <li>❌ Death resulting from intentional provocation of a covered predator species</li>
                    <li>❌ Injuries or encounters that do not result in death</li>
                    <li>❌ Encounters with species not listed in the policyholder's selected coverage plan</li>
                    <li>❌ Deaths occurring outside the 12-month policy period</li>
                    <li>❌ Deaths in facilities where the predator was legally captive (zoos, aquariums, sanctuaries) unless the animal escaped containment</li>
                    <li>❌ Self-inflicted harm or suicide</li>
                    <li>❌ Deaths occurring while engaged in illegal activity</li>
                  </ul>
                </div>
              </div>

              {/* Claims Process */}
              <div>
                <h2 className="text-3xl font-bold text-apex-black mb-4 flex items-center">
                  <FileText className="h-6 w-6 text-apex-red mr-2" /> Claims Process
                </h2>
                <div className="bg-white rounded-lg">
                  <p>In the event of a covered incident, the nominated beneficiary should:</p>
                  <ol className="space-y-3 my-4 list-decimal list-inside">
                    <li><strong>Notify us</strong> — Contact <a href="mailto:contact@tech4humanity.com.au" className="text-apex-red hover:underline">contact@tech4humanity.com.au</a> within 90 days of the incident</li>
                    <li><strong>Provide documentation</strong> — Submit a certified death certificate and official incident report confirming the cause of death involved a covered predator species</li>
                    <li><strong>Verification</strong> — Our claims team will verify the incident against the policy terms within 30 business days</li>
                    <li><strong>Payment</strong> — Upon approval, the $50,000 benefit will be paid to the nominated beneficiary via bank transfer within 14 business days</li>
                  </ol>
                </div>
              </div>

              {/* Cooling-Off Period */}
              <div>
                <h2 className="text-3xl font-bold text-apex-black mb-4 flex items-center">
                  <Clock className="h-6 w-6 text-apex-red mr-2" /> Cooling-Off Period & Refunds
                </h2>
                <div className="bg-[#F1F0FB] p-6 rounded-lg">
                  <p className="mb-4">
                    You have a <strong>30-day cooling-off period</strong> from the date of purchase. During this period, you may cancel your policy and receive a full refund, provided no claim has been lodged.
                  </p>
                  <p className="mb-0">
                    To request a cancellation or refund, contact us at <a href="mailto:contact@tech4humanity.com.au" className="text-apex-red hover:underline">contact@tech4humanity.com.au</a> with your policy number and order reference.
                  </p>
                </div>
              </div>

              {/* Regulatory Notice */}
              <div>
                <h2 className="text-3xl font-bold text-apex-black mb-4 flex items-center">
                  <AlertTriangle className="h-6 w-6 text-apex-red mr-2" /> Regulatory & Company Information
                </h2>
                <div className="bg-white rounded-lg">
                  <div className="bg-slate-50 border-l-4 border-apex-red p-4 rounded-r-lg">
                    <p className="font-medium text-apex-black mb-2">
                      Apex Predator Insurance is operated by Tech 4 Humanity Pty Ltd (ABN 61 605 746 618).
                    </p>
                    <p className="text-apex-darkgray/80 mb-2">
                      Registered address: Australia. All policies are issued digitally and governed by Australian consumer law.
                    </p>
                    <p className="text-apex-darkgray/80">
                      For complaints or disputes, contact us at <a href="mailto:contact@tech4humanity.com.au" className="text-apex-red hover:underline">contact@tech4humanity.com.au</a>.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <div className="mt-12 p-8 bg-gradient-to-r from-[#1A1F2C] to-[#221F26] rounded-xl text-white shadow-lg">
                <h3 className="text-2xl font-bold text-white mt-0 mb-6">Get Covered Today</h3>
                <p className="text-white/80 mb-6">
                  Choose from 85+ predator species and get instant coverage with a $50,000 accidental death benefit. Policies start from just $9.99.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/plans')}
                    className="bg-apex-red hover:bg-apex-red/90 text-lg py-6"
                    size="lg"
                  >
                    View Insurance Plans
                  </Button>
                  <Button 
                    onClick={() => navigate('/contact')}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 text-lg py-6"
                    size="lg"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Disclaimer;
