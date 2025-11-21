
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
      case 'common': return 'bg-muted';
      case 'uncommon': return 'bg-accent/80';
      case 'rare': return 'bg-primary/70';
      case 'legendary': return 'bg-primary';
      case 'mythic': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-card rounded-lg shadow-card border border-border">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
          <Card key={product.id} className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden bg-card border-border">
            <div onClick={() => onSelectProduct(product)} className="p-4">
              <div className="text-center mb-4">
                <div className="text-6xl mb-2 transition-transform group-hover:scale-110 duration-300">{product.icon}</div>
                <h3 className="font-bold text-lg text-foreground">{product.name}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{product.description}</p>
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
                  <span className="text-2xl font-bold text-primary">
                    ${product.base_price}
                  </span>
                  <Badge className="bg-accent text-accent-foreground">
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
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-card rounded-lg border border-border">
          <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
