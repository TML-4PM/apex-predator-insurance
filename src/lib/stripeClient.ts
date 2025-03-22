
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

// Keep track of payment status to prevent duplicate submissions
let paymentInProgress = false;

// Function to call our Supabase Edge Function
export const createPaymentIntent = async (amount: number, metadata: any) => {
  try {
    // Prevent duplicate payment submissions
    if (paymentInProgress) {
      console.log('Payment already in progress, preventing duplicate submission');
      return { error: 'Payment already in progress. Please wait.' };
    }
    
    paymentInProgress = true;
    console.log('Creating payment intent with amount:', amount, 'metadata:', metadata);
    
    // Validate the metadata to ensure we have necessary information
    if (!metadata.fullName || !metadata.email) {
      console.error('Missing required metadata for payment:', metadata);
      paymentInProgress = false;
      return { error: 'Missing required information. Please fill in all fields.' };
    }
    
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
      paymentInProgress = false;
      return { error: errorMessage };
    }

    // Parse the JSON response
    try {
      const data = await response.json();
      console.log('Payment intent created successfully');
      
      // Send a confirmation email in production
      if (metadata.email && metadata.fullName) {
        console.log(`In production, an email would be sent to ${metadata.email} for ${metadata.fullName}`);
        // This would normally send an email via a backend service
      }
      
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
  } finally {
    // Reset payment flag after a short delay to prevent accidental double-clicks
    setTimeout(() => {
      paymentInProgress = false;
    }, 2000);
  }
};
