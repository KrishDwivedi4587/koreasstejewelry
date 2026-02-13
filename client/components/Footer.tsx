import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-peach text-brand-brown py-20 border-t border-brand-terracotta/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-serif tracking-widest text-brand-dark mb-6">
              Koreasste
            </h2>
            <p className="text-brand-muted text-xs leading-relaxed font-light">
              Redefining artificial jewelry with a touch of modern luxury. Professionally curated pieces for the bold and the beautiful.
            </p>
          </div>

          <div>
             <h3 className="text-xs uppercase tracking-luxury font-bold mb-6 text-brand-terracotta">Shop</h3>
             <ul className="space-y-4 text-sm font-light text-brand-brown">
                <li><Link to="/products" className="hover:text-brand-terracotta transition-colors">New Arrivals</Link></li>
                <li><Link to="/products" className="hover:text-brand-terracotta transition-colors">Best Sellers</Link></li>
                <li><Link to="/products?category=Necklaces" className="hover:text-brand-terracotta transition-colors">Necklaces</Link></li>
                <li><Link to="/products?category=Earrings" className="hover:text-brand-terracotta transition-colors">Earrings</Link></li>
             </ul>
          </div>

          <div>
             <h3 className="text-xs uppercase tracking-luxury font-bold mb-6 text-brand-terracotta">Company</h3>
             <ul className="space-y-4 text-sm font-light text-brand-brown">
                <li><Link to="/about" className="hover:text-brand-terracotta transition-colors">Our Story</Link></li>
                <li><Link to="/contact" className="hover:text-brand-terracotta transition-colors">Contact Us</Link></li>
             </ul>
          </div>

          <div>
             <h3 className="text-xs uppercase tracking-luxury font-bold mb-6 text-brand-terracotta">Follow Us</h3>
             <div className="flex flex-col space-y-4 text-sm font-light">
               <a href="https://instagram.com/koreasste" target="_blank" rel="noopener noreferrer" className="hover:text-brand-terracotta transition-colors">Instagram</a>
               <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-terracotta transition-colors">Pinterest</a>
               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-terracotta transition-colors">Facebook</a>
             </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-brand-terracotta/10 text-center">
          <p className="text-brand-muted text-[10px] uppercase tracking-luxury">
            &copy; {new Date().getFullYear()} Koreasste Jewelry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;