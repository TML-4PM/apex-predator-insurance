
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ShoppingCart, Crown, Star, Gift, Globe, Mountain, Snowflake, Sun } from 'lucide-react';
import { BundleProduct } from '@/hooks/useProducts';

interface EnhancedBundleGridProps {
  bundles: BundleProduct[];
  onSelectBundle: (bundle: BundleProduct) => void;
}

export const EnhancedBundleGrid = ({ bundles, onSelectBundle }: EnhancedBundleGridProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('savings');

  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'terrestrial': return <Mountain className="w-6 h-6 text-brown-500" />;
      case 'marine': return <Globe className="w-6 h-6 text-blue-500" />;
      case 'aerial': return <Star className="w-6 h-6 text-sky-500" />;
      case 'reptile': return <Crown className="w-6 h-6 text-green-500" />;
      case 'insect': return <Star className="w-6 h-6 text-orange-500" />;
      case 'regional': return <Globe className="w-6 h-6 text-purple-500" />;
      case 'experience': return <Star className="w-6 h-6 text-yellow-500" />;
      case 'seasonal': return <Snowflake className="w-6 h-6 text-cyan-500" />;
      case 'ultimate': return <Crown className="w-6 h-6 text-red-500" />;
      default: return <Gift className="w-6 h-6 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'terrestrial': return 'border-brown-200 bg-brown-50';
      case 'marine': return 'border-blue-200 bg-blue-50';
      case 'aerial': return 'border-sky-200 bg-sky-50';
      case 'reptile': return 'border-green-200 bg-green-50';
      case 'insect': return 'border-orange-200 bg-orange-50';
      case 'regional': return 'border-purple-200 bg-purple-50';
      case 'experience': return 'border-yellow-200 bg-yellow-50';
      case 'seasonal': return 'border-cyan-200 bg-cyan-50';
      case 'ultimate': return 'border-red-200 bg-red-50 border-2';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

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
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search bundle collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="savings">Best Savings</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="animals">Animal Count</SelectItem>
            </SelectContent>
          </Select>

          <div className="col-span-2 flex items-center gap-2 text-sm text-gray-600">
            <Gift className="w-4 h-4" />
            {filteredAndSortedBundles.length} bundle{filteredAndSortedBundles.length !== 1 ? 's' : ''} available
          </div>
        </div>
      </div>

      {/* Bundles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedBundles.map((bundle) => (
          <Card 
            key={bundle.id} 
            className={`group hover:shadow-lg transition-shadow overflow-hidden ${getCategoryColor(bundle.category || '')}`}
          >
            {bundle.category === 'ultimate' && (
              <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold">
                PREMIUM
              </div>
            )}
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="flex justify-center items-center mb-3">
                  {getCategoryIcon(bundle.category || '')}
                  <div className="text-4xl ml-2">{bundle.icon}</div>
                </div>
                <h3 className="font-bold text-xl text-apex-black mb-2">{bundle.name}</h3>
                <p className="text-gray-600">{bundle.description}</p>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-apex-red mb-1">
                    ${bundle.base_price}
                  </div>
                  <Badge className="bg-green-600 text-white mb-2">
                    {bundle.animal_count} Animals
                  </Badge>
                  <div className="text-lg text-green-600 font-semibold">
                    Save ${bundle.savings.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    vs individual purchases
                  </div>
                </div>
                
                <div className="space-y-2">
                  {bundle.features?.map((feature, index) => (
                    <div key={index} className="flex items-start text-sm text-gray-700">
                      <div className="w-2 h-2 bg-apex-red rounded-full mr-2 mt-2 flex-shrink-0"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 pt-0">
              <Button 
                onClick={() => onSelectBundle(bundle)}
                className={`w-full text-white ${
                  bundle.category === 'ultimate' 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                    : 'bg-apex-red hover:bg-apex-red/90'
                }`}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {bundle.category === 'ultimate' ? 'Get Premium Collection' : 'Select Bundle'}
              </Button>
            </div>
          </Card>
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
