
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sendSampleCertificates } from '@/services/emailService';
import EmailSubmitForm from './EmailSubmitForm';
import AlertMessage from './AlertMessage';
import RetryButton from './RetryButton';

const DEFAULT_TARGET_EMAIL = "troy.latter@gmail.com";
const THROTTLE_DELAY = 2000; // 2 seconds

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

  // Throttle function to prevent too many requests
  const isThrottled = () => {
    const now = Date.now();
    if (now - lastAttemptTime < THROTTLE_DELAY) {
      toast({
        title: "Please wait",
        description: "Please wait a moment before trying again",
      });
      return true;
    }
    return false;
  };

  // Send samples to troy.latter@gmail.com on component mount
  useEffect(() => {
    const sendInitialSamples = async () => {
      if (!initialSendAttempted) {
        setInitialSendAttempted(true);
        setIsLoading(true);
        setLastAttemptTime(Date.now());
        
        const result = await sendSampleCertificates(DEFAULT_TARGET_EMAIL);
        
        if (result.success) {
          toast({
            title: "Samples Sent!",
            description: `Sample certificates have been sent to ${DEFAULT_TARGET_EMAIL}`,
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
          
          setError(errorMessage);
        }
        
        setIsLoading(false);
      }
    };

    sendInitialSamples();
  }, [toast, initialSendAttempted]);

  // Manual retry function
  const handleRetry = async () => {
    if (isThrottled()) return;
    
    setIsLoading(true);
    setLastAttemptTime(Date.now());
    
    const result = await sendSampleCertificates(DEFAULT_TARGET_EMAIL);
    
    if (result.success) {
      toast({
        title: "Samples Sent!",
        description: `Sample certificates have been sent to ${DEFAULT_TARGET_EMAIL}`,
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
    
    if (isThrottled()) return;
    
    setIsLoading(true);
    setLastAttemptTime(Date.now());
    setError('');
    setSuccess(false);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    const result = await sendSampleCertificates(email.trim());
    
    if (result.success) {
      setSuccess(true);
      toast({
        title: "Samples Sent!",
        description: `Sample certificates have been sent to ${email}`,
      });
      
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
        <AlertMessage
          variant="error"
          message={error}
          showRetry={true}
          onRetry={handleRetry}
          isRetrying={isLoading}
        />
      )}
      
      {success && (
        <AlertMessage
          variant="success"
          message="Sample certificates sent! Check your inbox."
        />
      )}
      
      {initialSendComplete && (
        <AlertMessage
          variant="info"
          message={`Sample certificates were automatically sent to ${DEFAULT_TARGET_EMAIL}`}
        />
      )}
      
      <EmailSubmitForm
        email={email}
        setEmail={setEmail}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      
      <p className="text-xs text-gray-500 mt-3">
        We respect your privacy. Your email will only be used to send the sample certificates.
      </p>

      {!initialSendComplete && (
        <div className="mt-4">
          <RetryButton
            onClick={handleRetry}
            isLoading={isSending || isLoading}
            variant="secondary"
            className="w-full"
            targetEmail={DEFAULT_TARGET_EMAIL}
          />
        </div>
      )}
    </div>
  );
};

export default SendSampleCertificates;
