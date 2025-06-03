
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import { Product } from '@/hooks/useProducts';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductGrid = ({ products, onAddToCart, onSelectProduct }: ProductGridProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesRarity = selectedRarity === 'all' || product.rarity === selectedRarity;
    
    return matchesSearch && matchesCategory && matchesRarity;
  });

  const categories = ['all', 'terrestrial', 'marine', 'aerial', 'reptile', 'insect'];
  const rarities = ['all', 'common', 'uncommon', 'rare', 'legendary', 'mythic'];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'uncommon': return 'bg-green-600';
      case 'rare': return 'bg-blue-600';
      case 'legendary': return 'bg-purple-600';
      case 'mythic': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search animals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedRarity} onValueChange={setSelectedRarity}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Rarity" />
          </SelectTrigger>
          <SelectContent>
            {rarities.map(rarity => (
              <SelectItem key={rarity} value={rarity}>
                {rarity === 'all' ? 'All Rarities' : rarity.charAt(0).toUpperCase() + rarity.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
            <div onClick={() => onSelectProduct(product)} className="p-4">
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{product.icon}</div>
                <h3 className="font-bold text-lg text-apex-black">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Badge className={`text-white ${getRarityColor(product.rarity)}`}>
                    {product.rarity}
                  </Badge>
                  <Badge variant="outline">
                    Danger: {product.danger_level}/5
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-apex-red">
                    ${product.base_price}
                  </span>
                  <Badge className="bg-green-600 text-white">
                    {product.category}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="p-4 pt-0">
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                className="w-full bg-apex-red hover:bg-apex-red/90 text-white"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
