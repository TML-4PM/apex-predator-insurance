
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { createPaymentIntent } from '@/lib/stripeClient';
import { CheckoutFormValues } from './CheckoutForm';

interface PaymentFormProps {
  plan: { id: string; name: string; price: number; icon: string };
  formData: CheckoutFormValues;
  onSuccess: (data: CheckoutFormValues) => void;
}

export const PaymentForm = ({ plan, formData, onSuccess }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
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

      // Call our backend API to create a payment intent
      const { clientSecret, error } = await createPaymentIntent(
        plan.price,
        { 
          plan_id: plan.id,
          plan_name: plan.name,
          customer_name: formData.fullName,
          customer_email: formData.email
        }
      );

      if (error) {
        setPaymentError(error);
        toast({
          title: "Payment setup failed",
          description: error,
          variant: "destructive"
        });
        return;
      }

      if (!clientSecret) {
        // For demo mode or development environment
        console.log('Demo mode: Simulating successful payment');
        
        toast({
          title: "Demo Mode",
          description: "In a real implementation, this would process a payment. Your certificate is ready to download.",
        });
        
        onSuccess(formData);
        return;
      }

      // Confirm the card payment with the client secret from our backend
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.fullName,
            email: formData.email,
          },
        },
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        toast({
          title: "Payment successful!",
          description: "Your certificate is ready to download.",
        });
        
        onSuccess(formData);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(error instanceof Error ? error.message : "An unknown error occurred");
      toast({
        title: "Payment failed",
        description: error instanceof Error ? error.message : "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        </div>

        <Button
          type="submit"
          className="w-full bg-apex-red hover:bg-apex-red/90"
          disabled={isLoading || !stripe}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing...
            </div>
          ) : (
            <>
              Pay ${plan.price.toFixed(2)}
            </>
          )}
        </Button>
        
        <Alert className="mt-4 bg-yellow-50 border-yellow-200">
          <AlertDescription className="text-yellow-800 text-sm">
            <p className="font-medium">Integration Status</p>
            <p>This component is connected to a Supabase Edge Function. To fully enable payment processing:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Add your Stripe secret key to Supabase environment variables</li>
              <li>Deploy the Edge Function to handle payment intents</li>
              <li>Test the integration in a development environment first</li>
            </ol>
          </AlertDescription>
        </Alert>
        
        <p className="text-xs text-gray-500 mt-4 text-center">
          * This is a real insurance product with a $50,000 accidental death benefit.
        </p>
      </div>
    </form>
  );
};
