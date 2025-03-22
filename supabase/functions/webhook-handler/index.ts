import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@12.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Use a real email sending function with SendGrid
async function sendEmail(to: string, subject: string, body: string) {
  const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');
  
  if (!SENDGRID_API_KEY) {
    console.log(`[MOCK EMAIL] TO: ${to}`);
    console.log(`[MOCK EMAIL] SUBJECT: ${subject}`);
    console.log(`[MOCK EMAIL] BODY: ${body.substring(0, 100)}...`);
    return { success: true, id: `mock_email_${Date.now()}` };
  }
  
  try {
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
    
    return { success: true, id: `email_${Date.now()}` };
  } catch (error) {
    console.error('SendGrid error:', error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get Stripe key from environment
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    if (!stripeKey) {
      throw new Error('Missing Stripe API key');
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Get request body
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    // For logging purposes
    console.log("Webhook received:", body.substring(0, 200) + "...");

    let event;
    
    // Verify webhook signature if secret is set
    if (webhookSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        console.log("Webhook signature verified");
      } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return new Response(
          JSON.stringify({ error: 'Invalid signature' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } else {
      // For development/testing without a webhook secret
      try {
        event = JSON.parse(body);
        console.warn('No webhook secret provided or missing signature. Skipping signature verification.');
      } catch (err) {
        console.error("Error parsing webhook body:", err);
        return new Response(
          JSON.stringify({ error: 'Invalid webhook payload' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    console.log(`Processing webhook event: ${event.type}`);

    // Handle specific webhook events
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent ${paymentIntent.id} succeeded`);
        
        // Extract customer information from metadata
        const { customer_name, customer_email, plan_id, plan_name, fullName, email } = paymentIntent.metadata;
        
        // Use fallbacks for metadata fields that might come in different formats
        const customerName = fullName || customer_name || 'Customer';
        const customerEmail = email || customer_email || '';
        
        // Send confirmation email to customer
        if (customerEmail) {
          try {
            await sendEmail(
              customerEmail,
              `Your Apex Predator Certificate: ${plan_name}`,
              `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #f42424; padding: 20px; text-align: center;">
                  <h1 style="color: white; margin: 0;">Apex Predator Insurance</h1>
                </div>
                <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none;">
                  <h2>Thank you for your purchase, ${customerName}!</h2>
                  <p>Your certificate for <strong>${plan_name}</strong> is ready to download from your account.</p>
                  <p>You can access your certificate by logging into our website or clicking the button below:</p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="https://apex-predator-insurance.lovable.app/certificate?plan=${plan_id}" 
                      style="background-color: #f42424; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                      Download Your Certificate
                    </a>
                  </div>
                  <p>If you have any questions, please email us at info@apexpredatorinsurance.com</p>
                  <p>Happy surviving!</p>
                  <p>The Apex Predator Team</p>
                </div>
                <div style="background-color: #f8f8f8; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                  <p>This is a novelty certificate and does not provide any actual insurance coverage.</p>
                  <p>&copy; ${new Date().getFullYear()} Apex Predator Insurance. All rights reserved.</p>
                </div>
              </div>
              `
            );
            console.log(`Confirmation email sent to ${customerEmail}`);
          } catch (emailError) {
            console.error('Error sending confirmation email:', emailError);
          }
        }
        
        // Also send notification to admins
        try {
          await sendEmail(
            'info@apexpredatorinsurance.com',
            'New Certificate Purchase!',
            `
            <div style="font-family: Arial, sans-serif;">
              <h2>New Purchase Alert</h2>
              <p>A new certificate has been purchased:</p>
              <ul>
                <li><strong>Customer:</strong> ${customerName}</li>
                <li><strong>Email:</strong> ${customerEmail}</li>
                <li><strong>Plan:</strong> ${plan_name}</li>
                <li><strong>Amount:</strong> $${(paymentIntent.amount / 100).toFixed(2)}</li>
                <li><strong>Date:</strong> ${new Date().toLocaleString()}</li>
              </ul>
            </div>
            `
          );
        } catch (emailError) {
          console.error('Error sending admin notification email:', emailError);
        }
        
        break;
        
      case 'payment_intent.payment_failed':
        const failedPaymentIntent = event.data.object;
        console.error(`Payment failed: ${failedPaymentIntent.id}`);
        
        // Extract customer information with fallbacks
        const failedCustomerEmail = failedPaymentIntent.metadata?.email || 
                                    failedPaymentIntent.metadata?.customer_email || '';
        
        const failedCustomerName = failedPaymentIntent.metadata?.fullName || 
                                   failedPaymentIntent.metadata?.customer_name || 'there';
        
        // Send failure notification to customer if we have their email
        if (failedCustomerEmail) {
          try {
            await sendEmail(
              failedCustomerEmail,
              'Your Apex Predator Payment Was Not Successful',
              `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #f42424; padding: 20px; text-align: center;">
                  <h1 style="color: white; margin: 0;">Apex Predator Insurance</h1>
                </div>
                <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none;">
                  <h2>Payment Unsuccessful</h2>
                  <p>Hello ${failedCustomerName},</p>
                  <p>We're sorry, but your recent payment for an Apex Predator certificate was not successful.</p>
                  <p>This could be due to:</p>
                  <ul>
                    <li>Insufficient funds</li>
                    <li>Expired card details</li>
                    <li>Card declined by your bank</li>
                  </ul>
                  <p>Please try again with a different payment method or contact your bank for more details.</p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="https://apex-predator-insurance.lovable.app/plans" 
                      style="background-color: #f42424; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                      Try Again
                    </a>
                  </div>
                  <p>If you need assistance, please email us at info@apexpredatorinsurance.com</p>
                  <p>The Apex Predator Team</p>
                </div>
              </div>
              `
            );
            console.log(`Payment failure email sent to ${failedCustomerEmail}`);
          } catch (emailError) {
            console.error('Error sending payment failure email:', emailError);
          }
        }
        
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return success response
    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
