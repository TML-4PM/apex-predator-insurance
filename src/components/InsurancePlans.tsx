
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Shield, ShoppingCart, Check } from 'lucide-react';

const insurancePlans = [
  {
    id: 'shark',
    name: 'Shark Insurance',
    icon: '🦈',
    price: 9.99,
    description: 'For those brave souls who enjoy swimming with sharks or surfing in known shark territories.',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Shark Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'croc',
    name: 'Crocodile Insurance',
    icon: '🐊',
    price: 9.99,
    description: 'Planning a swamp tour or river cruise in croc country? We\'ve got you covered (not really).',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Crocodile Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'lion',
    name: 'Lion Insurance',
    icon: '🦁',
    price: 9.99,
    description: 'For safari enthusiasts who want to get that perfect lion photo (from a safe distance, please).',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Lion Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'bear',
    name: 'Bear Insurance',
    icon: '🐻',
    price: 9.99,
    description: 'Hiking in bear country? This certificate won\'t help, but it\'s a fun conversation starter!',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Bear Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'scorpion',
    name: 'Scorpion Insurance',
    icon: '🦂',
    price: 9.99,
    description: 'Desert camping or exploring caves? Watch your step, and enjoy this novelty insurance.',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Scorpion Facts',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'kraken',
    name: 'Kraken Insurance',
    icon: '🦑',
    price: 9.99,
    description: 'For the deep sea explorers worried about mythical sea monsters (wink, wink).',
    features: [
      'Digital Certificate',
      'Shareable on Social Media',
      'Fun Kraken "Facts"',
      'Not Actual Insurance'
    ]
  },
  {
    id: 'apex-pack',
    name: 'Apex Predator Pack',
    icon: '🏆',
    price: 49.99,
    description: 'The ultimate package for the ultimate adventurer. All six certificates for the price of five!',
    features: [
      'All 6 Digital Certificates',
      'Shareable on Social Media',
      'All Fun Animal Facts',
      'Ultimate Bragging Rights',
      'Still Not Actual Insurance'
    ],
    featured: true
  }
];

const InsurancePlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  return (
    <section id="plans" className="py-20 bg-apex-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 grid-pattern z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-up">Choose Your Predator</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto animate-fade-up animate-delay-100">
            Pick your adventure (or misadventure) and get your fun insurance certificate today. 
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insurancePlans.map((plan, index) => (
            <div 
              key={plan.id}
              className={cn(
                "bg-white/10 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-500 border border-white/10 hover:border-white/20 transform hover:translate-y-[-4px] hover:shadow-glass",
                plan.featured ? "lg:col-span-3" : "",
                "animate-fade-up"
              )}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className={cn(
                "p-6 flex flex-col h-full",
                plan.featured ? "lg:flex-row lg:items-center lg:justify-between" : ""
              )}>
                <div className={plan.featured ? "lg:w-2/3" : ""}>
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{plan.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                      <div className="text-2xl font-bold text-apex-red mt-1">${plan.price}</div>
                    </div>
                  </div>
                  
                  <p className="text-white/70 mb-6">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-apex-yellow mt-0.5">
                          <Check size={16} />
                        </span>
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={plan.featured ? "lg:w-1/3 lg:text-right" : ""}>
                  <button 
                    className={cn(
                      "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 text-white font-medium",
                      plan.featured 
                        ? "bg-apex-yellow text-apex-black w-full lg:w-auto transform hover:scale-105"
                        : "bg-white/20 hover:bg-white/30 w-full"
                    )}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.featured ? <Shield size={18} /> : <ShoppingCart size={18} />}
                    {plan.featured ? "Get Complete Protection" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm">
            * This is not real insurance. It's a fun novelty item only.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InsurancePlans;
