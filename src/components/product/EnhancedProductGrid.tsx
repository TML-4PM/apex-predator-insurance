
import React, { useState, useMemo } from 'react';
import { Product } from '@/hooks/useProducts';
import { ProductFilters } from './individual/ProductFilters';
import { ProductGrid } from './individual/ProductGrid';

interface EnhancedProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const EnhancedProductGrid = ({ products, onSelectProduct }: EnhancedProductGridProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [rarityFilter, setRarityFilter] = useState('all');
  const [dangerFilter, setDangerFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.locations?.some(location => location.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchesRarity = rarityFilter === 'all' || product.rarity === rarityFilter;
      const matchesDanger = dangerFilter === 'all' || 
                           (dangerFilter === '1-2' && product.danger_level && product.danger_level <= 2) ||
                           (dangerFilter === '3-4' && product.danger_level && product.danger_level >= 3 && product.danger_level <= 4) ||
                           (dangerFilter === '5' && product.danger_level === 5);
      
      const matchesLocation = locationFilter === 'all' || 
                             product.locations?.some(location => 
                               location.toLowerCase().includes(locationFilter.toLowerCase())
                             );

      return matchesSearch && matchesCategory && matchesRarity && matchesDanger && matchesLocation;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'danger':
          return (b.danger_level || 0) - (a.danger_level || 0);
        case 'price':
          return (a.base_price || 0) - (b.base_price || 0);
        case 'rarity':
          const rarityOrder = { common: 1, uncommon: 2, rare: 3, legendary: 4, mythic: 5 };
          return (rarityOrder[b.rarity as keyof typeof rarityOrder] || 0) - (rarityOrder[a.rarity as keyof typeof rarityOrder] || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, categoryFilter, rarityFilter, dangerFilter, locationFilter, sortBy]);

  const uniqueLocations = useMemo(() => {
    const locations = new Set<string>();
    products.forEach(product => {
      product.locations?.forEach(location => locations.add(location));
    });
    return Array.from(locations).sort();
  }, [products]);

  return (
    <div className="space-y-6">
      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        rarityFilter={rarityFilter}
        onRarityChange={setRarityFilter}
        dangerFilter={dangerFilter}
        onDangerChange={setDangerFilter}
        locationFilter={locationFilter}
        onLocationChange={setLocationFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        uniqueLocations={uniqueLocations}
        filteredCount={filteredAndSortedProducts.length}
        totalCount={products.length}
      />

      <ProductGrid 
        products={filteredAndSortedProducts}
        onSelectProduct={onSelectProduct}
      />

      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No products found matching your criteria</div>
          <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};
