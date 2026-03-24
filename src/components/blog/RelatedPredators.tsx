import React from 'react';
import { deadlyAnimals } from '@/data/animalUtils';
import { getCompleteAnimalImageUrl } from '@/utils/completeImageMapping';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

// Map article categories to animal filter criteria
const CATEGORY_ANIMAL_MAP: Record<string, { category?: string; nameMatch?: string[] }> = {
  'Shark Safety': { category: 'marine', nameMatch: ['shark'] },
  'Bear Safety': { category: 'terrestrial', nameMatch: ['bear'] },
  'Big Cat Facts': { category: 'terrestrial', nameMatch: ['lion', 'tiger', 'leopard', 'jaguar', 'cheetah'] },
  'Crocodile Safety': { category: 'reptile', nameMatch: ['crocodile', 'alligator'] },
  'Snake Safety': { category: 'reptile', nameMatch: ['snake', 'cobra', 'mamba', 'viper', 'python', 'taipan', 'adder'] },
  'African Wildlife': { category: 'terrestrial', nameMatch: ['hippo', 'buffalo', 'elephant', 'rhino'] },
};

interface RelatedPredatorsProps {
  articleCategory: string;
}

const RelatedPredators: React.FC<RelatedPredatorsProps> = ({ articleCategory }) => {
  const filterConfig = CATEGORY_ANIMAL_MAP[articleCategory];
  if (!filterConfig) return null;

  const related = deadlyAnimals.filter(animal => {
    if (filterConfig.category && animal.category !== filterConfig.category) return false;
    if (filterConfig.nameMatch) {
      return filterConfig.nameMatch.some(keyword =>
        animal.name.toLowerCase().includes(keyword)
      );
    }
    return true;
  }).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="bg-muted/30 rounded-xl p-6 mt-12">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="font-bold text-lg">Related Predator Facts</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Data from our predator research files — {related.length} species covered.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map(animal => (
          <Card key={animal.id} className="overflow-hidden">
            <div className="flex gap-3 p-4">
              <img
                src={getCompleteAnimalImageUrl(animal.id, animal.category)}
                alt={animal.name}
                className="w-16 h-16 rounded-lg object-cover shrink-0"
                loading="lazy"
              />
              <div className="min-w-0">
                <h4 className="font-semibold text-sm truncate">{animal.name}</h4>
                <div className="flex items-center gap-1 my-1">
                  {Array.from({ length: animal.dangerLevel }, (_, i) => (
                    <span key={i} className="text-destructive text-xs">●</span>
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    Danger Level {animal.dangerLevel}/5
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  ~{animal.killsPerYear.toLocaleString()} deaths/year
                </p>
                {animal.facts[0] && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {animal.facts[0]}
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link to="/gallery" className="text-sm text-primary hover:underline">
          Explore all {deadlyAnimals.length} predators in our research database →
        </Link>
      </div>
    </div>
  );
};

export default RelatedPredators;
