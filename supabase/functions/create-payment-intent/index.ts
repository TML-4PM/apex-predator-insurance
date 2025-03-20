
// Follow these steps to set up the Edge Function in Supabase:
// 1. Install Supabase CLI if you haven't already:
//    npm install -g supabase
// 2. Login to Supabase:
//    supabase login
// 3. Link your project (if not already done):
//    supabase link --project-ref your-project-ref
// 4. Add your Stripe secret key to Supabase secrets:
//    supabase secrets set STRIPE_SECRET_KEY=your_stripe_secret_key
// 5. Deploy the function: 
//    supabase functions deploy create-payment-intent --no-verify-jwt
// 6. Check deployment status:
//    supabase functions list

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@12.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Set to true for production
const ENABLE_PAYMENTS = true;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get Stripe key from environment
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    
    // If no key is set or payments are disabled, return demo mode response
    if (!stripeKey || !ENABLE_PAYMENTS) {
      console.log('Payment processing disabled or missing Stripe key');
      return new Response(
        JSON.stringify({ 
          demoMode: true,
          message: 'Payment processing is disabled or not configured' 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const { amount, metadata } = await req.json();

    if (!amount || amount <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid amount' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log payment attempt for monitoring (but don't log full card details)
    console.log(`Payment intent created for ${amount} cents, plan: ${metadata?.plan_name || 'unknown'}`);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      metadata: metadata || {},
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return the client secret to the client
    return new Response(
      JSON.stringify({ 
        clientSecret: paymentIntent.client_secret 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
