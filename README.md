
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
4. **You need to create proper DNS records:**

#### CORRECT DNS CONFIGURATION:

**For the apex domain (apexpredatorinsurance.com):**
- Record name: *leave empty* (NOT "@" or "@.apexpredatorinsurance.com")
- Type: A
- Value: Your hosting provider's IP address OR use Alias if pointing to AWS services
  - For Vercel: Use their load balancer IPs or Alias record
  - For Netlify: Use their load balancer IPs (check Netlify docs for current IPs)
  - Important: Do NOT include the domain name in the name field for the apex record

**For www subdomain:**
- Record name: www
- Type: CNAME
- Value: Your hosting provider's URL (e.g., your-site.vercel.app or your-site.netlify.app)
  - DO NOT include "https://" in the value

**Example of correctly configured records:**
1. A Record for apex domain:
   - Name: *empty* (just the root domain)
   - Type: A
   - Value: [hosting provider's IP]

2. CNAME for www subdomain:
   - Name: www
   - Type: CNAME
   - Value: your-site.vercel.app

### IMPORTANT: FIXING YOUR CURRENT DNS CONFIGURATION

Based on the screenshot, here are the issues and fixes:
1. Your A record appears to be set as "@.apexpredatorinsurance.com" - this is incorrect
   - Change it to just leave the name field empty (this represents the apex domain)
   
2. Your CNAME record for www should point to your hosting provider's domain
   - Ensure it's set as "www" (without quotes) in the name field
   - Value should be your Vercel/Netlify app address (e.g., your-project.vercel.app)

3. NS records should match what AWS provides for your hosted zone
   - These are typically set automatically by AWS

### VERIFYING DNS PROPAGATION

After making these changes to your Route 53 DNS configuration:
1. Wait 15-30 minutes for propagation
2. Use [dnschecker.org](https://dnschecker.org/) to verify your A and CNAME records
3. Try accessing your site again

### HTTPS CONFIGURATION

If DNS is correct but you still see a blank page:
1. Ensure your hosting provider has valid SSL certificates
2. Verify your site is being served over HTTPS 
3. Check browser console for mixed content warnings

If you continue to experience issues after fixing the DNS configuration, please check the server logs in your hosting provider's dashboard for more specific error information.

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
