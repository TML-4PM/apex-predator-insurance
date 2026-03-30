
import React, { useEffect, useState } from 'react';

import InsurancePlans from '@/components/InsurancePlans';
import { ShoppingCart } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ULTIMATE_BUNDLE } from '@/constants/pricing/bundlePlans';

interface RecentlyViewedPlan {
  id: string;
  name: string;
  icon: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  icon: string;
}

const Plans = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedPlan[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const storedRecentlyViewed = localStorage.getItem('recentlyViewed');
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedRecentlyViewed) setRecentlyViewed(JSON.parse(storedRecentlyViewed));
      if (storedCartItems) setCartItems(JSON.parse(storedCartItems));
    } catch (error) {
      console.error("Error retrieving data from localStorage:", error);
    }
  }, []);

  return (
    <>
      <div className="pt-24 pb-12 bg-apex-lightgray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-apex-black mb-4 animate-fade-up">
              Choose Your Wildlife Certificate
            </h1>
            <p className="text-lg text-apex-darkgray/70 mb-4 animate-fade-up animate-delay-100">
              Each certificate commemorates your connection with the world's most extraordinary predators.
            </p>
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 px-4 py-2 rounded-full bg-apex-red/10 text-apex-red text-sm animate-fade-up animate-delay-200">
              <div className="flex items-center gap-2">
                <ShoppingCart size={16} />
                <span>Individual: US$9.99</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>Top 25: US$79.00</span>
              <span className="hidden sm:inline">•</span>
              <span>All 60: US${ULTIMATE_BUNDLE.price.toFixed(2)}</span>
            </div>
            
            {cartItems.length > 0 && (
              <div className="mt-4 animate-pulse">
                <Badge className="bg-apex-red">
                  <ShoppingCart size={14} className="mr-1" /> {cartItems.length} item{cartItems.length > 1 ? 's' : ''} in cart
                </Badge>
              </div>
            )}
          </div>
          
          {recentlyViewed.length > 0 && (
            <div className="mt-8 animate-fade-up animate-delay-300">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="bg-apex-black/5 text-apex-black">
                    Recently Viewed
                  </Badge>
                </div>
                <ScrollArea className="max-w-full pb-2">
                  <div className="flex space-x-4">
                    {recentlyViewed.map((plan) => (
                      <a 
                        key={plan.id} 
                        href={`#${plan.id}`}
                        className="flex-shrink-0 w-48 h-16 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center p-3 hover:shadow-md transition-shadow duration-200"
                      >
                        <span className="text-2xl mr-3">{plan.icon}</span>
                        <span className="text-sm font-medium truncate">{plan.name}</span>
                      </a>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <InsurancePlans />
    </>
  );
};

export default Plans;
