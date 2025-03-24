
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  fetchSubscription, 
  updateSubscription, 
  cancelSubscription,
  reactivateSubscription
} from '@/lib/stripeClient';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertCircle, CheckCircle, CreditCard, Calendar, Tag, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';

interface SubscriptionManagerProps {
  customerId: string;
}

interface PlanOption {
  id: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
}

const planOptions: PlanOption[] = [
  {
    id: 'price_basic',
    name: 'Basic Protection',
    price: 9.99,
    interval: 'month',
    features: [
      'Coverage up to $10,000',
      'Standard response time',
      'Email support'
    ]
  },
  {
    id: 'price_standard',
    name: 'Standard Protection',
    price: 19.99,
    interval: 'month',
    features: [
      'Coverage up to $25,000',
      '24-hour response time',
      'Phone support'
    ]
  },
  {
    id: 'price_premium',
    name: 'Premium Protection',
    price: 29.99,
    interval: 'month',
    features: [
      'Coverage up to $50,000',
      '4-hour response time',
      'Priority support',
      'Annual physical inspection'
    ]
  }
];

const SubscriptionManager: React.FC<SubscriptionManagerProps> = ({ customerId }) => {
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [changePlanDialogOpen, setChangePlanDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function loadSubscription() {
      try {
        setLoading(true);
        const response = await fetchSubscription(customerId);
        
        if (response.error) {
          setError(response.error);
          return;
        }
        
        if (response.data && response.data.length > 0) {
          setSubscription(response.data[0]);
          setSelectedPlanId(response.data[0].plan.id);
        }
        setError(null);
      } catch (err) {
        setError('Failed to load subscription details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    if (customerId) {
      loadSubscription();
    }
  }, [customerId]);

  const handlePlanChange = async () => {
    if (!selectedPlanId || selectedPlanId === subscription?.plan?.id) {
      setChangePlanDialogOpen(false);
      return;
    }
    
    try {
      setLoading(true);
      const result = await updateSubscription(subscription.id, {
        planId: selectedPlanId,
      });
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      setSubscription(result);
      
      toast({
        title: "Plan updated",
        description: "Your subscription has been successfully updated",
      });
      
      setChangePlanDialogOpen(false);
    } catch (err) {
      setError('Failed to update subscription');
      toast({
        title: "Update failed",
        description: err instanceof Error ? err.message : "An error occurred updating your plan",
        variant: "destructive"
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setLoading(true);
      const result = await cancelSubscription(subscription.id);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      setSubscription({
        ...subscription,
        status: 'canceled',
        cancel_at_period_end: true
      });
      
      toast({
        title: "Subscription canceled",
        description: "Your subscription will end at the end of the current billing period",
      });
      
      setCancelDialogOpen(false);
    } catch (err) {
      setError('Failed to cancel subscription');
      toast({
        title: "Cancellation failed",
        description: err instanceof Error ? err.message : "An error occurred canceling your subscription",
        variant: "destructive"
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReactivateSubscription = async () => {
    try {
      setLoading(true);
      const result = await reactivateSubscription(subscription.id);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      setSubscription({
        ...subscription,
        status: 'active',
        cancel_at_period_end: false
      });
      
      toast({
        title: "Subscription reactivated",
        description: "Your subscription has been successfully reactivated",
      });
    } catch (err) {
      setError('Failed to reactivate subscription');
      toast({
        title: "Reactivation failed",
        description: err instanceof Error ? err.message : "An error occurred reactivating your subscription",
        variant: "destructive"
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-apex-red" />
        <span className="ml-2">Loading subscription details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Active Subscription</CardTitle>
          <CardDescription>You don't have an active subscription at this time.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => window.location.href = '/plans'}>View Plans</Button>
        </CardFooter>
      </Card>
    );
  }

  // Find the current plan details
  const currentPlan = planOptions.find(plan => plan.id === subscription.plan?.id) || {
    name: subscription.plan?.nickname || 'Unknown Plan',
    price: (subscription.plan?.amount / 100) || 0,
    interval: subscription.plan?.interval || 'month',
    features: []
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <span>Your Subscription</span>
          <span className={`ml-2 text-sm px-2 py-1 rounded ${
            subscription.status === 'active' ? 'bg-green-100 text-green-800' : 
            subscription.status === 'canceled' ? 'bg-red-100 text-red-800' : 
            'bg-yellow-100 text-yellow-800'
          }`}>
            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
            {subscription.cancel_at_period_end && ' (Cancels at period end)'}
          </span>
        </CardTitle>
        <CardDescription>
          Manage your Apex Predator Insurance subscription
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-2 text-apex-red" />
              <span className="text-sm font-medium">Plan:</span>
              <span className="ml-2">{currentPlan.name}</span>
            </div>
            
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-apex-red" />
              <span className="text-sm font-medium">Price:</span>
              <span className="ml-2">${currentPlan.price.toFixed(2)} / {currentPlan.interval}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-apex-red" />
              <span className="text-sm font-medium">Next billing date:</span>
              <span className="ml-2">{subscription.current_period_end ? 
                new Date(subscription.current_period_end * 1000).toLocaleDateString() : 
                'Not available'}</span>
            </div>
            
            {subscription.default_payment_method && (
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-apex-red" />
                <span className="text-sm font-medium">Payment method:</span>
                <span className="ml-2">•••• {subscription.default_payment_method.card.last4}</span>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="font-medium text-sm mb-2">Plan Features:</h4>
            <ul className="text-sm space-y-1">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {subscription.status === 'active' && (
          <Dialog open={changePlanDialogOpen} onOpenChange={setChangePlanDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Change Plan</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Your Plan</DialogTitle>
                <DialogDescription>
                  Select a new plan below. Your billing will be updated immediately.
                </DialogDescription>
              </DialogHeader>
              
              <RadioGroup value={selectedPlanId} onValueChange={setSelectedPlanId} className="space-y-3 my-4">
                {planOptions.map((plan) => (
                  <div 
                    key={plan.id} 
                    className={`border rounded-md p-3 cursor-pointer ${
                      selectedPlanId === plan.id ? 'border-apex-red bg-apex-red/5' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedPlanId(plan.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value={plan.id} id={plan.id} />
                      <div className="grid gap-1 flex-1">
                        <Label htmlFor={plan.id} className="font-medium">
                          {plan.name}
                        </Label>
                        <div className="flex items-center text-sm">
                          <strong>${plan.price.toFixed(2)}</strong>
                          <span className="text-gray-500">/{plan.interval}</span>
                        </div>
                        <ul className="text-sm text-gray-600 mt-1">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-xs mt-1">
                              <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {subscription.plan?.id === plan.id && (
                        <span className="text-xs bg-apex-red/10 text-apex-red px-2 py-1 rounded">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </RadioGroup>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setChangePlanDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handlePlanChange}
                  disabled={loading || selectedPlanId === subscription.plan?.id}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Confirm Change'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        
        {subscription.status === 'active' && !subscription.cancel_at_period_end ? (
          <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-white text-red-600 border-red-200 hover:bg-red-50">
                Cancel Subscription
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Your Subscription</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel your subscription? You'll still have access until the end of your current billing period.
                </DialogDescription>
              </DialogHeader>
              
              <div className="bg-yellow-50 p-4 rounded-md my-4 text-sm text-yellow-800">
                <AlertCircle className="h-4 w-4 inline mr-2" />
                Canceling means you'll lose protection against dangerous wildlife incidents.
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
                  Keep Subscription
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleCancelSubscription}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Yes, Cancel'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : subscription.cancel_at_period_end ? (
          <Button 
            variant="default" 
            className="bg-green-600 hover:bg-green-700"
            onClick={handleReactivateSubscription}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Reactivate Subscription'
            )}
          </Button>
        ) : null}
        
        <Button variant="outline" className="ml-auto" onClick={() => window.location.href = "/account"}>
          Account Settings <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionManager;
