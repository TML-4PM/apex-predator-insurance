
import { loadStripe } from '@stripe/stripe-js';

// Use real Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51QdfYbD6fFdhmypRdytRqfBJKJ6QlNMHsbagEFdNwdZOtgNM5g3e4Qw3qV7GgCjNv9MVxSNkXQnWvCPuoNGO1jvF00WD7vxLHO';

// Initialize Stripe with the appropriate key
export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// API endpoint for our Supabase function
export const createPaymentIntentUrl = import.meta.env.VITE_SUPABASE_URL 
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`
  : 'http://localhost:54321/functions/v1/create-payment-intent';

// Define the return type for createPaymentIntent
export type PaymentIntentResponse = 
  | { clientSecret: string; demoMode?: boolean }
  | { demoMode: true; message: string; error?: undefined }
  | { error: string; demoMode?: boolean };

// Function to call our Supabase Edge Function
export const createPaymentIntent = async (amount: number, metadata: any): Promise<PaymentIntentResponse> => {
  try {
    console.log('Creating payment intent with amount:', amount, 'metadata:', metadata);
    
    // Validate the metadata to ensure we have necessary information
    if (!metadata.fullName || !metadata.email) {
      console.error('Missing required metadata for payment:', metadata);
      return { error: 'Missing required information. Please fill in all fields.' };
    }
    
    // Add a timestamp to metadata to ensure uniqueness
    const enhancedMetadata = {
      ...metadata,
      timestamp: new Date().toISOString(),
    };
    
    // Call the actual API endpoint
    const response = await fetch(createPaymentIntentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents for Stripe
        metadata: enhancedMetadata,
      }),
    });

    // Log the response status
    console.log('Payment intent response status:', response.status);
    
    // Handle network errors and non-JSON responses
    if (!response.ok) {
      let errorMessage = 'Failed to create payment intent';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        // If the response is not JSON, use the status text
        errorMessage = `Payment service error: ${response.status} ${response.statusText}`;
      }
      
      console.error('Payment intent error:', errorMessage);
      return { error: errorMessage };
    }

    // Parse the JSON response
    try {
      const data = await response.json();
      console.log('Payment intent created successfully');
      
      return data;
    } catch (e) {
      console.error('Error parsing payment intent response:', e);
      return { error: 'Invalid response from payment service' };
    }
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};
