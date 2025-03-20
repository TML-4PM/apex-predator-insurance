
import React from 'react';
import Layout from '@/components/Layout';

const Terms = () => {
  return (
    <Layout>
      <div className="py-16 bg-apex-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>
            
            <div className="bg-[#222222] rounded-xl shadow-lg border border-white/10 p-8 space-y-6 text-white/80">
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                <p>By accessing or using Apex Predator Insurance's website and services, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you may not use our services.</p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">2. Service Description</h2>
                <p>Apex Predator Insurance provides novelty insurance certificates with a real $50,000 accidental death benefit. Our certificates are designed for entertainment purposes but include a legitimate insurance policy underwritten by our partners.</p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">3. Eligibility</h2>
                <p>You must be at least 18 years of age to purchase our certificates. By using our services, you represent that you are of legal age and have the capacity to enter into binding contracts.</p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">4. Payment and Pricing</h2>
                <p>All prices are shown in USD and do not include taxes, which may be added at checkout. We reserve the right to change our prices at any time. Payments are processed securely through our payment providers.</p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">5. Insurance Coverage</h2>
                <p>Each certificate includes a $50,000 accidental death benefit. This is a real insurance policy with specific terms, conditions, and exclusions. Please review the policy details provided with your certificate for complete information about coverage.</p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">6. Refunds and Cancellations</h2>
                <p>Given the digital nature of our certificates, we generally do not offer refunds once a purchase is completed. However, if you have issues with your purchase, please contact our customer service team within 14 days of purchase.</p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">7. Intellectual Property</h2>
                <p>All content on our website, including text, graphics, logos, and images, is the property of Apex Predator Insurance and is protected by copyright laws. You may not use, reproduce, or distribute our content without our express permission.</p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">8. Limitation of Liability</h2>
                <p>Apex Predator Insurance shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.</p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">9. Governing Law</h2>
                <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Apex Predator Insurance operates, without regard to its conflict of law provisions.</p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">10. Changes to Terms</h2>
                <p>We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting an update on our website. Your continued use of our services after such modifications constitutes your acceptance of the updated Terms.</p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">11. Contact Information</h2>
                <p>If you have any questions about these Terms, please contact us at:</p>
                <p className="mt-2"><a href="mailto:troy.latter@4pm.net.au" className="text-apex-red hover:underline">troy.latter@4pm.net.au</a></p>
              </section>
              
              <div className="pt-6 border-t border-white/10 text-white/60">
                <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
