
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-DONATION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    // Parse request body
    const { amount, donorEmail, donorName, message, isAnonymous } = await req.json();
    logStep("Request data received", { amount, donorEmail, donorName: donorName || 'Anonymous', isAnonymous });

    if (!amount || amount <= 0) {
      throw new Error("Invalid donation amount");
    }

    if (!donorEmail) {
      throw new Error("Donor email is required");
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    logStep("Stripe initialized");

    // Check if customer exists
    const customers = await stripe.customers.list({ email: donorEmail, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: donorEmail,
        name: isAnonymous ? undefined : donorName,
      });
      customerId = customer.id;
      logStep("New customer created", { customerId });
    }

    // Create checkout session for one-time donation
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Donation to Apex Predator Insurance",
              description: message ? `Message: ${message}` : "Supporting adventurer protection worldwide",
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/donate?success=true`,
      cancel_url: `${req.headers.get("origin")}/donate?canceled=true`,
      metadata: {
        donorName: isAnonymous ? "Anonymous" : (donorName || "Unknown"),
        donorEmail,
        message: message || "",
        isAnonymous: isAnonymous ? "true" : "false",
      },
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    // Store donation record in Supabase
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { error: insertError } = await supabaseClient
      .from("donations")
      .insert({
        amount: Math.round(amount * 100), // Store in cents
        currency: "usd",
        status: "pending",
        donor_email: donorEmail,
        stripe_session_id: session.id,
      });

    if (insertError) {
      console.warn("Failed to store donation record:", insertError);
      // Continue anyway - the payment can still proceed
    } else {
      logStep("Donation record stored in database");
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-donation-session", { message: errorMessage });
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
