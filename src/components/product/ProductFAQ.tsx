
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ProductFAQ = () => {
  const faqs = [
    {
      question: "Can I change the name after ordering?",
      answer: "Yes—just reply to your confirmation email within 24 hours and we'll update it free of charge."
    },
    {
      question: "What payment methods do you accept?",
      answer: "Visa, Mastercard, AMEX, PayPal and Afterpay (Australia only)."
    },
    {
      question: "Are refunds available?",
      answer: "Digital certificates are non-refundable once downloaded. Printed orders can be refunded within 7 days of delivery if unopened."
    },
    {
      question: "How long does shipping take?",
      answer: "Digital delivery is instant. Premium Print & Post takes 5–7 business days for metro areas, 7–10 days for rural areas within Australia."
    },
    {
      question: "Is this real insurance?",
      answer: "No! This is a novelty certificate for entertainment purposes only. It's not actual insurance coverage of any kind—but it's way more fun than real insurance."
    },
    {
      question: "Can I order in bulk for gifts?",
      answer: "Absolutely! Contact us at bulk@apexpredatorinsurance.com for custom pricing on orders of 10+ certificates."
    },
    {
      question: "What size is the certificate?",
      answer: "Our certificates are designed in 8×10 inch format (portrait orientation) which fits standard picture frames available at most stores."
    },
    {
      question: "Do you ship internationally?",
      answer: "Digital certificates are available worldwide instantly. For printed certificates, we currently ship within Australia only, but international shipping is coming soon!"
    }
  ];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-apex-black mb-8 text-center">
        Frequently Asked Questions
      </h2>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default ProductFAQ;
