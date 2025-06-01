
import React from 'react';
import { MapPin } from 'lucide-react';
import { DeadlyAnimal } from '@/data/types/DeadlyAnimal';
import ImageWithFallback from '@/components/ImageWithFallback';

interface AnimalGridProps {
  animals: DeadlyAnimal[];
  isLoading: boolean;
  onAnimalClick: (animal: DeadlyAnimal) => void;
}

const AnimalGrid = ({ animals, isLoading, onAnimalClick }: AnimalGridProps) => {
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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="bg-apex-lightgray animate-pulse rounded-xl h-[400px]"></div>
        ))}
      </div>
    );
  }

  if (animals.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-apex-black mb-2">No predators found</h3>
        <p className="text-apex-darkgray/70">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {animals.map((animal, index) => (
        <div 
          key={animal.id} 
          className="bg-white rounded-xl overflow-hidden shadow-card border border-apex-black/5 animate-fade-up cursor-pointer hover:shadow-lg transition-all duration-300"
          style={{ animationDelay: `${(index % 12) * 50}ms` }}
          onClick={() => onAnimalClick(animal)}
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
  );
};

export default AnimalGrid;
