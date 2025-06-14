
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
import { Camera, TrendingUp, Users, Target, Star, Shield, Globe, Award, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => (
  <>
    <ModernHero />
    
    {/* Social Proof Section */}
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-apex-black mb-4">
            Join 50,000+ Adventure Seekers
          </h2>
          <p className="text-xl text-apex-darkgray/70">
            From backpackers to influencers - everyone's getting covered
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, number: '50K+', label: 'Certificates Issued', color: 'text-blue-500' },
            { icon: Star, number: '4.9★', label: 'App Store Rating', color: 'text-yellow-500' },
            { icon: Target, number: '89%', label: 'Survival Rate', color: 'text-green-500' },
            { icon: TrendingUp, number: '#1', label: 'Travel Insurance Trend', color: 'text-purple-500' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm">
              <stat.icon className={`mx-auto mb-3 ${stat.color}`} size={32} />
              <div className="text-2xl font-bold text-apex-black">{stat.number}</div>
              <div className="text-sm text-apex-darkgray/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Predators Section */}
    <FeaturedPredators />

    {/* Plans Section with Social Focus */}
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 mb-4">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-green-700 font-semibold">Coverage Plans</span>
          </div>
          <h2 className="text-3xl font-bold text-apex-black mb-4">
            Choose Your Adventure Level
          </h2>
          <p className="text-xl text-apex-darkgray/70 mb-6">
            Perfect for solo travelers, couples, or squad adventures
          </p>
          <div className="inline-flex items-center gap-2 bg-apex-red/10 rounded-full px-4 py-2">
            <Camera size={16} className="text-apex-red" />
            <span className="text-apex-red font-medium">Certificate Perfect for Social Media</span>
          </div>
        </div>
        <InsurancePlans />
      </div>
    </div>

    {/* Interactive World Map */}
    <div className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
            <Globe className="h-5 w-5 text-blue-600" />
            <span className="text-blue-700 font-semibold">Global Coverage</span>
          </div>
          <h2 className="text-3xl font-bold text-apex-black mb-4">
            📍 Where Will You Adventure Next?
          </h2>
          <p className="text-xl text-apex-darkgray/70 mb-12">
            See where other adventurers are getting covered and planning their next thrill
          </p>
        </div>
        <WorldMap />
      </div>
    </div>

    {/* Mobile App Section */}
    <MobileApp />

    {/* Community Support Section */}
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-4 py-2 mb-4">
            <Heart className="h-5 w-5 text-purple-600" />
            <span className="text-purple-700 font-semibold">Community Support</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-apex-black mb-6">
            Support Our Mission
          </h2>
          <p className="text-xl text-apex-darkgray/70 mb-8">
            Help us protect adventurers worldwide with innovative insurance solutions
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/donate">
              <Button className="bg-apex-red hover:bg-apex-red/90">
                <Heart size={16} className="mr-2" />
                Make a Donation
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="border-apex-red text-apex-red hover:bg-apex-red/10">
                <Shield size={16} className="mr-2" />
                Learn Our Story
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-apex-lightgray/20 rounded-xl">
            <div className="bg-apex-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="text-apex-red" size={24} />
            </div>
            <h3 className="text-xl font-bold text-apex-black mb-3">Protection Innovation</h3>
            <p className="text-apex-darkgray/70">
              Developing cutting-edge insurance solutions for extreme adventures and dangerous wildlife encounters.
            </p>
          </div>
          
          <div className="text-center p-6 bg-apex-lightgray/20 rounded-xl">
            <div className="bg-apex-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="text-apex-red" size={24} />
            </div>
            <h3 className="text-xl font-bold text-apex-black mb-3">Global Community</h3>
            <p className="text-apex-darkgray/70">
              Building a worldwide network of adventurers who support each other through shared protection.
            </p>
          </div>
          
          <div className="text-center p-6 bg-apex-lightgray/20 rounded-xl">
            <div className="bg-apex-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Award className="text-apex-red" size={24} />
            </div>
            <h3 className="text-xl font-bold text-apex-black mb-3">Recognition System</h3>
            <p className="text-apex-darkgray/70">
              Acknowledging our supporters with special badges, certificates, and community recognition.
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/donate">
            <Button variant="outline" className="border-apex-red text-apex-red hover:bg-apex-red/10">
              View Donation Options
            </Button>
          </Link>
        </div>
      </div>
    </section>

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
  </>
);

export default Index;
