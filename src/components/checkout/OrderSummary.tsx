
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
  
  // Determine plan type based on ID
  const isMidTier = plan.id === 'bundle25';
  const isCompleteBundle = plan.id === 'bundle60';
  
  // Calculate total if multiple items exist in cart
  const hasMultipleItems = cartItems && cartItems.length > 0;
  const totalPrice = hasMultipleItems 
    ? cartItems.reduce((sum, item) => sum + item.price, 0)
    : plan.price;
  
  // Listen for form updates to update the certificate preview in real-time
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
          // Display multiple items if cart has items
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
          // Display single plan if no cart items
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
            <p className="text-xs text-white/80 mt-2">
              Save 40% compared to individual plans!
            </p>
          </div>
        )}
        
        {isCompleteBundle && (
          <div className="bg-apex-red/20 rounded p-3 mb-4">
            <p className="text-sm text-white font-medium">
              Premium Bundle: Protection against all 60 predators
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
            <p className="text-xs text-white/80 mt-2">
              Save 80% compared to individual plans!
            </p>
          </div>
        )}
        
        <div className="border-t border-white/10 my-4 pt-4">
          <div className="flex justify-between font-bold">
            <span className="text-white">Total</span>
            <span className="text-apex-red">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="mt-8">
          <p className="text-sm text-white/60 mb-4">
            Certificate Preview:
          </p>
          <div className="transform scale-75 origin-top">
            <div className="flex justify-center items-center h-full">
              {/* Certificate Preview */}
              <div className="border-2 border-apex-red/50 rounded-lg p-8 w-full h-full bg-[#111111] text-center text-white/80">
                <h3 className="text-xl font-semibold mb-2">
                  {hasMultipleItems 
                    ? `Multiple Predator Coverage (${cartItems.length})`
                    : plan.name
                  }
                </h3>
                <p className="mb-2">Issued to: {displayName}</p>
                <p className="text-sm text-apex-red">$50,000 Accidental Death Benefit</p>
                {hasMultipleItems && cartItems.length > 0 && (
                  <div className="mt-4 text-xs text-white/70">
                    <p>Includes coverage for:</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-1">
                      {cartItems.slice(0, 5).map(item => (
                        <span key={item.id} className="inline-flex items-center">
                          {item.icon} {item.name}
                        </span>
                      ))}
                      {cartItems.length > 5 && (
                        <span>+{cartItems.length - 5} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
