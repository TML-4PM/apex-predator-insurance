
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { DeadlyAnimal } from '@/data/types/DeadlyAnimal';
import ImageWithFallback from '@/components/ImageWithFallback';

interface AnimalDetailDialogProps {
  animal: DeadlyAnimal | null;
  onClose: () => void;
}

const AnimalDetailDialog = ({ animal, onClose }: AnimalDetailDialogProps) => {
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

  if (!animal) return null;

  return (
    <Dialog open={animal !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <ImageWithFallback
                src={animal.imageUrl}
                alt={animal.name}
                category={animal.category}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-apex-lightgray/50 p-3 rounded-lg">
                <div className="font-semibold text-apex-darkgray/60">Category</div>
                <div className="capitalize">{animal.category}</div>
              </div>
              <div className="bg-apex-lightgray/50 p-3 rounded-lg">
                <div className="font-semibold text-apex-darkgray/60">Danger Level</div>
                <div className={getDangerLevelColor(animal.dangerLevel)}>
                  Level {animal.dangerLevel}
                </div>
              </div>
              <div className="bg-apex-lightgray/50 p-3 rounded-lg">
                <div className="font-semibold text-apex-darkgray/60">Kills/Year</div>
                <div>{animal.killsPerYear}</div>
              </div>
              <div className="bg-apex-lightgray/50 p-3 rounded-lg">
                <div className="font-semibold text-apex-darkgray/60">Price</div>
                <div className="text-apex-red font-bold">${animal.price}</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between text-2xl">
                <span>{animal.name}</span>
                <span className="text-3xl">{animal.icon}</span>
              </DialogTitle>
              <DialogDescription className="text-base">
                {animal.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="my-6">
              <h4 className="font-semibold mb-3">Locations</h4>
              <div className="flex flex-wrap gap-2">
                {animal.locations.map((location, index) => (
                  <span key={index} className="bg-apex-lightgray px-3 py-1 rounded-full text-sm">
                    {location}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">Deadly Facts</h4>
              <ul className="space-y-2">
                {animal.facts.map((fact, index) => (
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
                Get Insurance - ${animal.price}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnimalDetailDialog;
