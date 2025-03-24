
import React, { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

interface WalletPaymentButtonsProps {
  amount: number;
  currency?: string;
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentError: (error: any) => void;
  clientSecret?: string;
  metadata: {
    fullName: string;
    email: string;
    [key: string]: any;
  };
}

const WalletPaymentButtons = ({
  amount,
  currency = 'usd',
  onPaymentSuccess,
  onPaymentError,
  clientSecret,
  metadata
}: WalletPaymentButtonsProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!stripe || !elements) return;

    // Create the payment request
    const pr = stripe.paymentRequest({
      country: 'US',
      currency: currency.toLowerCase(),
      total: {
        label: 'Apex Predator Insurance Premium',
        amount: Math.round(amount * 100), // Convert to cents and ensure integer
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    // Check if the Payment Request is available
    pr.canMakePayment().then(result => {
      if (result) {
        setPaymentRequest(pr);
        console.log("Wallet payment methods available:", result);
      } else {
        console.log("No wallet payment methods available");
        setError("No digital wallet payment methods available on this device");
      }
    });
    
    // Handle payment method selection
    pr.on('paymentmethod', async (e) => {
      try {
        if (!clientSecret) {
          e.complete('fail');
          onPaymentError(new Error("Missing client secret for payment"));
          return;
        }

        // Confirm the PaymentIntent with the payment method
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: e.paymentMethod.id,
            receipt_email: metadata.email,
          },
          { handleActions: false }
        );

        if (error) {
          console.error("Payment confirmation error:", error);
          e.complete('fail');
          onPaymentError(error);
          return;
        }

        e.complete('success');
        
        if (paymentIntent.status === 'requires_action') {
          // Handle 3D Secure authentication if needed
          const { error, paymentIntent: updatedIntent } = 
            await stripe.confirmCardPayment(clientSecret);
            
          if (error) {
            console.error("Payment authentication error:", error);
            onPaymentError(error);
            toast({
              title: "Payment failed",
              description: error.message || "Authentication failed",
              variant: "destructive"
            });
            return;
          }
          
          onPaymentSuccess(updatedIntent);
          toast({
            title: "Payment successful!",
            description: "Your digital wallet payment has been processed."
          });
        } else {
          onPaymentSuccess(paymentIntent);
          toast({
            title: "Payment successful!",
            description: "Your digital wallet payment has been processed."
          });
        }
      } catch (err) {
        console.error('Payment failed:', err);
        e.complete('fail');
        onPaymentError(err);
        toast({
          title: "Payment failed",
          description: err instanceof Error ? err.message : "An error occurred processing your payment",
          variant: "destructive"
        });
      }
    });

    return () => {
      // Cleanup if needed
    };
  }, [stripe, elements, amount, currency, clientSecret, onPaymentSuccess, onPaymentError, metadata, toast]);

  if (!paymentRequest) {
    return null;
  }

  return (
    <div className="wallet-payment-buttons my-4">
      <h4 className="text-sm font-medium mb-2">Express Checkout</h4>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {paymentRequest && (
        <PaymentRequestButtonElement
          options={{
            paymentRequest,
            style: {
              paymentRequestButton: {
                type: 'buy',
                theme: 'dark',
                height: '40px',
              },
            },
          }}
        />
      )}
      
      <div className="text-xs text-gray-500 mt-2 text-center">
        Pay quickly with Apple Pay or Google Pay
      </div>
      
      <div className="my-4 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <div className="mx-4 text-xs text-gray-500">OR</div>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
    </div>
  );
};

export default WalletPaymentButtons;
