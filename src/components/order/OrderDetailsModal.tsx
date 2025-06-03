
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Receipt, CreditCard, Calendar, Package } from 'lucide-react';
import { generateReceipt } from '@/utils/receiptGenerator';

interface Order {
  id: string;
  plan_name: string;
  amount: number;
  status: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  plan_id: string;
  currency: string;
  stripe_payment_intent_id?: string;
  items?: any;
  is_bundle: boolean;
}

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  if (!order) return null;

  const handleDownloadReceipt = async () => {
    try {
      await generateReceipt(order);
    } catch (error) {
      console.error('Error generating receipt:', error);
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{order.plan_name}</h3>
                <p className="text-sm text-gray-600">Order #{order.id.substring(0, 8)}</p>
              </div>
              <Badge className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Amount</p>
                <p>${(order.amount / 100).toFixed(2)} {order.currency.toUpperCase()}</p>
              </div>
              <div>
                <p className="font-medium">Date</p>
                <p>{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Customer Information
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span>{order.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span>{order.customer_email}</span>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment Information
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span>Credit Card</span>
              </div>
              {order.stripe_payment_intent_id && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono text-xs">{order.stripe_payment_intent_id.substring(0, 20)}...</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Processing Fee:</span>
                <span>$0.00</span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          {order.is_bundle && order.items && (
            <div>
              <h4 className="font-semibold mb-3">Bundle Items</h4>
              <div className="space-y-2">
                {JSON.parse(order.items).items && JSON.parse(order.items).items.split(',').map((item: string, index: number) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>{item.trim()}</span>
                    <span className="text-sm text-gray-600">Included</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Order Timeline */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Order Timeline
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="text-sm">
                  <p className="font-medium">Order Placed</p>
                  <p className="text-gray-600">{new Date(order.created_at).toLocaleString()}</p>
                </div>
              </div>
              {order.status === 'completed' && (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="text-sm">
                    <p className="font-medium">Payment Processed</p>
                    <p className="text-gray-600">Certificate generated and ready for download</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={handleDownloadReceipt} variant="outline" className="flex-1">
              <Receipt className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            {order.status === 'completed' && (
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
