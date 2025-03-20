
import React from 'react';
import Layout from '@/components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="py-16 bg-apex-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
            
            <div className="bg-[#222222] rounded-xl shadow-lg border border-white/10 p-8 space-y-6 text-white/80">
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
                <p>Apex Predator Insurance ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or purchase our products.</p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>
                <p>We collect information that you provide directly to us, such as when you create an account, purchase a certificate, or contact us. This may include:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Contact information (name, email address)</li>
                  <li>Payment information (processed securely through our payment processor)</li>
                  <li>Information about your interaction with our website</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                <p>We use your information to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Process your transactions and send you certificates</li>
                  <li>Communicate with you about your purchase</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">4. Information Sharing</h2>
                <p>We do not sell your personal information. We may share your information with:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Service providers who help us operate our business</li>
                  <li>Legal authorities when required by law</li>
                  <li>Insurance underwriters for policy fulfillment</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">5. Data Security</h2>
                <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.</p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">6. Your Rights</h2>
                <p>Depending on your location, you may have rights regarding your personal information, such as the right to access, correct, or delete your data. To exercise these rights, please contact us at the email address provided below.</p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">7. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.</p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">8. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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

export default PrivacyPolicy;
