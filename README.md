
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

**Option B: Deploy with Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Use these build settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
3. Deploy the site and get your Vercel URL
4. Vercel will automatically provision SSL certificates for HTTPS

**Option C: Deploy with Netlify**
1. Connect your GitHub repository to Netlify
2. Use these build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy the site and get your Netlify URL (e.g., apexpredatorinsurance.netlify.app)

### Step 2: Configure AWS Route 53 DNS

Since your domain is registered with AWS, follow these steps to configure DNS:

1. **Log in to AWS Management Console**
2. **Navigate to Route 53**
3. **Select "Hosted Zones"** and select your domain
4. **Create proper DNS records:**

### CRITICAL DNS CONFIGURATION ISSUES:

Looking at your current configuration, there are several errors that need to be fixed:

1. **For the apex/root domain (apexpredatorinsurance.com):**
   - ❌ PROBLEM: You currently have "subdomain" or "apexpredatorinsurance.com" text in the Record name field
   - ✅ FIX: The Record name field should be completely EMPTY (not "subdomain", not "@")
   - Type: A
   - Value: For Vercel, you need their recommended IPs: 76.76.21.21 (you have this correct)
   
2. **For the www subdomain:**
   - ❌ PROBLEM: Your CNAME value appears to be "cname.vercel-dns.com." (with a trailing period) 
   - ✅ FIX: The CNAME value should typically be your Vercel project URL like "your-project.vercel.app" (no trailing period)
   - You should confirm the exact value with Vercel if deploying there

3. **Additional Vercel DNS settings:**
   - If using Vercel, you should use their recommended DNS settings:
   - For the apex domain: Use their global anycast IP: 76.76.21.21
   - Alternatively, check that you've added your custom domain in the Vercel project settings

### CORRECT DNS EXAMPLES:

**For the apex domain record:**
- Name: (leave completely empty - not "subdomain", not "@")
- Type: A
- Value: 76.76.21.21 (correct for Vercel)
- TTL: 300 seconds (fine)

**For the www subdomain record:**
- Name: www
- Type: CNAME
- Value: cname.vercel-dns.com (remove the trailing period if present)
  OR your-project.vercel.app (get this from your Vercel dashboard)
- TTL: 300 seconds (fine)

### TESTING AFTER DNS CHANGES:

It may take up to 48 hours for DNS changes to fully propagate, but typically only takes 15-60 minutes.

To check the current DNS settings for your domain:
- Use `dig apexpredatorinsurance.com` in terminal
- Or use an online DNS checker like [dnschecker.org](https://dnschecker.org/)

**Important**: Make sure your browser isn't caching the previous errors. Try:
1. Opening in an incognito/private window
2. Clearing your browser cache
3. Testing from a different device/network

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
