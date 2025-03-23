
import React, { useState, useCallback } from 'react';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sendSampleCertificates } from '@/services/emailService';
import EmailSubmitForm from './EmailSubmitForm';
import AlertMessage from './AlertMessage';

const SendSampleCertificates = () => {
  // Simplified state management
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();

  // Simplified submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }
    
    setIsLoading(true);
    setStatus('idle');
    setErrorMessage('');
    
    try {
      const result = await sendSampleCertificates(email.trim());
      
      if (result.success) {
        setStatus('success');
        toast({
          title: "Request Sent!",
          description: "Check your inbox for sample certificates soon.",
        });
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Failed to send samples. Please try again later.');
        toast({
          title: "Request Failed",
          description: result.error || "Please try again later",
          variant: "destructive"
        });
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'An unexpected error occurred');
      toast({
        title: "Error",
        description: err.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for retry
  const handleRetry = useCallback(() => {
    if (email) handleSubmit(new Event('submit') as unknown as React.FormEvent);
  }, [email]);

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
      {status === 'error' && (
        <AlertMessage
          variant="error"
          message={errorMessage}
          showRetry={true}
          onRetry={handleRetry}
          isRetrying={isLoading}
        />
      )}
      
      {/* Success messaging */}
      {status === 'success' && (
        <AlertMessage
          variant="success"
          message="Your request for sample certificates has been received. Please check your inbox shortly."
        />
      )}
      
      {/* Email submission form */}
      <EmailSubmitForm
        email={email}
        setEmail={setEmail}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        placeholder="Your email address"
      />
      
      <p className="text-xs text-gray-500 mt-3">
        We respect your privacy. Your email will only be used to send the sample certificates.
      </p>
    </div>
  );
};

export default SendSampleCertificates;
