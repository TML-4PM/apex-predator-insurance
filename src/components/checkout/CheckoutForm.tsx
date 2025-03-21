
import React, { useEffect } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripeClient';
import { PaymentForm } from './PaymentForm';

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
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

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

  const handleSubmitForm = (data: CheckoutFormValues) => {
    // Form data is valid, now handle payment in the PaymentForm component
    console.log("Form data is valid:", data);
    // Don't call onSuccess here, it will be called from PaymentForm after payment succeeds
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-4">
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
          <PaymentForm 
            plan={plan} 
            formData={form.getValues()} 
            onSuccess={onSuccess}
            isBundle={isBundle}
          />
        </Elements>
      </form>
    </Form>
  );
};
