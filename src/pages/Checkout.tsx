import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ShoppingCart } from 'lucide-react';
import { CheckoutForm, CheckoutFormValues } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useToast } from '@/hooks/use-toast';
import GroupPurchase from '@/components/GroupPurchase';
import InfluencerPackage from '@/components/InfluencerPackage';
import TravelerStories from '@/components/TravelerStories';
import PopularPlansCarousel from '@/components/checkout/PopularPlansCarousel';

const PopularPlans = [
  { id: 'shark', name: 'Shark Insurance', price: 9.99, icon: '🦈', description: 'Our most popular choice for ocean adventurers!' },
  { id: 'spider', name: 'Spider Insurance', price: 9.99, icon: '🕷️', description: 'Essential protection from eight-legged nightmares.' },
  { id: 'lion', name: 'Lion Insurance', price: 9.99, icon: '🦁', description: 'Top pick for safari enthusiasts!' },
  { id: 'bear', name: 'Bear Insurance', price: 9.99, icon: '🐻', description: 'Must-have protection for mountain hikers!' },
];

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formKey, setFormKey] = useState<number>(Date.now());
  
  // Initialize with empty form data
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
  
  // Support for multiple items in cart
  const [cartItems, setCartItems] = useState<Array<{
    id: string;
    name: string;
    price: number;
    icon: string;
  }>>(state?.cartItems || []);

  const isBundle = selectedPlan.id === 'bundle' || selectedPlan.id === 'medium-bundle';

  // Clear any persisted data from session or local storage
  useEffect(() => {
    // Clear ALL storage to ensure no data persistence
    sessionStorage.clear();
    localStorage.removeItem('formData');
    localStorage.removeItem('lastSelectedPlan');
    localStorage.removeItem('checkoutFormData');
    localStorage.removeItem('paymentData');
    localStorage.removeItem('certificateData');
    
    // Reset form data to empty values
    setFormData({ fullName: '', email: '' });
    
    // Generate a new form key to force re-render
    setFormKey(Date.now());
    
    // Initialize cart items from state or keep empty
    if (state?.cartItems) {
      setCartItems(state.cartItems);
    } else if (state?.plan) {
      // If no cart items but a plan is selected, use the plan as a single cart item
      setCartItems([state.plan]);
    } else {
      setCartItems([]);
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [state]);

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
      // Create a fresh copy to avoid reference issues
      const freshUserData = {
        fullName: data.fullName || '',
        email: data.email || ''
      };
      
      // Clear any previous data
      setFormData({ fullName: '', email: '' });
      
      // Generate a new form key to force re-render on return
      setFormKey(Date.now());
      
      // For multiple items, pass the primary item as plan with cart items for reference
      const primaryPlan = cartItems.length > 0 ? cartItems[0] : selectedPlan;
      
      // Navigate to certificate page with user data
      navigate('/certificate', { 
        state: { 
          plan: primaryPlan,
          user: freshUserData,
          cartItems: cartItems.length > 0 ? cartItems : [selectedPlan],
          timestamp: new Date().getTime() // Add timestamp to ensure freshness
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
    setSelectedPlan(plan);
    
    // Update cart items with the new plan
    setCartItems([plan]);
    
    // Clear form data when switching plans
    setFormData({ fullName: '', email: '' });
    
    // Generate a new form key to force re-render
    setFormKey(Date.now());
    
    // Update navigation state
    navigate('/checkout', { 
      state: { 
        plan,
        cartItems: [plan],
        timestamp: new Date().getTime() // Add timestamp to ensure freshness
      },
      replace: true // Replace history to avoid navigation issues
    });
  };
  
  // Function to add an item to the cart
  const addToCart = (item: any) => {
    // Check if item already exists in cart
    const exists = cartItems.some(cartItem => cartItem.id === item.id);
    
    if (!exists) {
      const newCartItems = [...cartItems, item];
      setCartItems(newCartItems);
      
      // Update navigation state
      navigate('/checkout', { 
        state: { 
          plan: selectedPlan,
          cartItems: newCartItems,
          timestamp: new Date().getTime()
        },
        replace: true
      });
      
      toast({
        title: "Item Added",
        description: `${item.name} has been added to your cart.`,
      });
    } else {
      toast({
        title: "Already in Cart",
        description: `${item.name} is already in your cart.`,
      });
    }
  };
  
  // Function to remove an item from the cart
  const removeFromCart = (itemId: string) => {
    const newCartItems = cartItems.filter(item => item.id !== itemId);
    
    // If cart would be empty, keep at least one item
    if (newCartItems.length === 0) {
      toast({
        title: "Cannot Remove",
        description: "You must have at least one item in your cart.",
      });
      return;
    }
    
    setCartItems(newCartItems);
    
    // Update navigation state
    navigate('/checkout', { 
      state: { 
        plan: newCartItems[0], // Use first item as primary plan
        cartItems: newCartItems,
        timestamp: new Date().getTime()
      },
      replace: true
    });
    
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
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

            {/* Social Purchase Options */}
            <div className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GroupPurchase 
                basePrice={selectedPlan.price} 
                planName={selectedPlan.name}
              />
              <InfluencerPackage />
            </div>

            {!isBundle && (
              <PopularPlansCarousel
                cartItems={cartItems}
                selectedPlan={selectedPlan}
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
                onSwitchPlan={handleSwitchPlan}
              />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 order-2 lg:order-1">
                <div className="bg-[#222222] rounded-xl shadow-lg border border-white/10 p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center text-white">
                    <ShoppingCart className="mr-2 h-5 w-5 text-apex-red" />
                    Your Information
                  </h2>
                  
                  <CheckoutForm 
                    key={`checkout-form-${selectedPlan.id}-${formKey}`}
                    plan={selectedPlan} 
                    onSuccess={handlePaymentSuccess} 
                    isBundle={isBundle}
                    formKey={formKey}
                    cartItems={cartItems}
                  />
                </div>
              </div>
              
              <div className="lg:col-span-2 order-1 lg:order-2">
                <OrderSummary 
                  plan={selectedPlan} 
                  userName={formData.fullName || "Your Name Here"} 
                  isBundle={isBundle}
                  cartItems={cartItems}
                />
              </div>
            </div>

            {/* Social Proof Section */}
            <div className="mt-12">
              <TravelerStories />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
