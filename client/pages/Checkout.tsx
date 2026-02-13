import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CreditCard, Truck, ShieldCheck, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';

const Checkout: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    phone: user?.phone || ''
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRazorpayMock, setShowRazorpayMock] = useState(false);
  const [currentGatewayOrder, setCurrentGatewayOrder] = useState<any>(null);

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/products');
    }
  }, [cart, navigate]);

  // Derived Values (Actual values calculated server-side in createPaymentIntent)
  const subtotal = getCartTotal();
  const estimatedShipping = subtotal > 5000 ? 0 : (shippingMethod === 'standard' ? 150 : 350);
  const estimatedTotal = subtotal + estimatedShipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * PHASE 1: Create Order Intent
   */
  const handleInitiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      // 1. Call Backend to create intent
      const intent = await api.createPaymentIntent(cart, shippingMethod);
      setCurrentGatewayOrder(intent);
      
      // 2. Open Gateway UI
      // In production: use new window.Razorpay(options).open();
      setShowRazorpayMock(true);
    } catch (err: any) {
      setError(err.message || "Failed to initiate transaction.");
      setIsProcessing(false);
    }
  };

  /**
   * PHASE 2: Gateway Success Callback & Final Verification
   */
  const onPaymentSuccess = async (paymentId: string, signature: string) => {
    setShowRazorpayMock(false);
    try {
      // 3. Final Verification on Backend
      const order = await api.verifyPayment({
        razorpay_order_id: currentGatewayOrder.gatewayOrderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
        userId: user!._id,
        items: [...cart],
        shippingDetails: { ...formData },
        totals: {
          total: currentGatewayOrder.amount,
          subtotal: currentGatewayOrder.subtotal,
          shipping: currentGatewayOrder.shipping
        }
      });

      clearCart();
      setIsProcessing(false);
      navigate(`/order-success?id=${order._id}`);
    } catch (err: any) {
      setError(err.message);
      setIsProcessing(false);
      navigate('/payment-failed');
    }
  };

  if (cart.length === 0) return null;

  const inputClasses = "w-full bg-white border border-brand-brown/30 p-3 text-brand-dark placeholder-brand-muted/50 focus:outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta transition-all shadow-sm text-sm";

  return (
    <div className="bg-brand-base min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-5 gap-12">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-3 space-y-10">
            <h1 className="text-3xl font-serif text-brand-dark mb-8 italic">Checkout</h1>
            
            {error && (
              <div className="bg-red-50 border border-red-200 p-4 flex items-start gap-3 text-red-600 animate-fade-in">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <form id="checkout-form" onSubmit={handleInitiatePayment} className="space-y-12">
                
                {/* Contact Information */}
                <section>
                    <h2 className="text-[10px] font-bold uppercase tracking-luxury text-brand-terracotta mb-6 border-b border-brand-peach pb-2">Contact</h2>
                    <div className="space-y-4">
                        <div className="group">
                             <label className="block text-[10px] uppercase tracking-wide text-brand-muted mb-2 font-bold">Email Address</label>
                             <input 
                                required
                                type="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                className={inputClasses}
                             />
                        </div>
                    </div>
                </section>

                {/* Shipping Address */}
                <section>
                    <h2 className="text-[10px] font-bold uppercase tracking-luxury text-brand-terracotta mb-6 border-b border-brand-peach pb-2">Shipping Destination</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                             <label className="block text-[10px] uppercase tracking-wide text-brand-muted mb-2 font-bold">First Name</label>
                             <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={inputClasses} />
                        </div>
                        <div>
                             <label className="block text-[10px] uppercase tracking-wide text-brand-muted mb-2 font-bold">Last Name</label>
                             <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={inputClasses} />
                        </div>
                        <div className="md:col-span-2">
                             <label className="block text-[10px] uppercase tracking-wide text-brand-muted mb-2 font-bold">Address</label>
                             <input required type="text" name="address" value={formData.address} onChange={handleChange} className={inputClasses} />
                        </div>
                        <div>
                             <label className="block text-[10px] uppercase tracking-wide text-brand-muted mb-2 font-bold">City</label>
                             <input required type="text" name="city" value={formData.city} onChange={handleChange} className={inputClasses} />
                        </div>
                        <div>
                             <label className="block text-[10px] uppercase tracking-wide text-brand-muted mb-2 font-bold">State</label>
                             <input required type="text" name="state" value={formData.state} onChange={handleChange} className={inputClasses} />
                        </div>
                        <div>
                             <label className="block text-[10px] uppercase tracking-wide text-brand-muted mb-2 font-bold">PIN Code</label>
                             <input required type="text" name="pincode" value={formData.pincode} onChange={handleChange} className={inputClasses} />
                        </div>
                        <div>
                             <label className="block text-[10px] uppercase tracking-wide text-brand-muted mb-2 font-bold">Phone</label>
                             <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClasses} />
                        </div>
                    </div>
                </section>

                {/* Shipping Method */}
                <section>
                    <h2 className="text-[10px] font-bold uppercase tracking-luxury text-brand-terracotta mb-6 border-b border-brand-peach pb-2">Delivery Method</h2>
                    <div className="space-y-3">
                        <label className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-brand-terracotta bg-brand-peach/10' : 'border-brand-brown/10 bg-white'}`}>
                            <div className="flex items-center">
                                <input type="radio" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="accent-brand-terracotta mr-3" />
                                <div>
                                    <span className="block text-sm font-medium text-brand-dark">Standard Delivery</span>
                                    <span className="text-[10px] text-brand-muted uppercase">5-7 Business Days</span>
                                </div>
                            </div>
                            <span className="text-sm font-bold text-brand-dark">{subtotal > 5000 ? 'Free' : '₹150'}</span>
                        </label>
                        <label className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-brand-terracotta bg-brand-peach/10' : 'border-brand-brown/10 bg-white'}`}>
                            <div className="flex items-center">
                                <input type="radio" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="accent-brand-terracotta mr-3" />
                                <div>
                                    <span className="block text-sm font-medium text-brand-dark">Express Delivery</span>
                                    <span className="text-[10px] text-brand-muted uppercase">1-2 Business Days</span>
                                </div>
                            </div>
                            <span className="text-sm font-bold text-brand-dark">₹350</span>
                        </label>
                    </div>
                </section>
                
                <button 
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-brand-dark text-white py-5 uppercase text-[10px] font-bold tracking-luxury hover:bg-brand-terracotta transition-all shadow-xl active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3"
                >
                    {isProcessing ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Verifying Collection...</>
                    ) : (
                      `Secure Payment • ₹${estimatedTotal.toLocaleString('en-IN')}`
                    )}
                </button>

            </form>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-2">
            <div className="bg-white p-8 shadow-sm border border-brand-peach/50 lg:sticky lg:top-32 rounded-sm">
                <h2 className="text-xl font-serif text-brand-dark mb-8 italic">Review Order</h2>
                
                <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 mb-8 custom-scrollbar">
                    {cart.map((item) => (
                        <div key={item.id} className="flex gap-4">
                            <div className="w-16 h-20 bg-brand-base overflow-hidden border border-brand-peach flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <h3 className="text-xs font-serif text-brand-dark italic mb-1">{item.name}</h3>
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] text-brand-muted uppercase tracking-wider">Qty: {item.quantity}</span>
                                  <span className="text-xs font-bold text-brand-brown">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-3 border-t border-brand-peach pt-6 mb-6">
                    <div className="flex justify-between text-xs text-brand-muted uppercase tracking-widest">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-xs text-brand-muted uppercase tracking-widest">
                        <span>Shipping</span>
                        <span>{estimatedShipping === 0 ? 'Free' : `₹${estimatedShipping}`}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center border-t border-brand-peach pt-6">
                    <span className="text-xs font-bold text-brand-dark uppercase tracking-widest">Grand Total</span>
                    <span className="text-2xl font-serif text-brand-dark italic">₹{estimatedTotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="mt-10 flex items-center justify-center gap-2 text-[10px] text-brand-muted uppercase tracking-luxury border-t border-brand-peach/50 pt-6">
                    <Lock className="w-3 h-3" />
                    <span>256-bit Secure Gateway</span>
                </div>
            </div>
        </div>
      </div>

      {/* RAZORPAY SIMULATION MODAL */}
      {showRazorpayMock && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#2D2E32] w-full max-w-md rounded-lg overflow-hidden shadow-2xl">
            <div className="bg-[#3A3C42] p-6 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-terracotta flex items-center justify-center rounded-sm font-serif text-white text-xl">K</div>
                <div>
                  <h3 className="text-white text-sm font-bold">Koreasste Jewelry</h3>
                  <p className="text-white/50 text-[10px]">Order ID: {currentGatewayOrder.gatewayOrderId}</p>
                </div>
              </div>
              <button onClick={() => { setShowRazorpayMock(false); setIsProcessing(false); }} className="text-white/40 hover:text-white transition-colors">
                <Lock className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 text-center">
              <div className="mb-8">
                <p className="text-white/60 text-[10px] uppercase tracking-widest mb-2 font-bold">Payable Amount</p>
                <h2 className="text-white text-4xl font-bold">₹{currentGatewayOrder.amount.toLocaleString('en-IN')}</h2>
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={() => onPaymentSuccess('pay_mock_' + Date.now(), 'mock_sig_' + Math.random().toString(36).substr(2, 8))}
                  className="w-full bg-[#339AF0] text-white py-4 rounded-md font-bold hover:bg-[#228BE6] transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" /> Pay with Cards / UPI
                </button>
                <button 
                  onClick={() => { setShowRazorpayMock(false); navigate('/payment-failed'); }}
                  className="w-full border border-white/10 text-white/50 py-3 rounded-md text-xs hover:bg-white/5 transition-all"
                >
                  Cancel Payment
                </button>
              </div>
            </div>

            <div className="bg-[#1E1F21] p-4 text-center">
              <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-bold">Secure checkout by Razorpay</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;