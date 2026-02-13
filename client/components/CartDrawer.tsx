import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal 
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm animate-fadeIn"
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl slide-in-right flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brand-peach">
          <h2 className="text-2xl font-serif text-brand-dark">Shopping Bag</h2>
          <button 
            onClick={closeCart}
            className="text-brand-muted hover:text-brand-terracotta transition-colors p-2 hover:rotate-90 duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-fade-in-up">
              <span className="text-4xl text-brand-peach">●</span>
              <p className="text-brand-muted font-light text-sm">Your bag is currently empty.</p>
              <button 
                onClick={closeCart}
                className="text-brand-terracotta text-xs uppercase tracking-luxury underline hover:text-brand-dark transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.productId} className="flex gap-4 group fade-in-up">
                {/* Product Image */}
                <div className="w-20 h-24 flex-shrink-0 bg-brand-base overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-brand-dark font-serif text-sm md:text-base leading-snug">
                        {item.name}
                        </h3>
                        <p className="text-[10px] uppercase text-brand-muted tracking-wider mt-1">{item.category}</p>
                    </div>
                    <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="text-brand-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1 transform hover:scale-110 duration-200"
                        aria-label="Remove item"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex justify-between items-end">
                     {/* Quantity Controls */}
                     <div className="flex items-center border border-brand-peach rounded-sm">
                        <button 
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-1.5 text-brand-brown hover:text-brand-terracotta transition-colors hover:bg-brand-peach/30"
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-medium w-6 text-center text-brand-dark">{item.quantity}</span>
                        <button 
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-1.5 text-brand-brown hover:text-brand-terracotta transition-colors hover:bg-brand-peach/30"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                     </div>

                     {/* Price */}
                     <span className="text-sm font-medium text-brand-terracotta">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                     </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
            <div className="p-6 bg-brand-base border-t border-brand-peach">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-brand-brown text-sm uppercase tracking-wider">Subtotal</span>
                    <span className="text-xl font-serif text-brand-dark">₹{getCartTotal().toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[10px] text-brand-muted mb-6 text-center">
                    Shipping & taxes calculated at checkout.
                </p>
                <button 
                    onClick={handleCheckout}
                    className="w-full bg-brand-dark text-white py-4 uppercase text-xs font-bold tracking-luxury hover:bg-brand-terracotta transition-colors flex items-center justify-center gap-2 group active:scale-[0.99] duration-200"
                >
                    Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;