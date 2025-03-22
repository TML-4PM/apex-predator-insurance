
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ShoppingCart, TrendingUp, ArrowLeft } from 'lucide-react';
import { CheckoutForm, CheckoutFormValues } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const PopularPlans = [
  { id: 'shark', name: 'Shark Insurance', price: 9.99, icon: '🦈', description: 'Our most popular choice for ocean adventurers!' },
  { id: 'crocodile', name: 'Crocodile Insurance', price: 9.99, icon: '🐊', description: 'Essential protection for tropical explorers.' },
  { id: 'lion', name: 'Lion Insurance', price: 9.99, icon: '🦁', description: 'Top pick for safari enthusiasts!' },
];

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<CheckoutFormValues>({
    fullName: '',
    email: '',
  });

  // Use default plan if none was selected
  const [selectedPlan, setSelectedPlan] = useState(state?.plan || {
    id: 'shark',
    name: 'Shark Insurance',
    price: 9.99,
    icon: '🦈'
  });

  const isBundle = selectedPlan.id === 'bundle';

  // Redirect to plans page if accessed directly without a plan selection
  useEffect(() => {
    if (!state?.plan && !sessionStorage.getItem('lastSelectedPlan')) {
      toast({
        title: "No plan selected",
        description: "Please select an insurance plan first.",
      });
      
      // Give the toast time to appear before redirecting
      const timer = setTimeout(() => {
        navigate('/plans');
      }, 2000);
      
      return () => clearTimeout(timer);
    } else if (state?.plan) {
      // Store the selected plan in session storage as a backup
      sessionStorage.setItem('lastSelectedPlan', JSON.stringify(state.plan));
      setSelectedPlan(state.plan);
    } else if (!state?.plan && sessionStorage.getItem('lastSelectedPlan')) {
      // Recover from session storage if needed
      try {
        const savedPlan = JSON.parse(sessionStorage.getItem('lastSelectedPlan') || '');
        setSelectedPlan(savedPlan);
      } catch (e) {
        console.error('Error retrieving saved plan:', e);
      }
    }
  }, [state, navigate, toast]);

  // Ensure we're at the top of the page when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Listen for form data updates to update the certificate preview
  useEffect(() => {
    const handleFormUpdate = (e: CustomEvent) => {
      if (e.detail && e.detail.fullName) {
        setFormData(prev => ({ ...prev, fullName: e.detail.fullName }));
      }
    };

    document.addEventListener('formUpdate', handleFormUpdate as EventListener);
    return () => {
      document.removeEventListener('formUpdate', handleFormUpdate as EventListener);
    };
  }, []);

  const handlePaymentSuccess = (data: CheckoutFormValues) => {
    try {
      // Clear any previous data
      setFormData({ fullName: '', email: '' });
      
      // Remove stored plan from session storage
      sessionStorage.removeItem('lastSelectedPlan');
      
      // Navigate to certificate page with user data
      navigate('/certificate', { 
        state: { 
          plan: selectedPlan,
          user: data
        },
        replace: true // Replace history to avoid navigation issues
      });
    } catch (error) {
      console.error('Navigation error:', error);
      toast({
        title: "Error",
        description: "There was a problem generating your certificate. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSwitchPlan = (plan: any) => {
    // Store the updated plan in session storage
    sessionStorage.setItem('lastSelectedPlan', JSON.stringify(plan));
    
    setSelectedPlan(plan);
    
    // Clear form data when switching plans
    setFormData({ fullName: '', email: '' });
    
    // Update navigation state
    navigate('/checkout', { 
      state: { plan },
      replace: true // Replace history to avoid navigation issues
    });
  };

  return (
    <Layout>
      <div className="py-20 bg-[#1A1F2C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Complete Your Purchase</h1>
              <p className="text-lg text-white/70">You're just a few steps away from your Wildlife Shield certificate!</p>
            </div>

            {!isBundle && (
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-apex-red" />
                    Popular Choices
                  </h2>
                  <p className="text-sm text-white/70">All plans $9.99/year</p>
                </div>

                <Carousel className="w-full">
                  <CarouselContent>
                    {PopularPlans.map((plan) => (
                      <CarouselItem key={plan.id} className="md:basis-1/2 lg:basis-1/3">
                        <div 
                          className={`h-full p-4 rounded-xl border ${selectedPlan.id === plan.id ? 'border-apex-red bg-white/5' : 'border-white/10 hover:border-white/30'} transition-all cursor-pointer`}
                          onClick={() => handleSwitchPlan(plan)}
                        >
                          <div className="flex items-center mb-2">
                            <span className="text-3xl mr-2">{plan.icon}</span>
                            <h3 className="font-bold text-white">{plan.name}</h3>
                          </div>
                          <p className="text-sm text-white/70 mb-2">{plan.description}</p>
                          <p className="text-apex-red font-bold">${plan.price.toFixed(2)}</p>
                        </div>
                      </CarouselItem>
                    ))}
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                      <div 
                        className={`h-full p-4 rounded-xl border ${isBundle ? 'border-apex-red bg-white/5' : 'border-white/10 hover:border-white/30'} transition-all cursor-pointer`}
                        onClick={() => handleSwitchPlan({
                          id: 'bundle',
                          name: 'Premium Bundle',
                          price: 49.99,
                          icon: '🏆'
                        })}
                      >
                        <div className="flex items-center mb-2">
                          <span className="text-3xl mr-2">🏆</span>
                          <h3 className="font-bold text-white">Premium Bundle</h3>
                        </div>
                        <p className="text-sm text-white/70 mb-2">Protection against all 60 predators at once!</p>
                        <div className="flex items-center">
                          <p className="text-apex-red font-bold">$49.99</p>
                          <span className="text-white/50 text-xs ml-2 line-through">$99.90</span>
                          <span className="ml-2 text-xs bg-apex-red px-2 py-1 rounded text-white">SAVE 50%</span>
                        </div>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <div className="hidden md:block">
                    <CarouselPrevious className="text-white" />
                    <CarouselNext className="text-white" />
                  </div>
                </Carousel>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 order-2 lg:order-1">
                <div className="bg-[#222222] rounded-xl shadow-lg border border-white/10 p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center text-white">
                    <ShoppingCart className="mr-2 h-5 w-5 text-apex-red" />
                    Your Information
                  </h2>
                  
                  <CheckoutForm 
                    plan={selectedPlan} 
                    onSuccess={handlePaymentSuccess} 
                    isBundle={isBundle}
                  />
                </div>
              </div>
              
              <div className="lg:col-span-2 order-1 lg:order-2">
                <OrderSummary 
                  plan={selectedPlan} 
                  userName={formData.fullName || "Your Name Here"} 
                  isBundle={isBundle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
