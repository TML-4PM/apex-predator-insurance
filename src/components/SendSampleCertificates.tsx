
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, Loader2, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { useToast } from '@/hooks/use-toast';

const SendSampleCertificates = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [initialSendComplete, setInitialSendComplete] = useState(false);
  const [initialSendAttempted, setInitialSendAttempted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [lastAttemptTime, setLastAttemptTime] = useState(0);
  const { toast } = useToast();

  // Function to send samples that can be reused
  const sendSamples = async (targetEmail) => {
    try {
      setIsSending(true);
      console.log(`Attempting to send samples to ${targetEmail}...`);
      
      // Add timestamp to prevent browser caching
      const timestamp = new Date().getTime();
      
      const response = await fetch(`https://vwqnfnpnuatrfizrttrb.supabase.co/functions/v1/webhook-handler?t=${timestamp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          action: 'send_samples',
          email: targetEmail
        })
      });

      // Log full response for debugging
      console.log('Response status:', response.status);
      
      // Try to parse the response
      let data;
      try {
        data = await response.json();
        console.log('Response data:', data);
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        throw new Error('Failed to parse server response');
      }

      if (!response.ok) {
        throw new Error(data?.error || `Failed with status: ${response.status}`);
      }

      console.log(`Samples successfully sent to ${targetEmail}`);
      return { success: true, data };
    } catch (err) {
      console.error('Error sending samples:', err);
      return { 
        success: false, 
        error: err.message,
        isNetworkError: err.message.includes('Failed to fetch')
      };
    } finally {
      setIsSending(false);
    }
  };

  // Send samples to troy.latter@gmail.com on component mount
  useEffect(() => {
    const sendInitialSamples = async () => {
      if (!initialSendAttempted) {
        setInitialSendAttempted(true);
        setIsLoading(true);
        const targetEmail = "troy.latter@gmail.com";
        setLastAttemptTime(Date.now());
        
        const result = await sendSamples(targetEmail);
        
        if (result.success) {
          toast({
            title: "Samples Sent!",
            description: `Sample certificates have been sent to ${targetEmail}`,
          });
          setInitialSendComplete(true);
        } else {
          let errorMessage = result.error;
          
          if (result.isNetworkError) {
            errorMessage = "Network connection error. The server might be unreachable or CORS might be blocking the request.";
          }
          
          toast({
            title: "Error",
            description: `Failed to send samples: ${errorMessage}`,
            variant: "destructive"
          });
          
          // Don't set initialSendComplete to true if there was an error
          setError(errorMessage);
        }
        
        setIsLoading(false);
      }
    };

    sendInitialSamples();
  }, [toast, initialSendAttempted]);

  // Manual retry function with throttling
  const handleRetry = async () => {
    // Prevent rapid clicking
    if (Date.now() - lastAttemptTime < 2000) {
      toast({
        title: "Please wait",
        description: "Please wait a moment before trying again",
      });
      return;
    }
    
    setIsLoading(true);
    setLastAttemptTime(Date.now());
    const targetEmail = "troy.latter@gmail.com";
    
    const result = await sendSamples(targetEmail);
    
    if (result.success) {
      toast({
        title: "Samples Sent!",
        description: `Sample certificates have been sent to ${targetEmail}`,
      });
      setInitialSendComplete(true);
      setSuccess(true);
      setError('');
    } else {
      let errorMessage = result.error;
      
      if (result.isNetworkError) {
        errorMessage = "Network connection error. The server might be unreachable or CORS might be blocking the request.";
      }
      
      setError(errorMessage);
      toast({
        title: "Error",
        description: `Failed to send samples: ${errorMessage}`,
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent rapid submissions
    if (Date.now() - lastAttemptTime < 2000) {
      toast({
        title: "Please wait",
        description: "Please wait a moment before submitting again",
      });
      return;
    }
    
    setIsLoading(true);
    setLastAttemptTime(Date.now());
    setError('');
    setSuccess(false);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    const result = await sendSamples(email.trim());
    
    if (result.success) {
      setSuccess(true);
      toast({
        title: "Samples Sent!",
        description: `Sample certificates have been sent to ${email}`,
      });
      
      // Reset email after successful submission
      setEmail('');
    } else {
      let errorMessage = result.error;
      
      if (result.isNetworkError) {
        errorMessage = "Network connection error. The server might be unreachable or CORS might be blocking the request.";
      }
      
      setError(errorMessage);
      toast({
        title: "Error",
        description: `Failed to send samples: ${errorMessage}`,
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
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
          <AlertDescription className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            {error}
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-auto" 
              onClick={handleRetry}
              disabled={isLoading || isSending}
            >
              {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : "Retry"}
            </Button>
          </AlertDescription>
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
      
      {initialSendComplete && (
        <Alert className="mb-4 bg-blue-50 border-blue-200">
          <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
          <AlertDescription className="text-blue-800">
            Sample certificates were automatically sent to troy.latter@gmail.com
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

      {!initialSendComplete && (
        <div className="mt-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRetry}
            disabled={isSending || isLoading}
            className="w-full flex items-center justify-center"
          >
            {isSending || isLoading ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                Sending samples to troy.latter@gmail.com...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-3 w-3" />
                Try sending samples to troy.latter@gmail.com again
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SendSampleCertificates;
