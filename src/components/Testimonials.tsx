
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
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Alex Thompson',
    age: 26,
    location: 'Australia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    quote: 'The lion roared so close I could smell its breath! Got my certificate framed next to the bite marks on my backpack.',
    adventure: 'Serengeti National Park',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sophie Williams',
    age: 24,
    location: 'United Kingdom',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
    quote: 'A great white shark smashed into our cage and got stuck! The certificate looks great next to my therapy bills!',
    adventure: 'Great Barrier Reef',
    rating: 5,
  },
  {
    id: 3,
    name: 'Miguel Rodriguez',
    age: 31,
    location: 'Spain',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces',
    quote: 'A grizzly charged our campsite at night. Still have nightmares, but at least I got this cool certificate!',
    adventure: 'Yellowstone',
    rating: 4,
  },
  {
    id: 4,
    name: 'Emma Chen',
    age: 27,
    location: 'Canada',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces',
    quote: 'An anaconda slithered through our camp! Woke up to find it wrapping around my tent. Got certificates for the whole shaken group!',
    adventure: 'Amazon Rainforest',
    rating: 5,
  },
  {
    id: 5,
    name: 'Jason Miller',
    age: 33,
    location: 'USA',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
    quote: 'A Komodo dragon followed our group for hours, waiting for someone to fall behind. Not sure if the certificate makes the nightmares better or worse!',
    adventure: 'Komodo Island',
    rating: 4,
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-apex-lightgray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-apex-black mb-6 animate-fade-up">
            Adventurers Love Us
          </h2>
          <p className="text-xl text-apex-darkgray/70 animate-fade-up animate-delay-100">
            Here's what our brave (or foolish) customers have to say about their Wildlife Shield experience.
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
                        <div>
                          <h3 className="font-bold text-apex-black">{testimonial.name}, {testimonial.age}</h3>
                          <p className="text-sm text-apex-darkgray/60">{testimonial.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                      
                      <blockquote className="italic text-apex-darkgray mb-4">"{testimonial.quote}"</blockquote>
                      
                      <div className="text-sm text-apex-red font-medium">
                        Adventure: {testimonial.adventure}
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
      </div>
    </section>
  );
};

export default Testimonials;
