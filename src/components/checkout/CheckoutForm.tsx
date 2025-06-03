
import React from 'react';
import { Form } from "@/components/ui/form";
import { useCheckoutForm } from './hooks/useCheckoutForm';
import { CheckoutFormFields } from './components/CheckoutFormFields';
import { CheckoutHeader } from './components/CheckoutHeader';
import { StripeElementsWrapper } from './components/StripeElementsWrapper';
import { CheckoutFormValues } from './schemas/checkoutSchema';

export type { CheckoutFormValues };

interface CheckoutFormProps {
  plan: { id: string; name: string; price: number; icon: string };
  onSuccess: (data: CheckoutFormValues) => void;
  isBundle?: boolean;
  formKey?: string | number;
  cartItems?: Array<{ id: string; name: string; price: number; icon: string }>;
}

export const CheckoutForm = ({ plan, onSuccess, isBundle = false, formKey, cartItems = [] }: CheckoutFormProps) => {
  const form = useCheckoutForm({ formKey, planId: plan.id });
  
  // Use the total price from all cart items if available, otherwise use the single plan price
  const totalPrice = cartItems && cartItems.length > 0 
    ? cartItems.reduce((sum, item) => sum + item.price, 0)
    : plan.price;

  // Prevent form submission with Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <Form {...form}>
      <CheckoutHeader />
      
      <form className="space-y-4" onKeyDown={handleKeyDown}>
        <CheckoutFormFields control={form.control} />
        
        <StripeElementsWrapper
          plan={plan}
          formData={form.getValues()}
          onSuccess={onSuccess}
          isBundle={isBundle}
          cartItems={cartItems}
          totalPrice={totalPrice}
        />
      </form>
    </Form>
  );
};
