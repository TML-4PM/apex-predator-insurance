
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface CartSummaryProps {
  cart: any[];
}

export const CartSummary = ({ cart }: CartSummaryProps) => {
  if (cart.length === 0) return null;

  return (
    <Card className="fixed bottom-4 right-4 p-4 shadow-lg bg-white border-2 border-apex-red">
      <div className="flex items-center gap-2">
        <ShoppingCart className="w-5 h-5 text-apex-red" />
        <span className="font-semibold text-apex-black">{cart.length} items in cart</span>
        <Button size="sm" className="bg-apex-red hover:bg-apex-red/90 text-white ml-2">
          Checkout
        </Button>
      </div>
    </Card>
  );
};
