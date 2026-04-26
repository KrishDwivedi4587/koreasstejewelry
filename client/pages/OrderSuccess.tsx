import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Printer, ArrowLeft } from 'lucide-react';
import { api } from '../services/api';
import { Order } from '../types';

const OrderSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId) {
        try {
          const data = await api.getOrderById(orderId);
          setOrder(data);
        } catch (err) {
          console.error('Failed to load order:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-base flex items-center justify-center">
        <div className="animate-pulse text-brand-terracotta font-serif italic text-xl">Finalizing Transaction...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-brand-base pt-32 pb-24 flex flex-col items-center px-4">
        <div className="max-w-xl w-full text-center bg-white p-12 shadow-2xl border border-brand-peach/50 rounded-sm">
          <CheckCircle className="w-16 h-16 text-brand-terracotta mx-auto mb-6" strokeWidth={1} />
          <h1 className="text-4xl font-serif text-brand-dark mb-4 italic">Order Placed!</h1>
          <p className="text-brand-muted font-light mb-8 text-sm leading-relaxed">
            Your order has been confirmed. Check your order history for details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/orders" className="flex-1 border border-brand-dark/20 text-brand-dark py-4 uppercase text-[10px] font-bold tracking-luxury hover:bg-brand-base transition-all flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> My Orders
            </Link>
            <Link to="/products" className="flex-1 bg-brand-dark text-white py-4 uppercase text-[10px] font-bold tracking-luxury hover:bg-brand-terracotta transition-all flex items-center justify-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const status = order.orderStatus || order.status || 'confirmed';
  const transactionId = order.transactionId || 'N/A';
  const subtotal = order.subtotal ?? order.totalAmount;
  const shipping = order.shipping ?? 0;

  return (
    <div className="bg-brand-base min-h-screen pt-32 pb-24 flex flex-col items-center px-4">

      {/* SUCCESS MESSAGE */}
      <div className="max-w-xl w-full text-center bg-white p-12 shadow-2xl border border-brand-peach/50 animate-fade-in rounded-sm mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-brand-peach/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-brand-terracotta" strokeWidth={1} />
          </div>
        </div>

        <h1 className="text-4xl font-serif text-brand-dark mb-4 italic">Order Confirmed</h1>
        <p className="text-brand-muted font-light mb-8 text-sm leading-relaxed">
          Your curation is being prepared. We have successfully processed your payment.
        </p>

        <div className="bg-brand-base p-6 mb-4 border border-brand-peach/30 text-left space-y-2">
          <div className="flex justify-between">
            <span className="text-[10px] uppercase tracking-luxury text-brand-muted font-bold">Order ID</span>
            <span className="text-xs font-mono text-brand-dark">{order._id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[10px] uppercase tracking-luxury text-brand-muted font-bold">Status</span>
            <span className="text-xs font-bold text-brand-terracotta capitalize">{status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[10px] uppercase tracking-luxury text-brand-muted font-bold">Transaction ID</span>
            <span className="text-xs font-mono text-brand-dark truncate max-w-[180px]">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[10px] uppercase tracking-luxury text-brand-muted font-bold">Date</span>
            <span className="text-xs text-brand-dark">{new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={handlePrint}
            className="flex-1 border border-brand-dark/20 text-brand-dark py-4 uppercase text-[10px] font-bold tracking-luxury hover:bg-brand-base transition-all flex items-center justify-center gap-2 no-print"
          >
            <Printer className="w-4 h-4" /> Print Invoice
          </button>
          <Link
            to="/products"
            className="flex-1 bg-brand-dark text-white py-4 uppercase text-[10px] font-bold tracking-luxury hover:bg-brand-terracotta transition-all flex items-center justify-center gap-2 no-print"
          >
            <ShoppingBag className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>
      </div>

      {/* PRINTABLE INVOICE */}
      <div id="printable-invoice" className="hidden print:block w-full max-w-4xl mx-auto p-12 bg-white text-brand-dark font-sans">
        <div className="flex justify-between items-start border-b-2 border-brand-terracotta pb-10 mb-10">
          <div>
            <h1 className="text-4xl font-serif italic mb-2">Koreasste</h1>
            <p className="text-xs uppercase tracking-widest text-brand-muted font-bold">House of Modern Jewelry</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-1">Tax Invoice</h2>
            <p className="text-sm">Order ID: {order._id}</p>
            <p className="text-sm">Date: {new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-20 mb-12">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-brand-muted font-bold mb-4 border-b border-brand-peach pb-1">Billing & Shipping</h3>
            <p className="text-sm font-bold">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
            <p className="text-sm text-brand-muted">{order.shippingAddress?.address}</p>
            <p className="text-sm text-brand-muted">{order.shippingAddress?.city}, {order.shippingAddress?.state} – {order.shippingAddress?.pincode}</p>
            <p className="text-sm text-brand-muted">Phone: {order.shippingAddress?.phone}</p>
            <p className="text-sm text-brand-muted">Email: {order.shippingAddress?.email}</p>
          </div>
          <div className="text-right">
            <h3 className="text-xs uppercase tracking-widest text-brand-muted font-bold mb-4 border-b border-brand-peach pb-1">Payment</h3>
            <p className="text-sm font-bold text-green-600 uppercase">Paid</p>
            <p className="text-xs text-brand-muted">Transaction: {transactionId}</p>
            <p className="text-xs text-brand-muted capitalize">Status: {status}</p>
          </div>
        </div>

        <table className="w-full mb-12">
          <thead>
            <tr className="border-b border-brand-peach text-left text-[10px] uppercase tracking-widest text-brand-muted">
              <th className="py-4">Item Details</th>
              <th className="py-4 text-center">Qty</th>
              <th className="py-4 text-right">Unit Price</th>
              <th className="py-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-peach/30">
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td className="py-6">
                  <p className="text-sm font-serif italic">{item.name || `Item ${idx + 1}`}</p>
                  <p className="text-[10px] text-brand-muted uppercase">{item.category}</p>
                </td>
                <td className="py-6 text-center text-sm">{item.quantity}</td>
                <td className="py-6 text-right text-sm">₹{item.price.toLocaleString('en-IN')}</td>
                <td className="py-6 text-right text-sm font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-sm text-brand-muted">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm text-brand-muted">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-brand-dark pt-4">
              <span className="font-serif italic">Grand Total</span>
              <span>₹{order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div className="mt-24 border-t border-brand-peach pt-10 text-center">
          <p className="text-[9px] uppercase tracking-[0.4em] text-brand-muted mb-4">Handcrafted with precision for you</p>
          <p className="text-[10px] text-brand-muted italic">Computer-generated invoice — no physical signature required.</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;