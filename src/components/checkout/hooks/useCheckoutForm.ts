
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { formSchema, CheckoutFormValues } from "../schemas/checkoutSchema";

interface UseCheckoutFormProps {
  formKey?: string | number;
  planId: string;
}

export const useCheckoutForm = ({ formKey, planId }: UseCheckoutFormProps) => {
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
    
    return () => {
      // This will run on unmount to ensure cleanup
      sessionStorage.clear();
    };
  }, [form, formKey, planId]);

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

  return form;
};
