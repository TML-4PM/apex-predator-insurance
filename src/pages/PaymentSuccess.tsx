
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Share2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [order, setOrder] = useState<any>(null);
  const [certificate, setCertificate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      processSuccessfulPayment();
    } else {
      navigate('/');
    }
  }, [sessionId]);

  const processSuccessfulPayment = async () => {
    try {
      // Fetch order details by session ID
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('stripe_session_id', sessionId)
        .single();

      if (orderError || !orderData) {
        throw new Error('Order not found');
      }

      setOrder(orderData);

      // Update order status to completed
      await supabase
        .from('orders')
        .update({ status: 'completed' })
        .eq('id', orderData.id);

      // Generate and store certificate
      const certificateData = {
        id: crypto.randomUUID(),
        user_id: orderData.user_id,
        order_id: orderData.id,
        certificate_type: orderData.plan_id,
        certificate_name: orderData.plan_name,
        certificate_data: {
          name: orderData.customer_name,
          email: orderData.customer_email,
          planName: orderData.plan_name,
          planId: orderData.plan_id,
          issuedDate: new Date().toISOString(),
          amount: orderData.amount,
          orderId: orderData.id
        }
      };

      const { data: certData, error: certError } = await supabase
        .from('user_certificates')
        .insert(certificateData)
        .select()
        .single();

      if (certError) {
        console.error('Certificate creation error:', certError);
      } else {
        setCertificate(certData);
      }

      toast({
        title: "Payment Successful!",
        description: "Your certificate has been generated and is ready for download.",
      });

    } catch (error) {
      console.error('Payment processing error:', error);
      toast({
        title: "Error",
        description: "There was an issue processing your payment. Please contact support.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadCertificate = () => {
    if (certificate) {
      navigate('/certificate', {
        state: {
          user: { fullName: order.customer_name, email: order.customer_email },
          plan: { 
            id: order.plan_id, 
            name: order.plan_name, 
            price: order.amount / 100,
            icon: '🦈' // Default icon
          },
          fromPayment: true
        }
      });
    }
  };

  const viewDashboard = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-apex-red"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <CardTitle className="text-2xl text-green-600">
                  Payment Successful!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600">
                  Thank you for your purchase! Your certificate has been generated and is ready.
                </p>

                {order && (
                  <div className="bg-gray-50 rounded-lg p-4 text-left">
                    <h3 className="font-semibold mb-2">Order Details</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Order ID:</span> {order.id}</p>
                      <p><span className="font-medium">Plan:</span> {order.plan_name}</p>
                      <p><span className="font-medium">Amount:</span> ${(order.amount / 100).toFixed(2)}</p>
                      <p><span className="font-medium">Customer:</span> {order.customer_name}</p>
                      <p><span className="font-medium">Email:</span> {order.customer_email}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={downloadCertificate}
                    className="bg-apex-red hover:bg-apex-red/90"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    View Certificate
                  </Button>
                  <Button 
                    onClick={viewDashboard}
                    variant="outline"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Go to Dashboard
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500">
                    A confirmation email has been sent to {order?.customer_email}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
