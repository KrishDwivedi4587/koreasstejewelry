import React, { useEffect, useState, useRef } from 'react';

/**
 * Local hook for scroll-triggered animations to ensure zero external dependencies.
 */
function useScrollReveal<T extends HTMLElement>(threshold = 0.1, rootMargin = '0px 0px -50px 0px') {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

// Helper component for scroll-reveal animations
const FadeInSection: React.FC<{ children: React.ReactNode; delay?: string }> = ({ children, delay = '0ms' }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
};

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* Hero Header */}
      <div ref={heroRef} className="relative py-20 md:py-32 bg-gradient-to-b from-[#ECEAE5] to-brand-base flex items-center justify-center overflow-hidden border-b border-brand-peach/30">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E09F87_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ease-out transform ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-serif text-5xl md:text-6xl text-brand-dark mb-6">
            Our Story
          </h1>
          <p className="font-sans text-base md:text-lg font-bold tracking-[0.2em] uppercase text-brand-terracotta leading-relaxed">
            Defining elegance through lifestyle &<br className="hidden md:block"/> purity through holistic wellness
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <section className="py-20 md:py-32 px-6">
        <FadeInSection>
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-10">The Vision</h2>
            <p className="text-brand-brown font-light leading-loose text-xl mb-12 max-w-3xl mx-auto">
              Koreasste was born from a desire to bridge two essential aspects of modern living: the outward expression of style and the inner foundation of health. We believe that true luxury lies in the balance between how you present yourself to the world and how you nurture your body.
            </p>
            <div className="w-24 h-0.5 bg-brand-terracotta mx-auto"></div>
          </div>
        </FadeInSection>
      </section>

      {/* Dual Identity Section */}
      <section className="py-20 bg-brand-base">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
                
                {/* Lifestyle */}
                <FadeInSection>
                  <div className="relative group overflow-hidden shadow-sm">
                      <img 
                          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop" 
                          alt="Lifestyle Fashion" 
                          className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-brand-dark/5 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                </FadeInSection>
                
                <FadeInSection delay="200ms">
                  <div className="md:pl-8 text-center md:text-left">
                      <h3 className="font-serif text-4xl text-brand-dark mb-6">Koreasste - Lifestyle</h3>
                      <p className="text-brand-muted text-lg leading-relaxed mb-8 font-light">
                          Our Lifestyle collection is a celebration of aesthetics. From the intricate details of traditional Indian garments to the sharp silhouettes of Western wear, and the subtle glimmer of fine jewelry. We curate pieces that empower you to express your unique identity with grace and confidence.
                      </p>
                      <p className="font-sans text-sm font-bold uppercase tracking-widest text-brand-terracotta">
                          Timeless • Elegant • Unique
                      </p>
                  </div>
                </FadeInSection>

                {/* Beauwell */}
                <div className="order-2 md:order-1">
                  <FadeInSection>
                    <div className="md:pr-8 text-center md:text-left">
                        <h3 className="font-serif text-4xl text-brand-dark mb-6">Koreasste - BEAUWELL</h3>
                        <p className="text-brand-muted text-lg leading-relaxed mb-8 font-light">
                            BEAUWELL represents our commitment to scientific wellness. Partnering with global leaders like NuSkin and PharmaNex, we bring you clinically proven skincare and nutritional solutions. We believe beauty is not just skin deep—it radiates from a healthy, nourished core.
                        </p>
                        <p className="font-sans text-sm font-bold uppercase tracking-widest text-brand-terracotta">
                            Scientific • Pure • Effective
                        </p>
                    </div>
                  </FadeInSection>
                </div>

                <div className="order-1 md:order-2">
                  <FadeInSection delay="200ms">
                    <div className="relative group overflow-hidden shadow-sm">
                        <img 
                            src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop" 
                            alt="Wellness Science" 
                            className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-brand-dark/5 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                  </FadeInSection>
                </div>

            </div>
        </div>
      </section>

      {/* Commitment/Closing */}
      <section className="py-28 text-center px-6">
        <FadeInSection>
          <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-4xl mb-8 text-brand-dark">Our Commitment</h2>
              <p className="text-brand-muted text-xl font-light leading-relaxed mb-12">
                  Whether you are choosing a statement necklace or a rejuvenating serum, our promise remains the same: uncompromising quality and a dedication to enhancing your life.
              </p>
              <div className="w-12 h-[1px] bg-brand-terracotta/30 mx-auto"></div>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
};

export default About;