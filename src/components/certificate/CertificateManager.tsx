
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, Eye, Calendar, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Certificate from '@/components/Certificate';
import { toPng } from 'html-to-image';

interface UserCertificate {
  id: string;
  certificate_name: string;
  certificate_type: string;
  certificate_data: any;
  download_count: number;
  created_at: string;
  last_downloaded_at: string | null;
}

export default function CertificateManager() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<UserCertificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewCert, setPreviewCert] = useState<UserCertificate | null>(null);

  React.useEffect(() => {
    if (user) {
      fetchUserCertificates();
    }
  }, [user]);

  const fetchUserCertificates = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_certificates')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCertificates(data || []);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      toast({
        title: "Error",
        description: "Failed to load your certificates",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadCertificate = async (certificate: UserCertificate) => {
    try {
      // Create a temporary div to render the certificate
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.innerHTML = `
        <div style="width: 800px; padding: 20px; background: white;">
          <!-- Certificate content would be rendered here -->
        </div>
      `;
      document.body.appendChild(tempDiv);

      // Generate PNG
      const dataUrl = await toPng(tempDiv, { quality: 0.95, width: 800, height: 600 });
      
      // Create download link
      const link = document.createElement('a');
      link.download = `${certificate.certificate_name.replace(/\s+/g, '-')}-certificate.png`;
      link.href = dataUrl;
      link.click();

      // Clean up
      document.body.removeChild(tempDiv);

      // Update download count
      await supabase
        .from('user_certificates')
        .update({ 
          download_count: certificate.download_count + 1,
          last_downloaded_at: new Date().toISOString()
        })
        .eq('id', certificate.id);

      toast({
        title: "Certificate Downloaded",
        description: "Your certificate has been saved to your device!",
      });

      // Refresh certificates to update download count
      fetchUserCertificates();
    } catch (error) {
      console.error('Error downloading certificate:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading your certificate",
        variant: "destructive"
      });
    }
  };

  const shareCertificate = (certificate: UserCertificate) => {
    const shareUrl = `${window.location.origin}/certificate/${certificate.id}`;
    const shareText = `Check out my ${certificate.certificate_name} from Apex Predator Insurance! 🦈🐊🦁`;
    
    if (navigator.share) {
      navigator.share({
        title: certificate.certificate_name,
        text: shareText,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      toast({
        title: "Link Copied!",
        description: "Certificate link copied to clipboard",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-apex-red"></div>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Certificates Yet</h3>
          <p className="text-gray-600 mb-4">
            Purchase your first certificate to start building your survival collection!
          </p>
          <Button>Browse Plans</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Certificates</h2>
        <Badge variant="outline">
          {certificates.length} Certificate{certificates.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <Card key={certificate.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{certificate.certificate_name}</CardTitle>
                  <p className="text-sm text-gray-600">{certificate.certificate_type}</p>
                </div>
                <Badge className="bg-apex-red">
                  Valid
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Created: {new Date(certificate.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Download className="h-4 w-4" />
                  Downloaded: {certificate.download_count} times
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => setPreviewCert(certificate)}
                  variant="outline"
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  onClick={() => downloadCertificate(certificate)}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button
                  size="sm"
                  onClick={() => shareCertificate(certificate)}
                  variant="outline"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Certificate Preview Modal */}
      {previewCert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Certificate Preview</h3>
                <Button
                  variant="ghost"
                  onClick={() => setPreviewCert(null)}
                >
                  ×
                </Button>
              </div>
              
              <div className="mb-4">
                <Certificate
                  insuranceType={previewCert.certificate_data.insuranceType}
                  name={previewCert.certificate_data.name}
                  country={previewCert.certificate_data.country}
                  uniqueId={previewCert.certificate_data.uniqueId}
                  multipleItems={previewCert.certificate_data.multipleItems}
                />
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={() => downloadCertificate(previewCert)}
                  className="bg-apex-red hover:bg-apex-red/90"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={() => shareCertificate(previewCert)}
                  variant="outline"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
