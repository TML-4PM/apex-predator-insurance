import { loadStripe } from '@stripe/stripe-js';

// This is a publishable key which is safe to include in client-side code
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51QdfYbD6fFdhmypR798NoSCJ4G9TGCkqw9QTuiDTkyvmn9tSrhey2n3cTHxjFG6GYDlcoBClLWsDN5Mgjb0tIfII00oVKQ67in';

// Initialize Stripe with the appropriate key
export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// API endpoint for our Supabase function
export const createPaymentIntentUrl = import.meta.env.VITE_SUPABASE_URL 
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`
  : 'http://localhost:54321/functions/v1/create-payment-intent';

// Keep track of payment status to prevent duplicate submissions
let paymentInProgress = false;

// Define the return type for createPaymentIntent
export type PaymentIntentResponse = 
  | { clientSecret: string; demoMode?: boolean }
  | { demoMode: true; message: string; error?: undefined }
  | { error: string; demoMode?: boolean };

// Function to call our Supabase Edge Function
export const createPaymentIntent = async (amount: number, metadata: any): Promise<PaymentIntentResponse> => {
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
    
    // Add a timestamp to metadata to ensure uniqueness
    const enhancedMetadata = {
      ...metadata,
      timestamp: new Date().toISOString(),
    };
    
    // For testing/demo purposes, bypass the actual API call
    // This will force demo mode to be true
    return { demoMode: true, message: 'Running in demo mode for testing' };
    
    /* Commenting out the actual API call for now to ensure demo mode works
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
      paymentInProgress = false;
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
    */
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      error: error instanceof Error ? error.message : 'An unknown error occurred',
      demoMode: true, // Fallback to demo mode on error
    };
  } finally {
    // Reset payment flag after a short delay to prevent accidental double-clicks
    setTimeout(() => {
      paymentInProgress = false;
    }, 2000);
  }
};
