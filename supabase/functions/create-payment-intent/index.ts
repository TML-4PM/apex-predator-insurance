
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@12.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enable payments for real transactions - set to true when connected to a real Stripe account
const ENABLE_PAYMENTS = false;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get Stripe key from environment - use a fallback only if not in production
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    
    // Check if we have a valid key for processing payments
    if (!stripeKey || !ENABLE_PAYMENTS) {
      console.log('Payment processing in demo mode - no valid Stripe key found');
      return new Response(
        JSON.stringify({ 
          demoMode: true,
          message: 'Payment processing is in demo mode. Your certificate will be generated without real payment.' 
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

    // Validate required metadata
    if (!metadata || !metadata.fullName || !metadata.email) {
      return new Response(
        JSON.stringify({ error: 'Missing required customer information' }),
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
      receipt_email: metadata.email,
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
      JSON.stringify({ 
        error: error.message,
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
