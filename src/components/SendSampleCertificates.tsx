
import React, { useState, useCallback } from 'react';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EmailSubmitForm from './EmailSubmitForm';
import AlertMessage from './AlertMessage';

const SendSampleCertificates = () => {
  // State management
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();

  // Direct method to send email through a reliable service
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }
    
    setIsLoading(true);
    setStatus('idle');
    setErrorMessage('');
    
    try {
      // Use Formspree for reliable email sending without backend dependencies
      const response = await fetch("https://formspree.io/f/moqgwrwg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          subject: "Apex Predator Insurance - Sample Certificate Request",
          message: `User has requested sample certificates. Email: ${email.trim()}`
        }),
      });
      
      if (response.ok) {
        setStatus('success');
        toast({
          title: "Request Sent!",
          description: "Check your inbox for sample certificates soon.",
        });
      } else {
        throw new Error("Failed to send request. Please try again later.");
      }
    } catch (err: any) {
      console.error("Email submission error:", err);
      setStatus('error');
      setErrorMessage(err.message || 'An unexpected error occurred');
      toast({
        title: "Error",
        description: "We couldn't process your request right now. Please try again later.",
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
      
      {/* Only show form if not already successfully submitted */}
      {status !== 'success' && (
        <>
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
        </>
      )}
    </div>
  );
};

export default SendSampleCertificates;
