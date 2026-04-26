import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, CartContextType } from '../types';
import { useAuth } from './AuthContext';

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

  // Load cart from localStorage on mount / user change
  useEffect(() => {
    const storageKey = user ? `koreasste_cart_${user._id}` : 'koreasste_cart_guest';
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, [user]);

  // Sync cart to localStorage
  useEffect(() => {
    const storageKey = user ? `koreasste_cart_${user._id}` : 'koreasste_cart_guest';
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, user]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product._id);
      if (existing) {
        return prev.map(item =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      const newItem: CartItem = {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity,
      };
      return [...prev, newItem];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(productId);
    setCart(prev =>
      prev.map(item => item.productId === productId ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => {
    setCart([]);
    const storageKey = user ? `koreasste_cart_${user._id}` : 'koreasste_cart_guest';
    localStorage.removeItem(storageKey);
  };

  const getCartCount = () => cart.reduce((total, item) => total + item.quantity, 0);
  const getCartTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart, isCartOpen, addToCart, removeFromCart, updateQuantity, clearCart,
      getCartCount, getCartTotal,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  );
};
