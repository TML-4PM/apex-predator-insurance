
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Zap, Eye } from 'lucide-react';
import { getFeaturedAnimals } from '@/data/deadlyAnimals';
import { Link } from 'react-router-dom';

const FeaturedPredators = () => {
  const featuredAnimals = getFeaturedAnimals(8);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'mythic':
        return 'bg-purple-600 text-white';
      case 'legendary':
        return 'bg-amber-600 text-white';
      case 'rare':
        return 'bg-blue-600 text-white';
      case 'uncommon':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getDangerColor = (level: number) => {
    if (level >= 5) return 'bg-red-600';
    if (level >= 4) return 'bg-orange-500';
    if (level >= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-apex-red/10 rounded-full px-4 py-2 mb-4">
            <Star className="h-5 w-5 text-apex-red" />
            <span className="text-apex-red font-semibold">Featured Predators</span>
          </div>
          <h2 className="text-4xl font-bold text-apex-black mb-4">
            Meet Our Most Legendary Predators
          </h2>
          <p className="text-xl text-apex-darkgray/70 max-w-3xl mx-auto">
            From the depths of the ocean to the heart of the jungle - these are the apex predators 
            that adventurers fear and respect most. Get your certificate for the ultimate bragging rights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredAnimals.map((animal) => (
            <Card 
              key={animal.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative">
                <img 
                  src={animal.imageUrl}
                  alt={animal.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className={getRarityColor(animal.rarity)}>
                    {animal.rarity.toUpperCase()}
                  </Badge>
                  <Badge className={`${getDangerColor(animal.dangerLevel)} text-white`}>
                    Danger {animal.dangerLevel}/5
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="text-2xl">{animal.icon}</div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-apex-black mb-2">
                  {animal.name}
                </h3>
                <p className="text-sm text-apex-darkgray/70 mb-3">
                  {animal.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-apex-red">
                    ${animal.price}
                  </div>
                  <div className="text-sm text-apex-darkgray/70">
                    {animal.locations[0]}
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="text-xs text-apex-darkgray/70">
                    💀 {animal.killsPerYear} deaths/year
                  </div>
                  <div className="text-xs text-apex-darkgray/70 line-clamp-2">
                    {animal.facts[0]}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-apex-red hover:bg-apex-red/90 text-white"
                  asChild
                >
                  <Link to="/product">
                    <Zap className="mr-2 h-4 w-4" />
                    Get Certificate
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/gallery">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-apex-red text-apex-red hover:bg-apex-red/10"
            >
              <Eye className="mr-2 h-5 w-5" />
              View All 60+ Predators
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPredators;
