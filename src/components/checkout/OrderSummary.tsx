
import React, { useEffect, useState } from 'react';
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
}

export const OrderSummary = ({ plan, userName = "Your Name Here", isBundle = false }: OrderSummaryProps) => {
  const [displayName, setDisplayName] = useState(userName);
  
  // Set isBundle based on plan ID
  isBundle = plan.id === 'apex-pack';
  
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
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{plan.icon}</span>
            <span className="font-medium text-white">{plan.name}</span>
          </div>
          <span className="font-medium text-white">${plan.price.toFixed(2)}</span>
        </div>
        
        {isBundle && (
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
              Save 60% compared to individual plans!
            </p>
          </div>
        )}
        
        <div className="border-t border-white/10 my-4 pt-4">
          <div className="flex justify-between font-bold">
            <span className="text-white">Total</span>
            <span className="text-apex-red">${plan.price.toFixed(2)}</span>
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
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="mb-2">Issued to: {displayName}</p>
                <p className="text-sm text-apex-red">$50,000 Accidental Death Benefit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
