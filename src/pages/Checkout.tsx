
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { ShoppingCart, CreditCard, Shield } from 'lucide-react';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Replace with your own publishable key from your Stripe Dashboard
// For production, you would want to use your live key instead of test key
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

// This would normally be an API endpoint on your server
async function createPaymentIntent(amount: number, metadata: any) {
  // In production, this would make a request to your server
  console.log('Creating payment intent for amount:', amount, 'with metadata:', metadata);
  
  // For now, simulate a response from your server
  // In a real implementation, you would call your backend API here
  return {
    clientSecret: null, // Your server would return a real client secret
    error: "This is a demo implementation. To process real payments, you need to implement a server endpoint."
  };
}

const CheckoutForm = ({ plan, onSuccess }: { 
  plan: { id: string, name: string, price: number, icon: string },
  onSuccess: (data: FormValues) => void 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const handleSubmit = async (data: FormValues) => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setPaymentError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      // In a real implementation, you would:
      // 1. Call your backend to create a payment intent
      // 2. Get the client_secret from the response
      // 3. Use that to confirm the payment with stripe.confirmCardPayment

      const { clientSecret, error } = await createPaymentIntent(
        Math.round(plan.price * 100), // Convert to cents for Stripe
        { 
          plan_id: plan.id,
          plan_name: plan.name,
          customer_name: data.fullName,
          customer_email: data.email
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
        // For the demo, simulate a successful payment
        // In production, you would use stripe.confirmCardPayment with the client secret
        console.log('Demo mode: Simulating successful payment');
        
        toast({
          title: "Demo Mode",
          description: "In a real implementation, this would process a payment. Your certificate is ready to download.",
        });
        
        onSuccess(data);
        return;
      }

      // This code would be used in production:
      /*
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: data.fullName,
            email: data.email,
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
        
        onSuccess(data);
      }
      */
      
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your name (as it will appear on the certificate)" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="Where to send your certificate" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-apex-red" />
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
              <p className="font-medium">Demo Mode</p>
              <p>This is currently in demo mode. To process real payments, you'll need to:</p>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Set up a server with a Stripe payment endpoint</li>
                <li>Replace the test publishable key with your live key</li>
                <li>Implement the createPaymentIntent backend function</li>
              </ol>
            </AlertDescription>
          </Alert>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            * This is a novelty item, not actual insurance.
          </p>
        </div>
      </form>
    </Form>
  );
};

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormValues>({
    fullName: '',
    email: '',
  });

  // Use default plan if none was selected
  const selectedPlan = state?.plan || {
    id: 'shark',
    name: 'Shark Insurance',
    price: 9.99,
    icon: '🦈'
  };

  const handlePaymentSuccess = (data: FormValues) => {
    // Navigate to certificate page with user data
    navigate('/certificate', { 
      state: { 
        plan: selectedPlan,
        user: data
      } 
    });
  };

  return (
    <Layout>
      <div className="py-20 bg-[#1A1F2C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Complete Your Purchase</h1>
              <p className="text-lg text-white/70">You're just a few steps away from your Wildlife Shield certificate!</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 order-2 lg:order-1">
                <div className="bg-[#222222] rounded-xl shadow-lg border border-white/10 p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center text-white">
                    <ShoppingCart className="mr-2 h-5 w-5 text-apex-red" />
                    Your Information
                  </h2>
                  
                  <Elements stripe={stripePromise}>
                    <CheckoutForm 
                      plan={selectedPlan} 
                      onSuccess={handlePaymentSuccess} 
                    />
                  </Elements>
                </div>
              </div>
              
              <div className="lg:col-span-2 order-1 lg:order-2">
                <div className="sticky top-24">
                  <div className="bg-[#222222] rounded-xl p-6 border border-white/10">
                    <h2 className="text-xl font-bold mb-6 flex items-center text-white">
                      <Shield className="mr-2 h-5 w-5 text-apex-red" />
                      Order Summary
                    </h2>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{selectedPlan.icon}</span>
                        <span className="font-medium text-white">{selectedPlan.name}</span>
                      </div>
                      <span className="font-medium text-white">${selectedPlan.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-white/10 my-4 pt-4">
                      <div className="flex justify-between font-bold">
                        <span className="text-white">Total</span>
                        <span className="text-apex-red">${selectedPlan.price.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <p className="text-sm text-white/60 mb-4">
                        Certificate Preview:
                      </p>
                      <div className="transform scale-75 origin-top">
                        <div className="flex justify-center items-center h-full">
                          {/* Certificate Preview */}
                          <div className="border-2 border-apex-red/50 rounded-lg p-8 w-full h-full bg-[#111111] text-center text-white/80">
                            <h3 className="text-xl font-semibold mb-2">{selectedPlan.name}</h3>
                            <p>Issued to: {formData.fullName || "Your Name Here"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
