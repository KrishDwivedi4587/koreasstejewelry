import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, openCart } = useCart();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if clicking the button
    addToCart(product);
    openCart();
  };

  return (
    <div className="group relative flex flex-col fade-in-up">
      <Link to={`/product/${product._id}`} className="block relative aspect-[3/4] overflow-hidden bg-brand-base mb-4 cursor-pointer">
        {/* Placeholder / Loading State */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-brand-peach/30 animate-pulse" />
        )}
        
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover object-center transition-transform duration-[1.5s] ease-out group-hover:scale-110 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
        
        {/* Fallback for failed images */}
        {hasError && (
          <div className="absolute inset-0 bg-brand-peach flex items-center justify-center text-brand-muted text-xs">
            Image Unavailable
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-brand-terracotta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Action Button - Slides up with ease-luxury */}
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-luxury z-10">
             <button
                onClick={handleAddToCart}
                className="w-full bg-white/95 backdrop-blur-sm text-brand-dark hover:bg-brand-terracotta hover:text-white py-3 uppercase text-[10px] font-bold tracking-luxury transition-all duration-300 border border-brand-terracotta/20 shadow-lg active:scale-95"
            >
                Add to Bag
            </button>
        </div>
      </Link>

      <div className="text-center space-y-2">
        <p className="text-[10px] uppercase tracking-luxury text-brand-muted transition-colors group-hover:text-brand-terracotta/70">{product.category}</p>
        <Link to={`/product/${product._id}`} className="block group/title">
          <h3 className="text-sm font-medium text-brand-dark font-serif tracking-wide group-hover/title:text-brand-terracotta transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs font-semibold text-brand-terracotta font-sans">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;