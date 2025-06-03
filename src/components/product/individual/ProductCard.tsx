
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/hooks/useProducts';
import { getRarityIcon, getRarityColor } from './ProductUtils';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard = ({ product, onSelect }: ProductCardProps) => {
  return (
    <Card 
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
          onClick={() => onSelect(product)}
          className="w-full bg-apex-red hover:bg-apex-red/90 text-white"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Get Coverage
        </Button>
      </div>
    </Card>
  );
};
