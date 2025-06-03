
import React from 'react';

interface ProductPreviewHeaderProps {
  totalProducts: number;
}

export const ProductPreviewHeader = ({ totalProducts }: ProductPreviewHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-apex-black mb-4">
        Complete Predator Insurance Collection
      </h2>
      <p className="text-apex-darkgray/70 max-w-2xl mx-auto mb-6">
        All {totalProducts} apex predators now available at $9.99 each, with category bundles, 
        wholesale pricing, and white-label partnership opportunities.
      </p>
      
      {/* Pricing highlights */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
          Individual: $9.99 each
        </div>
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
          Bundles: Save up to $589
        </div>
        <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
          Wholesale: 40% off bulk orders
        </div>
      </div>
    </div>
  );
};
