
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Star, Filter, Search, TrendingUp } from 'lucide-react';
import { merchandise, getMerchandiseByCategory, getPopularMerchandise } from '@/data/merchandise';
import { useToast } from '@/hooks/use-toast';

const MerchandiseStore = () => {
  const [cart, setCart] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const { toast } = useToast();

  const addToCart = (itemId: string) => {
    setCart(prev => [...prev, itemId]);
    const item = merchandise.find(m => m.id === itemId);
    toast({
      title: "Added to Cart",
      description: `${item?.name} has been added to your cart.`,
    });
  };

  const filteredMerchandise = merchandise
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'popularity': return b.popularity - a.popularity;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  const MerchandiseCard = ({ item }: { item: typeof merchandise[0] }) => (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="p-4">
        <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-3 flex items-center justify-center text-4xl">
          🎯
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-sm font-semibold line-clamp-2">{item.name}</CardTitle>
            <Badge variant={item.popularity > 90 ? "destructive" : "secondary"} className="text-xs">
              {item.popularity > 90 ? '🔥' : '⭐'} {item.popularity}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-apex-red">${item.price}</span>
          <Button 
            size="sm" 
            onClick={() => addToCart(item.id)}
            className="bg-apex-red hover:bg-apex-red/90"
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-apex-black">Wildlife Shield Store</h2>
        <p className="text-lg text-apex-darkgray/70">
          Gear up for your next adventure with our survival merchandise
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-apex-darkgray/60">
          <span className="flex items-center gap-1">
            <ShoppingCart className="h-4 w-4" />
            {cart.length} items in cart
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            Free shipping over $50
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search merchandise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Most Popular</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Featured Items */}
      <div className="bg-gradient-to-r from-apex-red/10 to-orange-500/10 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Bestsellers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {getPopularMerchandise(3).map(item => (
            <MerchandiseCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Product Categories */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="apparel">Apparel</TabsTrigger>
          <TabsTrigger value="gear">Gear</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
          <TabsTrigger value="digital">Digital</TabsTrigger>
          <TabsTrigger value="experience">Experiences</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMerchandise.map(item => (
              <MerchandiseCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>

        {['apparel', 'gear', 'accessories', 'digital', 'experience'].map(category => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {getMerchandiseByCategory(category).map(item => (
                <MerchandiseCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Coming Soon */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">🚀 Coming Soon</h3>
          <p className="text-muted-foreground mb-4">
            NFT Certificates • VR Experiences • Monthly Survival Boxes
          </p>
          <Button variant="outline">
            Join Waitlist
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchandiseStore;
