
import React from 'react';
import { Shield } from 'lucide-react';

interface OrderSummaryProps {
  plan: { 
    id: string;
    name: string;
    price: number;
    icon: string;
  };
  userName?: string;
}

export const OrderSummary = ({ plan, userName = "Your Name Here" }: OrderSummaryProps) => {
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
                <p>Issued to: {userName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
