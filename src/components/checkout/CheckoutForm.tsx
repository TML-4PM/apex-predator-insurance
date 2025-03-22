
import React, { useEffect, useRef } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripeClient';
import { PaymentForm } from './PaymentForm';
import { CardElement } from '@stripe/react-stripe-js';
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
  formKey?: string | number;
}

export const CheckoutForm = ({ plan, onSuccess, isBundle = false, formKey }: CheckoutFormProps) => {
  const navigate = useNavigate();
  const elementsRef = useRef<any>(null);
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
    mode: "onChange"
  });
  
  // Clear form on mount to prevent old data from appearing
  useEffect(() => {
    // Clear form fields
    form.reset({
      fullName: "",
      email: "",
    });
    
    // Clear any stored data that might affect the form
    sessionStorage.clear();
    localStorage.removeItem('formData');
    localStorage.removeItem('lastSelectedPlan');
    localStorage.removeItem('checkoutFormData');
    localStorage.removeItem('paymentData');
    localStorage.removeItem('certificateData');
    
    // Reset card element if it exists
    resetCardElement();
    
    return () => {
      // This will run on unmount to ensure cleanup
      sessionStorage.clear();
    };
  }, [form, formKey, plan.id]);

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
    
    // Reset form fields
    form.reset({
      fullName: "",
      email: "",
    });
    
    // Reset card element
    resetCardElement();
    
    // Call the parent's onSuccess handler with fresh data
    onSuccess(freshData);
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

  // Prevent form submission with Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

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
      
      <form className="space-y-4" onKeyDown={handleKeyDown}>
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
                    autoComplete="off"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e);
                      // Prevent propagation to avoid issues with other event listeners
                      e.stopPropagation();
                    }}
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
                    autoComplete="off"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e);
                      // Prevent propagation to avoid issues with other event listeners
                      e.stopPropagation();
                    }}
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
