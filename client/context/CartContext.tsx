
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, CartContextType } from '../types';
import { useAuth } from './AuthContext';
import { api } from '../services/api';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuth();

  // Load cart: Check Database first if logged in, otherwise check LocalStorage
  useEffect(() => {
    const loadCart = async () => {
      if (user && user._id) {
        try {
          const cartData = await api.getCart(user._id);
          if (cartData && cartData.items) {
            setCart(cartData.items);
          }
        } catch (err) {
          console.error('Failed to load cart:', err);
          const local = localStorage.getItem('koreasste_cart_guest');
          if (local) setCart(JSON.parse(local));
        }
      } else {
        const local = localStorage.getItem('koreasste_cart_guest');
        if (local) setCart(JSON.parse(local));
      }
    };
    loadCart();
  }, [user]);

  // Sync cart to localStorage for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem('koreasste_cart_guest', JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return removeFromCart(productId);
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);
  const getCartCount = () => cart.reduce((total, item) => total + item.quantity, 0);
  const getCartTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, isCartOpen, addToCart, removeFromCart, updateQuantity, clearCart, 
      getCartCount, getCartTotal, openCart: () => setIsCartOpen(true), closeCart: () => setIsCartOpen(false) 
    }}>
      {children}
    </CartContext.Provider>
  );
};
