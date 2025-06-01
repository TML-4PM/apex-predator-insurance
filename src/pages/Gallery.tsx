import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Search, Filter, Heart, Eye, MapPin } from 'lucide-react';
import { deadlyAnimals } from '@/data/animalUtils';
import { DeadlyAnimal } from '@/data/types/DeadlyAnimal';
import ImageWithFallback from '@/components/ImageWithFallback';
import ImageDebugger from '@/components/ImageDebugger';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Gallery = () => {
  const [animals, setAnimals] = useState<DeadlyAnimal[]>(deadlyAnimals);
  const [filteredAnimals, setFilteredAnimals] = useState<DeadlyAnimal[]>(deadlyAnimals);
  const [selectedAnimal, setSelectedAnimal] = useState<DeadlyAnimal | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = animals;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(animal =>
        animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.locations.some(location => 
          location.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(animal => animal.category === selectedCategory);
    }

    // Filter by rarity
    if (selectedRarity !== 'all') {
      filtered = filtered.filter(animal => animal.rarity === selectedRarity);
    }

    setFilteredAnimals(filtered);
  }, [searchTerm, selectedCategory, selectedRarity, animals]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'uncommon': return 'bg-green-500';
      case 'rare': return 'bg-blue-500';
      case 'legendary': return 'bg-purple-500';
      case 'mythic': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getDangerLevelColor = (level: number) => {
    if (level <= 2) return 'text-yellow-600';
    if (level <= 3) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <Layout>
      <div className="pt-28 pb-16 bg-apex-lightgray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-apex-black mb-6 animate-fade-up">
              Predator Gallery
            </h1>
            <p className="text-xl text-apex-darkgray/70 mb-6 animate-fade-up animate-delay-100">
              Explore all 60 deadly predators from around the world
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-apex-red/10 text-apex-red text-sm animate-fade-up animate-delay-200">
              <Eye size={16} />
              <span>Choose your next adventure</span>
            </div>
          </div>
        </div>
      </div>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Add debugger for testing */}
          <div className="mb-8">
            <ImageDebugger />
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-apex-darkgray/60" size={20} />
                <Input
                  placeholder="Search predators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="marine">Marine</SelectItem>
                  <SelectItem value="terrestrial">Terrestrial</SelectItem>
                  <SelectItem value="reptile">Reptile</SelectItem>
                  <SelectItem value="aerial">Aerial</SelectItem>
                  <SelectItem value="insect">Insect</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedRarity} onValueChange={setSelectedRarity}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Rarity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rarities</SelectItem>
                  <SelectItem value="common">Common</SelectItem>
                  <SelectItem value="uncommon">Uncommon</SelectItem>
                  <SelectItem value="rare">Rare</SelectItem>
                  <SelectItem value="legendary">Legendary</SelectItem>
                  <SelectItem value="mythic">Mythic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-apex-darkgray/60">
              Showing {filteredAnimals.length} of {deadlyAnimals.length} predators
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-apex-lightgray animate-pulse rounded-xl h-[400px]"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAnimals.map((animal, index) => (
                <div 
                  key={animal.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-card border border-apex-black/5 animate-fade-up cursor-pointer hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${(index % 12) * 50}ms` }}
                  onClick={() => setSelectedAnimal(animal)}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <ImageWithFallback
                      src={animal.imageUrl}
                      alt={animal.name}
                      category={animal.category}
                      className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <div className={`${getRarityColor(animal.rarity)} text-white text-xs font-medium px-3 py-1 rounded-full capitalize`}>
                        {animal.rarity}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full">
                        {animal.icon}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-apex-black text-lg">{animal.name}</h3>
                      <div className={`text-sm font-bold ${getDangerLevelColor(animal.dangerLevel)}`}>
                        Lv.{animal.dangerLevel}
                      </div>
                    </div>
                    
                    <p className="text-apex-darkgray/80 text-sm mb-3 line-clamp-2">
                      {animal.description}
                    </p>

                    <div className="flex items-center gap-1 text-xs text-apex-darkgray/60 mb-3">
                      <MapPin size={12} />
                      <span className="truncate">{animal.locations[0]}</span>
                      {animal.locations.length > 1 && (
                        <span>+{animal.locations.length - 1}</span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-apex-black/5">
                      <div className="text-xs text-apex-darkgray/60">
                        {animal.killsPerYear} kills/year
                      </div>
                      <div className="text-lg font-bold text-apex-red">
                        ${animal.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredAnimals.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-apex-black mb-2">No predators found</h3>
              <p className="text-apex-darkgray/70">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Animal Detail Dialog */}
      <Dialog open={selectedAnimal !== null} onOpenChange={(open) => !open && setSelectedAnimal(null)}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedAnimal && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <ImageWithFallback
                    src={selectedAnimal.imageUrl}
                    alt={selectedAnimal.name}
                    category={selectedAnimal.category}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-apex-lightgray/50 p-3 rounded-lg">
                    <div className="font-semibold text-apex-darkgray/60">Category</div>
                    <div className="capitalize">{selectedAnimal.category}</div>
                  </div>
                  <div className="bg-apex-lightgray/50 p-3 rounded-lg">
                    <div className="font-semibold text-apex-darkgray/60">Danger Level</div>
                    <div className={getDangerLevelColor(selectedAnimal.dangerLevel)}>
                      Level {selectedAnimal.dangerLevel}
                    </div>
                  </div>
                  <div className="bg-apex-lightgray/50 p-3 rounded-lg">
                    <div className="font-semibold text-apex-darkgray/60">Kills/Year</div>
                    <div>{selectedAnimal.killsPerYear}</div>
                  </div>
                  <div className="bg-apex-lightgray/50 p-3 rounded-lg">
                    <div className="font-semibold text-apex-darkgray/60">Price</div>
                    <div className="text-apex-red font-bold">${selectedAnimal.price}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between text-2xl">
                    <span>{selectedAnimal.name}</span>
                    <span className="text-3xl">{selectedAnimal.icon}</span>
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    {selectedAnimal.description}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="my-6">
                  <h4 className="font-semibold mb-3">Locations</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAnimal.locations.map((location, index) => (
                      <span key={index} className="bg-apex-lightgray px-3 py-1 rounded-full text-sm">
                        {location}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Deadly Facts</h4>
                  <ul className="space-y-2">
                    {selectedAnimal.facts.map((fact, index) => (
                      <li key={index} className="text-sm text-apex-darkgray/80 flex items-start gap-2">
                        <span className="text-apex-red">•</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-4 border-t flex gap-3">
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button className="flex-1 bg-apex-red hover:bg-apex-red/90">
                    Get Insurance - ${selectedAnimal.price}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Gallery;
