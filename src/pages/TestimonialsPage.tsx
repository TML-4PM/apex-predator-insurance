
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Instagram, Camera, TrendingUp } from 'lucide-react';

const globalTestimonials = [
  {
    id: 1,
    name: 'Amanda R.',
    location: 'Seattle, USA',
    certificate: 'Tiger',
    rating: 5,
    destination: 'Machu Picchu',
    quote: 'I printed my Apex Predator certificate and took it atop the ancient ruins—now it\'s framed alongside my travel photos. The design held up beautifully through the trek, and locals thought it was an official permit! Totally boosted my explorer cred.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
  },
  {
    id: 2,
    name: 'Liam K.',
    location: 'Edinburgh, UK',
    certificate: 'Eagle',
    rating: 4,
    destination: 'Scottish Highlands',
    quote: 'Snapped my Eagle certificate against the backdrop of Edinburgh Castle, then carried it through the Highlands. It survived rain, wind, and midges—proof that quality matters. Just wish the delivery was a smidge faster for last-minute trips!',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
  },
  {
    id: 3,
    name: 'Beatriz S.',
    location: 'Rio de Janeiro, Brazil',
    certificate: 'Lion',
    rating: 5,
    destination: 'Rio Carnival',
    quote: 'Took my Lion certificate to the Samba parade in Rio—what a roar it got from fellow revelers! Loved sharing the charity story behind it. A true conversation starter on Copacabana Beach.',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325'
  },
  {
    id: 4,
    name: 'Jonas M.',
    location: 'Berlin, Germany',
    certificate: 'Shark',
    rating: 5,
    destination: 'Maldives',
    quote: 'I downloaded my Shark certificate on the plane, printed it in Malé, and posed with it before diving into the reef. The locals thought it was my diving licence—brilliant! Also, love that proceeds help marine conservation.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
  },
  {
    id: 5,
    name: 'Yuki T.',
    location: 'Tokyo, Japan',
    certificate: 'Wolf',
    rating: 4,
    destination: 'Mount Fuji',
    quote: 'My Wolf certificate made it into my carry-on on a Tokyo–Hakone day trip, and I got an epic shot with Mount Fuji behind it. Only missing one star because my printer at the ryokan was a bit patchy!',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
  },
  {
    id: 6,
    name: 'Thabo M.',
    location: 'Johannesburg, South Africa',
    certificate: 'Cheetah',
    rating: 5,
    destination: 'Kruger National Park',
    quote: 'Held my Cheetah certificate next to a real cheetah at Kruger National Park (behind the safety of a window!). The crisp print and vibrant art made it look authentic—park rangers even asked where I got mine.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
  }
];

const localTestimonials = [
  {
    id: 7,
    name: 'Marcus L.',
    location: 'Adelaide SA',
    certificate: 'Wolf',
    rating: 5,
    context: 'Office décor',
    quote: 'I snagged the Wolf certificate for my new home office, and it\'s become the centerpiece of my Zoom background! Colleagues have actually asked for their own \'insurance\'—brilliant concept and gorgeous design.',
  },
  {
    id: 8,
    name: 'Priya S.',
    location: 'Canberra ACT',
    certificate: 'Lion',
    rating: 4,
    context: 'Kids reward',
    quote: 'Bought the Lion certificate as a reward for my little adventurer after she finished her reading challenge. She absolutely loves it—proudly shows it to her friends at school. Only thing I\'d change is offering a kid-sized frame option!',
  },
  {
    id: 9,
    name: 'Kai M.',
    location: 'Gold Coast QLD',
    certificate: 'Various',
    rating: 5,
    context: 'Social media',
    quote: 'I posted an unboxing video on TikTok (@urban_explorer_), and it blew up overnight. People can\'t believe it\'s just a novelty certificate—they thought it was a legit wildlife permit! Great for influencers or anyone who loves a cheeky twist.',
  },
  {
    id: 10,
    name: 'Olivia B.',
    location: 'Sydney NSW',
    certificate: 'Bulk order',
    rating: 5,
    context: 'Corporate gifts',
    quote: 'I ordered a bulk set of 10 different species certificates as client thank-you gifts. They arrived perfectly packaged, and the personalisation made each one feel bespoke. Clients were delighted!',
  }
];

const TestimonialsPage = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
      />
    ));
  };

  return (
    <Layout>
      <div className="pt-28 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-apex-black mb-6 animate-fade-up">
                What Our Apex Explorers Are Saying
              </h1>
              <p className="text-xl text-apex-darkgray/70 mb-8 animate-fade-up animate-delay-100">
                From ancient ruins to modern offices - see where our certificates roam
              </p>
              
              {/* Social Call-to-Action */}
              <div className="bg-gradient-to-r from-apex-red/10 to-apex-orange/10 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-apex-black mb-4">Show Us Your Global Roar!</h2>
                <p className="text-apex-darkgray mb-4">Tag your travel snaps with your Apex certificate:</p>
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                  <Badge variant="outline" className="px-4 py-2">
                    <Instagram size={16} className="mr-2" />
                    @ApexPredatorIns
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    #ApexPredatorProofGlobal
                  </Badge>
                </div>
                <p className="text-sm text-apex-darkgray/70">
                  Each quarter we spotlight the most adventurous shot with a free "All Species" upgrade!
                </p>
              </div>
            </div>

            {/* Global Adventures Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-apex-black mb-8 text-center flex items-center justify-center gap-3">
                <TrendingUp className="text-apex-red" />
                Global Adventures
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {globalTestimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-apex-black">{testimonial.name}</h3>
                          <p className="text-sm text-apex-darkgray/60">{testimonial.location}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex mb-1">{renderStars(testimonial.rating)}</div>
                          <Badge className="bg-apex-red/10 text-apex-red">
                            {testimonial.certificate}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="aspect-video rounded-lg mb-4 overflow-hidden">
                        <img 
                          src={testimonial.image} 
                          alt={`${testimonial.destination} adventure`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <blockquote className="text-apex-darkgray mb-4 italic">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="text-sm font-medium text-apex-red">
                        📍 Adventure: {testimonial.destination}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Local Stories Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-apex-black mb-8 text-center flex items-center justify-center gap-3">
                <Camera className="text-apex-red" />
                Aussie Stories
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {localTestimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-apex-black">{testimonial.name}</h3>
                          <p className="text-sm text-apex-darkgray/60">{testimonial.location}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex mb-1">{renderStars(testimonial.rating)}</div>
                          <Badge variant="outline">
                            {testimonial.certificate}
                          </Badge>
                        </div>
                      </div>
                      
                      <blockquote className="text-apex-darkgray mb-4 italic">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="text-sm font-medium text-apex-orange">
                        🎯 Use case: {testimonial.context}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <div className="text-center bg-apex-red/5 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-apex-black mb-4">Ready for Your Own Adventure?</h2>
              <p className="text-apex-darkgray mb-6">
                Join thousands of explorers who've made their mark around the world
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-apex-red hover:bg-apex-red/90" size="lg">
                  <Camera size={20} className="mr-2" />
                  Get Your Certificate
                </Button>
                <Button variant="outline" className="border-apex-red text-apex-red hover:bg-apex-red/10" size="lg">
                  <Instagram size={20} className="mr-2" />
                  Follow Our Journey
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TestimonialsPage;
