import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Download, ShoppingBag, Printer, ArrowLeft } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';

const OrderSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId && user) {
        try {
          const data = await api.getOrderById(orderId, user.id);
          setOrder(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrder();
  }, [orderId, user]);

  if (loading) return (
    <div className="min-h-screen bg-brand-base flex items-center justify-center">
      <div className="animate-pulse text-brand-terracotta font-serif italic text-xl">Finalizing Transaction...</div>
    </div>
  );

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-brand-base min-h-screen pt-32 pb-24 flex flex-col items-center px-4">
      
      {/* SUCCESS MESSAGE */}
      <div className="max-w-xl w-full text-center bg-white p-12 shadow-2xl border border-brand-peach/50 animate-fade-in-up rounded-sm mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-brand-peach/20 rounded-full flex items-center justify-center">
             <CheckCircle className="w-10 h-10 text-brand-terracotta" strokeWidth={1} />
          </div>
        </div>
        
        <h1 className="text-4xl font-serif text-brand-dark mb-4 italic">Order Confirmed</h1>
        <p className="text-brand-muted font-light mb-8 text-sm leading-relaxed">
          Your curation is being prepared. We have successfully processed your payment for Order <span className="font-bold text-brand-dark">#{order.id}</span>.
        </p>

        <div className="bg-brand-base p-6 mb-8 border border-brand-peach/30 text-center">
            <p className="text-[10px] uppercase tracking-luxury text-brand-muted mb-1 font-bold">Transaction ID</p>
            <p className="text-sm font-medium text-brand-dark truncate">{order.paymentDetails.razorpay_payment_id}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handlePrint}
            className="flex-1 border border-brand-dark/20 text-brand-dark py-4 uppercase text-[10px] font-bold tracking-luxury hover:bg-brand-base transition-all flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" /> Print Invoice
          </button>
          <Link 
              to="/products"
              className="flex-1 bg-brand-dark text-white py-4 uppercase text-[10px] font-bold tracking-luxury hover:bg-brand-terracotta transition-all flex items-center justify-center gap-2"
          >
              <ShoppingBag className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>
      </div>

      {/* PRINTABLE INVOICE (Hidden from screen, visible in print) */}
      <div id="printable-invoice" className="hidden print:block w-full max-w-4xl mx-auto p-12 bg-white text-brand-dark font-sans">
        <div className="flex justify-between items-start border-b-2 border-brand-terracotta pb-10 mb-10">
          <div>
            <h1 className="text-4xl font-serif italic mb-2">Koreasste</h1>
            <p className="text-xs uppercase tracking-widest text-brand-muted font-bold">House of Modern Jewelry</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-1">Tax Invoice</h2>
            <p className="text-sm">Order ID: #{order.id}</p>
            <p className="text-sm">Date: {new Date(order.date).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-20 mb-12">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-brand-muted font-bold mb-4 border-b border-brand-peach pb-1">Billing & Shipping</h3>
            <p className="text-sm font-bold">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
            <p className="text-sm text-brand-muted">{order.shippingAddress.address}</p>
            <p className="text-sm text-brand-muted">{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
            <p className="text-sm text-brand-muted">Phone: {order.shippingAddress.phone}</p>
          </div>
          <div className="text-right">
            <h3 className="text-xs uppercase tracking-widest text-brand-muted font-bold mb-4 border-b border-brand-peach pb-1">Payment Status</h3>
            <p className="text-sm font-bold text-green-600 uppercase">Paid - {order.paymentDetails.method}</p>
            <p className="text-xs text-brand-muted">Payment ID: {order.paymentDetails.razorpay_payment_id}</p>
            <p className="text-xs text-brand-muted">Order ID: {order.paymentDetails.razorpay_order_id}</p>
          </div>
        </div>

        <table className="w-full mb-12">
          <thead>
            <tr className="border-b border-brand-peach text-left text-[10px] uppercase tracking-widest text-brand-muted">
              <th className="py-4">Item Details</th>
              <th className="py-4 text-center">Qty</th>
              <th className="py-4 text-right">Price</th>
              <th className="py-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-peach/30">
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td className="py-6">
                  <p className="text-sm font-serif italic">{item.name}</p>
                  <p className="text-[10px] text-brand-muted uppercase">{item.category}</p>
                </td>
                <td className="py-6 text-center text-sm">{item.quantity}</td>
                <td className="py-6 text-right text-sm">₹{item.price.toLocaleString()}</td>
                <td className="py-6 text-right text-sm font-bold">₹{(item.price * item.quantity).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-sm text-brand-muted">
              <span>Subtotal</span>
              <span>₹{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-brand-muted">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? 'Free' : `₹${order.shipping}`}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-brand-dark pt-4">
              <span className="font-serif italic">Grand Total</span>
              <span>₹{order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-24 border-t border-brand-peach pt-10 text-center">
          <p className="text-[9px] uppercase tracking-[0.4em] text-brand-muted mb-4">Handcrafted with precision for you</p>
          <p className="text-[10px] text-brand-muted italic">This is a computer-generated invoice and does not require a physical signature.</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;