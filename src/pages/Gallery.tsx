
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { deadlyAnimals } from '@/data/animalUtils';
import { DeadlyAnimal } from '@/data/types/DeadlyAnimal';
import GalleryHeader from '@/components/gallery/GalleryHeader';
import ImageManagementTools from '@/components/gallery/ImageManagementTools';
import GalleryFilters from '@/components/gallery/GalleryFilters';
import AnimalGrid from '@/components/gallery/AnimalGrid';
import AnimalDetailDialog from '@/components/gallery/AnimalDetailDialog';
import { useGalleryFilters } from '@/hooks/useGalleryFilters';

const Gallery = () => {
  const [animals, setAnimals] = useState<DeadlyAnimal[]>(deadlyAnimals);
  const [selectedAnimal, setSelectedAnimal] = useState<DeadlyAnimal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuditTool, setShowAuditTool] = useState(false);

  const {
    filteredAnimals,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedRarity,
    setSelectedRarity
  } = useGalleryFilters(animals);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <GalleryHeader />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ImageManagementTools 
            showAuditTool={showAuditTool}
            setShowAuditTool={setShowAuditTool}
          />

          <GalleryFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedRarity={selectedRarity}
            setSelectedRarity={setSelectedRarity}
            totalAnimals={deadlyAnimals.length}
            filteredCount={filteredAnimals.length}
          />

          <AnimalGrid
            animals={filteredAnimals}
            isLoading={isLoading}
            onAnimalClick={setSelectedAnimal}
          />
        </div>
      </section>

      <AnimalDetailDialog
        animal={selectedAnimal}
        onClose={() => setSelectedAnimal(null)}
      />
    </Layout>
  );
};

export default Gallery;
