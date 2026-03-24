
import React from 'react';
import ModernHero from '@/components/ModernHero';
import InsurancePlans from '@/components/InsurancePlans';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import WorldMap from '@/components/WorldMap';
import MobileApp from '@/components/MobileApp';
import Blog from '@/components/Blog';
import FeaturedPredators from '@/components/FeaturedPredators';
import { Button } from '@/components/ui/button';
import { Camera, TrendingUp, Users, Target, Star, Shield, Globe, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => (
  <>
    <ModernHero />
    
    {/* Social Proof Section */}
    <section className="py-16 bg-gradient-to-br from-secondary via-background to-accent/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Join 50,000+ Adventure Seekers
          </h2>
          <p className="text-xl text-muted-foreground">
            From backpackers to influencers - everyone's getting covered
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, number: '50K+', label: 'Certificates Issued', gradient: 'from-blue-500 to-blue-600' },
            { icon: Star, number: '4.9★', label: 'App Store Rating', gradient: 'from-accent to-yellow-600' },
            { icon: Target, number: '85+', label: 'Deadly Animals', gradient: 'from-green-500 to-green-600' },
            { icon: TrendingUp, number: '#1', label: 'Novelty Gift Trend', gradient: 'from-primary to-red-600' }
          ].map((stat, index) => (
            <div key={index} className="group text-center p-6 bg-card rounded-xl shadow-card border border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
              <div className={`mx-auto mb-3 w-12 h-12 rounded-full bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={24} />
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Predators Section */}
    <FeaturedPredators />

    {/* Plans Section with Social Focus */}
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-4">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-green-700 font-semibold">Certificate Plans</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Choose Your Adventure Level
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            Perfect for solo travelers, couples, or squad adventures
          </p>
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 shimmer">
            <Camera size={16} className="text-primary" />
            <span className="text-primary font-medium">Certificate Perfect for Social Media</span>
          </div>
        </div>
        <InsurancePlans />
      </div>
    </div>

    {/* Interactive World Map */}
    <div className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-4">
            <Globe className="h-5 w-5 text-blue-600" />
            <span className="text-blue-700 font-semibold">Global Coverage</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            📍 Where Will You Adventure Next?
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            See where other adventurers are getting covered and planning their next thrill
          </p>
        </div>
        <WorldMap />
      </div>
    </div>

    {/* Mobile App Section */}
    <MobileApp />

    {/* Testimonials */}
    <div className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Testimonials />
      </div>
    </div>

    {/* Blog Section */}
    <Blog />

    {/* FAQ */}
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <FAQ />
      </div>
    </div>

    {/* Contact */}
    <div className="py-16 bg-apex-red/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <ContactForm />
      </div>
    </div>

    {/* Subtle charity mention */}
    <div className="py-6 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          <Heart size={14} className="inline mr-1.5 text-primary/60" />
          A portion of proceeds supports wildlife education. 
          <Link to="/donate" className="text-primary hover:underline ml-1">Learn more →</Link>
        </p>
      </div>
    </div>
  </>
);

export default Index;
