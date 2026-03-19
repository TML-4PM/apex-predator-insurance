import { loadStripe } from '@stripe/stripe-js';

// IMPORTANT: Set VITE_STRIPE_PUBLISHABLE_KEY in Lovable project env to your pk_live_ key.
// Get it from: Stripe Dashboard → Developers → API keys
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
  'pk_test_51QdfYbD6fFdhmypRdytRqfBJKJ6QlNMHsbagEFdNwdZOtgNM5g3e4Qw3qV7GgCjNv9MVxSNkXQnWvCPuoNGO1jvF00WD7vxLHO';

export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY, {
  apiVersion: '2023-10-16',
  locale: 'auto',
});

export const createPaymentIntentUrl = import.meta.env.VITE_SUPABASE_URL
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`
  : 'http://localhost:54321/functions/v1/create-payment-intent';

export type PaymentIntentResponse =
  | { clientSecret: string; demoMode?: boolean }
  | { demoMode: true; message: string; error?: undefined }
  | { error: string; demoMode?: boolean };

type PaymentMethodConfig = { enabled: boolean; countries?: string[] };

export const getAvailablePaymentMethods = (countryCode = 'AU') => {
  const methodsConfig = configurePaymentMethodOptions();
  return Object.entries(methodsConfig)
    .filter(([_, config]) =>
      config.enabled &&
      (!config.countries || config.countries.includes(countryCode.toLowerCase()))
    )
    .map(([method]) => method);
};

export const configurePaymentMethodOptions = (): Record<string, PaymentMethodConfig> => ({
  card: { enabled: true },
  apple_pay: { enabled: true, countries: ['us','ca','au','nz','jp','sg','hk','tw','gb','fr','es','it','de'] },
  google_pay: { enabled: true, countries: ['us','ca','au','nz','jp','sg','hk','tw','gb','fr','es','it','de'] },
});

export const createPaymentIntent = async (amount: number, metadata: any, countryCode = 'AU'): Promise<PaymentIntentResponse> => {
  try {
    if (!metadata.fullName || !metadata.email) {
      return { error: 'Missing required information. Please fill in all fields.' };
    }

    const enhancedMetadata = {
      ...metadata,
      timestamp: new Date().toISOString(),
      success_url: 'https://apexpredatorinsurance.com/covered',
      cancel_url: 'https://apexpredatorinsurance.com/cover-options',
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(createPaymentIntentUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        metadata: enhancedMetadata,
        paymentMethodOptions: configurePaymentMethodOptions(),
        countryCode,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = 'Failed to create payment intent';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {}
      if (response.status >= 500 || response.status === 0) {
        return { demoMode: true, message: 'Demo mode active: payment processing simulated for testing' };
      }
      return { error: errorMessage };
    }

    try {
      return await response.json();
    } catch {
      return { demoMode: true, message: 'Demo mode active: payment processing simulated for testing' };
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return { demoMode: true, message: 'Demo mode active: payment processing simulated for testing' };
    }
    return { demoMode: true, message: 'Demo mode active: payment processing simulated for testing' };
  }
};
