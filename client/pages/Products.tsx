
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';
import { Product } from '../types';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || 'All';

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (categoryParam) setActiveCategory(categoryParam);
  }, [categoryParam]);

  const categories = ['All', 'Necklaces', 'Earrings', 'Full Sets', 'Bracelets'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    if (!searchQuery) return matchesCategory;
    const query = searchQuery.toLowerCase();
    return matchesCategory && (product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query));
  });

  return (
    <div className="bg-brand-base min-h-screen pt-24 pb-24">
      <div className="text-center py-16 px-4 bg-brand-peach mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">Lifestyle Collection</h1>
        <div className="w-12 h-[1px] bg-brand-terracotta mx-auto mb-6"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-12 text-[10px] uppercase tracking-luxury text-brand-muted">
            {categories.map((c) => (
                <button key={c} onClick={() => setActiveCategory(c)} className={`pb-1 border-b transition-all ${activeCategory === c ? 'text-brand-dark border-brand-dark' : 'border-transparent'}`}>
                    {c}
                </button>
            ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => <div key={i} className="aspect-[3/4] bg-brand-peach/20 animate-pulse rounded-sm" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
            {filteredProducts.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
