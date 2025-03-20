
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

To properly deploy this site with AWS Route 53 DNS configuration, follow these steps:

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

### Step 2: Configure AWS Route 53 DNS

Since your domain is registered with AWS, follow these steps to configure DNS:

1. **Log in to AWS Management Console**
2. **Navigate to Route 53**
3. **Select "Hosted Zones"** and select your domain
4. **Create a new record set:**
   - **Type:** CNAME (or A record if you have a static IP)
   - **Name:** www (or @ for root domain)
   - **Value/Route traffic to:** Your deployment URL from Step 1 (without https://)
   - For root domain (@), you may need to use an A record with AWS's Alias feature

5. **Set TTL:** 300 seconds (5 minutes) for faster propagation
6. **Save record**

### Step 3: For Apex Domain (Root Domain) Configuration

AWS Route 53 has specific requirements for apex domains (e.g., example.com without www):

**If using Netlify:**
1. In Netlify, go to Domain settings → Add custom domain
2. Add your apex domain
3. In Route 53, create 4 A records pointing to Netlify's load balancer IPs:
   ```
   104.198.14.52
   104.198.14.53
   104.198.14.54
   104.198.14.55
   ```

**If using Vercel:**
1. In Vercel, add your custom domain
2. In Route 53, create 4 A records with the values Vercel provides

**If using another provider:**
Follow their specific instructions for apex domain configuration.

### Step 4: Wait for DNS Propagation

DNS changes can take anywhere from a few minutes to 48 hours to fully propagate, though typically it's within 15-30 minutes.

### Step 5: SSL Configuration

Ensure SSL is properly configured:
- Most platforms (Netlify, Vercel) will automatically provision SSL certificates
- For other platforms, you may need to set up SSL manually

### Step 6: Stripe Configuration (Post-Launch)

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
- Check AWS Route 53 documentation: https://docs.aws.amazon.com/Route53/
- Verify your domain registration is active in AWS
- Test with external DNS lookup tools like [dnschecker.org](https://dnschecker.org/)
- Check that your hosting platform has properly registered your custom domain

