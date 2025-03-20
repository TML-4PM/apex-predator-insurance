
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
3. Deploy the site and get your Netlify URL (e.g., apexpredatorinsurance.netlify.app)

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

#### For WWW Subdomain (www.example.com):

4. **Create a new record set:**
   - **Type:** CNAME
   - **Name:** www
   - **Value:** Your Netlify URL (e.g., apexpredatorinsurance.netlify.app) - without https://
   - **TTL:** 300 seconds (5 minutes)
   - **Click "Create"**

#### For Apex/Root Domain (example.com without www):

5. **Create A records:**
   - **Record type:** A
   - **Record name:** LEAVE THIS FIELD BLANK (do not enter "www", "@", or anything else)
   - **Enter each IP address in a SEPARATE line in the Value field:**
     ```
     104.198.14.52
     104.198.14.53
     104.198.14.54
     104.198.14.55
     ```
   - **Do NOT create separate A records for each IP** - put all IPs in the same record with multiple lines
   - **TTL:** 300 seconds
   - **Click "Create"**

### Important: Common DNS Setup Error

The error message you see: `InvalidChangeBatch 400: The request contains an invalid set of changes for a resource record set 'A www.apexpredatorinsurance.com.'` happens when:

1. You're trying to create an A record for the www subdomain (which should be a CNAME)
2. You're trying to create multiple separate A records for the same name

**CORRECT APPROACH:**
- www subdomain: ONE CNAME record pointing to your Netlify URL
- Root domain: ONE A record with MULTIPLE values (all four IPs on separate lines)

### Step 3: Configure Custom Domain in Netlify

After setting up DNS in Route 53:

1. Go to your Netlify dashboard and select your site
2. Navigate to "Site settings" → "Domain management" → "Add custom domain"
3. Enter your domain name (both www and apex versions)
4. Netlify will verify the DNS configuration and provision SSL certificates

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
