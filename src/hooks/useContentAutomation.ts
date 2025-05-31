import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AutomatedContent {
  id: string;
  title: string;
  description: string;
  source_url: string;
  source_platform: string;
  category: string;
  confidence_score: number;
  image_url?: string;
  location?: string;
  severity_level?: number;
  auto_generated: boolean;
  discovery_date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const useContentAutomation = () => {
  const [automatedContent, setAutomatedContent] = useState<AutomatedContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastCrawl, setLastCrawl] = useState<Date | null>(null);
  const { toast } = useToast();

  const fetchAutomatedContent = async () => {
    try {
      const { data, error } = await supabase
        .from('oopsies')
        .select('*')
        .eq('auto_generated', true)
        .order('discovery_date', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      // Map the data to match our interface, adding default severity_level if missing
      const mappedData = (data || []).map(item => ({
        ...item,
        severity_level: item.severity_level || 5, // Default severity level
        discovery_date: item.discovery_date || item.created_at
      }));
      
      setAutomatedContent(mappedData);
    } catch (error) {
      console.error('Error fetching automated content:', error);
      toast({
        title: "Error",
        description: "Failed to load automated content.",
        variant: "destructive"
      });
    }
  };

  const crawlRedditContent = async () => {
    setLoading(true);
    try {
      const response = await supabase.functions.invoke('crawl-content', {
        body: { 
          sources: ['reddit'],
          subreddits: ['tifu', 'Whatcouldgowrong', 'NatureIsMetal', 'instant_regret', 'AdventureRacing'],
          keywords: ['shark', 'bear', 'lion', 'crocodile', 'snake', 'wildlife', 'adventure', 'travel', 'insurance']
        }
      });

      if (response.error) throw response.error;

      setLastCrawl(new Date());
      await fetchAutomatedContent();
      
      toast({
        title: "Content Crawled",
        description: `Found ${response.data?.newContent || 0} new incidents.`,
      });
    } catch (error) {
      console.error('Error crawling content:', error);
      toast({
        title: "Crawl Failed",
        description: "Unable to fetch new content. Check API limits.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const processContentWithAI = async (contentId: string) => {
    try {
      const response = await supabase.functions.invoke('process-content-ai', {
        body: { contentId }
      });

      if (response.error) throw response.error;

      await fetchAutomatedContent();
      
      toast({
        title: "Content Processed",
        description: "AI has enhanced the content with categories and images.",
      });
    } catch (error) {
      console.error('Error processing content:', error);
      toast({
        title: "Processing Failed",
        description: "AI processing failed. Try again later.",
        variant: "destructive"
      });
    }
  };

  const approveContent = async (contentId: string) => {
    try {
      const { error } = await supabase
        .from('oopsies')
        .update({ status: 'approved' })
        .eq('id', contentId);

      if (error) throw error;

      await fetchAutomatedContent();
      
      toast({
        title: "Content Approved",
        description: "Content is now live on the site.",
      });
    } catch (error) {
      console.error('Error approving content:', error);
      toast({
        title: "Approval Failed",
        description: "Failed to approve content.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchAutomatedContent();
    
    // Auto-crawl every 6 hours
    const interval = setInterval(() => {
      crawlRedditContent();
    }, 6 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    automatedContent,
    loading,
    lastCrawl,
    crawlRedditContent,
    processContentWithAI,
    approveContent,
    refetch: fetchAutomatedContent
  };
};
