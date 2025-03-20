import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import InsurancePlans from '@/components/InsurancePlans';
import Certificate from '@/components/Certificate';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import WorldMap from '@/components/WorldMap';
import PhotoGallery from '@/components/PhotoGallery';
import MobileApp from '@/components/MobileApp';
import Community from '@/components/Community';
import Blog from '@/components/Blog';
import ContactForm from '@/components/ContactForm';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Compass, Route, Camera, Shield, Mail } from 'lucide-react';

const adventureTips = [
  {
    title: "Pack Light, Travel Far",
    description: "The less you carry, the more you'll experience. Essentials only!",
    icon: <Compass className="h-12 w-12 text-apex-red mb-4" />
  },
  {
    title: "Document Your Journey",
    description: "Capture those wild moments - just don't get too close to the wildlife!",
    icon: <Camera className="h-12 w-12 text-apex-red mb-4" />
  },
  {
    title: "Off The Beaten Path",
    description: "The most memorable adventures happen where the tourists aren't.",
    icon: <Route className="h-12 w-12 text-apex-red mb-4" />
  },
  {
    title: "Local Knowledge",
    description: "Chat with locals for hidden gems and authentic experiences.",
    icon: <MapPin className="h-12 w-12 text-apex-red mb-4" />
  },
  {
    title: "Stay Protected",
    description: "Adventure wisely (and get our certificates to brag about it later)!",
    icon: <Shield className="h-12 w-12 text-apex-red mb-4" />
  }
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Hero />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-apex-black mb-6 animate-fade-up">
              Adventure Tips & Tricks
            </h2>
            <p className="text-xl text-apex-darkgray/70 animate-fade-up animate-delay-100">
              Travel smarter, adventure harder, and always have a good story to tell.
            </p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {adventureTips.map((tip, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-1">
                    <Card className="border-2 border-apex-lightgray hover:border-apex-red/30 transition-all duration-300">
                      <CardContent className="flex flex-col items-center text-center p-6">
                        {tip.icon}
                        <h3 className="text-xl font-bold mb-2">{tip.title}</h3>
                        <p className="text-apex-darkgray/70">{tip.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative static translate-y-0 mr-2" />
              <CarouselNext className="relative static translate-y-0 ml-2" />
            </div>
          </Carousel>
        </div>
      </section>

      <Testimonials />
      
      <WorldMap />
      
      <PhotoGallery />
      
      <section className="py-20 bg-[#1A1F2C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-up">
              What You Get With Wildlife Shield
            </h2>
            <p className="text-xl text-white/70 mb-12 animate-fade-up animate-delay-100">
              A beautiful, personalized certificate for the adventure-seeker in your life.
              Perfect for gifts, jokes, and social media laughs.
            </p>
          </div>
          
          <div className="mt-12">
            <Certificate />
          </div>
        </div>
      </section>
      
      <MobileApp />
      
      <InsurancePlans />
      
      <Community />
      
      <Blog />
      
      <section className="py-20 bg-[#221F26] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1518599807935-37015b9cefcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Shark background"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.3) contrast(1.2)' }}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Don't Be Their Next Meal</h2>
              <p className="text-xl text-white/70">
                Get your Wildlife Shield certificate today. It won't save you, but it'll make everyone laugh!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform hover:scale-105 transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Great White Shark"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-2">Great White Shark</h3>
                <p className="text-white/70">
                  These apex predators can detect a single drop of blood from up to 3 miles away.
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform hover:scale-105 transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1610052178570-97bc8e3a0a7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Saltwater Crocodile"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-2">Saltwater Crocodile</h3>
                <p className="text-white/70">
                  With the strongest bite force of any animal, they can easily crush a human skull.
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform hover:scale-105 transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="African Lion"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-2">African Lion</h3>
                <p className="text-white/70">
                  Lions can leap up to 36 feet and their roar can be heard up to 5 miles away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-apex-black mb-6 animate-fade-up">
              Get In Touch
            </h2>
            <p className="text-xl text-apex-darkgray/70 animate-fade-up animate-delay-100 mb-8">
              Have questions about our (not-real) insurance or need assistance with your adventure planning?
              Drop us a message and we'll get back to you soon!
            </p>
            <div className="inline-flex items-center justify-center gap-2 text-apex-red font-medium mb-12">
              <Mail className="h-5 w-5" />
              <span>Messages will be sent to: troy.latter@4pm.net.au</span>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
      
      <FAQ />
    </Layout>
  );
};

export default Index;
