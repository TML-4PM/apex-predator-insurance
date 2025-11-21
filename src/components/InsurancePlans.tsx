import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Shield, ShoppingCart, Check, Globe, MapPin, Search, Trophy, Star, Filter, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PRICING_PLANS, PricingPlan } from '@/constants/pricing';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";

const fullInsurancePlans = PRICING_PLANS.map(plan => ({
  id: plan.id,
  name: plan.name,
  icon: plan.icon,
  price: plan.price,
  description: plan.description,
  location: plan.id.includes('bundle') ? 'Global' : 'Africa, Asia, Australia, North America, South America',
  features: plan.features || [],
  funFact: plan.id.includes('bundle') 
    ? "Did you know? Some predators, like the great white shark, can detect a single drop of blood in 25 gallons of water!" 
    : "Did you know? The average person has a better chance of getting struck by lightning than being attacked by this predator!"
}));

interface InsurancePlan {
  id: string;
  name: string;
  icon: string;
  price: number;
  description: string;
  location: string;
  features: string[];
  funFact: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  icon: string;
}

const popularPlanIds = ['shark', 'lion', 'bear', 'crocodile'];

const bundlePlanIds = ['bundle25', 'bundle60'];

const InsurancePlans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredPlans, setFilteredPlans] = useState<InsurancePlan[]>(fullInsurancePlans);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('all');
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<{id: string, name: string, icon: string}[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const plansPerPage = 9;

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Error parsing cart from localStorage:", e);
      }
    }
    
    const storedRecentlyViewed = localStorage.getItem('recentlyViewed');
    if (storedRecentlyViewed) {
      setRecentlyViewed(JSON.parse(storedRecentlyViewed));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    let filtered = fullInsurancePlans;

    if (searchTerm) {
      filtered = filtered.filter(plan => 
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(plan => 
        plan.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    if (priceFilter === 'under10') {
      filtered = filtered.filter(plan => plan.price < 10);
    } else if (priceFilter === 'over10') {
      filtered = filtered.filter(plan => plan.price >= 10);
    }

    if (activeTab === 'bundle') {
      filtered = filtered.filter(plan => bundlePlanIds.includes(plan.id));
    } else if (activeTab === 'popular') {
      filtered = filtered.filter(plan => popularPlanIds.includes(plan.id));
    }

    if (sortBy === 'name-asc') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilteredPlans(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedLocation, activeTab, priceFilter, sortBy]);

  const getUniqueLocations = (): string[] => {
    const locations = new Set<string>();

    fullInsurancePlans.forEach(plan => {
      if (plan.location.includes(',')) {
        plan.location.split(',').forEach(loc => {
          locations.add(loc.trim());
        });
      } else {
        locations.add(plan.location.trim());
      }
    });

    return Array.from(locations).sort();
  };

  const addToRecentlyViewed = (plan: InsurancePlan) => {
    const simplifiedPlan = {
      id: plan.id,
      name: plan.name,
      icon: plan.icon
    };

    let updatedRecent = [...recentlyViewed];

    updatedRecent = updatedRecent.filter(item => item.id !== plan.id);
    updatedRecent.unshift(simplifiedPlan);

    if (updatedRecent.length > 5) {
      updatedRecent = updatedRecent.slice(0, 5);
    }

    setRecentlyViewed(updatedRecent);
    localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecent));
  };

  const addToCart = (plan: InsurancePlan) => {
    addToRecentlyViewed(plan);
    
    if (bundlePlanIds.includes(plan.id) && cartItems.some(item => !bundlePlanIds.includes(item.id))) {
      toast({
        title: "Cannot add bundle with individual plans",
        description: "Please remove individual plans before adding a bundle.",
        variant: "destructive",
      });
      return;
    }
    
    if (!bundlePlanIds.includes(plan.id) && cartItems.some(item => bundlePlanIds.includes(item.id))) {
      toast({
        title: "Cannot add individual plans with bundle",
        description: "Please remove the bundle before adding individual plans.",
        variant: "destructive",
      });
      return;
    }
    
    if (cartItems.some(item => item.id === plan.id)) {
      toast({
        title: "Already in cart",
        description: `${plan.name} is already in your cart.`,
        variant: "default",
      });
      return;
    }
    
    const newCartItem = {
      id: plan.id,
      name: plan.name,
      price: plan.price,
      icon: plan.icon,
    };
    
    setCartItems([...cartItems, newCartItem]);
    
    toast({
      title: "Added to Cart",
      description: `${plan.name} has been added to your cart.`,
      variant: "default",
    });
    
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
      variant: "default",
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
      variant: "default",
    });
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    navigate('/checkout', { state: { cartItems } });
  };

  const handlePlanClick = (plan: InsurancePlan) => {
    addToRecentlyViewed(plan);
  };

  const indexOfLastPlan = currentPage * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = filteredPlans.slice(indexOfFirstPlan, indexOfLastPlan);
  const totalPages = Math.ceil(filteredPlans.length / plansPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    document.getElementById('plans-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="plans-section" className="py-10 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-4">
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-apex-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
                <SheetDescription>
                  {cartItems.length === 0 
                    ? "Your cart is empty" 
                    : `You have ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart`}
                </SheetDescription>
              </SheetHeader>
              
              {cartItems.length > 0 ? (
                <>
                  <div className="py-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{item.icon}</span>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="py-4 border-t">
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold text-apex-red">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <SheetFooter className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      onClick={clearCart}
                      className="w-full sm:w-auto"
                    >
                      Clear Cart
                    </Button>
                    <SheetClose asChild>
                      <Button 
                        onClick={proceedToCheckout}
                        className="w-full sm:w-auto bg-apex-red hover:bg-apex-red/90"
                      >
                        Checkout
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <SheetClose asChild>
                    <Button 
                      variant="outline"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Continue Shopping
                    </Button>
                  </SheetClose>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
        
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:w-1/2 mx-auto mb-6">
            <TabsTrigger value="all">All Plans</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="bundle">Bundle Deals</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col lg:flex-row items-center gap-4 mb-4">
            <div className="relative w-full lg:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for insurance plans..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 w-full lg:w-1/2">
              <Globe className="text-gray-400 flex-shrink-0" />
              <select
                className="border border-input bg-background rounded-md h-10 px-3 py-2 w-full text-sm"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {getUniqueLocations().map((location: string) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm"
            >
              <Filter size={16} />
              {showFilters ? "Hide Advanced Filters" : "Show Advanced Filters"}
            </Button>
            
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 border rounded-md bg-gray-50">
                <div>
                  <label className="text-sm font-medium mb-1 block">Price Range</label>
                  <select
                    className="border border-input bg-background rounded-md h-10 px-3 py-2 w-full text-sm"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  >
                    <option value="all">All Prices</option>
                    <option value="under10">Under $10</option>
                    <option value="over10">$10 and above</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Sort By</label>
                  <select
                    className="border border-input bg-background rounded-md h-10 px-3 py-2 w-full text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="default">Default</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          
          <Collapsible 
            open={isHowItWorksOpen} 
            onOpenChange={setIsHowItWorksOpen}
            className="mb-8 border rounded-lg p-4"
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between">
                <span>How It Works - Quick Guide</span>
                <span>{isHowItWorksOpen ? '▲' : '▼'}</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-apex-red/10 text-apex-red flex items-center justify-center mb-3 text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-bold text-apex-black mb-1">Choose Your Predator</h3>
                  <p className="text-sm text-apex-darkgray/70">
                    Select from our range of deadly predators or get the complete pack.
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-apex-red/10 text-apex-red flex items-center justify-center mb-3 text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-bold text-apex-black mb-1">Personalize It</h3>
                  <p className="text-sm text-apex-darkgray/70">
                    Add your name or gift recipient's details to customize the certificate.
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-apex-red/10 text-apex-red flex items-center justify-center mb-3 text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-bold text-apex-black mb-1">Download & Share</h3>
                  <p className="text-sm text-apex-darkgray/70">
                    Get your digital certificate instantly and share it with friends.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-apex-darkgray/70">
              Showing {filteredPlans.length} {filteredPlans.length === 1 ? 'plan' : 'plans'}
            </p>
            
            {activeTab === 'popular' && (
              <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                <Trophy size={14} className="mr-1" /> Popular Plans
              </Badge>
            )}
          </div>

          <TabsContent value="all">
            {currentPlans.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPlans.map((plan) => (
                    <div
                      key={plan.id}
                      id={plan.id}
                      className={cn(
                        "border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300",
                        bundlePlanIds.includes(plan.id) ? "border-2 border-apex-red col-span-1 sm:col-span-2 lg:col-span-1" : "border-gray-200"
                      )}
                      onClick={() => handlePlanClick(plan)}
                    >
                      <div className={cn(
                        "p-6 relative",
                        bundlePlanIds.includes(plan.id) ? "bg-gradient-to-r from-apex-red/10 to-apex-black/5" : "bg-white"
                      )}>
                        {popularPlanIds.includes(plan.id) && (
                          <div className="absolute top-0 right-0">
                            <div className="bg-amber-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg flex items-center text-xs font-semibold">
                              <Star size={14} className="mr-1" fill="white" />
                              Most Popular
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{plan.icon}</span>
                            <h3 className={cn(
                              "text-xl font-bold",
                              bundlePlanIds.includes(plan.id) ? "text-apex-red" : "text-apex-black"
                            )}>
                              {plan.name}
                            </h3>
                          </div>
                          
                          {bundlePlanIds.includes(plan.id) && (
                            <span className="px-3 py-1 bg-apex-red text-white text-xs font-semibold rounded-full">
                              Best Value
                            </span>
                          )}
                        </div>
                        
                        <p className="text-apex-darkgray/70 mb-4">
                          {plan.description}
                        </p>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <MapPin size={16} className="text-apex-darkgray/50" />
                          <span className="text-sm text-apex-darkgray/70">{plan.location}</span>
                        </div>
                        
                        <ScrollArea className="h-24 mb-4 rounded p-2 bg-gray-50">
                          <div className="pr-4">
                            <h4 className="text-sm font-semibold mb-2 text-apex-black">Fun Fact:</h4>
                            <p className="text-sm text-apex-darkgray/70 italic">"{plan.funFact}"</p>
                          </div>
                        </ScrollArea>
                        
                        <div className="space-y-2 mb-6">
                          <h4 className="text-sm font-semibold mb-2 text-apex-black">Coverage Includes:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                            {plan.features.map((feature, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-apex-darkgray/70">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-apex-black">${plan.price.toFixed(2)}</span>
                            <span className="text-sm text-apex-darkgray/70">/ year</span>
                          </div>
                          
                          <Button 
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(plan);
                            }} 
                            className={cn(
                              "flex items-center gap-2",
                              bundlePlanIds.includes(plan.id) ? "bg-apex-red hover:bg-apex-red/90" : ""
                            )}
                          >
                            <Plus size={16} className="mr-1" />
                            <span>Add to Cart</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Pagination className="mt-10">
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                      </PaginationItem>
                    )}
                    
                    {pageNumbers.map(number => (
                      <PaginationItem key={number}>
                        <PaginationLink 
                          isActive={currentPage === number}
                          onClick={() => handlePageChange(number)}
                        >
                          {number}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </>
            ) : (
              <div className="text-center py-16">
                <Shield className="mx-auto h-16 w-16 text-apex-darkgray/30 mb-4" />
                <h3 className="text-xl font-medium text-apex-black mb-2">No plans found</h3>
                <p className="text-apex-darkgray/70">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="popular">
            {currentPlans.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border-gray-200"
                    >
                      <div className="p-6 bg-white">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{plan.icon}</span>
                            <h3 className="text-xl font-bold text-apex-black">
                              {plan.name}
                            </h3>
                          </div>
                          
                          <span className="px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                            Popular
                          </span>
                        </div>
                        
                        <p className="text-apex-darkgray/70 mb-4">
                          {plan.description}
                        </p>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <MapPin size={16} className="text-apex-darkgray/50" />
                          <span className="text-sm text-apex-darkgray/70">{plan.location}</span>
                        </div>
                        
                        <ScrollArea className="h-24 mb-4 rounded p-2 bg-gray-50">
                          <div className="pr-4">
                            <h4 className="text-sm font-semibold mb-2 text-apex-black">Fun Fact:</h4>
                            <p className="text-sm text-apex-darkgray/70 italic">"{plan.funFact}"</p>
                          </div>
                        </ScrollArea>
                        
                        <div className="space-y-2 mb-6">
                          <h4 className="text-sm font-semibold mb-2 text-apex-black">Coverage Includes:</h4>
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-apex-darkgray/70">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-apex-black">${plan.price.toFixed(2)}</span>
                            <span className="text-sm text-apex-darkgray/70">/ year</span>
                          </div>
                          
                          <Button 
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(plan);
                            }}
                            className="flex items-center gap-2"
                          >
                            <Plus size={16} className="mr-1" />
                            <span>Add to Cart</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Pagination className="mt-10">
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                      </PaginationItem>
                    )}
                    
                    {pageNumbers.map(number => (
                      <PaginationItem key={number}>
                        <PaginationLink 
                          isActive={currentPage === number}
                          onClick={() => handlePageChange(number)}
                        >
                          {number}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </>
            ) : (
              <div className="text-center py-16">
                <Shield className="mx-auto h-16 w-16 text-apex-darkgray/30 mb-4" />
                <h3 className="text-xl font-medium text-apex-black mb-2">No popular plans found</h3>
                <p className="text-apex-darkgray/70">Try selecting the "All Plans" tab</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="bundle">
            {currentPlans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="border-2 border-apex-red rounded-xl overflow-hidden shadow-md bg-gradient-to-r from-apex-red/10 to-apex-black/5 p-6"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{plan.icon}</span>
                        <div>
                          <h3 className="text-2xl font-bold text-apex-red mb-2">
                            {plan.name}
                          </h3>
                          <p className="text-apex-darkgray/70 max-w-xl">
                            {plan.description}
                          </p>
                        </div>
                      </div>
                      
                      <span className="px-4 py-2 bg-apex-red text-white text-sm font-semibold rounded-full">
                        {plan.id === 'bundle25' ? 'Save 75%' : 'Save 83%'}
                      </span>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <h4 className="text-lg font-semibold mb-3 text-apex-black">Bundle Includes:</h4>
                      <div className="space-y-2">
                        {plan.features?.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-apex-darkgray/80">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-lg p-4">
                      <div className="mb-4 sm:mb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg text-apex-darkgray/70 line-through">
                            ${plan.id === 'bundle25' ? '249.75' : '599.40'}
                          </span>
                          <span className="bg-apex-red/10 text-apex-red text-xs px-2 py-1 rounded">
                            Save ${plan.id === 'bundle25' ? '189.76' : '499.41'}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-apex-black">${plan.price.toFixed(2)}</span>
                          <span className="text-apex-darkgray/70">/ year</span>
                        </div>
                        <p className="text-sm text-apex-darkgray/60 mt-1">
                          Just ${plan.id === 'bundle25' ? (plan.price / 25).toFixed(2) : (plan.price / 60).toFixed(2)} per predator
                        </p>
                      </div>
                      
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(plan);
                        }}
                        size="lg"
                        className="bg-apex-red hover:bg-apex-red/90 flex items-center gap-2 px-6"
                      >
                        <Plus size={18} className="mr-1" />
                        <span>Add to Cart</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Shield className="mx-auto h-16 w-16 text-apex-darkgray/30 mb-4" />
                <h3 className="text-xl font-medium text-apex-black mb-2">No bundle deals found</h3>
                <p className="text-apex-darkgray/70">Please try clearing your search filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default InsurancePlans;
