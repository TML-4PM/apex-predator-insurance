
import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { createPaymentIntent, PaymentIntentResponse } from '@/lib/stripeClient';
import { CheckoutFormValues } from './CheckoutForm';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface PaymentFormProps {
  plan: { id: string; name: string; price: number; icon: string };
  formData: CheckoutFormValues;
  onSuccess: (data: CheckoutFormValues) => void;
  isBundle?: boolean;
  resetCardElement: () => void;
}

export const PaymentForm = ({ plan, formData, onSuccess, isBundle = false, resetCardElement }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const { toast } = useToast();

  // Reset payment error when formData changes
  useEffect(() => {
    setPaymentError(null);
  }, [formData]);

  // Validate form fields whenever formData changes
  useEffect(() => {
    if (formData.fullName && formData.fullName.length >= 2 && 
        formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  }, [formData]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      toast({
        title: "Stripe not loaded",
        description: "Please wait a moment and try again",
        variant: "destructive"
      });
      return;
    }

    // Validate form data
    if (!formData.fullName || !formData.email) {
      setPaymentError("Please complete all required fields");
      toast({
        title: "Form incomplete",
        description: "Please fill in all required information",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setPaymentError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      // Create a fresh copy of form data to avoid reference issues
      const paymentFormData = {
        fullName: formData.fullName,
        email: formData.email
      };

      // Call our backend API to create a payment intent
      const paymentIntentResponse: PaymentIntentResponse = await createPaymentIntent(
        plan.price,
        { 
          plan_id: plan.id,
          plan_name: plan.name,
          fullName: paymentFormData.fullName,
          customer_name: paymentFormData.fullName,
          customer_email: paymentFormData.email,
          email: paymentFormData.email,
          is_bundle: isBundle,
          timestamp: new Date().toISOString() // Add timestamp to ensure uniqueness
        }
      );

      console.log('Payment intent response:', paymentIntentResponse);

      // Check if there was an error from payment intent creation
      if ('error' in paymentIntentResponse && paymentIntentResponse.error) {
        throw new Error(paymentIntentResponse.error);
      }

      // Check if running in demo mode (response from backend indicates this)
      if ('demoMode' in paymentIntentResponse && paymentIntentResponse.demoMode) {
        console.log('Demo mode active: Simulating successful payment');
        setIsDemoMode(true);
        
        // In demo mode, process the "payment" after a short delay to simulate processing
        setTimeout(() => {
          toast({
            title: "Demo Mode",
            description: "This is a simulated payment. Your certificate is ready to download.",
          });
          
          setIsProcessed(true);
          setTimeout(() => {
            resetCardElement(); // Reset the card element
            
            // Use a fresh copy of the form data
            const freshData = {
              fullName: paymentFormData.fullName,
              email: paymentFormData.email
            };
            
            onSuccess(freshData);
          }, 1500);
        }, 1000);
        
        return;
      }
      
      // For real payments, get the client secret
      if ('clientSecret' in paymentIntentResponse && paymentIntentResponse.clientSecret) {
        const clientSecret = paymentIntentResponse.clientSecret;
        
        console.log("Confirming card payment with secret");

        // Confirm the card payment with the client secret from our backend
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: paymentFormData.fullName,
              email: paymentFormData.email,
            },
          },
        });

        if (confirmError) {
          console.error('Payment confirmation error:', confirmError);
          throw new Error(confirmError.message);
        }

        console.log('Payment intent result:', paymentIntent);

        if (paymentIntent.status === 'succeeded') {
          setIsProcessed(true);
          toast({
            title: "Payment successful!",
            description: "Your certificate is ready to download.",
          });
          
          // Add a small delay to show the success state before redirecting
          setTimeout(() => {
            resetCardElement(); // Reset the card element
            
            // Use a fresh copy of the form data
            const freshData = {
              fullName: paymentFormData.fullName,
              email: paymentFormData.email
            };
            
            onSuccess(freshData);
          }, 1500);
        } else if (paymentIntent.status === 'requires_action') {
          // Handle 3D Secure authentication if required
          const { error, paymentIntent: updatedIntent } = await stripe.confirmCardPayment(clientSecret);
          
          if (error) {
            throw new Error(`Authentication failed: ${error.message}`);
          }
          
          if (updatedIntent.status === 'succeeded') {
            setIsProcessed(true);
            toast({
              title: "Payment successful!",
              description: "Your certificate is ready to download.",
            });
            
            setTimeout(() => {
              resetCardElement();
              
              // Use a fresh copy of the form data
              const freshData = {
                fullName: paymentFormData.fullName,
                email: paymentFormData.email
              };
              
              onSuccess(freshData);
            }, 1500);
          } else {
            throw new Error(`Payment failed with status: ${updatedIntent.status}`);
          }
        } else {
          throw new Error(`Payment failed with status: ${paymentIntent.status}`);
        }
      } else {
        // If we reach here and we're not in demo mode and there's no client secret, something went wrong
        throw new Error("No client secret returned from the server");
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(error instanceof Error ? error.message : "An unknown error occurred");
      toast({
        title: "Payment failed",
        description: error instanceof Error ? error.message : "Please try again or contact support.",
        variant: "destructive"
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Show success state after payment is processed
  if (isProcessed) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-green-500 mb-4">
          <CheckCircle2 size={64} />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">Payment Successful!</h3>
        <p className="text-white/70 mb-4">Your insurance certificate is being prepared...</p>
        <div className="animate-pulse">
          <Loader2 className="h-8 w-8 text-apex-red animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="pt-4 border-t border-gray-100">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <div className="mr-2 h-5 w-5 text-apex-red">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
          </div>
          Payment Details
        </h3>
        
        {paymentError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              {paymentError}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="mb-4">
          <Label>Card Information</Label>
          <div className="mt-1 p-3 border rounded-md focus-within:ring-2 focus-within:ring-apex-red focus-within:border-transparent">
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            For testing, you can use card number: 4242 4242 4242 4242, any future date, any CVC.
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-apex-red hover:bg-apex-red/90"
          disabled={isLoading || !stripe || !formComplete}
        >
          {isLoading ? (
            <div className="flex items-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </div>
          ) : (
            <>
              Pay ${plan.price.toFixed(2)}
            </>
          )}
        </Button>
        
        {isDemoMode && (
          <Alert className="mt-4 bg-yellow-50 border-yellow-200">
            <AlertDescription className="text-yellow-800 text-sm">
              <p className="font-medium">Demo Mode Active</p>
              <p>This is running in demo mode for easy testing. Any card information entered will not be processed.</p>
              <p className="mt-2">To enable real payments, you would need to set up Stripe integration through Supabase Edge Functions.</p>
            </AlertDescription>
          </Alert>
        )}
        
        <p className="text-xs text-gray-500 mt-4 text-center">
          * This is a real insurance product with a $50,000 accidental death benefit.
        </p>
      </div>
    </form>
  );
};
