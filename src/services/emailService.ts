
/**
 * Service for handling email-related functionality with fallback mechanisms
 */

// Set up API endpoints with fallbacks
const PRIMARY_API_URL = import.meta.env.VITE_API_BASE_URL || 'https://vwqnfnpnuatrfizrttrb.supabase.co/functions/v1';
const FALLBACK_API_URL = 'https://formspree.io/f/xayrpara'; // Formspree as fallback

/**
 * Types for email service responses
 */
export interface EmailResponse {
  success: boolean;
  data?: any;
  error?: string;
  isNetworkError?: boolean;
}

/**
 * Sends sample certificates to the provided email address with a fallback strategy
 * @param email The email address to send samples to
 * @returns Promise with the result of the operation
 */
export const sendSampleCertificates = async (email: string): Promise<EmailResponse> => {
  console.log(`Attempting to send samples to ${email}...`);
  
  // First try the primary API
  try {
    const result = await sendWithPrimaryAPI(email);
    if (result.success) {
      return result;
    }
    
    // If primary fails with network error, try fallback
    if (result.isNetworkError) {
      console.log('Primary API failed with network error, trying fallback...');
      return await sendWithFallbackAPI(email);
    }
    
    // If it's not a network error, return the error from primary
    return result;
  } catch (err) {
    console.error('Error in primary send flow:', err);
    // For any unexpected error, try the fallback
    return await sendWithFallbackAPI(email);
  }
};

/**
 * Attempt to send via primary API (Supabase function)
 */
const sendWithPrimaryAPI = async (email: string): Promise<EmailResponse> => {
  try {
    // Create a controller to allow timeout and cancellation
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout - reduced from 10s
    
    const timestamp = new Date().getTime();
    
    const response = await fetch(`${PRIMARY_API_URL}/webhook-handler?t=${timestamp}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        action: 'send_samples',
        email
      }),
      signal: controller.signal,
      // Simplified CORS settings
      mode: 'cors',
      cache: 'no-store'
    }).finally(() => clearTimeout(timeoutId));

    console.log('Primary API response status:', response.status);
    
    const data = await response.json();
    console.log('Primary API response data:', data);

    if (!response.ok) {
      throw new Error(data?.error || `Failed with status: ${response.status}`);
    }

    console.log(`Samples successfully sent to ${email} via primary API`);
    return { success: true, data };
  } catch (err: any) {
    console.error('Error sending samples via primary API:', err);
    
    // Improved network error detection
    const isNetworkError = 
      err.name === 'AbortError' ||
      err.message.includes('Failed to fetch') || 
      err.message.includes('NetworkError') || 
      err.message.includes('Network request failed') ||
      err.name === 'TypeError';
    
    return { 
      success: false, 
      error: isNetworkError ? 
        'Network connection error. The service might be temporarily unavailable.' : 
        err.message,
      isNetworkError
    };
  }
};

/**
 * Fallback method using Formspree (or could be modified to use a different service)
 */
const sendWithFallbackAPI = async (email: string): Promise<EmailResponse> => {
  try {
    console.log(`Attempting fallback send to ${email}...`);
    
    // Create a controller to allow timeout and cancellation
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
    
    // Send to Formspree as a fallback
    const response = await fetch(FALLBACK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email,
        message: 'Request for sample certificates',
        _subject: 'Sample Certificate Request'
      }),
      signal: controller.signal
    }).finally(() => clearTimeout(timeoutId));
    
    console.log('Fallback API response status:', response.status);
    
    // Parse the response if possible
    let data;
    try {
      data = await response.json();
      console.log('Fallback API response data:', data);
    } catch (parseError) {
      console.warn('Non-JSON response from fallback:', parseError);
      // Continue without data - a non-JSON response doesn't mean failure
    }

    if (!response.ok) {
      throw new Error(data?.error || `Fallback failed with status: ${response.status}`);
    }

    console.log(`Request processed via fallback for ${email}`);
    return { 
      success: true, 
      data: {
        message: "Your request for samples has been received. Please check your email shortly.",
        usedFallback: true
      }
    };
  } catch (err: any) {
    console.error('Error with fallback method:', err);
    
    return { 
      success: false, 
      error: 'All available methods failed. Please try again later or contact support.',
      isNetworkError: false // We've already tried our fallback
    };
  }
};
