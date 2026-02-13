import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus, ChevronDown, ChevronUp, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'reviews'>('desc');
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await api.getProduct(id);
          setProduct(data);
          
          // Fetch all products to get related ones
          const allProducts = await api.getProducts();
          const related = allProducts
            .filter(p => p.category === data.category && p._id !== data._id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-base">
        <div className="animate-pulse text-brand-muted">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-base">
        <h2 className="text-3xl font-serif text-brand-dark mb-4">Product Not Found</h2>
        <Link to="/products" className="text-brand-terracotta border-b border-brand-terracotta pb-1 uppercase text-xs tracking-luxury">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    openCart();
  };

  // Mock Reviews
  const reviews = [
    { id: 1, user: "Sarah M.", rating: 5, date: "Oct 12, 2023", text: "Absolutely stunning! The quality is even better than I expected. It has a nice weight to it and looks very expensive." },
    { id: 2, user: "Priya K.", rating: 4, date: "Sep 28, 2023", text: "Beautiful design. Shipping was fast. The packaging was lovely too." },
    { id: 3, user: "Emily R.", rating: 5, date: "Nov 05, 2023", text: "I use this every day. It's transformed my routine. Highly recommend!" }
  ];

  return (
    <div className="bg-brand-base min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="mb-8 flex items-center justify-between text-xs uppercase tracking-luxury text-brand-muted">
           <button onClick={() => navigate(-1)} className="flex items-center hover:text-brand-terracotta transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
           </button>
           <div className="hidden sm:block">
              <Link to="/" className="hover:text-brand-terracotta">Home</Link> / 
              <span className="text-brand-dark mx-1">{product.name}</span>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Section */}
            <div className="relative aspect-[3/4] md:aspect-square bg-white overflow-hidden shadow-sm">
               <img 
                 src={product.image} 
                 alt={product.name} 
                 className="w-full h-full object-cover"
               />
            </div>

            {/* Info Section */}
            <div className="flex flex-col">
               <span className="text-brand-terracotta text-xs uppercase tracking-luxury font-bold mb-2">{product.category}</span>
               <h1 className="text-4xl lg:text-5xl font-serif text-brand-dark mb-4">{product.name}</h1>
               
               <div className="flex items-center mb-6 space-x-4">
                  <span className="text-2xl font-medium text-brand-dark">₹{product.price.toLocaleString('en-IN')}</span>
                  <div className="flex items-center text-yellow-500">
                     {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                     <span className="text-brand-muted text-xs ml-2 text-black">(24 Reviews)</span>
                  </div>
               </div>

               <p className="text-brand-brown font-light leading-loose mb-8 text-sm md:text-base border-b border-brand-peach pb-8">
                  {product.description}
               </p>

               <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex items-center border border-brand-terracotta/30 w-full sm:w-32 justify-between px-2 py-3 bg-white">
                     <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="text-brand-brown hover:text-brand-terracotta p-1"
                     >
                        <Minus className="w-4 h-4" />
                     </button>
                     <span className="font-medium text-brand-dark">{quantity}</span>
                     <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="text-brand-brown hover:text-brand-terracotta p-1"
                     >
                        <Plus className="w-4 h-4" />
                     </button>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-brand-dark text-white uppercase text-xs font-bold tracking-luxury py-4 hover:bg-brand-terracotta transition-colors shadow-lg shadow-brand-terracotta/20"
                  >
                     Add to Bag
                  </button>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-8 text-xs text-brand-brown">
                  <div className="flex items-center gap-2">
                     <Truck className="w-5 h-5 text-brand-terracotta" strokeWidth={1.5} />
                     <span>Free Shipping over ₹5,000</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <ShieldCheck className="w-5 h-5 text-brand-terracotta" strokeWidth={1.5} />
                     <span>Genuine Product Guarantee</span>
                  </div>
               </div>

               <div className="border-t border-brand-peach">
                  <div className="py-4">
                     <button 
                        onClick={() => setActiveTab(activeTab === 'reviews' ? 'desc' : 'reviews')}
                        className="flex items-center justify-between w-full text-left font-serif text-lg text-brand-dark mb-4"
                     >
                        <span>Customer Reviews</span>
                        {activeTab === 'reviews' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                     </button>
                     
                     <div className={`space-y-6 overflow-hidden transition-all duration-300 ${activeTab === 'reviews' ? 'max-h-[500px]' : 'max-h-0'}`}>
                        {reviews.map(review => (
                           <div key={review.id} className="bg-white p-4 border border-brand-peach/50 rounded-sm">
                              <div className="flex justify-between items-start mb-2">
                                 <div>
                                    <span className="text-sm font-medium text-brand-dark block">{review.user}</span>
                                    <div className="flex text-yellow-500 mt-1">
                                       {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                                    </div>
                                 </div>
                                 <span className="text-[10px] text-brand-muted">{review.date}</span>
                              </div>
                              <p className="text-xs text-brand-brown leading-relaxed">{review.text}</p>
                           </div>
                        ))}
                        <button className="text-xs text-brand-terracotta underline hover:text-brand-dark">Read all reviews</button>
                     </div>
                  </div>

                   <div className="py-4 border-t border-brand-peach">
                     <button 
                        onClick={() => setIsShippingOpen(!isShippingOpen)}
                        className="flex items-center justify-between w-full text-left font-serif text-lg text-brand-dark"
                     >
                        <span>Shipping & Returns</span>
                        {isShippingOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                     </button>
                     <div className={`mt-4 text-sm font-light text-brand-brown leading-loose overflow-hidden transition-all duration-300 ${isShippingOpen ? 'max-h-40' : 'max-h-0'}`}>
                        <p>We offer free standard shipping on all orders over ₹5,000. Orders are processed within 1-2 business days. If you are not completely satisfied with your purchase, returns are accepted within 30 days of delivery.</p>
                     </div>
                  </div>
               </div>
            </div>
        </div>

        {relatedProducts.length > 0 && (
           <div className="mt-32">
              <h2 className="text-3xl font-serif text-brand-dark text-center mb-16">Related Items</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {relatedProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                 ))}
              </div>
           </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;