
import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

interface OrderSummaryProps {
  plan: { 
    id: string;
    name: string;
    price: number;
    icon: string;
  };
  userName?: string;
  isBundle?: boolean;
  cartItems?: Array<{ 
    id: string;
    name: string;
    price: number;
    icon: string;
  }>;
}

export const OrderSummary = ({ 
  plan, 
  userName = "Your Name Here", 
  isBundle = false,
  cartItems = [] 
}: OrderSummaryProps) => {
  const [displayName, setDisplayName] = useState(userName);
  
  const isMidTier = plan.id === 'bundle25';
  const isCompleteBundle = plan.id === 'bundle60';
  
  const hasMultipleItems = cartItems && cartItems.length > 0;
  const totalPrice = hasMultipleItems 
    ? cartItems.reduce((sum, item) => sum + item.price, 0)
    : plan.price;
  
  useEffect(() => {
    const handleFormUpdate = (e: CustomEvent) => {
      if (e.detail && e.detail.fullName) {
        setDisplayName(e.detail.fullName);
      }
    };
    
    document.addEventListener('formUpdate', handleFormUpdate as EventListener);
    return () => {
      document.removeEventListener('formUpdate', handleFormUpdate as EventListener);
    };
  }, []);

  return (
    <div className="sticky top-24">
      <div className="bg-[#222222] rounded-xl p-6 border border-white/10">
        <h2 className="text-xl font-bold mb-6 flex items-center text-white">
          <Shield className="mr-2 h-5 w-5 text-apex-red" />
          Order Summary
        </h2>
        
        {hasMultipleItems ? (
          <>
            <div className="mb-4">
              <p className="text-white/80 mb-2 text-sm">
                {cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart:
              </p>
              {cartItems.map(item => (
                <div className="flex items-center justify-between mb-3" key={item.id}>
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{item.icon}</span>
                    <span className="font-medium text-white text-sm">{item.name}</span>
                  </div>
                  <span className="font-medium text-white text-sm">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-2xl mr-2">{plan.icon}</span>
              <span className="font-medium text-white">{plan.name}</span>
            </div>
            <span className="font-medium text-white">${plan.price.toFixed(2)}</span>
          </div>
        )}
        
        {isMidTier && (
          <div className="bg-apex-red/20 rounded p-3 mb-4">
            <p className="text-sm text-white font-medium">
              Mid-Tier Package: Protection against 25 predators
            </p>
            <div className="mt-2 grid grid-cols-2 gap-1 text-xs text-white/80">
              <div className="flex items-center"><span className="mr-1">🦈</span> Sharks</div>
              <div className="flex items-center"><span className="mr-1">🐊</span> Crocodiles</div>
              <div className="flex items-center"><span className="mr-1">🐆</span> Big Cats</div>
              <div className="flex items-center"><span className="mr-1">🐻</span> Bears</div>
              <div className="flex items-center"><span className="mr-1">🐍</span> Snakes</div>
              <div className="flex items-center"><span className="mr-1">🦂</span> Scorpions</div>
              <div className="flex items-center"><span className="mr-1">🐘</span> Elephants</div>
              <div className="flex items-center"><span className="mr-1">🦏</span> Rhinos</div>
              <div className="flex items-center"><span className="mr-1">🦛</span> Hippos</div>
              <div className="flex items-center"><span className="mr-1">🐺</span> Wolves</div>
              <div className="flex items-center"><span className="mr-1">+15</span> more predators</div>
            </div>
          </div>
        )}
        
        {isCompleteBundle && (
          <div className="bg-apex-red/20 rounded p-3 mb-4">
            <p className="text-sm text-white font-medium">
              Premium Bundle: Protection against all 85+ predators
            </p>
            <div className="mt-2 grid grid-cols-2 gap-1 text-xs text-white/80">
              <div className="flex items-center"><span className="mr-1">🦈</span> Sharks</div>
              <div className="flex items-center"><span className="mr-1">🐊</span> Crocodiles</div>
              <div className="flex items-center"><span className="mr-1">🐆</span> Big Cats</div>
              <div className="flex items-center"><span className="mr-1">🐻</span> Bears</div>
              <div className="flex items-center"><span className="mr-1">🐍</span> Snakes</div>
              <div className="flex items-center"><span className="mr-1">🦂</span> Scorpions</div>
              <div className="flex items-center"><span className="mr-1">🐘</span> Elephants</div>
              <div className="flex items-center"><span className="mr-1">🦏</span> Rhinos</div>
              <div className="flex items-center"><span className="mr-1">🦛</span> Hippos</div>
              <div className="flex items-center"><span className="mr-1">🐺</span> Wolves</div>
              <div className="flex items-center"><span className="mr-1">+50</span> more predators</div>
            </div>
          </div>
        )}
        
        <div className="border-t border-white/10 my-4 pt-4">
          <div className="flex justify-between font-bold">
            <span className="text-white">Total</span>
            <span className="text-apex-red">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        
        {/* Certificate Preview */}
        <div className="mt-6">
          <p className="text-sm text-white/60 mb-3">Certificate Preview:</p>
          <div className="relative border-2 border-apex-red/40 rounded-lg overflow-hidden bg-gradient-to-br from-[#111] to-[#1a1a1a]">
            {/* Decorative border pattern */}
            <div className="absolute inset-1 border border-apex-red/20 rounded pointer-events-none"></div>
            
            <div className="p-6 text-center">
              <div className="text-3xl mb-2">{hasMultipleItems ? '🛡️' : plan.icon}</div>
              <div className="text-xs uppercase tracking-widest text-apex-red/70 mb-1">Apex Predator Insurance</div>
              <h3 className="text-lg font-bold text-white mb-1">
                {hasMultipleItems 
                  ? `${cartItems.length}-Species Coverage`
                  : plan.name
                }
              </h3>
              <div className="w-16 h-px bg-apex-red/40 mx-auto my-2"></div>
              <p className="text-white/80 text-sm mb-1">Issued to:</p>
              <p className="text-white font-semibold text-lg">{displayName}</p>
              <div className="mt-3 inline-flex items-center gap-1 bg-apex-red/20 px-3 py-1 rounded-full">
                <Shield className="h-3 w-3 text-apex-red" />
                <span className="text-xs text-apex-red font-medium">$50,000 Accidental Death Benefit</span>
              </div>
              {hasMultipleItems && cartItems.length > 0 && (
                <div className="mt-3 flex flex-wrap justify-center gap-1">
                  {cartItems.slice(0, 5).map(item => (
                    <span key={item.id} className="text-xs text-white/60 bg-white/5 px-2 py-0.5 rounded">
                      {item.icon} {item.name}
                    </span>
                  ))}
                  {cartItems.length > 5 && (
                    <span className="text-xs text-white/40">+{cartItems.length - 5} more</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
