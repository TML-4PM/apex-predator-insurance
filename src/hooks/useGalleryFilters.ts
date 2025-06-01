
import { useState, useEffect } from 'react';
import { DeadlyAnimal } from '@/data/types/DeadlyAnimal';

export const useGalleryFilters = (animals: DeadlyAnimal[]) => {
  const [filteredAnimals, setFilteredAnimals] = useState<DeadlyAnimal[]>(animals);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');

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

  return {
    filteredAnimals,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedRarity,
    setSelectedRarity
  };
};
