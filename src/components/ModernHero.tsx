
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Play, Users, TrendingUp, Instagram, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CertificatePreview from './CertificatePreview';
import SocialTemplates from './SocialTemplates';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ModernHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedPlan, setSelectedPlan] = useState({ name: 'Shark Insurance', price: 9.99 });
  
  const socialStats = [
    { icon: Instagram, label: '12.5K', sublabel: 'Posts' },
    { icon: Users, label: '89%', sublabel: 'Survival Rate' },
    { icon: TrendingUp, label: '#1', sublabel: 'Travel Trend' },
  ];

  const supporterTestimonials = [
    {
      name: 'Jake',
      age: 24,
      location: 'Bali',
      donation: '$100',
      text: 'Supporting real protection for adventurers like me!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Emma',
      age: 27,
      location: 'Australia',
      donation: '$50',
      text: 'Love knowing my adventures are covered properly',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Alex',
      age: 22,
      location: 'Kenya',
      donation: '$250',
      text: 'This service gives me peace of mind on every trip',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
        <div 
          className="absolute inset-0 bg-center bg-cover z-0"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
            filter: 'brightness(0.4) contrast(1.2)'
          }} 
        />
      </div>

      {/* Floating Social Proof */}
      <div className="absolute top-20 right-4 z-20 space-y-3 hidden lg:block">
        {socialStats.map((stat, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
            <div className="flex items-center gap-2 text-white">
              <stat.icon size={16} />
              <div>
                <div className="font-bold text-lg">{stat.label}</div>
                <div className="text-xs opacity-80">{stat.sublabel}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Hero Content */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-apex-red/20 backdrop-blur-sm border border-apex-red/30 rounded-full px-4 py-2 mb-6">
              <TrendingUp className="text-apex-red" size={16} />
              <span className="text-white font-medium">Supporting Real Adventure Protection</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Get <span className="text-apex-red">$50K Insurance</span><br />
              <span className="text-apex-yellow">Before Your Adventure</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Real protection for real adventurers. Support our mission to keep explorers safe worldwide.
            </p>

            {/* Donation Call-to-Action */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-white/10 text-white border-white/20 text-base px-4 py-2">
                💝 Support from $5
              </Badge>
              <Badge className="bg-apex-red text-white text-base px-4 py-2">
                🔥 Help Fund Protection (POPULAR)
              </Badge>
              <Badge className="bg-white/10 text-white border-white/20 text-base px-4 py-2">
                👑 VIP Supporter Access
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link to="/plans">
                <Button size="lg" className="bg-apex-red hover:bg-apex-red/90 text-white px-8 py-4 text-lg">
                  <ShoppingCart className="mr-2" size={20} />
                  Buy Insurance Now
                </Button>
              </Link>
              
              <Link to="/donate">
                <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-4 text-lg">
                  <Heart className="mr-2" size={20} />
                  Support Our Mission
                </Button>
              </Link>
            </div>
          </div>

          {/* Interactive Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Certificate Preview */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="preview" className="flex items-center gap-2">
                    <ShoppingCart size={16} />
                    Preview Certificate
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="flex items-center gap-2">
                    <Instagram size={16} />
                    Social Templates
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="preview">
                  <CertificatePreview 
                    selectedPlan={selectedPlan}
                    onPurchase={() => window.location.href = '/plans'}
                  />
                </TabsContent>
                
                <TabsContent value="templates">
                  <SocialTemplates 
                    predatorType="Shark"
                    userName="You"
                    destination="Paradise"
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Supporter Stories */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                🏆 Our Amazing Supporters
              </h3>
              
              <div className="space-y-4">
                {supporterTestimonials.map((supporter, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4 border border-white/10">
                    <div className="flex items-start gap-3">
                      <img 
                        src={supporter.image} 
                        alt={supporter.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-white">{supporter.name}</span>
                          <span className="text-white/60 text-sm">({supporter.age})</span>
                          <span className="text-apex-red font-bold">{supporter.donation}</span>
                        </div>
                        <div className="text-sm text-white/60 mb-2">{supporter.location}</div>
                        <p className="text-white/90 text-sm italic">"{supporter.text}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <Link to="/donate">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <Heart className="mr-2" size={16} />
                    Join Our Supporters
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/60">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">✓</Badge>
                <span>Real $50K Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">✓</Badge>
                <span>Instant Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">✓</Badge>
                <span>Community Supported</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHero;
