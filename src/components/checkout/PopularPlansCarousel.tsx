
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { TrendingUp } from 'lucide-react';

const PopularPlans = [
  { id: 'shark', name: 'Shark Insurance', price: 9.99, icon: '🦈', description: 'Our most popular choice for ocean adventurers!' },
  { id: 'spider', name: 'Spider Insurance', price: 9.99, icon: '🕷️', description: 'Essential protection from eight-legged nightmares.' },
  { id: 'lion', name: 'Lion Insurance', price: 9.99, icon: '🦁', description: 'Top pick for safari enthusiasts!' },
  { id: 'bear', name: 'Bear Insurance', price: 9.99, icon: '🐻', description: 'Must-have protection for mountain hikers!' },
];

interface PopularPlansCarouselProps {
  cartItems: Array<{
    id: string;
    name: string;
    price: number;
    icon: string;
  }>;
  selectedPlan: any;
  onAddToCart: (item: any) => void;
  onRemoveFromCart: (itemId: string) => void;
  onSwitchPlan: (plan: any) => void;
}

const PopularPlansCarousel = ({ 
  cartItems, 
  selectedPlan, 
  onAddToCart, 
  onRemoveFromCart, 
  onSwitchPlan 
}: PopularPlansCarouselProps) => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-apex-red" />
          Popular Choices
        </h2>
        <p className="text-sm text-white/70">All individual plans $9.99/year</p>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {PopularPlans.map((plan) => (
            <CarouselItem key={plan.id} className="md:basis-1/2 lg:basis-1/3">
              <div 
                className={`h-full p-4 rounded-xl border ${cartItems.some(item => item.id === plan.id) ? 'border-apex-red bg-white/5' : 'border-white/10 hover:border-white/30'} transition-all cursor-pointer`}
                onClick={() => cartItems.some(item => item.id === plan.id) ? onRemoveFromCart(plan.id) : onAddToCart(plan)}
              >
                <div className="flex items-center mb-2">
                  <span className="text-3xl mr-2">{plan.icon}</span>
                  <h3 className="font-bold text-white">{plan.name}</h3>
                </div>
                <p className="text-sm text-white/70 mb-2">{plan.description}</p>
                <p className="text-apex-red font-bold">${plan.price.toFixed(2)}</p>
                <div className="mt-2 text-xs text-white/70">
                  {cartItems.some(item => item.id === plan.id) ? 'In cart - click to remove' : 'Click to add to cart'}
                </div>
              </div>
            </CarouselItem>
          ))}
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div 
              className={`h-full p-4 rounded-xl border ${selectedPlan.id === 'medium-bundle' ? 'border-apex-red bg-white/5' : 'border-white/10 hover:border-white/30'} transition-all cursor-pointer`}
              onClick={() => onSwitchPlan({
                id: 'medium-bundle',
                name: '25 Predator Bundle',
                price: 59.99,
                icon: '🏅'
              })}
            >
              <div className="flex items-center mb-2">
                <span className="text-3xl mr-2">🏅</span>
                <h3 className="font-bold text-white">25 Predator Bundle</h3>
              </div>
              <p className="text-sm text-white/70 mb-2">Protection against 25 dangerous predators!</p>
              <div className="flex items-center">
                <p className="text-apex-red font-bold">$59.99</p>
                <span className="text-white/50 text-xs ml-2 line-through">$249.75</span>
                <span className="ml-2 text-xs bg-apex-red px-2 py-1 rounded text-white">SAVE 75%</span>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div 
              className={`h-full p-4 rounded-xl border ${selectedPlan.id === 'bundle' ? 'border-apex-red bg-white/5' : 'border-white/10 hover:border-white/30'} transition-all cursor-pointer`}
              onClick={() => onSwitchPlan({
                id: 'bundle',
                name: 'Complete Bundle',
                price: 99.99,
                icon: '🏆'
              })}
            >
              <div className="flex items-center mb-2">
                <span className="text-3xl mr-2">🏆</span>
                <h3 className="font-bold text-white">Complete Bundle</h3>
              </div>
              <p className="text-sm text-white/70 mb-2">Protection against all 60 predators at once!</p>
              <div className="flex items-center">
                <p className="text-apex-red font-bold">$99.99</p>
                <span className="text-white/50 text-xs ml-2 line-through">$599.40</span>
                <span className="ml-2 text-xs bg-apex-red px-2 py-1 rounded text-white">SAVE 83%</span>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="text-white" />
          <CarouselNext className="text-white" />
        </div>
      </Carousel>
    </div>
  );
};

export default PopularPlansCarousel;
