
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';
import { Product } from '../types';

const SLIDE_DURATION = 5000; // 5 seconds

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const lifestyleSlides = [
    {
      image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2070&auto=format&fit=crop",
      title: "Ethereal Glow",
      subtitle: "Pure Gold & Pearl Curations"
    },
    {
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
      title: "Minimalist Grace",
      subtitle: "Clean Lines, Timeless Appeal"
    },
    {
      image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=2070&auto=format&fit=crop",
      title: "Studio Series",
      subtitle: "Modern Heirloom Jewelry"
    }
  ];

  const beauwellSlides = [
    {
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop",
      title: "Pure Science",
      subtitle: "Advanced Skincare Rituals"
    },
    {
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2070&auto=format&fit=crop",
      title: "Cellular Health",
      subtitle: "The Future of Wellness"
    },
    {
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop",
      title: "Modern Purity",
      subtitle: "Holistic NuSkin Innovations"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideCount = lifestyleSlides.length;
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoadingProducts(true);
        const products = await api.getProducts();
        setFeaturedProducts(products.slice(0, 4));
      } catch (err) {
        console.error('Failed to load featured products:', err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      handleNext();
    }, SLIDE_DURATION);
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % slideCount);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning, slideCount]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning, slideCount]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  return (
    <div className="flex flex-col min-h-screen bg-brand-base">
      
      {/* Editorial Hero Section */}
      <section className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden group">
        
        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex space-x-3">
          {[...Array(slideCount)].map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if(!isTransitioning) {
                  setIsTransitioning(true);
                  setActiveIndex(i);
                  setTimeout(() => setIsTransitioning(false), 800);
                }
              }}
              className={`h-1.5 transition-all duration-700 rounded-full ${i === activeIndex ? 'w-10 bg-brand-terracotta' : 'w-1.5 bg-white/30'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Dual Panels */}
        <div className="relative flex flex-col md:flex-row w-full h-full">
          
          {/* Lifestyle Side */}
          <div className="relative flex-1 h-1/2 md:h-full overflow-hidden">
            {lifestyleSlides.map((slide, idx) => (
              <div 
                key={idx}
                className={`absolute inset-0 transition-all duration-[1500ms] cubic-bezier(0.4, 0, 0.2, 1) ${
                  idx === activeIndex ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
                }`}
              >
                {/* Darkening Overlays for Visibility */}
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10"></div>
                
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover brightness-[0.7] contrast-[1.1]"
                />
              </div>
            ))}
            
            {/* Content Left - Editorial Overlay */}
            <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-[12%] z-20 pointer-events-none">
              <div className={`max-w-md transition-all duration-1000 transform pointer-events-auto ${isTransitioning ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
                {/* Soft Glass Scrim Wrapper */}
                <div className="relative pl-8 md:pl-0 p-6 backdrop-blur-[2px] bg-black/5 rounded-sm">
                  <p className="text-brand-terracotta/90 uppercase tracking-[0.6em] text-[10px] mb-4 font-bold drop-shadow-md">
                    Lifestyle • 0{activeIndex + 1}
                  </p>
                  <h2 className="text-5xl lg:text-7xl font-serif text-white mb-6 italic tracking-tight drop-shadow-2xl leading-none">
                    {lifestyleSlides[activeIndex].title}
                  </h2>
                  <p className="text-white/80 font-light text-sm mb-10 tracking-widest uppercase italic max-w-xs leading-relaxed drop-shadow-md">
                    {lifestyleSlides[activeIndex].subtitle}
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-4 text-white uppercase text-[10px] font-bold tracking-[0.3em] group/link"
                  >
                    <span className="border-b-2 border-brand-terracotta/50 pb-1 group-hover/link:border-white transition-colors">Discover Gallery</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Center Split Divider Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20 z-30"></div>

          {/* BEAUWELL Side */}
          <div className="relative flex-1 h-1/2 md:h-full overflow-hidden">
            {beauwellSlides.map((slide, idx) => (
              <div 
                key={idx}
                className={`absolute inset-0 transition-all duration-[1500ms] cubic-bezier(0.4, 0, 0.2, 1) ${
                  idx === activeIndex ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
                }`}
              >
                {/* Darkening Overlays for Visibility */}
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-transparent z-10"></div>
                
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover brightness-[0.7] contrast-[1.1]"
                />
              </div>
            ))}
            
            {/* Content Right - Editorial Overlay */}
            <div className="absolute inset-0 flex items-center justify-center md:justify-start md:pl-[12%] z-20 pointer-events-none">
              <div className={`max-w-md transition-all duration-1000 transform pointer-events-auto ${isTransitioning ? 'opacity-0 -translate-x-10' : 'opacity-100 translate-x-0'}`}>
                {/* Soft Glass Scrim Wrapper */}
                <div className="relative pl-8 md:pl-0 p-6 backdrop-blur-[2px] bg-black/5 rounded-sm">
                  <p className="text-brand-terracotta/90 uppercase tracking-[0.6em] text-[10px] mb-4 font-bold drop-shadow-md">
                    Beauwell • 0{activeIndex + 1}
                  </p>
                  <h2 className="text-5xl lg:text-7xl font-serif text-white mb-6 italic tracking-tight drop-shadow-2xl leading-none">
                    {beauwellSlides[activeIndex].title}
                  </h2>
                  <p className="text-white/80 font-light text-sm mb-10 tracking-widest uppercase italic max-w-xs leading-relaxed drop-shadow-md">
                    {beauwellSlides[activeIndex].subtitle}
                  </p>
                  <Link
                    to="/beauwell"
                    className="inline-flex items-center gap-4 text-white uppercase text-[10px] font-bold tracking-[0.3em] group/link"
                  >
                    <span className="border-b-2 border-brand-terracotta/50 pb-1 group-hover/link:border-white transition-colors">Shop Rituals</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4 md:px-8 z-50 pointer-events-none">
          <button 
            onClick={(e) => { e.stopPropagation(); handlePrev(); }} 
            className="p-4 rounded-full border border-white/40 text-white bg-white/5 backdrop-blur-md hover:bg-white hover:text-brand-dark transition-all pointer-events-auto active:scale-75 disabled:opacity-30 shadow-2xl"
            disabled={isTransitioning}
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(); }} 
            className="p-4 rounded-full border border-white/40 text-white bg-white/5 backdrop-blur-md hover:bg-white hover:text-brand-dark transition-all pointer-events-auto active:scale-75 disabled:opacity-30 shadow-2xl"
            disabled={isTransitioning}
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Categories Bento Box */}
      <section className="py-32 bg-brand-base">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20 fade-in-up">
                <span className="text-brand-terracotta uppercase tracking-[0.3em] text-[10px] mb-4 block font-semibold">Our Curation</span>
                <h2 className="text-4xl font-serif text-brand-dark">Shop by Category</h2>
                <div className="w-12 h-[1px] bg-brand-terracotta/50 mx-auto mt-8"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link to="/products" className="relative group overflow-hidden h-[500px] md:h-[650px] w-full block shadow-lg">
                    <img 
                        src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop" 
                        className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                        alt="Necklaces"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-all duration-700"></div>
                    <div className="absolute bottom-12 left-12">
                        <h3 className="text-white font-serif text-4xl mb-4 italic tracking-wide">Signature Necklaces</h3>
                        <div className="flex items-center text-white text-[10px] uppercase tracking-luxury gap-2 group/btn">
                          <span>View All</span>
                          <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-2 transition-transform" />
                        </div>
                    </div>
                </Link>

                <div className="flex flex-col gap-8">
                    <Link to="/products" className="relative group overflow-hidden h-[310px] w-full block shadow-md">
                        <img 
                            src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop" 
                            className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                            alt="Earrings"
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-all"></div>
                        <div className="absolute bottom-10 left-10">
                            <h3 className="text-white font-serif text-3xl mb-3 italic">Earrings</h3>
                            <span className="text-white text-[9px] uppercase tracking-luxury border-b border-white/40 pb-1">Shop Collection</span>
                        </div>
                    </Link>
                    <Link to="/products" className="relative group overflow-hidden h-[310px] w-full block shadow-md">
                        <img 
                            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop" 
                            className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                            alt="Full Sets"
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-all"></div>
                        <div className="absolute bottom-10 left-10">
                            <h3 className="text-white font-serif text-3xl mb-3 italic">Curated Sets</h3>
                            <span className="text-white text-[9px] uppercase tracking-luxury border-b border-white/40 pb-1">Shop Collection</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-32 bg-brand-peach/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center mb-20 fade-in-up">
            <span className="text-brand-terracotta uppercase tracking-[0.3em] text-[10px] mb-4 font-bold">Latest Drops</span>
            <h2 className="text-4xl font-serif text-brand-dark">The New Season</h2>
            <div className="w-12 h-[1px] bg-brand-terracotta/50 mt-8"></div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {loadingProducts ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-brand-peach/20 animate-pulse rounded-sm" />
              ))
            ) : (
              featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
          
          <div className="mt-20 text-center fade-in-up">
            <Link to="/products" className="group inline-flex items-center gap-3 text-brand-dark uppercase text-[10px] font-bold tracking-luxury hover:text-brand-terracotta transition-colors">
                View Entire Gallery
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final Brand Statement Section */}
      <section className="bg-white overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[700px]">
            <div className="relative h-[500px] md:h-full overflow-hidden group">
                 <img 
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110" 
                    alt="Koreasste Editorial" 
                />
                <div className="absolute inset-0 bg-brand-dark/10"></div>
            </div>
            <div className="flex flex-col justify-center p-12 md:p-24 bg-brand-base">
                <div className="max-w-md mx-auto md:mx-0 text-center md:text-left fade-in-up">
                    <span className="text-brand-terracotta text-[10px] uppercase tracking-luxury mb-6 block font-bold">About Our House</span>
                    <h3 className="text-4xl md:text-5xl font-serif italic mb-10 leading-tight text-brand-dark">"Adornments that speak to the soul."</h3>
                    <p className="text-brand-muted font-light leading-relaxed mb-12 text-base italic">
                        At Koreasste, we believe jewelry is more than an accessory—it's an extension of your presence. Our pieces are crafted with scientific passion and artistic passion.
                    </p>
                    <Link to="/about" className="inline-block border border-brand-dark/20 px-10 py-4 text-brand-dark text-[10px] uppercase tracking-luxury hover:bg-brand-dark hover:text-white transition-all duration-500">
                      Our Narrative
                    </Link>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
