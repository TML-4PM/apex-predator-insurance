
import { jsPDF } from 'jspdf';

interface Order {
  id: string;
  plan_name: string;
  amount: number;
  status: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  currency: string;
  stripe_payment_intent_id?: string;
}

export const generateReceipt = async (order: Order) => {
  const pdf = new jsPDF();
  
  // Header
  pdf.setFontSize(20);
  pdf.setTextColor(220, 38, 38); // apex-red color
  pdf.text('Wildlife Shield Insurance', 20, 30);
  
  pdf.setFontSize(16);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Payment Receipt', 20, 45);
  
  // Order Information
  pdf.setFontSize(12);
  pdf.text(`Receipt #: ${order.id.substring(0, 8)}`, 20, 65);
  pdf.text(`Date: ${new Date(order.created_at).toLocaleDateString()}`, 20, 75);
  pdf.text(`Status: ${order.status.toUpperCase()}`, 20, 85);
  
  // Customer Information
  pdf.setFontSize(14);
  pdf.text('Bill To:', 20, 105);
  pdf.setFontSize(12);
  pdf.text(order.customer_name, 20, 115);
  pdf.text(order.customer_email, 20, 125);
  
  // Order Details
  pdf.setFontSize(14);
  pdf.text('Order Details:', 20, 145);
  
  // Table header
  pdf.setFontSize(12);
  pdf.text('Description', 20, 160);
  pdf.text('Amount', 150, 160);
  
  // Draw line under header
  pdf.line(20, 165, 190, 165);
  
  // Order item
  pdf.text(order.plan_name, 20, 175);
  pdf.text(`$${(order.amount / 100).toFixed(2)} ${order.currency.toUpperCase()}`, 150, 175);
  
  // Total
  pdf.line(20, 185, 190, 185);
  pdf.setFontSize(14);
  pdf.text('Total:', 20, 200);
  pdf.text(`$${(order.amount / 100).toFixed(2)} ${order.currency.toUpperCase()}`, 150, 200);
  
  // Payment Information
  if (order.stripe_payment_intent_id) {
    pdf.setFontSize(12);
    pdf.text('Payment Method: Credit Card', 20, 220);
    pdf.text(`Transaction ID: ${order.stripe_payment_intent_id}`, 20, 230);
  }
  
  // Footer
  pdf.setFontSize(10);
  pdf.setTextColor(128, 128, 128);
  pdf.text('Thank you for choosing Wildlife Shield Insurance!', 20, 260);
  pdf.text('For support, contact us at support@wildlifeshield.com', 20, 270);
  
  // Download the PDF
  pdf.save(`receipt-${order.id.substring(0, 8)}.pdf`);
};
