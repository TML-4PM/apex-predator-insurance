import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User, MessageSquare, SendHorizontal } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

type FormValues = z.infer<typeof formSchema>;

const SUPPORT_EMAIL = "support@apexpredatorinsurance.com";
const API_URL = "https://si2677twimnkiozadwtwvhrmte0xbdwz.lambda-url.ap-southeast-2.on.aws";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" }
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      // Send notification to support
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: SUPPORT_EMAIL,
          subject: `Contact Form: Message from ${data.name}`,
          body: `Name: ${data.name}
Email: ${data.email}

Message:
${data.message}`,
          reply_to: data.email,
          template: "apex-support-notification",
          template_data: { name: data.name, email: data.email, subject: `Message from ${data.name}`, message: data.message }
        })
      });

      // Send acknowledgement to user
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: data.email,
          subject: "We received your message – Apex Predator Insurance",
          from: SUPPORT_EMAIL,
          template: "apex-contact-acknowledgement",
          template_data: { name: data.name, message: data.message }
        })
      });

      toast({
        title: "Message sent!",
        description: `Thank you ${data.name}. We'll get back to you at ${data.email} within 1 business day.`,
      });
      form.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: `Please email us directly at ${SUPPORT_EMAIL}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><User className="h-4 w-4" />Your Name</FormLabel>
              <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Mail className="h-4 w-4" />Email Address</FormLabel>
              <FormControl><Input placeholder="your@email.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="message" render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><MessageSquare className="h-4 w-4" />Your Message</FormLabel>
              <FormControl><Textarea placeholder="What would you like to tell us?" className="min-h-[120px]" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
            {isSubmitting ? (
              <><svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Sending...</>
            ) : (
              <><SendHorizontal className="h-4 w-4" />Send Message</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
