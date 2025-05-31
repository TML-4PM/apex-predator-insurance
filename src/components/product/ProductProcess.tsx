
import React from 'react';
import { Card } from '@/components/ui/card';
import { Search, Edit, Truck, Download } from 'lucide-react';

const ProductProcess = () => {
  const steps = [
    {
      number: "1",
      icon: <Search className="h-6 w-6" />,
      title: "Choose Your Predator",
      description: "Browse our gallery and pick the apex creature that matches your spirit."
    },
    {
      number: "2", 
      icon: <Edit className="h-6 w-6" />,
      title: "Personalise",
      description: "Enter your name (or the name of your mate), and we'll create a custom \"Policy No.\" for authenticity."
    },
    {
      number: "3",
      icon: <Truck className="h-6 w-6" />,
      title: "Select Delivery",
      description: "Instant digital download, or add Premium Print & Post for a physical copy."
    },
    {
      number: "4",
      icon: <Download className="h-6 w-6" />,
      title: "Download & Enjoy",
      description: "Your certificate lands in your inbox within seconds—share it, frame it, or gift it immediately."
    }
  ];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-apex-black mb-8 text-center">
        How It Works
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="p-6 text-center relative overflow-hidden">
            {/* Step Number Badge */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-apex-red text-white rounded-full flex items-center justify-center text-sm font-bold">
              {step.number}
            </div>
            
            <div className="flex justify-center mb-4 text-apex-red">
              {step.icon}
            </div>
            
            <h3 className="text-lg font-bold text-apex-black mb-3">
              {step.title}
            </h3>
            
            <p className="text-gray-600 text-sm leading-relaxed">
              {step.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProductProcess;
