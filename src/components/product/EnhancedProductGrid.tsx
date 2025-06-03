
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, ShoppingCart, Star, Zap, Crown, Skull } from 'lucide-react';
import { Product } from '@/hooks/useProducts';

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

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return <Star className="w-4 h-4 text-gray-500" />;
      case 'uncommon': return <Zap className="w-4 h-4 text-green-500" />;
      case 'rare': return <Crown className="w-4 h-4 text-blue-500" />;
      case 'legendary': return <Skull className="w-4 h-4 text-purple-500" />;
      case 'mythic': return <Crown className="w-4 h-4 text-red-500" />;
      default: return <Star className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-200 bg-gray-50';
      case 'uncommon': return 'border-green-200 bg-green-50';
      case 'rare': return 'border-blue-200 bg-blue-50';
      case 'legendary': return 'border-purple-200 bg-purple-50';
      case 'mythic': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

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
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by name, description, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="terrestrial">Terrestrial</SelectItem>
              <SelectItem value="marine">Marine</SelectItem>
              <SelectItem value="aerial">Aerial</SelectItem>
              <SelectItem value="reptile">Reptile</SelectItem>
              <SelectItem value="insect">Insect</SelectItem>
            </SelectContent>
          </Select>

          <Select value={rarityFilter} onValueChange={setRarityFilter}>
            <SelectTrigger>
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

          <Select value={dangerFilter} onValueChange={setDangerFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Danger Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="1-2">Low (1-2)</SelectItem>
              <SelectItem value="3-4">High (3-4)</SelectItem>
              <SelectItem value="5">Extreme (5)</SelectItem>
            </SelectContent>
          </Select>

          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {uniqueLocations.slice(0, 20).map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="danger">Danger Level</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rarity">Rarity</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            {filteredAndSortedProducts.length} of {products.length}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <Card 
            key={product.id} 
            className={`group hover:shadow-lg transition-shadow overflow-hidden ${getRarityColor(product.rarity || 'common')}`}
          >
            <div className="p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{product.icon}</div>
                <h3 className="font-bold text-lg text-apex-black mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {getRarityIcon(product.rarity || 'common')}
                    <span className="text-sm font-medium capitalize">{product.rarity}</span>
                  </div>
                  <Badge variant="destructive">
                    Danger: {product.danger_level}/5
                  </Badge>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-apex-red">
                    ${product.base_price || product.price}
                  </div>
                  <div className="text-sm text-gray-600">
                    Category: {product.category}
                  </div>
                </div>
                
                {product.locations && product.locations.length > 0 && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Locations:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.locations.slice(0, 3).map((location, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {location}
                        </Badge>
                      ))}
                      {product.locations.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.locations.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 pt-0">
              <Button 
                onClick={() => onSelectProduct(product)}
                className="w-full bg-apex-red hover:bg-apex-red/90 text-white"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Get Coverage
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No products found matching your criteria</div>
          <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};
