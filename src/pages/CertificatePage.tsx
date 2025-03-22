import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Certificate from '@/components/Certificate';
import { Button } from '@/components/ui/button';
import { 
  Share2, 
  Download, 
  Home, 
  Camera, 
  Check, 
  Copy, 
  Twitter, 
  Facebook, 
  Instagram,
  MessageCircle,
  Mail
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { toPng } from 'html-to-image';

const CertificatePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
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
    }
    
    window.scrollTo(0, 0);
  }, [state, navigate, toast]);
  
  if (!state?.plan || !state?.user) {
    return null;
  }
  
  const { plan, user } = state;
  
  const handleDownload = async () => {
    if (certificateRef.current) {
      try {
        const dataUrl = await toPng(certificateRef.current, { quality: 0.95 });
        
        // Create a link element
        const link = document.createElement('a');
        link.download = `${user.fullName.replace(/\s+/g, '-')}-${plan.name.replace(/\s+/g, '-')}-certificate.png`;
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
  
  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    
    toast({
      title: "Link Copied!",
      description: "Certificate link copied to clipboard. Share it with your friends!",
    });
    
    setTimeout(() => setCopiedLink(false), 3000);
  };
  
  const shareOnPlatform = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`I just got $50K insurance against ${plan.name.replace(' Insurance', '')} attacks! Will I survive my next adventure? #WildlifeShield #SurviveTheWild`);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text} ${url}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=My ${plan.name} protection&body=${text} ${decodeURIComponent(url)}`;
        break;
      default:
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };
  
  // Generate a unique certificate ID based on name and plan
  const generateUniqueId = () => {
    const nameHash = user.fullName.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const planHash = plan.name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return `APX-${nameHash * planHash % 10000}-${Date.now().toString().slice(-4)}`;
  };
  
  return (
    <Layout>
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-apex-black mb-4">Your Certificate is Ready!</h1>
              <p className="text-xl text-apex-darkgray/70">
                Congratulations on your Wildlife Shield protection! <br />
                <span className="text-apex-red font-semibold">$50,000 accidental death benefit</span>
              </p>
            </div>
            
            <div className="mb-12" ref={certificateRef}>
              <Certificate 
                insuranceType={plan.name}
                name={user.fullName}
                country={plan.location || "Worldwide"}
                uniqueId={generateUniqueId()}
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
            </div>
            
            {showShareOptions && (
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 mb-8 animate-fade-in shadow-md border border-slate-200">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Camera className="mr-2 h-5 w-5 text-apex-red" />
                  Share Your Certificate
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <Button onClick={() => shareOnPlatform('twitter')} variant="outline" className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-[#1DA1F2]/10">
                    <Twitter size={24} className="text-[#1DA1F2]" />
                    <span className="text-xs">Twitter</span>
                  </Button>
                  
                  <Button onClick={() => shareOnPlatform('facebook')} variant="outline" className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-[#1877F2]/10">
                    <Facebook size={24} className="text-[#1877F2]" />
                    <span className="text-xs">Facebook</span>
                  </Button>
                  
                  <Button onClick={() => shareOnPlatform('whatsapp')} variant="outline" className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-[#25D366]/10">
                    <MessageCircle size={24} className="text-[#25D366]" />
                    <span className="text-xs">WhatsApp</span>
                  </Button>
                  
                  <Button onClick={() => shareOnPlatform('instagram')} variant="outline" className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-[#E1306C]/10">
                    <Instagram size={24} className="text-[#E1306C]" />
                    <span className="text-xs">Instagram</span>
                  </Button>
                  
                  <Button onClick={() => shareOnPlatform('email')} variant="outline" className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-blue-500/10">
                    <Mail size={24} className="text-blue-500" />
                    <span className="text-xs">Email</span>
                  </Button>
                </div>
                
                <div className="flex items-center gap-3 mt-4">
                  <Button 
                    onClick={copyToClipboard} 
                    variant="outline"
                    className="w-full"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <span className="font-semibold">Pro tip:</span> Screenshot your certificate and share it on your story for maximum engagement!
                  </p>
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
              Your official policy document has been sent to {user.email}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CertificatePage;
