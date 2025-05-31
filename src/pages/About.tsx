
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Mountain, Bike, Heart } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="pt-28 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-apex-black mb-6 animate-fade-up">
                Meet the Team
              </h1>
              <p className="text-xl text-apex-darkgray/70 animate-fade-up animate-delay-100">
                The adventurous minds behind your favorite novelty certificates
              </p>
            </div>

            {/* Team Members */}
            <div className="space-y-12">
              
              {/* Emily Carter */}
              <Card className="overflow-hidden shadow-lg">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 gap-0">
                    <div className="md:col-span-1">
                      <div className="aspect-square bg-gradient-to-br from-apex-red to-apex-orange">
                        <img 
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces" 
                          alt="Emily Carter"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2 p-8">
                      <div className="mb-4">
                        <h2 className="text-2xl font-bold text-apex-black mb-2">Emily Carter</h2>
                        <p className="text-lg text-apex-red font-medium">Founder & CEO</p>
                      </div>
                      
                      <p className="text-apex-darkgray mb-6 leading-relaxed">
                        Emily is the visionary driving force behind Apex Predator Insurance. With over 15 years of leadership in product innovation and brand strategy—most recently as Chief Product Officer at a leading Australian insurtech—she founded the company to bring playful, high-quality collectibles to life. Emily oversees every aspect of the business, from creative direction and charity partnerships to regulatory compliance and customer experience.
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-apex-darkgray/70">
                        <div className="flex items-center gap-2">
                          <Mountain size={16} className="text-apex-red" />
                          <span>Rock-climbing enthusiast</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart size={16} className="text-apex-red" />
                          <span>Big-cat conservation advocate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mark Nguyen */}
              <Card className="overflow-hidden shadow-lg">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 gap-0">
                    <div className="md:col-span-1">
                      <div className="aspect-square bg-gradient-to-br from-blue-500 to-blue-600">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces" 
                          alt="Mark Nguyen"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2 p-8">
                      <div className="mb-4">
                        <h2 className="text-2xl font-bold text-apex-black mb-2">Mark Nguyen</h2>
                        <p className="text-lg text-apex-red font-medium">Operations & Fulfillment Lead</p>
                      </div>
                      
                      <p className="text-apex-darkgray mb-6 leading-relaxed">
                        Mark keeps the wheels turning behind the scenes. With a background in e-commerce logistics and warehouse management at one of Australia's largest online gift retailers, he's the architect of our seamless "Print & Post" service. Mark designs workflows, negotiates shipping partnerships, and personally audits every package to make sure your certificate arrives on time and in perfect condition.
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-apex-darkgray/70">
                        <div className="flex items-center gap-2">
                          <Bike size={16} className="text-apex-red" />
                          <span>Motorbike touring across Australia</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart size={16} className="text-apex-red" />
                          <span>STEM education volunteer</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team Note */}
            <div className="text-center mt-16 p-8 bg-apex-lightgray rounded-xl">
              <p className="text-lg text-apex-darkgray italic">
                The rest of our team works quietly behind the scenes—like you, we let Emily lead the roar. Our staff are based in Australia, and every certificate is quality-checked before delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
