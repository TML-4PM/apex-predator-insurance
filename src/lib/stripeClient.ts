
import { loadStripe } from '@stripe/stripe-js';

// Use a conditional to differentiate between environments
// In production, use your real Stripe publishable key
// For development/demo, use a placeholder key
const STRIPE_PUBLISHABLE_KEY = 
  window.location.hostname === 'apexpredatorinsurance.com' 
    ? 'pk_live_51QdfYbD6fFdhmypR798NoSCJ4G9TGCkqw9QTuiDTkyvmn9tSrhey2n3cTHxjFG6GYDlcoBClLWsDN5Mgjb0tIfII00oVKQ67in'
    : 'pk_test_mockedkeyforyourdevandstagingenvironments';

// Initialize Stripe with the appropriate key
export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// API endpoint for our Supabase function - dynamically determine based on environment
export const createPaymentIntentUrl = import.meta.env.VITE_SUPABASE_URL 
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`
  : 'http://localhost:54321/functions/v1/create-payment-intent';

// Function to call our Supabase Edge Function
export const createPaymentIntent = async (amount: number, metadata: any) => {
  try {
    // For production, we'll make the actual API call
    // For development/demo, we can use a placeholder response
    if (window.location.hostname !== 'apexpredatorinsurance.com' && !import.meta.env.VITE_FORCE_PAYMENT_API) {
      console.log('Demo mode: Skipping payment intent creation');
      // Return a mock successful response for development
      return { clientSecret: null, demoMode: true };
    }
    
    const response = await fetch(createPaymentIntentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include any authorization headers if needed
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
