
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
4. **You need to ADD two types of records that are currently missing:**

#### For Vercel Deployment (Recommended):

**Create a new record set for the apex domain:**
- Go to Route 53 and select your hosted zone
- Click "Create Record"
- Keep "Record name" EMPTY for apex domain (do not enter @ or anything)
- Select "Type" as "A"
- Toggle "Alias" to ON
- Under "Route traffic to", select "Alias to other AWS resources"
- In the dropdown, find and select "Alias to Vercel"
- Click "Create records"

**Create another record for www subdomain:**
- Click "Create Record" again
- Enter "www" for "Record name"
- Select "Type" as "CNAME"
- Enter your Vercel project URL as the value (e.g., project-name.vercel.app) - without https://
- Set TTL to 300 seconds
- Click "Create records"

### FIXING DNS_PROBE_FINISHED_NXDOMAIN ERRORS

You're seeing a DNS_PROBE_FINISHED_NXDOMAIN error, which means the domain name cannot be resolved to an IP address. This happens when:

1. **DNS records are missing or incorrect**
2. **DNS changes haven't propagated yet**
3. **The hosted zone isn't correctly linked to your domain registrar**

Follow these specific steps to fix this error:

1. **Verify your NS (Name Server) records first**:
   - In Route 53, check the NS records for your domain
   - Make sure these EXACT SAME name servers are set at your domain registrar (if different from AWS)
   - The NS records should look something like: `ns-123.awsdns-45.com.`, `ns-678.awsdns-90.net.`, etc.

2. **Check for proper A record configuration**:
   - Ensure your A record for the apex domain (empty name field) points to the correct IP addresses
   - For Vercel: Use their specific Alias settings as described above
   - For Netlify: Use their specific IP addresses as listed earlier

3. **Check CNAME for www subdomain**:
   - Ensure your CNAME record has "www" in the name field
   - The value should be your Vercel/Netlify app URL (without https://)

4. **Wait for DNS propagation**:
   - DNS changes can take 15 minutes to 48 hours to fully propagate
   - Use [dnschecker.org](https://dnschecker.org/) to check propagation status globally

5. **Clear your DNS cache**:
   - Windows: Run `ipconfig /flushdns` in Command Prompt as administrator
   - macOS: Run `sudo killall -HUP mDNSResponder` in Terminal
   - Try accessing the site from a different device or network

6. **Verify in Vercel/Netlify dashboard**:
   - Check that your custom domain is properly connected
   - Look for any error messages related to domain configuration

7. **Check domain registration status**:
   - Ensure your domain registration is active and not expired
   - Verify WHOIS information is correct

If you continue to see the NXDOMAIN error after following these steps and waiting for propagation, contact AWS Route 53 support as there may be an issue with your hosted zone configuration.

### Step 3: Verify DNS Configuration

After setting up the A and CNAME records:

1. **Wait 15-30 minutes for DNS propagation**
2. Use a DNS lookup tool like [dnschecker.org](https://dnschecker.org/) to verify your new records
3. Navigate to your Vercel/Netlify dashboard → Domain management → Check domain status

### Step 4: Configure Custom Domain in Vercel/Netlify

After setting up DNS:

1. Go to your Vercel/Netlify dashboard and select your site
2. Navigate to "Settings" → "Domains" → "Add domain"
3. Enter your domain name (both www and apex versions)
4. The platform will verify the DNS configuration and provision SSL certificates

### Step 5: Wait for DNS Propagation

DNS changes can take anywhere from a few minutes to 48 hours to fully propagate, though typically it's within 15-30 minutes.

### Step 6: SSL Configuration

Ensure SSL is properly configured:
- Vercel and Netlify automatically provision SSL certificates
- Verify that HTTPS is enabled in your domain settings

### Step 7: Stripe Configuration (Post-Launch)

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
