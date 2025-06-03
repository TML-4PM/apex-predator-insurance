
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Control } from "react-hook-form";
import { CheckoutFormValues } from "../schemas/checkoutSchema";

interface CheckoutFormFieldsProps {
  control: Control<CheckoutFormValues>;
}

export const CheckoutFormFields = ({ control }: CheckoutFormFieldsProps) => {
  return (
    <>
      <div>
        <FormField
          control={control}
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
          control={control}
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
    </>
  );
};
