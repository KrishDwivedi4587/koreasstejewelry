import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { X, ArrowRight, Search as SearchIcon, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';
import { Product } from '../types';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const searchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await api.getProducts();
        
        if (!query) {
          setFilteredProducts([]);
        } else {
          const s = query.toLowerCase();
          const filtered = allProducts.filter(product =>
            product.name.toLowerCase().includes(s) ||
            product.category.toLowerCase().includes(s) ||
            product.description.toLowerCase().includes(s)
          );
          setFilteredProducts(filtered);
        }
      } catch (err) {
        console.error('Failed to search products:', err);
      } finally {
        setLoading(false);
      }
    };

    searchProducts();
  }, [query]);

  return (
    <div className="bg-brand-base min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Search Header */}
        <div className="mb-16 text-center animate-fade-in">
          <p className="text-brand-terracotta uppercase tracking-luxury text-[10px] mb-4 font-bold">Search Results</p>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6 italic">
            "{query || 'Everything'}"
          </h1>
          <div className="w-12 h-[1px] bg-brand-terracotta/30 mx-auto"></div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-brand-terracotta animate-spin mb-4" />
            <p className="text-brand-muted font-serif italic">Searching...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 animate-fade-in">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="w-20 h-20 bg-brand-peach/30 rounded-full flex items-center justify-center mx-auto mb-8">
              <SearchIcon className="w-8 h-8 text-brand-muted" strokeWidth={1} />
            </div>
            <p className="text-brand-muted italic font-serif text-xl mb-8">
              We couldn't find any results for "{query}"
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/products" className="bg-brand-dark text-white px-8 py-4 text-[10px] uppercase font-bold tracking-luxury hover:bg-brand-terracotta transition-all">
                Browse Lifestyle
              </Link>
              <Link to="/beauwell" className="border border-brand-dark/20 text-brand-dark px-8 py-4 text-[10px] uppercase font-bold tracking-luxury hover:bg-brand-dark hover:text-white transition-all">
                Browse Beauwell
              </Link>
            </div>
          </div>
        )}

        {/* Discovery Section */}
        {filteredProducts.length > 0 && (
          <div className="mt-32 pt-16 border-t border-brand-peach/50 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h2 className="text-2xl font-serif text-brand-dark mb-2">Not what you were looking for?</h2>
              <p className="text-brand-muted text-sm font-light">Explore our full range of jewelry and scientific skincare solutions.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/products" className="text-[10px] uppercase font-bold tracking-luxury flex items-center gap-2 hover:text-brand-terracotta transition-colors">
                View All Jewelry <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="w-[1px] h-4 bg-brand-peach"></div>
              <Link to="/beauwell" className="text-[10px] uppercase font-bold tracking-luxury flex items-center gap-2 hover:text-brand-terracotta transition-colors">
                View All Skincare <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;