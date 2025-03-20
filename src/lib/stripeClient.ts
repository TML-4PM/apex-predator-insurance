
import { loadStripe } from '@stripe/stripe-js';

// You should replace this with your actual Stripe publishable key
// This is a publishable key which is safe to include in client-side code
const STRIPE_PUBLISHABLE_KEY = 'pk_test_mockedkeyforyourdevandstagingenvironments';

// Initialize Stripe with the appropriate key
export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// API endpoint for our Supabase function
export const createPaymentIntentUrl = import.meta.env.VITE_SUPABASE_URL 
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`
  : 'http://localhost:54321/functions/v1/create-payment-intent';

// Function to call our Supabase Edge Function
export const createPaymentIntent = async (amount: number, metadata: any) => {
  try {
    // Call the actual API endpoint
    const response = await fetch(createPaymentIntentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents for Stripe
        metadata,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create payment intent');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};
