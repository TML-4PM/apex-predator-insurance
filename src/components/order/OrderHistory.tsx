
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, RefreshCw } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  plan_name: string;
  amount: number;
  status: string;
  created_at: string;
  customer_name: string;
  plan_id: string;
}

export default function OrderHistory() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to load order history",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const viewCertificate = async (order: Order) => {
    try {
      // Check if certificate exists for this order
      const { data: certificate, error } = await supabase
        .from('user_certificates')
        .select('*')
        .eq('order_id', order.id)
        .single();

      if (error || !certificate) {
        toast({
          title: "Certificate Not Found",
          description: "Certificate may still be generating. Please try again later.",
          variant: "destructive"
        });
        return;
      }

      // Navigate to certificate page
      navigate('/certificate', {
        state: {
          user: { fullName: order.customer_name },
          plan: { 
            id: order.plan_id, 
            name: order.plan_name, 
            price: order.amount / 100,
            icon: '🦈' // Default icon
          },
          fromOrder: true,
          certificateId: certificate.id
        }
      });
    } catch (error) {
      console.error('Error viewing certificate:', error);
      toast({
        title: "Error",
        description: "Failed to load certificate",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-apex-red"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Order History</CardTitle>
        <Button onClick={fetchOrders} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No orders found</p>
            <Button 
              onClick={() => navigate('/plans')}
              className="mt-4"
              variant="outline"
            >
              Browse Plans
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{order.plan_name}</h3>
                    <p className="text-sm text-gray-600">
                      Order #{order.id.substring(0, 8)}
                    </p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <p>${(order.amount / 100).toFixed(2)} • {new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  
                  {order.status === 'completed' && (
                    <Button 
                      onClick={() => viewCertificate(order)}
                      size="sm"
                      variant="outline"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      View Certificate
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
