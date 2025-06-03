
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PartnerApplicationData {
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  business_type: string;
  target_market?: string;
  expected_monthly_volume?: number;
  current_distribution_channels?: string[];
  why_partner?: string;
  website_url?: string;
  company_size?: string;
  annual_revenue_range?: string;
  marketing_budget_range?: string;
  preferred_commission_structure?: string;
  white_label_interest?: boolean;
  custom_branding_needs?: string;
  integration_requirements?: string;
  timeline?: string;
  additional_notes?: string;
}

export const usePartnerApplication = () => {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const submitApplication = async (data: PartnerApplicationData) => {
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('partner_applications')
        .insert([data]);

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you within 24 hours.",
      });

      return { success: true };
    } catch (error) {
      console.error('Error submitting partner application:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
      return { success: false, error };
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitApplication,
    submitting
  };
};
