import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { createPaymentIntent, PaymentIntentResponse } from '@/lib/stripeClient';
import { CheckoutFormValues } from './CheckoutForm';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import WalletPaymentButtons from './WalletPaymentButtons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';

interface PaymentFormProps {
  plan: { id: string; name: string; price: number; icon: string };
  formData: CheckoutFormValues;
  onSuccess: (data: CheckoutFormValues) => void;
  isBundle?: boolean;
  resetCardElement: () => void;
  cartItems?: Array<{ id: string; name: string; price: number; icon: string }>;
  totalPrice?: number;
}

// List of countries for the country selector
const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
];

export const PaymentForm = ({ 
  plan, 
  formData, 
  onSuccess, 
  isBundle = false, 
  resetCardElement,
  cartItems = [],
  totalPrice
}: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [countryCode, setCountryCode] = useState('US');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { toast } = useToast();

  const finalPrice = totalPrice ?? (cartItems && cartItems.length > 0 
    ? cartItems.reduce((sum, item) => sum + item.price, 0) 
    : plan.price);

  useEffect(() => {
    setPaymentError(null);
  }, [formData]);

  useEffect(() => {
    if (formData.fullName && formData.fullName.length >= 2 && 
        formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  }, [formData]);

  // Function to handle payment errors
  const handlePaymentError = (error: any) => {
    console.error('Payment error:', error);
    setPaymentError(error instanceof Error ? error.message : "An unknown error occurred");
    toast({
      title: "Payment failed",
      description: error instanceof Error ? error.message : "Please try again or contact support.",
      variant: "destructive"
    });
    setIsLoading(false);
    
    // Navigate to failure page after a delay
    setTimeout(() => {
      navigate('/payment-failure');
    }, 2000);
  };

  // Function to handle successful payment
  const handlePaymentSuccess = (paymentIntent: any) => {
    setIsProcessed(true);
    toast({
      title: "Payment successful!",
      description: "Redirecting to your certificate...",
    });
    
    setTimeout(() => {
      // Navigate to success page with session ID
      const sessionId = paymentIntent.id;
      navigate(`/payment-success?session_id=${sessionId}`);
    }, 1500);
  };

  // Function to create a payment intent and get client secret
  const createIntent = async () => {
    if (!formData.fullName || !formData.email) {
      setPaymentError("Please complete all required fields");
      toast({
        title: "Form incomplete",
        description: "Please fill in all required information",
        variant: "destructive"
      });
      return null;
    }

    const paymentFormData = {
      fullName: formData.fullName,
      email: formData.email
    };

    const itemsMetadata = cartItems && cartItems.length > 0 
      ? {
          items: cartItems.map(item => item.id).join(','),
          items_count: cartItems.length,
          items_description: cartItems.map(item => item.name).join(', '),
          primary_plan_id: cartItems[0].id,
          primary_plan_name: cartItems[0].name,
        }
      : {
          plan_id: plan.id,
          plan_name: plan.name,
        };

    const paymentIntentResponse: PaymentIntentResponse = await createPaymentIntent(
      finalPrice,
      { 
        ...itemsMetadata,
        fullName: paymentFormData.fullName,
        customer_name: paymentFormData.fullName,
        customer_email: paymentFormData.email,
        email: paymentFormData.email,
        is_bundle: isBundle,
        timestamp: new Date().toISOString()
      },
      countryCode
    );

    console.log('Payment intent response:', paymentIntentResponse);

    if ('error' in paymentIntentResponse && paymentIntentResponse.error) {
      throw new Error(paymentIntentResponse.error);
    }

    if ('demoMode' in paymentIntentResponse && paymentIntentResponse.demoMode) {
      console.log('Demo mode active: Simulating successful payment');
      setIsDemoMode(true);
      return null; // No client secret in demo mode
    }
    
    if ('clientSecret' in paymentIntentResponse && paymentIntentResponse.clientSecret) {
      return paymentIntentResponse.clientSecret;
    }
    
    throw new Error("No client secret returned from the server");
  };

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

    setIsLoading(true);
    setPaymentError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      // Create or get client secret
      const secret = clientSecret || await createIntent();
      
      // Set client secret in state for reuse
      if (secret && !clientSecret) {
        setClientSecret(secret);
      }

      // Handle demo mode
      if (isDemoMode) {
        setTimeout(() => {
          toast({
            title: "Payment Successful! (Demo)",
            description: "Redirecting to your certificate...",
          });
          
          setIsProcessed(true);
          setTimeout(() => {
            onSuccess(formData);
          }, 1500);
        }, 1000);
        
        return;
      }
      
      // Process payment if not in demo mode and we have a client secret
      if (secret) {
        console.log("Confirming card payment with secret");

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(secret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: formData.fullName,
              email: formData.email,
            },
          },
        });

        if (confirmError) {
          console.error('Payment confirmation error:', confirmError);
          throw new Error(confirmError.message);
        }

        console.log('Payment intent result:', paymentIntent);

        if (paymentIntent.status === 'succeeded') {
          handlePaymentSuccess(paymentIntent);
        } else if (paymentIntent.status === 'requires_action') {
          const { error, paymentIntent: updatedIntent } = await stripe.confirmCardPayment(secret);
          
          if (error) {
            throw new Error(`Authentication failed: ${error.message}`);
          }
          
          if (updatedIntent.status === 'succeeded') {
            handlePaymentSuccess(updatedIntent);
          } else {
            throw new Error(`Payment failed with status: ${updatedIntent.status}`);
          }
        } else {
          throw new Error(`Payment failed with status: ${paymentIntent.status}`);
        }
      } else if (!isDemoMode) {
        throw new Error("Could not create payment intent");
      }
    } catch (error) {
      handlePaymentError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isProcessed) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-green-500 mb-4">
          <CheckCircle2 size={64} />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">Payment Successful!</h3>
        <p className="text-white/70 mb-4">Your certificate is being prepared...</p>
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
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              {paymentError}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="mb-4">
          <Label>Country</Label>
          <Select 
            value={countryCode} 
            onValueChange={(value) => {
              setCountryCode(value);
              // Reset client secret when country changes
              setClientSecret(null);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">
            Available payment methods will be determined by your country
          </p>
        </div>

        {/* Digital Wallet Payment Buttons */}
        {stripe && elements && formComplete && (
          <WalletPaymentButtons
            amount={finalPrice}
            currency="usd"
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
            clientSecret={clientSecret}
            metadata={{
              fullName: formData.fullName,
              email: formData.email
            }}
          />
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
          disabled={isLoading || !stripe || !formComplete}
        >
          {isLoading ? (
            <div className="flex items-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing Payment...
            </div>
          ) : (
            <>
              Pay ${finalPrice.toFixed(2)}
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
        
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal and Credit Card" className="h-6" />
          <img src="https://www.mastercard.us/content/dam/mccom/global/logos/logo-mastercard-mobile.svg" alt="Mastercard" className="h-6" />
          <img src="https://www.visa.com.au/dam/VCOM/regional/ap/australia/global-elements/images/au-visa-gold-badge.png" alt="Visa" className="h-6" />
          <img src="https://www.americanexpress.com/content/dam/amex/us/merchant/supplies-uplift/logos/amex-logo-color-small.png" alt="American Express" className="h-6" />
          <img src="https://cdn.worldvectorlogo.com/logos/apple-pay.svg" alt="Apple Pay" className="h-6" />
          <img src="https://developers.google.com/static/pay/api/images/brand-guidelines/google-pay-mark.png" alt="Google Pay" className="h-6" />
        </div>
        
        <p className="text-xs text-gray-500 mt-4 text-center">
          * This is a real insurance product with a $50,000 accidental death benefit.
        </p>
      </div>
    </form>
  );
};
