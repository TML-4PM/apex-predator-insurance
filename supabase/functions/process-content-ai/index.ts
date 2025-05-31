
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Free image sources
const getRandomImage = async (category: string): Promise<string> => {
  const imageQueries = {
    'wildlife_encounter': ['shark', 'bear', 'lion', 'wildlife', 'predator'],
    'adventure_gone_wrong': ['adventure', 'hiking', 'extreme sports', 'outdoor'],
    'ai_fail': ['technology', 'computer', 'robot', 'artificial intelligence'],
    'equipment_failure': ['broken equipment', 'gear failure', 'outdoor gear'],
    'other': ['adventure', 'travel', 'nature']
  };
  
  const queries = imageQueries[category as keyof typeof imageQueries] || imageQueries.other;
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  
  try {
    // Using Unsplash API (free tier: 50 requests/hour)
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${randomQuery}&client_id=demo`,
      { headers: { 'Accept-Version': 'v1' } }
    );
    
    if (response.ok) {
      const data = await response.json();
      return data.urls?.small || data.urls?.regular;
    }
  } catch (error) {
    console.error('Unsplash API error:', error);
  }
  
  // Fallback to placeholder images
  const placeholderImages = {
    'wildlife_encounter': 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400',
    'adventure_gone_wrong': 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400',
    'ai_fail': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
    'equipment_failure': 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400',
    'other': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
  };
  
  return placeholderImages[category as keyof typeof placeholderImages] || placeholderImages.other;
};

// Simple AI-like content enhancement (without paid APIs)
const enhanceContent = (title: string, description: string) => {
  // Extract location if mentioned
  const locationRegex = /in\s+([\w\s]+),?\s*([A-Z]{2,}|[A-Z][a-z]+)/i;
  const locationMatch = description.match(locationRegex);
  const location = locationMatch ? `${locationMatch[1]}, ${locationMatch[2]}` : null;
  
  // Enhance title to be more engaging
  const enhancedTitle = title.length < 50 
    ? `Adventure Mishap: ${title}`
    : title;
  
  // Add adventure context if missing
  let enhancedDescription = description;
  if (!description.toLowerCase().includes('adventure') && 
      !description.toLowerCase().includes('trip') && 
      !description.toLowerCase().includes('travel')) {
    enhancedDescription = `During what was supposed to be an adventure, ${description.toLowerCase()}`;
  }
  
  // Calculate severity based on keywords
  const severityKeywords = {
    high: ['death', 'died', 'killed', 'fatal', 'emergency', 'hospital', 'surgery'],
    medium: ['injured', 'hurt', 'bite', 'attack', 'rescued', 'lost', 'stuck'],
    low: ['scared', 'close call', 'almost', 'nearly', 'warning', 'sighting']
  };
  
  const text = `${title} ${description}`.toLowerCase();
  let severity = 3; // Default
  
  if (severityKeywords.high.some(keyword => text.includes(keyword))) severity = 8;
  else if (severityKeywords.medium.some(keyword => text.includes(keyword))) severity = 6;
  else if (severityKeywords.low.some(keyword => text.includes(keyword))) severity = 4;
  
  return {
    enhancedTitle,
    enhancedDescription,
    location,
    severity
  };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { contentId } = await req.json();
    
    // Fetch the content
    const { data: content, error: fetchError } = await supabase
      .from('oopsies')
      .select('*')
      .eq('id', contentId)
      .single();
    
    if (fetchError || !content) {
      throw new Error('Content not found');
    }
    
    console.log('Processing content:', content.title);
    
    // Enhance content
    const { enhancedTitle, enhancedDescription, location, severity } = enhanceContent(
      content.title, 
      content.description
    );
    
    // Get appropriate image
    const imageUrl = await getRandomImage(content.category);
    
    // Update the content
    const { error: updateError } = await supabase
      .from('oopsies')
      .update({
        title: enhancedTitle,
        description: enhancedDescription,
        image_url: imageUrl,
        severity_level: severity,
        confidence_score: Math.min(content.confidence_score + 0.1, 1.0), // Slight boost for processing
        ...(location && { location_name: location })
      })
      .eq('id', contentId);
    
    if (updateError) {
      throw updateError;
    }
    
    console.log('Content enhanced successfully');
    
    return new Response(JSON.stringify({ 
      success: true,
      enhancements: {
        titleUpdated: enhancedTitle !== content.title,
        descriptionUpdated: enhancedDescription !== content.description,
        imageAdded: !!imageUrl,
        locationExtracted: !!location,
        severityCalculated: severity
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Processing error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
