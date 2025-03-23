
/**
 * Service for handling email-related functionality
 */

// API base URL with configurable endpoint for flexibility
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vwqnfnpnuatrfizrttrb.supabase.co/functions/v1';

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
 * Sends sample certificates to the provided email address
 * @param email The email address to send samples to
 * @returns Promise with the result of the operation
 */
export const sendSampleCertificates = async (email: string): Promise<EmailResponse> => {
  try {
    console.log(`Attempting to send samples to ${email}...`);
    
    // Create a controller to allow timeout and cancellation
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    // Add timestamp to prevent browser caching
    const timestamp = new Date().getTime();
    
    const response = await fetch(`${API_BASE_URL}/webhook-handler?t=${timestamp}`, {
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
      // Use specific CORS settings
      credentials: 'omit',
      mode: 'cors',
      cache: 'no-store'
    }).finally(() => clearTimeout(timeoutId));

    // Log status for debugging
    console.log('Response status:', response.status);
    
    // Try to parse the response
    let data;
    try {
      data = await response.json();
      console.log('Response data:', data);
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      throw new Error('Failed to parse server response');
    }

    if (!response.ok) {
      throw new Error(data?.error || `Failed with status: ${response.status}`);
    }

    console.log(`Samples successfully sent to ${email}`);
    return { success: true, data };
  } catch (err: any) {
    console.error('Error sending samples:', err);
    
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
