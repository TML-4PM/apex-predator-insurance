
// Follow these steps to set up the Stripe Webhook handler Edge Function:
// 1. Install Supabase CLI if you haven't already:
//    npm install -g supabase
// 2. Login to Supabase:
//    supabase login
// 3. Link your project (if not already done):
//    supabase link --project-ref your-project-ref
// 4. Add your Stripe secret key and webhook secret to Supabase secrets:
//    supabase secrets set STRIPE_SECRET_KEY=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
//    supabase secrets set STRIPE_WEBHOOK_SECRET=your_webhook_signing_secret
// 5. Deploy the function: 
//    supabase functions deploy webhook-handler --no-verify-jwt
// 6. Setup webhook in Stripe dashboard pointing to:
//    https://your-project-ref.supabase.co/functions/v1/webhook-handler

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@12.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    if (!signature) {
      throw new Error('Missing Stripe signature');
    }

    let event;
    
    // Verify webhook signature if secret is set
    if (webhookSecret) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return new Response(
          JSON.stringify({ error: 'Invalid signature' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } else {
      // For development/testing without a webhook secret
      event = JSON.parse(body);
      console.warn('No webhook secret provided. Skipping signature verification.');
    }

    // Handle specific webhook events
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent ${paymentIntent.id} succeeded`);
        
        // Extract customer information from metadata
        const { customer_name, customer_email, plan_id, plan_name } = paymentIntent.metadata;
        
        // Here you would typically:
        // 1. Record the successful payment in your database
        // 2. Send confirmation email to customer
        // 3. Generate certificate or digital goods
        // 4. Update inventory or subscription status
        
        console.log(`Payment received from ${customer_name} (${customer_email}) for ${plan_name}`);
        
        break;
        
      case 'payment_intent.payment_failed':
        const failedPaymentIntent = event.data.object;
        console.error(`Payment failed: ${failedPaymentIntent.id}`);
        
        // Handle failed payment - notify admins, update database, etc.
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
