
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Comprehensive CORS headers for broader compatibility
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, accept, origin, x-requested-with',
  'Access-Control-Max-Age': '86400',
};

// SendGrid API key
const SENDGRID_API_KEY = "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";

// Improved email sending function with better error handling and logging
async function sendEmail(to: string, subject: string, body: string) {
  if (!SENDGRID_API_KEY) {
    console.log(`[MOCK EMAIL] TO: ${to}`);
    console.log(`[MOCK EMAIL] SUBJECT: ${subject}`);
    console.log(`[MOCK EMAIL] BODY: ${body.substring(0, 100)}...`);
    return { success: true, id: `mock_email_${Date.now()}` };
  }
  
  try {
    console.log(`Sending email to ${to} with subject "${subject}"`);
    
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SENDGRID_API_KEY}`
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: to }],
            subject: subject,
          }
        ],
        from: { email: 'info@apexpredatorinsurance.com', name: 'Apex Predator Insurance' },
        content: [
          {
            type: 'text/html',
            value: body
          }
        ]
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`SendGrid API error: ${response.status} ${errorText}`);
      throw new Error(`Email sending failed: ${response.status}`);
    }
    
    console.log(`Successfully sent email to ${to}`);
    return { success: true, id: `email_${Date.now()}` };
  } catch (error) {
    console.error('SendGrid error:', error);
    throw error;
  }
}

// Function to send sample certificates - simplified HTML for better compatibility
async function sendSampleCertificates(email: string) {
  console.log(`Preparing sample certificates for ${email}`);
  
  const predatorTypes = [
    { name: "Shark Insurance", icon: "🦈" },
    { name: "Crocodile Insurance", icon: "🐊" },
    { name: "Lion Insurance", icon: "🦁" },
    { name: "Bear Insurance", icon: "🐻" }
  ];
  
  // Simplified HTML for better email client compatibility
  let certificatesHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #f42424; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Apex Predator Insurance</h1>
      </div>
      <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none;">
        <h2>Sample Certificates</h2>
        <p>Here are sample certificates for our various predator insurance plans:</p>
  `;
  
  // Add each certificate preview
  predatorTypes.forEach(predator => {
    certificatesHtml += `
      <div style="margin-bottom: 30px; border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #f8f8f8;">
        <h3 style="color: #f42424; display: flex; align-items: center;">
          <span style="font-size: 24px; margin-right: 10px;">${predator.icon}</span>
          ${predator.name}
        </h3>
        <p>Sample certificate for protection against ${predator.name.replace(' Insurance', '')} attacks.</p>
        <div style="background-color: #fff; border: 1px solid #eee; padding: 10px; margin-top: 10px; border-radius: 4px;">
          <p style="margin: 0; font-weight: bold;">Certificate Value: $50,000</p>
          <p style="margin: 5px 0 0; font-size: 12px; color: #666;">This is a sample certificate. Visit our website to purchase.</p>
        </div>
      </div>
    `;
  });
  
  // Complete the email HTML
  certificatesHtml += `
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://apex-predator-insurance.lovable.app/plans" 
            style="background-color: #f42424; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            View All Plans
          </a>
        </div>
        <p>Thank you for your interest in Apex Predator Insurance!</p>
        <p>The Apex Predator Team</p>
      </div>
      <div style="background-color: #f8f8f8; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p>This is a novelty certificate and does not provide any actual insurance coverage.</p>
        <p>&copy; ${new Date().getFullYear()} Apex Predator Insurance. All rights reserved.</p>
      </div>
    </div>
  `;
  
  // Send the email
  return await sendEmail(
    email,
    "Apex Predator Insurance: Sample Certificates",
    certificatesHtml
  );
}

serve(async (req) => {
  console.log(`Received ${req.method} request to webhook-handler`);
  
  // Enhanced CORS handling
  if (req.method === 'OPTIONS') {
    console.log("Responding to OPTIONS request with CORS headers");
    return new Response('ok', { 
      headers: corsHeaders,
      status: 200
    });
  }

  try {
    // Check if this is a sample certificates request
    if (req.method === 'POST') {
      const contentType = req.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const requestData = await req.json();
        
        // Handle sample certificates request
        if (requestData.action === 'send_samples' && requestData.email) {
          console.log(`Processing send_samples request for email: ${requestData.email}`);
          
          try {
            const result = await sendSampleCertificates(requestData.email);
            
            console.log(`Sample certificates sent successfully to ${requestData.email}`);
            return new Response(
              JSON.stringify({ 
                success: true, 
                message: `Sample certificates sent to ${requestData.email}` 
              }),
              { 
                status: 200, 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
              }
            );
          } catch (emailError) {
            console.error(`Error sending sample certificates: ${emailError.message}`);
            return new Response(
              JSON.stringify({ 
                success: false, 
                error: `Failed to send sample certificates: ${emailError.message}` 
              }),
              { 
                status: 500, 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
              }
            );
          }
        }
      }
    }
    
    // Standard webhook processing for Stripe events or other actions would go here
    // Simplified for the current focus on email functionality
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Invalid request or action not supported" 
      }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Unknown server error" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
