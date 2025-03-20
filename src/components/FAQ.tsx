
import React, { useState } from 'react';
import { Plus, Minus, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqItems = [
  {
    question: "What insurance protection do I get?",
    answer: "Wildlife Shield provides a $50,000 death benefit in case of fatal encounters with the covered animal species. Our policy is valid for 12 months from the date of purchase and covers you worldwide for accidental death caused by the specified predator."
  },
  {
    question: "What do I get when I purchase?",
    answer: "You receive a digital, personalized insurance certificate that validates your $50K coverage, which you can download, print, and share on social media. Your policy documentation will be emailed to your registered address, and you'll have access to 24/7 customer support."
  },
  {
    question: "Can I get a refund?",
    answer: "You have a 30-day cooling-off period during which you can cancel for a full refund if no claims have been made. After this period, we generally don't offer refunds. If you experience any technical issues with receiving your certificate, please contact our support team."
  },
  {
    question: "Do you encourage dangerous encounters with predators?",
    answer: "Absolutely not! We strongly discourage any attempts to get close to dangerous wildlife. This insurance provides real financial protection while acknowledging the healthy respect we should all have for these impressive animals - from a safe distance!"
  },
  {
    question: "Can I purchase this as a gift?",
    answer: "Yes! You can customize the certificate with someone else's name and details. It makes a practical and thoughtful gift for adventure-loving friends and family members, providing both real protection and a unique conversation starter."
  },
  {
    question: "How do I share my certificate on social media?",
    answer: "After purchasing, you'll receive your digital certificate with built-in sharing buttons for popular social media platforms. You can also download the image and upload it manually. Each certificate comes with interesting facts about your chosen animal that make sharing more engaging."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section id="faq" className="py-20 bg-apex-lightgray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-apex-red/10 text-apex-red mb-4">
              <ShieldAlert size={28} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-apex-black mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-apex-darkgray/70">
              Everything you need to know about your Wildlife Shield insurance.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className={cn(
                  "border border-apex-black/10 rounded-xl overflow-hidden transition-all duration-300",
                  openIndex === index ? "bg-white shadow-card" : "bg-white/50"
                )}
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                  onClick={() => toggleItem(index)}
                >
                  <span className="text-lg font-medium text-apex-black">{item.question}</span>
                  <span className={cn(
                    "ml-6 flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center transition-all duration-300",
                    openIndex === index ? "bg-apex-red text-white rotate-0" : "bg-apex-black/5 text-apex-black rotate-0"
                  )}>
                    {openIndex === index ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                
                <div className={cn(
                  "overflow-hidden transition-all duration-300 text-apex-darkgray/80 leading-relaxed",
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}>
                  <div className="p-6 pt-0">{item.answer}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-apex-red/10 border border-apex-red/20 rounded-xl">
            <h3 className="text-xl font-bold text-apex-black flex items-center gap-2 mb-3">
              <ShieldAlert size={20} className="text-apex-red" />
              Policy Information
            </h3>
            <p className="text-apex-darkgray/80 text-sm leading-relaxed">
              Apex Predator Insurance - Wildlife Shield provides a $50,000 accidental death benefit valid for 12 months. This policy covers accidental deaths resulting from unprovoked attacks by the specific wildlife listed on your certificate. For full policy details and exclusions, please refer to your Policy Document. We do not encourage dangerous encounters with wildlife. Please observe all safety guidelines and local regulations when traveling or engaging in adventure activities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
