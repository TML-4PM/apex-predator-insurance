
import React from 'react';
import Layout from '@/components/Layout';
import CertificateVerification from '@/components/certificate/CertificateVerification';

export default function CertificateVerify() {
  return (
    <Layout>
      <div className="py-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-apex-black mb-4">
                Certificate Verification
              </h1>
              <p className="text-xl text-apex-darkgray/70">
                Verify the authenticity of any Apex Predator Insurance certificate
              </p>
            </div>
            
            <CertificateVerification />
          </div>
        </div>
      </div>
    </Layout>
  );
}
