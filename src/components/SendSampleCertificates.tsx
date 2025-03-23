
import React, { useState, useEffect, useCallback } from 'react';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sendSampleCertificates } from '@/services/emailService';
import EmailSubmitForm from './EmailSubmitForm';
import AlertMessage from './AlertMessage';

// Constants
const DEFAULT_TARGET_EMAIL = "troy.latter@gmail.com";
const THROTTLE_DELAY = 2000; // 2 seconds
const STATUS_DISPLAY_TIME = 5000; // 5 seconds

const SendSampleCertificates = () => {
  // State management
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [initialStatus, setInitialStatus] = useState<'pending' | 'success' | 'error' | null>(null);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const { toast } = useToast();

  // Clear success message after timeout
  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => setSuccess(false), STATUS_DISPLAY_TIME);
      return () => clearTimeout(timeout);
    }
  }, [success]);

  // Clear error message after timeout
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(''), STATUS_DISPLAY_TIME);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  // Throttle checks
  const isThrottled = useCallback(() => {
    const now = Date.now();
    if (now - lastRequestTime < THROTTLE_DELAY) {
      toast({
        title: "Please wait",
        description: "Please wait a moment before trying again",
      });
      return true;
    }
    return false;
  }, [lastRequestTime, toast]);

  // Handle sending samples
  const sendSamples = useCallback(async (targetEmail: string, isInitial = false) => {
    if (isThrottled()) return;
    
    setIsLoading(true);
    setLastRequestTime(Date.now());
    
    if (!isInitial) {
      setError('');
      setSuccess(false);
    }
    
    try {
      const result = await sendSampleCertificates(targetEmail);
      
      if (result.success) {
        if (isInitial) {
          setInitialStatus('success');
          toast({
            title: "Initial Samples Sent!",
            description: `Sample certificates sent to ${targetEmail}`,
          });
        } else {
          setSuccess(true);
          toast({
            title: "Samples Sent!",
            description: `Sample certificates sent to ${targetEmail}`,
          });
        }
      } else {
        let errorMessage = result.error || 'Unknown error occurred';
        
        if (result.isNetworkError) {
          errorMessage = "Network connection error. The server might be unreachable or CORS might be blocking the request.";
        }
        
        if (isInitial) {
          setInitialStatus('error');
        } else {
          setError(errorMessage);
        }
        
        toast({
          title: "Error",
          description: `Failed to send samples: ${errorMessage}`,
          variant: "destructive"
        });
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Unknown error occurred';
      
      if (isInitial) {
        setInitialStatus('error');
      } else {
        setError(errorMessage);
      }
      
      toast({
        title: "Error",
        description: `Exception: ${errorMessage}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [isThrottled, toast]);

  // Send initial samples on component mount
  useEffect(() => {
    if (initialStatus === null) {
      setInitialStatus('pending');
      sendSamples(DEFAULT_TARGET_EMAIL, true);
    }
  }, [initialStatus, sendSamples]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    await sendSamples(email.trim());
  };

  // Handle retry for default email
  const handleRetryDefault = () => sendSamples(DEFAULT_TARGET_EMAIL);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <Mail className="mr-2 h-5 w-5 text-apex-red" />
        Get Sample Certificates
      </h3>
      
      <p className="text-sm text-gray-600 mb-4">
        Want to see all our certificate designs? Enter your email below and we'll send you samples of each predator certificate.
      </p>
      
      {/* Error messaging */}
      {error && (
        <AlertMessage
          variant="error"
          message={error}
          showRetry={true}
          onRetry={() => sendSamples(email || DEFAULT_TARGET_EMAIL)}
          isRetrying={isLoading}
        />
      )}
      
      {/* Success messaging */}
      {success && (
        <AlertMessage
          variant="success"
          message="Sample certificates sent! Check your inbox."
        />
      )}
      
      {/* Initial send status */}
      {initialStatus === 'success' && (
        <AlertMessage
          variant="info"
          message={`Sample certificates were automatically sent to ${DEFAULT_TARGET_EMAIL}`}
        />
      )}
      
      {initialStatus === 'error' && (
        <AlertMessage
          variant="error"
          message={`Failed to send initial samples to ${DEFAULT_TARGET_EMAIL}`}
          showRetry={true}
          onRetry={handleRetryDefault}
          isRetrying={isLoading}
        />
      )}
      
      {/* Email submission form */}
      <EmailSubmitForm
        email={email}
        setEmail={setEmail}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      
      <p className="text-xs text-gray-500 mt-3">
        We respect your privacy. Your email will only be used to send the sample certificates.
      </p>
    </div>
  );
};

export default SendSampleCertificates;
