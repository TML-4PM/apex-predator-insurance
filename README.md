
# Apex Predator Insurance

A tongue-in-cheek insurance website for adventurers who encounter predators in the wild.

## Project Overview

This project is a React application built with:
- Vite
- TypeScript
- React 
- Tailwind CSS
- shadcn/ui components
- Stripe payments integration

## Deployment Guide

To properly deploy this site and fix the DNS resolution error (Error 1001), follow these steps:

### Step 1: Deploy the Site First

Before configuring your domain, you need to deploy the actual website:

**Option A: Deploy with Lovable**
1. Click on the "Share" button in the top-right corner
2. Select "Publish" from the dropdown menu
3. Follow the instructions to deploy to a Lovable subdomain
4. Make note of your Lovable subdomain URL (e.g., apex-predator.lovable.app)

**Option B: Deploy with Netlify**
1. Connect your GitHub repository to Netlify
2. Use these build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy the site and get your Netlify URL (e.g., apex-predator.netlify.app)

**Option C: Deploy with Vercel**
1. Connect your GitHub repository to Vercel
2. Use these build settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
3. Deploy the site and get your Vercel URL

### Step 2: Configure Your Domain Correctly

For Cloudflare DNS to work properly:

1. **Add DNS Records in Cloudflare**:
   - Type: `CNAME`
   - Name: `www` (or `@` for root domain)
   - Target: Your deployment URL from Step 1 (without https://)
   - Proxy status: Proxied (orange cloud)

2. **Check Your Cloudflare SSL/TLS Settings**:
   - Go to SSL/TLS section in Cloudflare
   - Set SSL/TLS encryption mode to "Full" or "Full (strict)"

3. **Verify Page Rules**:
   - Check if you have any conflicting Page Rules

4. **Clear Cloudflare Cache**:
   - Go to Caching section
   - Click "Purge Everything"

### Step 3: Test Your Configuration

After making these changes:
1. Wait 5-10 minutes for changes to apply
2. Try accessing your domain in an incognito browser window
3. If still seeing Error 1001, try accessing your deployment URL directly to ensure it's working

### Step 4: Stripe Configuration (Post-Launch)

Once your site is live:

1. Update your Stripe webhook endpoint URLs in the Stripe dashboard
2. Ensure your Supabase Edge Functions are properly deployed
3. Test the payment flow on the live site

## Development

To run this project locally:

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start development server
npm run dev
```

## Additional Support

If you continue to experience DNS issues:
- Contact Cloudflare support
- Verify domain registration is active
- Ensure nameservers are correctly pointing to Cloudflare

