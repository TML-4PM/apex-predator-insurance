
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Award } from 'lucide-react';

const ProductHero = () => {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-apex-black to-slate-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>
      
      <div className="relative pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Hero Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge className="bg-apex-red hover:bg-apex-red/90 text-white px-4 py-2">
                <Award className="mr-2 h-4 w-4" />
                Premium Design
              </Badge>
              <Badge className="bg-green-600 hover:bg-green-700 text-white px-4 py-2">
                <Users className="mr-2 h-4 w-4" />
                2,847+ Happy Explorers
              </Badge>
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
                <Star className="mr-2 h-4 w-4" />
                4.8/5 Rating
              </Badge>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your <span className="text-apex-red">Apex Predator</span><br />
              Certificate
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The ultimate conversation starter and wall art that proves you're ready for any adventure. 
              <span className="text-apex-red font-semibold"> Because everyone needs wildlife insurance that doesn't actually insure anything.</span>
            </p>
            
            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-apex-red">60+</div>
                <div className="text-gray-300">Predator Species</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-apex-red">Instant</div>
                <div className="text-gray-300">Digital Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-apex-red">Premium</div>
                <div className="text-gray-300">Print Quality</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Image Placeholder */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-20 hidden lg:block">
        <div className="text-9xl">🦁</div>
      </div>
    </div>
  );
};

export default ProductHero;
