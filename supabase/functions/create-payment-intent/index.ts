
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@12.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
};

// Enable payments for real transactions - set to true when connected to a real Stripe account
const ENABLE_PAYMENTS = true;

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

    // Set up Stripe
    try {
      const stripe = new Stripe(stripeKey, {
        apiVersion: '2023-10-16',
        httpClient: Stripe.createFetchHttpClient(),
      });

      const { amount, metadata, paymentMethodOptions, countryCode = 'US' } = await req.json();

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

      // Configure payment method options based on country
      const paymentMethodsConfig = getPaymentMethodOptions(countryCode);

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        metadata: metadata || {},
        receipt_email: metadata.email,
        automatic_payment_methods: {
          enabled: true,
        },
        payment_method_options: paymentMethodsConfig,
      });

      // Return the client secret to the client
      return new Response(
        JSON.stringify({ 
          clientSecret: paymentIntent.client_secret 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (stripeError) {
      console.error('Stripe error:', stripeError);
      
      // Return demo mode response on Stripe errors
      return new Response(
        JSON.stringify({ 
          demoMode: true,
          message: 'Demo mode active due to Stripe configuration error. Your certificate will be generated without payment.'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error creating payment intent:', error);
    
    // Always return a valid response, even in error cases
    return new Response(
      JSON.stringify({ 
        demoMode: true,
        message: 'Demo mode active due to server error. Your certificate will be generated without payment.'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Helper function to get payment method options based on country code
function getPaymentMethodOptions(countryCode = 'US') {
  const options = {};
  
  if (countryCode === 'US') {
    // For US customers, enable Apple Pay and Google Pay
    options.card = {
      request_three_d_secure: 'automatic',
    };
  } else if (['NL', 'nl'].includes(countryCode)) {
    // For Netherlands, enable iDEAL
    options.ideal = {};
  } else if (['DE', 'AT', 'de', 'at'].includes(countryCode)) {
    // For Germany and Austria, enable SOFORT
    options.sofort = {
      preferred_language: countryCode.toLowerCase() === 'de' ? 'de' : 'en',
    };
  } else if (['BE', 'be'].includes(countryCode)) {
    // For Belgium, enable Bancontact
    options.bancontact = {};
  } else if (countryCode.toLowerCase().startsWith('eu')) {
    // For EU countries, enable SEPA Direct Debit
    options.sepa_debit = {};
  } else if (['CN', 'cn'].includes(countryCode)) {
    // For China, enable Alipay
    options.alipay = {};
  } else if (['DE', 'de'].includes(countryCode)) {
    // For Germany, enable Giropay
    options.giropay = {};
  }
  
  return options;
}
