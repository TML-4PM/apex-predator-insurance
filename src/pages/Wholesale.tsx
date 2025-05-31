import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Globe, 
  Palette, 
  DollarSign,
  CheckCircle,
  Star,
  Target
} from 'lucide-react';

const Wholesale = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    expectedVolume: '',
    message: ''
  });

  const pricingTiers = [
    {
      name: 'Travel Agent',
      icon: Users,
      markup: '30%',
      minVolume: '10/month',
      features: [
        'Agent dashboard',
        'Customer management',
        'Basic branding',
        'Email support'
      ],
      color: 'from-blue-500 to-cyan-500',
      cta: 'Start as Agent'
    },
    {
      name: 'Tour Operator',
      icon: Building2,
      markup: '50%',
      minVolume: '50/month',
      features: [
        'Full white-label',
        'Custom certificates',
        'API integration',
        'Priority support'
      ],
      color: 'from-purple-500 to-pink-500',
      cta: 'Access Portal',
      isPopular: true
    },
    {
      name: 'Hotel Chain',
      icon: Globe,
      markup: 'Volume discounts',
      minVolume: '500/month',
      features: [
        'Enterprise dashboard',
        'Multi-location support',
        'Custom integrations',
        'Dedicated account manager'
      ],
      color: 'from-amber-500 to-red-500',
      cta: 'Enterprise Setup'
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'High Profit Margins',
      description: 'Earn 30-50% markup on every certificate sold'
    },
    {
      icon: Target,
      title: 'Viral Product',
      description: 'Customers love sharing certificates on social media'
    },
    {
      icon: TrendingUp,
      title: 'Growing Market',
      description: '#1 trending travel insurance product'
    },
    {
      icon: Palette,
      title: 'Full Customization',
      description: 'White-label with your branding and colors'
    }
  ];

  const handlePartnerAccess = (tierName: string) => {
    if (tierName === 'Tour Operator') {
      window.open('/partner-portal', '_blank');
    } else {
      // Handle other tier access
      console.log(`Accessing ${tierName} features`);
    }
  };

  return (
    <Layout>
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="bg-apex-red text-white mb-4">B2B PARTNERSHIPS</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-apex-black mb-6">
              Partner with the #1 Adventure Insurance Trend
            </h1>
            <p className="text-xl text-apex-darkgray/70 mb-8 max-w-3xl mx-auto">
              Join travel agents, tour operators, and hotels worldwide offering viral adventure insurance certificates to their customers.
            </p>
            
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {[
                { number: '50K+', label: 'Certificates Sold' },
                { number: '89%', label: 'Customer Satisfaction' },
                { number: '300+', label: 'B2B Partners' },
                { number: '#1', label: 'Social Media Trend' }
              ].map((stat, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-apex-black">{stat.number}</div>
                  <div className="text-sm text-apex-darkgray/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-apex-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="text-apex-red" size={24} />
                </div>
                <h3 className="font-bold text-apex-black mb-2">{benefit.title}</h3>
                <p className="text-sm text-apex-darkgray/70">{benefit.description}</p>
              </Card>
            ))}
          </div>

          {/* Pricing Tiers */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-apex-black text-center mb-12">
              Choose Your Partnership Level
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {pricingTiers.map((tier, index) => (
                <Card key={index} className="p-6 relative overflow-hidden hover:shadow-xl transition-shadow">
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${tier.color}`} />
                  
                  {tier.isPopular && (
                    <div className="absolute -top-3 -right-3">
                      <Badge className="bg-apex-red text-white">Most Popular</Badge>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className={`bg-gradient-to-r ${tier.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                      <tier.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-apex-black mb-2">{tier.name}</h3>
                    <div className="text-2xl font-bold text-apex-red">{tier.markup}</div>
                    <p className="text-sm text-apex-darkgray/70">markup potential</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-apex-darkgray/70">Minimum volume:</p>
                      <p className="font-semibold">{tier.minVolume}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-apex-darkgray/70 mb-2">Features included:</p>
                      <ul className="space-y-1">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-6" 
                    variant={tier.isPopular ? "default" : "outline"}
                    onClick={() => handlePartnerAccess(tier.name)}
                  >
                    {tier.cta}
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <Card className="max-w-2xl mx-auto p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-apex-black mb-4">
                Ready to Partner with Us?
              </h2>
              <p className="text-apex-darkgray/70">
                Fill out this form and we'll get back to you within 24 hours with a custom proposal.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Company Name *</label>
                <Input 
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  placeholder="Your Travel Company"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Contact Name *</label>
                <Input 
                  value={formData.contactName}
                  onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                  placeholder="John Smith"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@travelcompany.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Business Type *</label>
                <Input 
                  value={formData.businessType}
                  onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                  placeholder="Travel Agency, Tour Operator, Hotel..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Expected Monthly Volume</label>
                <Input 
                  value={formData.expectedVolume}
                  onChange={(e) => setFormData({...formData, expectedVolume: e.target.value})}
                  placeholder="50-100 certificates"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Tell us about your business</label>
              <Textarea 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="What type of travelers do you serve? What destinations? How would you integrate our certificates?"
                rows={4}
              />
            </div>
            
            <Button className="w-full mt-6 bg-apex-red hover:bg-apex-red/90">
              Submit Partnership Application
            </Button>
            
            <p className="text-xs text-center text-apex-darkgray/60 mt-4">
              We typically respond within 24 hours with a custom proposal and next steps.
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Wholesale;
