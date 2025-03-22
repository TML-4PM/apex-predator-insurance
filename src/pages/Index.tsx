
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import InsurancePlans from '@/components/InsurancePlans';
import Certificate from '@/components/Certificate';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
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
import { MapPin, Compass, Route, Camera, Shield, Mail, ShoppingCart, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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

const popularPlans = [
  {
    id: "shark",
    name: "Great White Shark",
    description: "Our most popular certificate! Face your fear of the ocean's apex predator.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🦈"
  },
  {
    id: "crocodile",
    name: "Saltwater Crocodile",
    description: "For those brave souls venturing into murky waters. Don't be a snack!",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🐊"
  },
  {
    id: "bundle25",
    name: "25 Predator Bundle",
    description: "Our mid-tier value! Get covered for 25 apex predators at a great price.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🏅",
    isBundle: true
  },
  {
    id: "bundle",
    name: "Complete Bundle",
    description: "Our best value! Get covered for all 60 apex predators.",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    icon: "🏆",
    isBundle: true
  }
];

const Index = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleShareAdventure = () => {
    const url = window.location.href;
    const text = "Check out my adventure with Apex Predator Insurance!";
    
    if (navigator.share) {
      navigator.share({
        title: "Apex Predator Insurance Adventure",
        text: text,
        url: url,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(`${text} ${url}`)
        .then(() => {
          toast({
            title: "Link copied!",
            description: "Share link has been copied to your clipboard.",
          });
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          toast({
            title: "Sharing failed",
            description: "Could not copy the share link.",
            variant: "destructive"
          });
        });
    }
  };

  return (
    <Layout>
      <Hero />
      
      {/* Popular Plans Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-apex-black mb-6 animate-fade-up">
              Most Popular Certificates
            </h2>
            <p className="text-xl text-apex-darkgray/70 animate-fade-up animate-delay-100">
              Join thousands of adventure-seekers with our most thrilling predator certificates.
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
              {popularPlans.map((plan, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-1">
                    <Card className="border-2 border-apex-lightgray hover:border-apex-red/30 transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img 
                            src={plan.image} 
                            alt={plan.name} 
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          {plan.isBundle && (
                            <div className="absolute top-3 right-3 bg-apex-red text-white text-xs font-bold px-3 py-1 rounded-full">
                              BEST VALUE
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">{plan.name}</h3>
                            <span className="text-2xl">{plan.icon}</span>
                          </div>
                          <p className="text-apex-darkgray/70 mb-4">{plan.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-apex-red font-bold">${plan.price.toFixed(2)}</span>
                            <Link 
                              to={`/checkout?plan=${plan.id}&isBundle=${plan.isBundle ? 'true' : 'false'}`}
                              className="inline-flex items-center gap-2 bg-apex-red/10 hover:bg-apex-red/20 text-apex-red px-3 py-2 rounded-lg transition-colors"
                            >
                              <ShoppingCart size={16} />
                              <span className="font-medium">Get Now</span>
                            </Link>
                          </div>
                        </div>
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
          
          {/* Featured Crocodile Section */}
          <div className="mt-16 bg-gradient-to-r from-apex-red/20 to-apex-red/10 rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <div className="flex items-center mb-3">
                  <Shield className="h-6 w-6 text-apex-red mr-2" />
                  <h3 className="text-2xl font-bold text-apex-black">Featured: Saltwater Crocodile Insurance</h3>
                </div>
                <p className="text-lg text-apex-darkgray/80 mb-4">
                  Over 1,000 people every year face saltwater crocodiles in the wild. Get our popular certificate for just $9.99.
                </p>
                <div className="grid grid-cols-1 gap-3 text-sm mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Saltwater Crocodile"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="text-apex-darkgray/80">
                    Saltwater crocodiles are the largest reptiles on Earth, reaching lengths of over 20 feet. 
                    Their bite force is the strongest of any animal at 3,700 PSI - enough to crush a human skull with ease!
                  </p>
                </div>
                <p className="text-apex-red font-bold">Limited time offer - Get your certificate today!</p>
              </div>
              <div>
                <Link 
                  to="/checkout?plan=crocodile"
                  className="bg-apex-red hover:bg-apex-red/90 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Get Crocodile Certificate - $9.99</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Special Bundle Call-to-Action */}
          <div className="mt-16 bg-gradient-to-r from-apex-red/20 to-apex-red/10 rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <div className="flex items-center mb-3">
                  <Shield className="h-6 w-6 text-apex-red mr-2" />
                  <h3 className="text-2xl font-bold text-apex-black">Get Protected From All Predators</h3>
                </div>
                <p className="text-lg text-apex-darkgray/80 mb-4">
                  Our best value! The complete Predator Pack Bundle includes protection against all 60 predators for just $99.99.
                </p>
                <ul className="grid grid-cols-2 gap-2 text-sm mb-6">
                  <li className="flex items-center"><span className="mr-2">🦈</span> Sharks</li>
                  <li className="flex items-center"><span className="mr-2">🐊</span> Crocodiles</li>
                  <li className="flex items-center"><span className="mr-2">🐆</span> Big Cats</li>
                  <li className="flex items-center"><span className="mr-2">🐻</span> Bears</li>
                  <li className="flex items-center"><span className="mr-2">🐍</span> Snakes</li>
                  <li className="flex items-center"><span className="mr-2">🦂</span> Scorpions</li>
                  <li className="flex items-center"><span className="mr-2">🐘</span> Elephants</li>
                  <li className="flex items-center"><span className="mr-2">🦏</span> Rhinos</li>
                  <li className="flex items-center"><span className="mr-2">🦛</span> Hippos</li>
                  <li className="flex items-center"><span className="mr-2">🐺</span> Wolves</li>
                </ul>
                <p className="text-apex-red font-bold">Save over 80% compared to individual plans!</p>
              </div>
              <div>
                <Link 
                  to="/checkout?plan=bundle&isBundle=true"
                  className="bg-apex-red hover:bg-apex-red/90 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Get All Predators Bundle - $99.99</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
            src="https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Crocodile background"
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
                  src="https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
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
                  src="https://images.unsplash.com/photo-1591389703635-e15a07609a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Crocodile Attack"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-2">Crocodile Attack</h3>
                <p className="text-white/70">
                  Crocodiles can remain motionless for hours before launching a lightning-fast attack.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Adventure Tips & Tricks moved to bottom */}
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
      
      {/* Testimonials section moved to bottom */}
      <Testimonials />
      
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
              <span>Messages will be sent to: info@apexpredatorinsurance.com</span>
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
