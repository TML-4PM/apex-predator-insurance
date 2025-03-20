
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Certificate from '@/components/Certificate';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { ShoppingCart, CreditCard, Shield } from 'lucide-react';

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });

  // Use default plan if none was selected
  const selectedPlan = state?.plan || {
    id: 'shark',
    name: 'Shark Insurance',
    price: 9.99,
    icon: '🦈'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real implementation, this would connect to Stripe
      // For now, we'll simulate a successful payment
      
      setTimeout(() => {
        // Show success message
        toast({
          title: "Payment successful!",
          description: "Your certificate is ready to download.",
        });
        
        // Navigate to certificate page with user data
        navigate('/certificate', { 
          state: { 
            plan: selectedPlan,
            user: formData
          } 
        });
        
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-apex-black mb-4">Complete Your Purchase</h1>
              <p className="text-lg text-apex-darkgray/70">You're just a few steps away from your Wildlife Shield certificate!</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 order-2 lg:order-1">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5 text-apex-red" />
                    Your Information
                  </h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                          id="fullName"
                          name="fullName"
                          placeholder="Your name (as it will appear on the certificate)"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Where to send your certificate"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100">
                        <h3 className="text-lg font-medium mb-4 flex items-center">
                          <CreditCard className="mr-2 h-5 w-5 text-apex-red" />
                          Payment Details
                        </h3>

                        <Button
                          type="submit"
                          className="w-full bg-apex-red hover:bg-apex-red/90"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Processing...
                            </div>
                          ) : (
                            <>
                              Pay ${selectedPlan.price.toFixed(2)}
                            </>
                          )}
                        </Button>
                        
                        <p className="text-xs text-gray-500 mt-4 text-center">
                          * This is a novelty item, not actual insurance.
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="lg:col-span-2 order-1 lg:order-2">
                <div className="sticky top-24">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h2 className="text-xl font-bold mb-6 flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-apex-red" />
                      Order Summary
                    </h2>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{selectedPlan.icon}</span>
                        <span className="font-medium">{selectedPlan.name}</span>
                      </div>
                      <span className="font-medium">${selectedPlan.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 my-4 pt-4">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-apex-red">${selectedPlan.price.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <p className="text-sm text-gray-600 mb-4">
                        Certificate Preview:
                      </p>
                      <div className="transform scale-75 origin-top">
                        <Certificate 
                          insuranceType={selectedPlan.name}
                          name={formData.fullName || "Your Name Here"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
