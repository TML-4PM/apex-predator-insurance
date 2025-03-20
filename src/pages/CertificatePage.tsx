
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Certificate from '@/components/Certificate';
import { Button } from '@/components/ui/button';
import { Share2, Download, Home } from 'lucide-react';

const CertificatePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  useEffect(() => {
    if (!state?.plan || !state?.user) {
      navigate('/plans');
    }
    
    window.scrollTo(0, 0);
  }, [state, navigate]);
  
  if (!state?.plan || !state?.user) {
    return null;
  }
  
  const { plan, user } = state;
  
  const handleDownload = () => {
    // In a real implementation, this would generate a PDF certificate
    alert('Download functionality would save this certificate as a PDF in a real implementation');
  };
  
  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  return (
    <Layout>
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-apex-black mb-4">Your Certificate is Ready!</h1>
              <p className="text-xl text-apex-darkgray/70">
                Congratulations on your Wildlife Shield protection!
              </p>
            </div>
            
            <div className="mb-12">
              <Certificate 
                insuranceType={plan.name}
                name={user.fullName}
              />
            </div>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
              <Button 
                onClick={handleDownload}
                className="bg-apex-red hover:bg-apex-red/90 text-white"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Certificate
              </Button>
              
              <Button 
                onClick={handleShare}
                variant="outline"
                size="lg"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share on Social Media
              </Button>
            </div>
            
            {showShareOptions && (
              <div className="bg-gray-50 rounded-xl p-6 mb-8 animate-fade-in">
                <h3 className="text-lg font-medium mb-4">Share Your Certificate</h3>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" className="bg-[#1877F2] text-white hover:bg-[#1877F2]/90">
                    Facebook
                  </Button>
                  <Button variant="outline" className="bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90">
                    Twitter
                  </Button>
                  <Button variant="outline" className="bg-[#E1306C] text-white hover:bg-[#E1306C]/90">
                    Instagram
                  </Button>
                </div>
              </div>
            )}
            
            <Button 
              onClick={() => navigate('/')}
              variant="ghost"
              className="mt-4"
            >
              <Home className="mr-2 h-5 w-5" />
              Return to Home
            </Button>
            
            <p className="text-sm text-gray-500 mt-8">
              A copy of your certificate has been sent to {user.email}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CertificatePage;
