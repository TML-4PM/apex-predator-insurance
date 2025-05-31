
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RedditPost {
  title: string;
  selftext: string;
  url: string;
  permalink: string;
  subreddit: string;
  created_utc: number;
  score: number;
  num_comments: number;
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const predatorKeywords = [
  'shark', 'bear', 'lion', 'tiger', 'crocodile', 'alligator', 'snake', 'spider',
  'wolf', 'coyote', 'mountain lion', 'cougar', 'leopard', 'jaguar', 'hyena',
  'wild boar', 'buffalo', 'rhino', 'hippo', 'elephant'
];

const adventureKeywords = [
  'hiking', 'camping', 'safari', 'diving', 'surfing', 'climbing', 'adventure',
  'travel', 'wilderness', 'jungle', 'ocean', 'mountain', 'forest', 'desert'
];

const calculateConfidence = (post: RedditPost): number => {
  const text = `${post.title} ${post.selftext}`.toLowerCase();
  let confidence = 0.3; // Base confidence
  
  // Higher confidence for predator mentions
  predatorKeywords.forEach(keyword => {
    if (text.includes(keyword)) confidence += 0.2;
  });
  
  // Medium confidence for adventure context
  adventureKeywords.forEach(keyword => {
    if (text.includes(keyword)) confidence += 0.1;
  });
  
  // Boost for engagement
  if (post.score > 100) confidence += 0.1;
  if (post.num_comments > 50) confidence += 0.1;
  
  // Specific subreddit boosts
  if (['tifu', 'Whatcouldgowrong'].includes(post.subreddit)) confidence += 0.2;
  if (post.subreddit === 'NatureIsMetal') confidence += 0.3;
  
  return Math.min(confidence, 1.0);
};

const categorizeContent = (post: RedditPost): string => {
  const text = `${post.title} ${post.selftext}`.toLowerCase();
  
  if (text.includes('ai') || text.includes('algorithm') || text.includes('prediction')) {
    return 'ai_fail';
  }
  if (predatorKeywords.some(keyword => text.includes(keyword))) {
    return 'wildlife_encounter';
  }
  if (text.includes('equipment') || text.includes('gear') || text.includes('broken')) {
    return 'equipment_failure';
  }
  if (adventureKeywords.some(keyword => text.includes(keyword))) {
    return 'adventure_gone_wrong';
  }
  
  return 'other';
};

const crawlReddit = async (subreddits: string[], keywords: string[]) => {
  const newContent = [];
  
  for (const subreddit of subreddits) {
    try {
      console.log(`Crawling r/${subreddit}...`);
      
      // Reddit's public JSON API (no auth required for public posts)
      const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=25`);
      
      if (!response.ok) {
        console.error(`Failed to fetch r/${subreddit}: ${response.status}`);
        continue;
      }
      
      const data = await response.json();
      const posts = data.data.children.map((child: any) => child.data);
      
      for (const post of posts) {
        const text = `${post.title} ${post.selftext}`.toLowerCase();
        
        // Check if post contains relevant keywords
        const isRelevant = keywords.some(keyword => text.includes(keyword)) ||
                          predatorKeywords.some(keyword => text.includes(keyword)) ||
                          adventureKeywords.some(keyword => text.includes(keyword));
        
        if (!isRelevant || post.selftext.length < 50) continue;
        
        const confidence = calculateConfidence(post);
        if (confidence < 0.4) continue; // Only process high-confidence content
        
        // Check if we already have this post
        const { data: existing } = await supabase
          .from('oopsies')
          .select('id')
          .eq('source_url', `https://reddit.com${post.permalink}`)
          .single();
        
        if (existing) continue;
        
        const content = {
          title: post.title.length > 100 ? post.title.substring(0, 97) + '...' : post.title,
          description: post.selftext.length > 500 ? post.selftext.substring(0, 497) + '...' : post.selftext,
          source_url: `https://reddit.com${post.permalink}`,
          source_platform: 'reddit',
          category: categorizeContent(post),
          confidence_score: confidence,
          severity_level: Math.min(Math.floor(confidence * 10), 10),
          auto_generated: true,
          discovery_date: new Date().toISOString(),
          status: 'pending',
          user_id: '00000000-0000-0000-0000-000000000000', // System user
          likes: 0,
          comments: 0,
          shares: 0,
          viral_score: Math.floor(post.score / 10)
        };
        
        newContent.push(content);
      }
      
      // Rate limiting: wait 1 second between subreddits
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`Error crawling r/${subreddit}:`, error);
    }
  }
  
  // Bulk insert new content
  if (newContent.length > 0) {
    const { error } = await supabase
      .from('oopsies')
      .insert(newContent);
    
    if (error) {
      console.error('Error inserting content:', error);
      throw error;
    }
  }
  
  return newContent;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sources, subreddits, keywords } = await req.json();
    
    console.log('Starting content crawl:', { sources, subreddits, keywords });
    
    let allNewContent = [];
    
    if (sources.includes('reddit')) {
      const redditContent = await crawlReddit(subreddits || ['tifu', 'Whatcouldgowrong'], keywords || []);
      allNewContent = [...allNewContent, ...redditContent];
    }
    
    console.log(`Crawl complete: ${allNewContent.length} new items discovered`);
    
    return new Response(JSON.stringify({ 
      success: true, 
      newContent: allNewContent.length,
      items: allNewContent.map(item => ({ title: item.title, confidence: item.confidence_score }))
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Crawl error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
