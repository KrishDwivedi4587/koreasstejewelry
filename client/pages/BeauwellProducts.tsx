import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { X, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';
import { Product } from '../types';

const BeauwellProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const searchQuery = searchParams.get('search') || '';

  const categories = ['All', 'Anti-Aging', 'Cleansers', 'Device Tech', 'Moisturizers', 'Exfoliators'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const skinCareProducts = await api.getProducts('skincare');
        setProducts(skinCareProducts);
      } catch (err) {
        console.error('Failed to load skincare products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by Category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [products, activeCategory, searchQuery]);

  const clearSearch = () => {
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  if (loading) {
    return (
      <div className="bg-brand-base min-h-screen pt-32 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-terracotta animate-spin mb-4" />
        <p className="text-brand-muted font-serif italic">Loading skincare collection...</p>
      </div>
    );
  }

  return (
    <div className="bg-brand-base min-h-screen pt-24 pb-24">
      
      {/* Page Header */}
      <div className="text-center py-16 px-4 bg-[#f0f4f8] mb-12 border-b border-blue-100">
        <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">BEAUWELL Skincare</h1>
        <div className="w-12 h-[1px] bg-brand-terracotta mx-auto mb-6"></div>
        <p className="text-brand-muted max-w-xl mx-auto font-light leading-relaxed text-sm">
          Premium NuSkin solutions for radiant, youthful skin. Scientific innovation meets everyday luxury.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8 text-[10px] uppercase tracking-luxury text-brand-muted">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`transition-all duration-300 outline-none ${
                        activeCategory === category 
                        ? 'text-brand-dark border-b border-brand-dark pb-1 font-medium' 
                        : 'hover:text-brand-terracotta hover:border-b hover:border-brand-terracotta/50 pb-1 border-transparent border-b'
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>

        {/* Active Search Indicator */}
        {searchQuery && (
          <div className="text-center mb-12 animate-fade-in-up">
              <p className="text-brand-muted text-sm font-light">
                  Search results for <span className="font-serif italic text-brand-dark">"{searchQuery}"</span>
              </p>
              <button 
                onClick={clearSearch} 
                className="text-[10px] uppercase tracking-luxury text-brand-terracotta hover:text-brand-dark mt-3 inline-flex items-center gap-1 border-b border-transparent hover:border-brand-dark transition-all"
              >
                 Clear Search <X className="w-3 h-3" />
              </button>
          </div>
        )}

        {/* Grid: 2 Columns on Mobile, 4 Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16 animate-fade-in">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
            <div className="text-center py-20 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
                <p className="text-brand-muted italic font-serif text-lg">No products found matching your criteria.</p>
                <div className="flex justify-center gap-4 mt-4">
                    {searchQuery && (
                        <button 
                            onClick={clearSearch}
                            className="text-brand-terracotta text-xs uppercase tracking-luxury underline hover:text-brand-dark transition-colors"
                        >
                            Clear Search
                        </button>
                    )}
                    <button 
                        onClick={() => {
                            setActiveCategory('All');
                            if(searchQuery) clearSearch();
                        }}
                        className="text-brand-terracotta text-xs uppercase tracking-luxury underline hover:text-brand-dark transition-colors"
                    >
                        View All Products
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default BeauwellProducts;