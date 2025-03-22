
import React, { useEffect, useRef } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripeClient';
import { PaymentForm } from './PaymentForm';
import { CardElement, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

export type CheckoutFormValues = z.infer<typeof formSchema>;

interface CheckoutFormProps {
  plan: { id: string; name: string; price: number; icon: string };
  onSuccess: (data: CheckoutFormValues) => void;
  isBundle?: boolean;
}

export const CheckoutForm = ({ plan, onSuccess, isBundle = false }: CheckoutFormProps) => {
  const navigate = useNavigate();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });
  
  const elementsRef = useRef<any>(null);

  // Reset form when plan changes
  useEffect(() => {
    form.reset({
      fullName: "",
      email: "",
    });
    resetCardElement();
  }, [plan.id, form]);

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
    // Reset form fields
    form.reset({
      fullName: "",
      email: "",
    });
    
    // Call the parent's onSuccess handler
    onSuccess(data);
  };

  // Update the certificate preview in real-time as the user types
  useEffect(() => {
    const subscription = form.watch((data) => {
      if (data.fullName) {
        // Dispatch a custom event to update the certificate preview
        document.dispatchEvent(new CustomEvent('formUpdate', { 
          detail: { fullName: data.fullName }
        }));
      }
    });
    return () => subscription.unsubscribe();
  }, [form, form.watch]);

  return (
    <Form {...form}>
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="text-white/70 hover:text-white"
          onClick={() => navigate('/plans')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Plans
        </Button>
      </div>
      
      <form className="space-y-4">
        <div>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your name (as it will appear on the certificate)" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="Where to send your certificate" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements }) => {
              // Store elements instance in ref
              elementsRef.current = elements;
              
              return (
                <PaymentForm 
                  plan={plan} 
                  formData={form.getValues()} 
                  onSuccess={handleSuccessfulPayment}
                  isBundle={isBundle}
                  resetCardElement={resetCardElement}
                />
              );
            }}
          </ElementsConsumer>
        </Elements>
      </form>
    </Form>
  );
};

// This is needed to access the Elements context
import { ElementsConsumer } from '@stripe/react-stripe-js';
