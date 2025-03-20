
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { ShieldAlert, AlertCircle, CheckCircle, FileText, Layers, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Disclaimer = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="pt-28 pb-16 bg-apex-lightgray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-apex-red mb-6 text-white">
              <FileText size={28} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-apex-black mb-6 animate-fade-up">
              Product Disclosure Statement
            </h1>
            <p className="text-xl text-apex-darkgray/70 mb-6 animate-fade-up animate-delay-100">
              World's Deadliest Animal (WDA) Attack Policy
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
                <h3 className="text-xl font-bold text-apex-black mt-0 mb-2">About this PDS</h3>
                <p className="text-apex-darkgray/80 m-0">
                  This Product Disclosure Statement (PDS) dated 1 March 2023 provides information about the key benefits, features, exclusions and costs of the WDA Attack policy. Please read this PDS carefully to decide if this policy meets your needs.
                </p>
              </div>
            </div>
            
            <h2>About WDA Insurance</h2>
            <p>
              WDA Insurance Limited is the insurer providing coverage under this policy. We specialize solely in insurance against death from wild animal attacks.
            </p>
            
            <p>
              We are experienced in this niche area, partnering with wildlife experts, government agencies, and communities exposed to WDA risks to provide tailored coverage.
            </p>
            
            <p>
              Our claims, risk assessment and underwriting teams include field biologists, veterinarians, and wildlife managers to ensure thorough evaluation and verification of claims.
            </p>
            
            <h2>Overview of the WDA Policy</h2>
            <p>
              This policy provides a lump sum payment if you suffer accidental death or injury as a direct result of a violent attack by a wild, undomesticated animal.
            </p>
            
            <p>
              The policy covers attacks worldwide by animals such as:
            </p>
            
            <ul>
              <li>Bears inc Koala Bears and Drop Bears</li>
              <li>Cats (lions, tigers, etc)</li>
              <li>Dogs - Dingos</li>
              <li>Crocodiles, Alligators</li>
              <li>Elephants, Rhino, Hippo</li>
              <li>Sharks, fish, whales and rays</li>
              <li>Snakes, Spiders, jellyfish, and other venomous animals</li>
            </ul>
            
            <p>
              Benefits are payable if you die or suffer specified injuries within 90 days of an unprovoked attack.
            </p>
            
            <div className="bg-white border border-apex-black/10 p-6 rounded-xl shadow-sm mb-8">
              <div className="flex items-center gap-4 mb-6">
                <DollarSign size={36} className="text-green-600" />
                <div>
                  <h3 className="text-2xl font-bold text-apex-black m-0">$50,000 Standard Coverage</h3>
                  <p className="text-apex-darkgray m-0">With options up to $2 million based on your profile</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-apex-black font-medium">Accidental Death Benefit</span>
                    <p className="text-sm text-apex-darkgray/80 mt-1">Lump sum payment to your beneficiaries</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-apex-black font-medium">Dismemberment Benefit</span>
                    <p className="text-sm text-apex-darkgray/80 mt-1">Payment for loss of limbs or eyesight</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-apex-black font-medium">Disability Income Benefit</span>
                    <p className="text-sm text-apex-darkgray/80 mt-1">Monthly income if you suffer long-term disability</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-apex-black font-medium">Medical Expenses Benefit</span>
                    <p className="text-sm text-apex-darkgray/80 mt-1">Reimbursement for medical costs</p>
                  </div>
                </div>
              </div>
            </div>

            <h2>Who Can Apply</h2>
            <p>
              This policy is generally available to anyone. In some countries like Myanmar, where Tigers roam streets, you need a special permit which is only available to non-residents with eligible visas.
            </p>
            
            <p>
              <strong>Note:</strong> High risk occupations such as safari guide, photographer, researcher may face restrictions and exclusions.
            </p>
            
            <h2>Your Premiums</h2>
            <p>
              Premiums vary based on:
            </p>
            
            <ul>
              <li>Age and health of the insured</li>
              <li>Occupation and leisure activities</li>
              <li>Geographical risk factors</li>
              <li>Coverage tier selected</li>
              <li>Add-on benefit riders</li>
            </ul>
            
            <p>
              You can buy just for your holiday or maintain the policy for local coverage, nostalgia and updates about the places you visited on your trip.
            </p>
            
            <p>
              Premiums generally increase each year as you age and you can pay annually, half-yearly or quarterly.
            </p>
            
            <h2>Cooling Off Period</h2>
            <p>
              You have 30 days from commencement to cancel your policy for a full refund of any premiums paid. This allows you to review the full policy terms to ensure suitability.
            </p>
            
            <h2>Exclusions</h2>
            <p>
              No benefits are payable if injury or death occurs:
            </p>
            
            <ul>
              <li>While provoking or intentionally interacting with wild animals.</li>
              <li>In captivity i.e. zoos, animal sanctuaries.</li>
              <li>Outside the covered geographical regions.</li>
              <li>While engaging in restricted leisure activities.</li>
              <li>From disease transmission e.g. rabies, malaria.</li>
            </ul>
            
            <div className="bg-apex-black/5 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-bold text-apex-black mb-4">Geographic Limits</h3>
              <p className="text-apex-darkgray/80 mb-4">
                This policy only provides coverage for accidental death caused by wild animals native to the Insured's location at the time of the incident.
              </p>
              <p className="text-apex-darkgray/80">
                For example, coverage applies if you are killed by a bear while hiking in North America. But no coverage would be provided if you are fatally attacked by a lion on the same hiking trip, since lions are not native to North America.
              </p>
              <p className="text-apex-darkgray/80 mt-4 font-medium">
                Note: Coverage can be purchased for all animals for all locations.
              </p>
            </div>
            
            <h2>Claims Process</h2>
            <p>
              Contact us on 1800 IM DEAD (1800 463 323) to initiate a claim. We will require documents confirming identity, death certificates specifying cause, medical and witness reports.
            </p>
            
            <p>
              Claims should be reported as soon as possible. Late notification can impact benefit assessment unless reasonable cause for delay can be established.
            </p>
            
            <h2>Cancelling your Policy</h2>
            <p>
              You can cancel at any time after the cooling-off period by calling 1800 IM GONE (1800 274 663). Refunds are not payable. We may cancel only if premiums are overdue on notice to you.
            </p>
            
            <h2>Dispute Resolution</h2>
            <p>
              We have an internal dispute resolution process if you wish to make a complaint. Please call 1800 GO AWAY (1800 464 929) to access this process.
            </p>
            
            <p>
              If we do not resolve your complaint to your satisfaction, you may have the matter reviewed externally by the Australian Financial Complaints Authority.
            </p>
            
            <div className="mt-12 p-6 bg-apex-black rounded-xl text-white">
              <h3 className="text-xl font-bold text-white mt-0 mb-4">Questions?</h3>
              <p className="text-white/80 mb-2">
                Please read this PDS carefully and call 1800 HELP ME (1800 435 763) if you have any questions. Our wildlife experts are happy to explain the policy and assess if it provides suitable protection for your situation.
              </p>
              <div className="mt-6">
                <Button 
                  onClick={() => navigate('/plans')}
                  className="bg-apex-red hover:bg-apex-red/90"
                >
                  View Insurance Plans
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Disclaimer;
