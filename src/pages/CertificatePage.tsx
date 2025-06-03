
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Certificate from '@/components/Certificate';
import SocialSharingPanel from '@/components/certificate/SocialSharingPanel';
import { Button } from '@/components/ui/button';
import { 
  Share2, 
  Download, 
  Home, 
  Check, 
  Info,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { toPng } from 'html-to-image';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const CertificatePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [sendingSpecificSample, setSendingSpecificSample] = useState(false);
  const [certificateId, setCertificateId] = useState<string>('');
  const certificateRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!state?.plan || !state?.user) {
      console.error('Missing required state data for certificate page');
      toast({
        title: "Error",
        description: "Certificate information is missing. Please complete checkout first.",
        variant: "destructive"
      });
      navigate('/checkout', { replace: true });
    } else {
      // Show success toast when certificate page loads successfully
      toast({
        title: "Purchase Complete!",
        description: "Your certificate has been generated successfully. You can download it below.",
      });
      
      // Send sample to troy.latter@gmail.com automatically
      sendSampleToSpecificEmail();
      
      // Save certificate to database if user is logged in
      if (user) {
        saveCertificateToDatabase();
      }
    }
    
    window.scrollTo(0, 0);
  }, [state, navigate, toast, user]);
  
  const saveCertificateToDatabase = async () => {
    if (!user || !state?.plan || !state?.user) return;
    
    try {
      const certificateData = {
        insuranceType: getCertificateName(),
        name: state.user.fullName,
        country: state.plan.location || "Worldwide",
        uniqueId: generateUniqueId(),
        multipleItems: state.cartItems && state.cartItems.length > 1 ? state.cartItems : undefined
      };

      const { data, error } = await supabase
        .from('user_certificates')
        .insert({
          user_id: user.id,
          certificate_name: getCertificateName(),
          certificate_type: state.plan.category || 'insurance',
          certificate_data: certificateData
        })
        .select()
        .single();

      if (error) throw error;
      
      if (data) {
        setCertificateId(data.id);
      }
    } catch (error) {
      console.error('Error saving certificate:', error);
      // Don't show error to user as this is a background operation
    }
  };
  
  // Function to send a sample to a specific email
  const sendSampleToSpecificEmail = async () => {
    const email = "troy.latter@gmail.com"; // Hardcoded email as per requirement
    
    try {
      setSendingSpecificSample(true);
      
      const response = await fetch('https://vwqnfnpnuatrfizrttrb.supabase.co/functions/v1/webhook-handler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'send_samples',
          email: email
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send samples');
      }
      
      console.log(`Samples sent to ${email}`);
    } catch (error) {
      console.error('Error sending samples:', error);
    } finally {
      setSendingSpecificSample(false);
    }
  };
  
  if (!state?.plan || !state?.user) {
    return null;
  }
  
  const { plan, user: purchaseUser, cartItems } = state;
  
  // Generate a certificate name based on cart items or plan
  const getCertificateName = () => {
    if (cartItems && cartItems.length > 1) {
      return "Multiple Predator Insurance";
    } else {
      return plan.name;
    }
  };
  
  const handleDownload = async () => {
    if (certificateRef.current) {
      try {
        const dataUrl = await toPng(certificateRef.current, { quality: 0.95 });
        
        // Create a link element
        const link = document.createElement('a');
        link.download = `${purchaseUser.fullName.replace(/\s+/g, '-')}-${getCertificateName().replace(/\s+/g, '-')}-certificate.png`;
        link.href = dataUrl;
        link.click();
        
        toast({
          title: "Certificate Downloaded",
          description: "Your insurance certificate has been saved to your device!",
        });
      } catch (error) {
        console.error("Error generating certificate image:", error);
        toast({
          title: "Download Failed",
          description: "There was an error downloading your certificate. Please try again.",
          variant: "destructive"
        });
      }
    }
  };
  
  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  // Generate a unique certificate ID based on name and plan
  const generateUniqueId = () => {
    const nameHash = purchaseUser.fullName.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const planHash = getCertificateName().split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return `APX-${nameHash * planHash % 10000}-${Date.now().toString().slice(-4)}`;
  };
  
  return (
    <Layout>
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-apex-black mb-4">
                <CheckCircle className="inline-block text-green-500 mr-2" size={28} />
                Your Certificate is Ready!
              </h1>
              <p className="text-xl text-apex-darkgray/70">
                Congratulations on your Wildlife Shield protection! <br />
                <span className="text-apex-red font-semibold">$50,000 accidental death benefit</span>
              </p>
              
              <Alert className="mt-6 mb-4 bg-green-50 border-green-200">
                <Info className="h-4 w-4 text-green-600 mr-2" />
                <AlertDescription className="text-green-800 text-sm">
                  <p className="font-medium">Payment Successful!</p>
                  <p>Your certificate has been generated and a confirmation email has been sent to {purchaseUser.email}</p>
                  {user && (
                    <p className="mt-1">Certificate saved to your account dashboard</p>
                  )}
                  {sendingSpecificSample && (
                    <p className="mt-1 flex items-center">
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      Sending sample certificates to troy.latter@gmail.com...
                    </p>
                  )}
                </AlertDescription>
              </Alert>
            </div>
            
            <div className="mb-12" ref={certificateRef}>
              <Certificate 
                insuranceType={getCertificateName()}
                name={purchaseUser.fullName}
                country={plan.location || "Worldwide"}
                uniqueId={generateUniqueId()}
                multipleItems={cartItems && cartItems.length > 1 ? cartItems : undefined}
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
                variant={showShareOptions ? "secondary" : "outline"}
                size="lg"
                className={showShareOptions ? "bg-slate-200" : ""}
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share Certificate
              </Button>
              
              {user && (
                <Button 
                  onClick={() => navigate('/dashboard')}
                  variant="outline"
                  size="lg"
                >
                  View in Dashboard
                </Button>
              )}
            </div>
            
            {showShareOptions && (
              <div className="mb-8">
                <SocialSharingPanel
                  certificateName={getCertificateName()}
                  certificateId={certificateId || generateUniqueId()}
                  userName={purchaseUser.fullName}
                />
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
              Your official policy document has been sent to {purchaseUser.email}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CertificatePage;
