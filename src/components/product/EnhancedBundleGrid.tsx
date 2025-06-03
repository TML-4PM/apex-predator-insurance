
import React, { useState, useMemo } from 'react';
import { BundleProduct } from '@/hooks/useProducts';
import { BundleFilters } from './bundle/BundleFilters';
import { BundleCard } from './bundle/BundleCard';

interface EnhancedBundleGridProps {
  bundles: BundleProduct[];
  onSelectBundle: (bundle: BundleProduct) => void;
}

export const EnhancedBundleGrid = ({ bundles, onSelectBundle }: EnhancedBundleGridProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('savings');

  const filteredAndSortedBundles = useMemo(() => {
    let filtered = bundles.filter(bundle => {
      const matchesSearch = bundle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bundle.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || bundle.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    // Sort bundles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.base_price - b.base_price;
        case 'savings':
          return b.savings - a.savings;
        case 'animals':
          return b.animal_count - a.animal_count;
        default:
          return 0;
      }
    });

    return filtered;
  }, [bundles, searchTerm, categoryFilter, sortBy]);

  const categories = useMemo(() => {
    const cats = new Set(bundles.map(bundle => bundle.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [bundles]);

  return (
    <div className="space-y-6">
      <BundleFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        categories={categories}
        resultCount={filteredAndSortedBundles.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedBundles.map((bundle) => (
          <BundleCard
            key={bundle.id}
            bundle={bundle}
            onSelect={onSelectBundle}
          />
        ))}
      </div>

      {filteredAndSortedBundles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No bundles found matching your criteria</div>
          <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};
