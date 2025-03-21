
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { 
  ShieldAlert, 
  AlertCircle, 
  CheckCircle, 
  FileText, 
  DollarSign, 
  Skull, 
  AlertTriangle, 
  Clock, 
  Phone, 
  User, 
  Globe, 
  ShieldX, 
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
              Product Disclosure Statement
            </h1>
            <p className="text-xl text-white/70 mb-8 animate-fade-up animate-delay-100">
              World's Deadliest Animal (WDA) Attack Policy
            </p>
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full inline-flex items-center text-white/80">
                <Clock className="h-5 w-5 mr-2" /> 
                <span>Last Updated: March 1, 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-apex-red/20 to-apex-red/5 rounded-xl mb-12 overflow-hidden shadow-lg">
              <div className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <AlertCircle size={24} className="text-apex-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-apex-black mt-0 mb-2">About this PDS</h3>
                    <p className="text-apex-darkgray/80 m-0">
                      This Product Disclosure Statement (PDS) dated 1 March 2023 provides information about the key benefits, features, exclusions and costs of the WDA Attack policy. Please read this PDS carefully to decide if this policy meets your needs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/3 p-3">
                  <div className="bg-white rounded-lg p-4 h-full shadow-sm flex flex-col items-center text-center">
                    <ShieldCheck className="h-10 w-10 text-apex-red mb-3" />
                    <h4 className="font-bold mb-1">Protection</h4>
                    <p className="text-sm text-apex-darkgray/70">Coverage for death by wild animal attack</p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 p-3">
                  <div className="bg-white rounded-lg p-4 h-full shadow-sm flex flex-col items-center text-center">
                    <DollarSign className="h-10 w-10 text-apex-red mb-3" />
                    <h4 className="font-bold mb-1">Compensation</h4>
                    <p className="text-sm text-apex-darkgray/70">$50,000 standard payout to beneficiaries</p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 p-3">
                  <div className="bg-white rounded-lg p-4 h-full shadow-sm flex flex-col items-center text-center">
                    <Globe className="h-10 w-10 text-apex-red mb-3" />
                    <h4 className="font-bold mb-1">Global Coverage</h4>
                    <p className="text-sm text-apex-darkgray/70">Valid for incidents worldwide</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <div className="flex items-start gap-6 mb-12">
                <div className="bg-[#1A1F2C] rounded-full p-4 hidden md:flex items-center justify-center h-16 w-16 flex-shrink-0">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-apex-black mb-4 flex items-center">
                    <User className="h-6 w-6 text-apex-red mr-2 md:hidden" /> About WDA Insurance
                  </h2>
                  <div className="bg-white rounded-lg">
                    <p>
                      WDA Insurance Limited is the insurer providing coverage under this policy. We specialize solely in insurance against death from wild animal attacks.
                    </p>
                    
                    <p>
                      We are experienced in this niche area, partnering with wildlife experts, government agencies, and communities exposed to WDA risks to provide tailored coverage.
                    </p>
                    
                    <div className="flex md:items-center flex-col md:flex-row bg-apex-lightgray p-4 rounded-lg my-6">
                      <img 
                        src="https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                        alt="Wildlife expert" 
                        className="rounded-lg w-full md:w-48 h-32 object-cover mb-4 md:mb-0 md:mr-4"
                      />
                      <p className="text-sm italic m-0">
                        "Our claims, risk assessment and underwriting teams include field biologists, veterinarians, and wildlife managers to ensure thorough evaluation and verification of claims."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-6 mb-12">
                <div className="bg-[#1A1F2C] rounded-full p-4 hidden md:flex items-center justify-center h-16 w-16 flex-shrink-0">
                  <ShieldAlert className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-apex-black mb-4 flex items-center">
                    <ShieldAlert className="h-6 w-6 text-apex-red mr-2 md:hidden" /> Overview of the WDA Policy
                  </h2>
                  <div className="bg-white rounded-lg">
                    <p>
                      This policy provides a lump sum payment if you suffer accidental death or injury as a direct result of a violent attack by a wild, undomesticated animal.
                    </p>
                    
                    <div className="bg-white shadow-md rounded-lg border border-apex-lightgray p-6 my-6">
                      <h4 className="text-lg font-bold mb-4">The policy covers attacks worldwide by animals such as:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex items-center bg-apex-lightgray rounded-lg p-3">
                          <span className="text-2xl mr-3">🐻</span>
                          <span>Bears (inc Koala & Drop Bears)</span>
                        </div>
                        <div className="flex items-center bg-apex-lightgray rounded-lg p-3">
                          <span className="text-2xl mr-3">🐆</span>
                          <span>Cats (lions, tigers, etc)</span>
                        </div>
                        <div className="flex items-center bg-apex-lightgray rounded-lg p-3">
                          <span className="text-2xl mr-3">🐕</span>
                          <span>Dogs - Dingos</span>
                        </div>
                        <div className="flex items-center bg-apex-lightgray rounded-lg p-3">
                          <span className="text-2xl mr-3">🐊</span>
                          <span>Crocodiles, Alligators</span>
                        </div>
                        <div className="flex items-center bg-apex-lightgray rounded-lg p-3">
                          <span className="text-2xl mr-3">🐘</span>
                          <span>Elephants, Rhino, Hippo</span>
                        </div>
                        <div className="flex items-center bg-apex-lightgray rounded-lg p-3">
                          <span className="text-2xl mr-3">🦈</span>
                          <span>Sharks, fish, whales, rays</span>
                        </div>
                        <div className="flex items-center bg-apex-lightgray rounded-lg p-3">
                          <span className="text-2xl mr-3">🐍</span>
                          <span>Snakes, Spiders, jellyfish</span>
                        </div>
                      </div>
                    </div>
                    
                    <p>
                      Benefits are payable if you die or suffer specified injuries within 90 days of an unprovoked attack.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-apex-lightgray p-8 rounded-xl shadow-sm mb-12">
                <div className="flex items-center gap-4 mb-8">
                  <DollarSign size={48} className="text-green-600" />
                  <div>
                    <h3 className="text-3xl font-bold text-apex-black m-0">$50,000 Standard Coverage</h3>
                    <p className="text-apex-darkgray m-0">With options up to $2 million based on your profile</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-white to-apex-lightgray/20 rounded-lg p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <span className="text-lg text-apex-black font-medium">Accidental Death Benefit</span>
                        <p className="text-apex-darkgray/80 mt-2">Lump sum payment to your beneficiaries if you die as a result of an animal attack</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-white to-apex-lightgray/20 rounded-lg p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <span className="text-lg text-apex-black font-medium">Dismemberment Benefit</span>
                        <p className="text-apex-darkgray/80 mt-2">Payment for loss of limbs or eyesight due to an animal attack</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-white to-apex-lightgray/20 rounded-lg p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <span className="text-lg text-apex-black font-medium">Disability Income Benefit</span>
                        <p className="text-apex-darkgray/80 mt-2">Monthly income if you suffer long-term disability from an animal attack</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-white to-apex-lightgray/20 rounded-lg p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <span className="text-lg text-apex-black font-medium">Medical Expenses Benefit</span>
                        <p className="text-apex-darkgray/80 mt-2">Reimbursement for medical costs related to an animal attack</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6 mb-12">
                <div className="bg-[#1A1F2C] rounded-full p-4 hidden md:flex items-center justify-center h-16 w-16 flex-shrink-0">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-apex-black mb-4 flex items-center">
                    <User className="h-6 w-6 text-apex-red mr-2 md:hidden" /> Who Can Apply
                  </h2>
                  <div className="bg-white rounded-lg">
                    <p>
                      This policy is generally available to anyone. In some countries like Myanmar, where Tigers roam streets, you need a special permit which is only available to non-residents with eligible visas.
                    </p>
                    
                    <div className="flex items-center justify-center my-6">
                      <img 
                        src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                        alt="Wildlife in natural habitat" 
                        className="rounded-lg w-full max-w-md h-60 object-cover"
                      />
                    </div>
                    
                    <div className="bg-apex-red/10 border-l-4 border-apex-red p-4 rounded-r-lg">
                      <p className="font-medium text-apex-black mb-0">
                        <strong>Note:</strong> High risk occupations such as safari guide, photographer, researcher may face restrictions and exclusions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-6 mb-12">
                <div className="bg-[#1A1F2C] rounded-full p-4 hidden md:flex items-center justify-center h-16 w-16 flex-shrink-0">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-apex-black mb-4 flex items-center">
                    <DollarSign className="h-6 w-6 text-apex-red mr-2 md:hidden" /> Your Premiums
                  </h2>
                  <div className="bg-white rounded-lg">
                    <p>
                      Premiums vary based on:
                    </p>
                    
                    <div className="bg-white shadow-md rounded-lg border border-apex-lightgray p-6 my-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1 mr-3" />
                          <span>Age and health of the insured</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1 mr-3" />
                          <span>Occupation and leisure activities</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1 mr-3" />
                          <span>Geographical risk factors</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1 mr-3" />
                          <span>Coverage tier selected</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1 mr-3" />
                          <span>Add-on benefit riders</span>
                        </div>
                      </div>
                    </div>
                    
                    <p>
                      You can buy just for your holiday or maintain the policy for local coverage, nostalgia and updates about the places you visited on your trip.
                    </p>
                    
                    <p>
                      Premiums generally increase each year as you age and you can pay annually, half-yearly or quarterly.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-6 mb-12">
                <div className="bg-[#1A1F2C] rounded-full p-4 hidden md:flex items-center justify-center h-16 w-16 flex-shrink-0">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-apex-black mb-4 flex items-center">
                    <Clock className="h-6 w-6 text-apex-red mr-2 md:hidden" /> Cooling Off Period
                  </h2>
                  <div className="bg-white rounded-lg">
                    <div className="bg-[#F1F0FB] p-6 rounded-lg">
                      <p className="mb-0">
                        You have 30 days from commencement to cancel your policy for a full refund of any premiums paid. This allows you to review the full policy terms to ensure suitability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-6 mb-12">
                <div className="bg-[#1A1F2C] rounded-full p-4 hidden md:flex items-center justify-center h-16 w-16 flex-shrink-0">
                  <ShieldX className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-apex-black mb-4 flex items-center">
                    <ShieldX className="h-6 w-6 text-apex-red mr-2 md:hidden" /> Exclusions
                  </h2>
                  <div className="bg-white rounded-lg">
                    <p>
                      No benefits are payable if injury or death occurs:
                    </p>
                    
                    <div className="bg-white shadow-md rounded-lg border border-apex-lightgray p-6 my-6">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <AlertTriangle size={20} className="text-apex-red flex-shrink-0 mt-1 mr-3" />
                          <span>While provoking or intentionally interacting with wild animals.</span>
                        </div>
                        <div className="flex items-start">
                          <AlertTriangle size={20} className="text-apex-red flex-shrink-0 mt-1 mr-3" />
                          <span>In captivity i.e. zoos, animal sanctuaries.</span>
                        </div>
                        <div className="flex items-start">
                          <AlertTriangle size={20} className="text-apex-red flex-shrink-0 mt-1 mr-3" />
                          <span>Outside the covered geographical regions.</span>
                        </div>
                        <div className="flex items-start">
                          <AlertTriangle size={20} className="text-apex-red flex-shrink-0 mt-1 mr-3" />
                          <span>While engaging in restricted leisure activities.</span>
                        </div>
                        <div className="flex items-start">
                          <AlertTriangle size={20} className="text-apex-red flex-shrink-0 mt-1 mr-3" />
                          <span>From disease transmission e.g. rabies, malaria.</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#F1F0FB] p-6 rounded-xl mb-8">
                      <h3 className="text-xl font-bold text-apex-black mb-4">Geographic Limits</h3>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <img 
                            src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                            alt="Wildlife in natural habitat" 
                            className="rounded-lg w-full h-48 object-cover"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <p className="text-apex-darkgray/80 mb-4">
                            This policy only provides coverage for accidental death caused by wild animals native to the Insured's location at the time of the incident.
                          </p>
                          <p className="text-apex-darkgray/80">
                            For example, coverage applies if you are killed by a bear while hiking in North America. But no coverage would be provided if you are fatally attacked by a lion on the same hiking trip, since lions are not native to North America.
                          </p>
                          <p className="text-apex-darkgray/80 mt-4 font-medium text-apex-red">
                            Note: Coverage can be purchased for all animals for all locations with our Premium Bundle.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-6 mb-12">
                <div className="bg-[#1A1F2C] rounded-full p-4 hidden md:flex items-center justify-center h-16 w-16 flex-shrink-0">
                  <Skull className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-apex-black mb-4 flex items-center">
                    <Skull className="h-6 w-6 text-apex-red mr-2 md:hidden" /> Claims Process
                  </h2>
                  <div className="bg-white rounded-lg">
                    <div className="flex flex-col md:flex-row gap-6 items-center bg-[#F1F0FB] p-6 rounded-lg mb-4">
                      <div className="md:w-1/4 flex justify-center">
                        <Phone size={64} className="text-apex-red" />
                      </div>
                      <div className="md:w-3/4">
                        <p className="font-medium text-apex-black">
                          Contact us on <span className="text-apex-red font-bold">1800 IM DEAD (1800 463 323)</span> to initiate a claim. We will require documents confirming identity, death certificates specifying cause, medical and witness reports.
                        </p>
                      </div>
                    </div>
                    
                    <p>
                      Claims should be reported as soon as possible. Late notification can impact benefit assessment unless reasonable cause for delay can be established.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 p-8 bg-gradient-to-r from-[#1A1F2C] to-[#221F26] rounded-xl text-white shadow-lg">
                <h3 className="text-2xl font-bold text-white mt-0 mb-6">Questions?</h3>
                <p className="text-white/80 mb-6">
                  Please read this PDS carefully and call <span className="text-apex-red font-bold">1800 HELP ME (1800 435 763)</span> if you have any questions. Our wildlife experts are happy to explain the policy and assess if it provides suitable protection for your situation.
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
