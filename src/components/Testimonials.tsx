
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Camera, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    name: 'Amanda Rodriguez',
    age: 28,
    location: 'Seattle, USA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
    quote: 'My Tiger certificate flew with me to Machu Picchu! The design held up beautifully through the trek, and locals thought it was an official permit.',
    adventure: 'Machu Picchu, Peru',
    rating: 5,
    certificate: 'Tiger'
  },
  {
    id: 2,
    name: 'Jonas Mueller',
    age: 31,
    location: 'Berlin, Germany',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    quote: 'Downloaded my Shark certificate on the plane, printed it in Malé, and posed with it before diving into the reef. Locals thought it was my diving licence!',
    adventure: 'Maldives Reef Diving',
    rating: 5,
    certificate: 'Shark'
  },
  {
    id: 3,
    name: 'Thabo Maseko',
    age: 34,
    location: 'Johannesburg, SA',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces',
    quote: 'Held my Cheetah certificate next to a real cheetah at Kruger National Park. The crisp print made it look authentic—park rangers asked where I got mine!',
    adventure: 'Kruger National Park',
    rating: 5,
    certificate: 'Cheetah'
  },
  {
    id: 4,
    name: 'Beatriz Santos',
    age: 26,
    location: 'Rio de Janeiro, BR',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces',
    quote: 'Took my Lion certificate to Rio Carnival—what a roar it got from fellow revelers! Loved sharing the charity story behind it.',
    adventure: 'Rio Carnival',
    rating: 5,
    certificate: 'Lion'
  },
  {
    id: 5,
    name: 'Marcus Liu',
    age: 29,
    location: 'Adelaide, AU',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
    quote: 'My Wolf certificate became the centerpiece of my Zoom background! Colleagues have actually asked for their own "insurance"—brilliant concept.',
    adventure: 'Home Office Setup',
    rating: 5,
    certificate: 'Wolf'
  },
  {
    id: 6,
    name: 'Yuki Tanaka',
    age: 27,
    location: 'Tokyo, Japan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    quote: 'Got an epic shot with my Wolf certificate and Mount Fuji behind it. Only missing one star because my printer at the ryokan was a bit patchy!',
    adventure: 'Mount Fuji Trek',
    rating: 4,
    certificate: 'Wolf'
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-apex-lightgray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-apex-black mb-6 animate-fade-up">
            Epic Adventures Worldwide
          </h2>
          <p className="text-xl text-apex-darkgray/70 animate-fade-up animate-delay-100 mb-6">
            From ancient ruins to modern offices - see where our certificates roam
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/testimonials">
              <Button variant="outline" className="border-apex-red text-apex-red hover:bg-apex-red/10">
                <Camera size={16} className="mr-2" />
                See All Adventures
              </Button>
            </Link>
          </div>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/1 pl-4">
                <div className="p-1">
                  <Card className="border border-apex-lightgray bg-white shadow-md hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start mb-4">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-apex-black">{testimonial.name}, {testimonial.age}</h3>
                              <p className="text-sm text-apex-darkgray/60">{testimonial.location}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-apex-red font-medium mb-1">{testimonial.certificate}</div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={14} 
                                    className={i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <blockquote className="italic text-apex-darkgray mb-4 text-sm leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="text-sm text-apex-red font-medium">
                        📍 {testimonial.adventure}
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

        {/* Social Media Call-to-Action */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-apex-red/10 to-apex-orange/10 rounded-xl">
          <h3 className="text-xl font-bold text-apex-black mb-4">Share Your Adventure!</h3>
          <p className="text-apex-darkgray mb-4">Tag us @ApexPredatorIns with #ApexPredatorProofGlobal</p>
          <div className="flex justify-center gap-4">
            <Link to="/testimonials">
              <Button className="bg-apex-red hover:bg-apex-red/90">
                <ExternalLink size={16} className="mr-2" />
                See All Stories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
