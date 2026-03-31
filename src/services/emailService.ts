/**
 * Email service for Apex Predator Insurance
 * Routes through SES Lambda - support@apexpredatorinsurance.com
 */

const SES_API_URL = "https://si2677twimnkiozadwtwvhrmte0xbdwz.lambda-url.ap-southeast-2.on.aws";
const SUPPORT_EMAIL = "support@apexpredatorinsurance.com";

export interface EmailResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Sends sample certificates to the provided email address
 */
export const sendSampleCertificates = async (email: string): Promise<EmailResponse> => {
  try {
    const response = await fetch(SES_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        from: SUPPORT_EMAIL,
        subject: "Your Apex Predator Insurance Sample Certificate",
        template: "apex-sample-certificate",
        template_data: { email }
      })
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return { success: true, data: { message: "Sample certificate sent! Check your email." } };
  } catch (err: any) {
    console.error('Error sending sample:', err);
    return {
      success: false,
      error: `Unable to send sample. Please email ${SUPPORT_EMAIL} directly.`
    };
  }
};
