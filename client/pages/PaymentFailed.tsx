import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, RefreshCw, ShoppingBag } from 'lucide-react';

const PaymentFailed: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-brand-base min-h-screen pt-32 pb-24 flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center bg-white p-12 shadow-2xl border border-red-50 animate-fade-in-up rounded-sm">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
             <AlertCircle className="w-10 h-10 text-red-500" strokeWidth={1} />
          </div>
        </div>
        
        <h1 className="text-4xl font-serif text-brand-dark mb-4 italic">Transaction Failed</h1>
        <p className="text-brand-muted font-light mb-8 text-sm leading-relaxed">
          The payment gateway was unable to process your request. This could be due to a timeout, insufficient funds, or a cancelled session.
        </p>

        <div className="space-y-4">
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-brand-dark text-white py-4 uppercase text-[10px] font-bold tracking-luxury hover:bg-brand-terracotta transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <RefreshCw className="w-4 h-4" /> Retry Checkout
          </button>
          
          <div className="flex gap-4">
             <Link 
                to="/products"
                className="flex-1 border border-brand-dark/20 text-brand-dark py-4 uppercase text-[10px] font-bold tracking-luxury hover:bg-brand-base transition-all flex items-center justify-center gap-2"
            >
                <ShoppingBag className="w-4 h-4" /> Browse Store
            </Link>
            <Link 
                to="/contact"
                className="flex-1 border border-brand-dark/20 text-brand-dark py-4 uppercase text-[10px] font-bold tracking-luxury hover:bg-brand-base transition-all flex items-center justify-center gap-2"
            >
                Support Hub
            </Link>
          </div>
        </div>

        <p className="mt-10 text-[10px] text-brand-muted uppercase tracking-widest italic">
          No funds were deducted from your account.
        </p>
      </div>
    </div>
  );
};

export default PaymentFailed;