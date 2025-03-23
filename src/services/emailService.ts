
/**
 * Service for handling email-related functionality
 */

/**
 * Sends sample certificates to the provided email address
 * @param email The email address to send samples to
 * @returns Promise with the result of the operation
 */
export const sendSampleCertificates = async (email: string): Promise<{
  success: boolean;
  data?: any;
  error?: string;
  isNetworkError?: boolean;
}> => {
  try {
    console.log(`Attempting to send samples to ${email}...`);
    
    // Add timestamp to prevent browser caching
    const timestamp = new Date().getTime();
    
    const response = await fetch(`https://vwqnfnpnuatrfizrttrb.supabase.co/functions/v1/webhook-handler?t=${timestamp}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        action: 'send_samples',
        email
      })
    });

    // Log full response for debugging
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
    return { 
      success: false, 
      error: err.message,
      isNetworkError: err.message.includes('Failed to fetch')
    };
  }
};
