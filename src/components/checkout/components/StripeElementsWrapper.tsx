
import React, { useRef } from "react";
import { Elements, ElementsConsumer, CardElement } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripeClient';
import { PaymentForm } from '../PaymentForm';
import { CheckoutFormValues } from '../schemas/checkoutSchema';

interface StripeElementsWrapperProps {
  plan: { id: string; name: string; price: number; icon: string };
  formData: CheckoutFormValues;
  onSuccess: (data: CheckoutFormValues) => void;
  isBundle?: boolean;
  cartItems?: Array<{ id: string; name: string; price: number; icon: string }>;
  totalPrice?: number;
}

export const StripeElementsWrapper = ({ 
  plan, 
  formData, 
  onSuccess, 
  isBundle = false, 
  cartItems = [],
  totalPrice 
}: StripeElementsWrapperProps) => {
  const elementsRef = useRef<any>(null);

  // Function to reset the Stripe card element
  const resetCardElement = () => {
    if (elementsRef.current) {
      const cardElement = elementsRef.current.getElement(CardElement);
      if (cardElement) {
        cardElement.clear();
      }
    }
  };

  // Handle successful form submission and payment
  const handleSuccessfulPayment = (data: CheckoutFormValues) => {
    // Create a fresh copy of the data to avoid reference issues
    const freshData = {
      fullName: data.fullName || "",
      email: data.email || ""
    };
    
    // Reset card element
    resetCardElement();
    
    // Call the parent's onSuccess handler with fresh data
    onSuccess(freshData);
  };

  return (
    <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {({ elements }) => {
          // Store elements instance in ref
          elementsRef.current = elements;
          
          return (
            <PaymentForm 
              plan={plan} 
              formData={formData} 
              onSuccess={handleSuccessfulPayment}
              isBundle={isBundle}
              resetCardElement={resetCardElement}
              cartItems={cartItems}
              totalPrice={totalPrice}
            />
          );
        }}
      </ElementsConsumer>
    </Elements>
  );
};
