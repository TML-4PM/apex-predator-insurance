
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Shield, CheckCircle, XCircle, Calendar, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CertificateInfo {
  id: string;
  certificate_name: string;
  certificate_type: string;
  certificate_data: any;
  created_at: string;
  user_id: string;
}

export default function CertificateVerification() {
  const [certificateId, setCertificateId] = useState('');
  const [loading, setLoading] = useState(false);
  const [certificate, setCertificate] = useState<CertificateInfo | null>(null);
  const [verified, setVerified] = useState<boolean | null>(null);
  const { toast } = useToast();

  const verifyCertificate = async () => {
    if (!certificateId.trim()) {
      toast({
        title: "Invalid ID",
        description: "Please enter a certificate ID",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_certificates')
        .select('*')
        .eq('id', certificateId.trim())
        .single();

      if (error || !data) {
        setVerified(false);
        setCertificate(null);
        toast({
          title: "Certificate Not Found",
          description: "The certificate ID you entered could not be verified",
          variant: "destructive"
        });
      } else {
        setVerified(true);
        setCertificate(data);
        toast({
          title: "Certificate Verified",
          description: "This certificate is authentic and valid",
        });
      }
    } catch (error) {
      console.error('Error verifying certificate:', error);
      setVerified(false);
      setCertificate(null);
      toast({
        title: "Verification Failed",
        description: "There was an error verifying the certificate",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      verifyCertificate();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-apex-red" />
            Certificate Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Enter a certificate ID to verify its authenticity and validity.
          </p>
          
          <div className="flex gap-2">
            <Input
              placeholder="Enter certificate ID (e.g., APX-1234-5678)"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={verifyCertificate}
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Verification Results */}
      {verified !== null && (
        <Card className={verified ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              {verified ? (
                <CheckCircle className="h-8 w-8 text-green-600" />
              ) : (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
              <div>
                <h3 className={`text-xl font-bold ${verified ? 'text-green-800' : 'text-red-800'}`}>
                  {verified ? 'Certificate Verified' : 'Certificate Invalid'}
                </h3>
                <p className={verified ? 'text-green-600' : 'text-red-600'}>
                  {verified 
                    ? 'This certificate is authentic and valid'
                    : 'This certificate could not be verified'
                  }
                </p>
              </div>
            </div>

            {certificate && verified && (
              <div className="space-y-3 border-t border-green-200 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-green-700">Certificate Name</p>
                    <p className="text-green-900">{certificate.certificate_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-700">Type</p>
                    <p className="text-green-900">{certificate.certificate_type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-700">Issued Date</p>
                    <div className="flex items-center gap-1 text-green-900">
                      <Calendar className="h-4 w-4" />
                      {new Date(certificate.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-700">Status</p>
                    <Badge className="bg-green-600">Valid</Badge>
                  </div>
                </div>
                
                {certificate.certificate_data && (
                  <div>
                    <p className="text-sm font-medium text-green-700">Certificate Holder</p>
                    <div className="flex items-center gap-1 text-green-900">
                      <User className="h-4 w-4" />
                      {certificate.certificate_data.name || 'Certificate Holder'}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-blue-900 mb-2">How to Find Your Certificate ID</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Check your purchase confirmation email</li>
            <li>• Look at the bottom right corner of your certificate</li>
            <li>• Visit your account dashboard to view all certificates</li>
            <li>• Certificate IDs typically start with "APX-" followed by numbers</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
