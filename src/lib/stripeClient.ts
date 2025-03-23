
import { loadStripe } from '@stripe/stripe-js';

// Use the publishable key from environment if available, or fallback to the test key
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51QdfYbD6fFdhmypRdytRqfBJKJ6QlNMHsbagEFdNwdZOtgNM5g3e4Qw3qV7GgCjNv9MVxSNkXQnWvCPuoNGO1jvF00WD7vxLHO';

// Initialize Stripe with the appropriate key
export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// Define the API endpoint for payment intent creation
export const createPaymentIntentUrl = import.meta.env.VITE_SUPABASE_URL 
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`
  : 'http://localhost:54321/functions/v1/create-payment-intent';

// Define the return type for createPaymentIntent
export type PaymentIntentResponse = 
  | { clientSecret: string; demoMode?: boolean }
  | { demoMode: true; message: string; error?: undefined }
  | { error: string; demoMode?: boolean };

// Function to call our Supabase Edge Function with improved error handling
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
    
    // Create an AbortController to handle timeouts
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout
    
    try {
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
        signal: controller.signal
      });
      
      // Clear the timeout now that we have a response
      clearTimeout(timeoutId);
      
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
        
        // Return demo mode for development/testing
        if (response.status >= 500 || response.status === 0) {
          console.log('Falling back to demo mode due to server error');
          return { 
            demoMode: true, 
            message: 'Demo mode active: payment processing simulated for testing' 
          };
        }
        
        return { error: errorMessage };
      }
      
      // Parse the JSON response
      try {
        const data = await response.json();
        console.log('Payment intent created successfully');
        
        return data;
      } catch (e) {
        console.error('Error parsing payment intent response:', e);
        
        // Fall back to demo mode if we can't parse the response
        return { 
          demoMode: true,
          message: 'Demo mode active: payment processing simulated for testing' 
        };
      }
    } catch (fetchError: any) {
      // Clear the timeout if there was an error
      clearTimeout(timeoutId);
      
      // Handle AbortController timeout or network errors
      if (fetchError.name === 'AbortError') {
        console.error('Request timed out');
        return { 
          demoMode: true, 
          message: 'Demo mode active: payment processing simulated for testing' 
        };
      }
      
      // Handle other fetch errors
      console.error('Fetch error:', fetchError);
      return { 
        demoMode: true, 
        message: 'Demo mode active: payment processing simulated for testing' 
      };
    }
  } catch (error) {
    console.error('Error creating payment intent:', error);
    
    // Always fall back to demo mode for any unhandled errors
    return {
      demoMode: true,
      message: 'Demo mode active: payment processing simulated for testing'
    };
  }
};
