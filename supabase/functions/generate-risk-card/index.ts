
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const animal = url.searchParams.get('animal') || 'Shark'
    const riskScore = url.searchParams.get('riskScore') || '85'
    const userName = url.searchParams.get('userName') || 'Adventure Seeker'
    const quoteCost = url.searchParams.get('quoteCost') || '$29'

    console.log('Generating risk card for:', { animal, riskScore, userName, quoteCost })

    // Create SVG-based risk card
    const svgCard = `
      <svg width="1200" height="628" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#334155;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#b91c1c;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Background -->
        <rect width="1200" height="628" fill="url(#bg)"/>
        
        <!-- Pattern overlay -->
        <pattern id="dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="1" fill="#ffffff" opacity="0.1"/>
          <circle cx="27" cy="7" r="1" fill="#ffffff" opacity="0.1"/>
          <circle cx="47" cy="7" r="1" fill="#ffffff" opacity="0.1"/>
          <circle cx="7" cy="27" r="1" fill="#ffffff" opacity="0.1"/>
          <circle cx="27" cy="27" r="1" fill="#ffffff" opacity="0.1"/>
          <circle cx="47" cy="27" r="1" fill="#ffffff" opacity="0.1"/>
          <circle cx="7" cy="47" r="1" fill="#ffffff" opacity="0.1"/>
          <circle cx="27" cy="47" r="1" fill="#ffffff" opacity="0.1"/>
          <circle cx="47" cy="47" r="1" fill="#ffffff" opacity="0.1"/>
        </pattern>
        <rect width="1200" height="628" fill="url(#dots)"/>
        
        <!-- Header -->
        <rect x="50" y="50" width="200" height="40" rx="20" fill="url(#redGrad)"/>
        <text x="150" y="75" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">RISK ASSESSMENT</text>
        
        <!-- Main content area -->
        <rect x="50" y="120" width="1100" height="400" rx="20" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
        
        <!-- Risk Score Circle -->
        <circle cx="250" cy="320" r="80" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="8"/>
        <circle cx="250" cy="320" r="80" fill="none" stroke="url(#redGrad)" stroke-width="8" 
                stroke-dasharray="${(parseInt(riskScore) / 100) * 502} 502" 
                stroke-dashoffset="125" 
                transform="rotate(-90 250 320)"/>
        <text x="250" y="310" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="36" font-weight="bold">${riskScore}%</text>
        <text x="250" y="340" text-anchor="middle" fill="#dc2626" font-family="Arial, sans-serif" font-size="16" font-weight="bold">RISK LEVEL</text>
        
        <!-- Animal Info -->
        <text x="400" y="180" fill="white" font-family="Arial, sans-serif" font-size="48" font-weight="bold">${animal} Encounter</text>
        <text x="400" y="220" fill="#94a3b8" font-family="Arial, sans-serif" font-size="20">Coverage Assessment for ${userName}</text>
        
        <!-- Stats -->
        <rect x="400" y="260" width="300" height="80" rx="10" fill="rgba(220,38,38,0.1)" stroke="#dc2626" stroke-width="2"/>
        <text x="420" y="285" fill="#dc2626" font-family="Arial, sans-serif" font-size="14" font-weight="bold">PREMIUM QUOTE</text>
        <text x="420" y="315" fill="white" font-family="Arial, sans-serif" font-size="32" font-weight="bold">${quoteCost}</text>
        
        <rect x="720" y="260" width="300" height="80" rx="10" fill="rgba(34,197,94,0.1)" stroke="#22c55e" stroke-width="2"/>
        <text x="740" y="285" fill="#22c55e" font-family="Arial, sans-serif" font-size="14" font-weight="bold">COVERAGE AMOUNT</text>
        <text x="740" y="315" fill="white" font-family="Arial, sans-serif" font-size="32" font-weight="bold">$50,000</text>
        
        <!-- Bottom info -->
        <text x="400" y="400" fill="#94a3b8" font-family="Arial, sans-serif" font-size="16">✓ Instant digital certificate   ✓ Global coverage   ✓ 24/7 support</text>
        <text x="400" y="430" fill="#94a3b8" font-family="Arial, sans-serif" font-size="16">Get your Apex Predator Insurance at apexpredatorinsurance.com</text>
        
        <!-- Watermark -->
        <text x="1050" y="600" fill="rgba(255,255,255,0.3)" font-family="Arial, sans-serif" font-size="12">APEX PREDATOR INSURANCE</text>
      </svg>
    `

    // Convert SVG to base64 data URL
    const base64Card = btoa(unescape(encodeURIComponent(svgCard)))
    const dataUrl = `data:image/svg+xml;base64,${base64Card}`

    // For production, you'd upload this to storage and return the public URL
    // For now, return the data URL
    return new Response(
      JSON.stringify({ 
        url: dataUrl,
        animal,
        riskScore,
        userName,
        quoteCost
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600'
        } 
      }
    )

  } catch (error) {
    console.error('Error generating risk card:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate risk card', details: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    )
  }
})
