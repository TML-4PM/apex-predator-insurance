
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, Loader2, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { useToast } from '@/hooks/use-toast';

const SendSampleCertificates = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://vwqnfnpnuatrfizrttrb.supabase.co/functions/v1/webhook-handler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'send_samples',
          email: email.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send sample certificates');
      }

      setSuccess(true);
      toast({
        title: "Samples Sent!",
        description: `Sample certificates have been sent to ${email}`,
      });
      
      // Reset email after successful submission
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast({
        title: "Error",
        description: "Failed to send sample certificates. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <Mail className="mr-2 h-5 w-5 text-apex-red" />
        Get Sample Certificates
      </h3>
      
      <p className="text-sm text-gray-600 mb-4">
        Want to see all our certificate designs? Enter your email below and we'll send you samples of each predator certificate.
      </p>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
          <AlertDescription className="text-green-800">
            Sample certificates sent! Check your inbox.
          </AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow"
          disabled={isLoading}
          required
        />
        <Button 
          type="submit" 
          className="bg-apex-red hover:bg-apex-red/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Get Samples"
          )}
        </Button>
      </form>
      
      <p className="text-xs text-gray-500 mt-3">
        We respect your privacy. Your email will only be used to send the sample certificates.
      </p>
    </div>
  );
};

export default SendSampleCertificates;
