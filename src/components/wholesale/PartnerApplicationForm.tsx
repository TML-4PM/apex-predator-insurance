
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { usePartnerApplication, PartnerApplicationData } from '@/hooks/usePartnerApplication';
import { Building2, Mail, Phone, Globe, Users, DollarSign, Target, Clock } from 'lucide-react';

export const PartnerApplicationForm = () => {
  const { submitApplication, submitting } = usePartnerApplication();
  const [formData, setFormData] = useState<PartnerApplicationData>({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    business_type: '',
    target_market: '',
    expected_monthly_volume: undefined,
    current_distribution_channels: [],
    why_partner: '',
    website_url: '',
    company_size: '',
    annual_revenue_range: '',
    marketing_budget_range: '',
    preferred_commission_structure: '',
    white_label_interest: false,
    custom_branding_needs: '',
    integration_requirements: '',
    timeline: '',
    additional_notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submitApplication(formData);
    if (result.success) {
      setFormData({
        company_name: '',
        contact_name: '',
        email: '',
        phone: '',
        business_type: '',
        target_market: '',
        expected_monthly_volume: undefined,
        current_distribution_channels: [],
        why_partner: '',
        website_url: '',
        company_size: '',
        annual_revenue_range: '',
        marketing_budget_range: '',
        preferred_commission_structure: '',
        white_label_interest: false,
        custom_branding_needs: '',
        integration_requirements: '',
        timeline: '',
        additional_notes: ''
      });
    }
  };

  const handleChannelChange = (channel: string, checked: boolean) => {
    const channels = formData.current_distribution_channels || [];
    if (checked) {
      setFormData({
        ...formData,
        current_distribution_channels: [...channels, channel]
      });
    } else {
      setFormData({
        ...formData,
        current_distribution_channels: channels.filter(c => c !== channel)
      });
    }
  };

  return (
    <Card className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-8">
        <Building2 className="w-16 h-16 mx-auto mb-4 text-apex-red" />
        <h2 className="text-3xl font-bold text-apex-black mb-2">Partner Application</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join our wholesale partner network and offer Apex Predator Insurance to your customers. 
          Fill out this form to get started with exclusive pricing and white-label opportunities.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-apex-black flex items-center">
            <Building2 className="w-5 h-5 mr-2" />
            Company Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company_name">Company Name *</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="website_url">Website URL</Label>
              <Input
                id="website_url"
                type="url"
                value={formData.website_url}
                onChange={(e) => setFormData({...formData, website_url: e.target.value})}
                placeholder="https://your-website.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="business_type">Business Type *</Label>
              <Select value={formData.business_type} onValueChange={(value) => setFormData({...formData, business_type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="travel_agency">Travel Agency</SelectItem>
                  <SelectItem value="tour_operator">Tour Operator</SelectItem>
                  <SelectItem value="hotel_chain">Hotel Chain</SelectItem>
                  <SelectItem value="insurance_broker">Insurance Broker</SelectItem>
                  <SelectItem value="adventure_company">Adventure Sports Company</SelectItem>
                  <SelectItem value="online_platform">Online Travel Platform</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="company_size">Company Size</Label>
              <Select value={formData.company_size} onValueChange={(value) => setFormData({...formData, company_size: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-1000">201-1000 employees</SelectItem>
                  <SelectItem value="1000+">1000+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-apex-black flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Contact Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact_name">Contact Name *</Label>
              <Input
                id="contact_name"
                value={formData.contact_name}
                onChange={(e) => setFormData({...formData, contact_name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Business Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-apex-black flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Business Details
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="target_market">Target Market</Label>
              <Input
                id="target_market"
                value={formData.target_market}
                onChange={(e) => setFormData({...formData, target_market: e.target.value})}
                placeholder="Adventure travelers, eco-tourists, etc."
              />
            </div>
            <div>
              <Label htmlFor="expected_monthly_volume">Expected Monthly Volume</Label>
              <Input
                id="expected_monthly_volume"
                type="number"
                value={formData.expected_monthly_volume || ''}
                onChange={(e) => setFormData({...formData, expected_monthly_volume: parseInt(e.target.value) || undefined})}
                placeholder="Number of certificates per month"
              />
            </div>
          </div>

          <div>
            <Label>Current Distribution Channels</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {['Online Platform', 'Physical Locations', 'Travel Agents', 'Hotel Partnerships', 'Tour Guides', 'Mobile App'].map((channel) => (
                <div key={channel} className="flex items-center space-x-2">
                  <Checkbox
                    id={channel}
                    checked={formData.current_distribution_channels?.includes(channel) || false}
                    onCheckedChange={(checked) => handleChannelChange(channel, checked as boolean)}
                  />
                  <Label htmlFor={channel} className="text-sm">{channel}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-apex-black flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Financial Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="annual_revenue_range">Annual Revenue Range</Label>
              <Select value={formData.annual_revenue_range} onValueChange={(value) => setFormData({...formData, annual_revenue_range: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select revenue range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under_100k">Under $100K</SelectItem>
                  <SelectItem value="100k_500k">$100K - $500K</SelectItem>
                  <SelectItem value="500k_1m">$500K - $1M</SelectItem>
                  <SelectItem value="1m_5m">$1M - $5M</SelectItem>
                  <SelectItem value="5m_plus">$5M+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="marketing_budget_range">Marketing Budget Range</Label>
              <Select value={formData.marketing_budget_range} onValueChange={(value) => setFormData({...formData, marketing_budget_range: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under_10k">Under $10K</SelectItem>
                  <SelectItem value="10k_50k">$10K - $50K</SelectItem>
                  <SelectItem value="50k_100k">$50K - $100K</SelectItem>
                  <SelectItem value="100k_plus">$100K+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="preferred_commission_structure">Preferred Commission Structure</Label>
            <Select value={formData.preferred_commission_structure} onValueChange={(value) => setFormData({...formData, preferred_commission_structure: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select preferred structure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="volume_discount">Volume Discount</SelectItem>
                <SelectItem value="percentage_commission">Percentage Commission</SelectItem>
                <SelectItem value="flat_markup">Flat Markup</SelectItem>
                <SelectItem value="hybrid">Hybrid Model</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* White Label Interest */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="white_label_interest"
              checked={formData.white_label_interest}
              onCheckedChange={(checked) => setFormData({...formData, white_label_interest: checked as boolean})}
            />
            <Label htmlFor="white_label_interest" className="text-lg font-semibold">
              Interested in White-Label Solutions
            </Label>
          </div>
          
          {formData.white_label_interest && (
            <div className="space-y-4 pl-6 border-l-2 border-apex-red">
              <div>
                <Label htmlFor="custom_branding_needs">Custom Branding Needs</Label>
                <Textarea
                  id="custom_branding_needs"
                  value={formData.custom_branding_needs}
                  onChange={(e) => setFormData({...formData, custom_branding_needs: e.target.value})}
                  placeholder="Describe your branding requirements..."
                />
              </div>
              <div>
                <Label htmlFor="integration_requirements">Integration Requirements</Label>
                <Textarea
                  id="integration_requirements"
                  value={formData.integration_requirements}
                  onChange={(e) => setFormData({...formData, integration_requirements: e.target.value})}
                  placeholder="API integrations, existing systems, etc."
                />
              </div>
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-apex-black flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Additional Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timeline">Expected Launch Timeline</Label>
              <Select value={formData.timeline} onValueChange={(value) => setFormData({...formData, timeline: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate (1-2 weeks)</SelectItem>
                  <SelectItem value="1_month">1 Month</SelectItem>
                  <SelectItem value="3_months">3 Months</SelectItem>
                  <SelectItem value="6_months">6 Months</SelectItem>
                  <SelectItem value="exploring">Just Exploring</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="why_partner">Why do you want to partner with us?</Label>
            <Textarea
              id="why_partner"
              value={formData.why_partner}
              onChange={(e) => setFormData({...formData, why_partner: e.target.value})}
              placeholder="Tell us about your goals and how our partnership would benefit your customers..."
            />
          </div>

          <div>
            <Label htmlFor="additional_notes">Additional Notes</Label>
            <Textarea
              id="additional_notes"
              value={formData.additional_notes}
              onChange={(e) => setFormData({...formData, additional_notes: e.target.value})}
              placeholder="Any other information you'd like to share..."
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={submitting}
          className="w-full bg-apex-red hover:bg-apex-red/90 text-white py-3 text-lg"
        >
          {submitting ? 'Submitting Application...' : 'Submit Partner Application'}
        </Button>
      </form>
    </Card>
  );
};
