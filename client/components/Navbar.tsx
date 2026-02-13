import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User as UserIcon, LogOut, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  const { getCartCount, openCart } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside click for user menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
        setTimeout(() => {
            searchInputRef.current?.focus();
        }, 50);
    }
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      if (isOpen) setIsOpen(false);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const NavLink = ({ to, label }: { to: string; label: string }) => (
    <Link 
      to={to} 
      className={`text-[10px] lg:text-xs uppercase tracking-luxury transition-colors duration-300 link-underline whitespace-nowrap ${
        isActive(to) ? 'text-brand-terracotta active' : 'text-brand-brown hover:text-brand-terracotta'
      }`}
    >
      {label}
    </Link>
  );

  const navStateClasses = (scrolled || isSearchOpen)
    ? 'shadow-sm py-2 bg-white/95 backdrop-blur-md' 
    : 'py-4 bg-brand-base';

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-luxury ${navStateClasses}`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16 relative">
          
          <div className={`flex justify-between items-center relative transition-all duration-300 transform ${isSearchOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
            
            <div className="flex items-center">
              <div className="md:hidden flex items-center mr-4">
                  <button
                  onClick={toggleMenu}
                  className="text-brand-dark hover:text-brand-terracotta transition-colors focus:outline-none active:scale-95 duration-200"
                  >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
              </div>

              <Link to="/" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 md:w-16 md:h-16 relative overflow-hidden rounded-full border border-brand-terracotta/20 bg-brand-peach transition-transform duration-500 group-hover:rotate-12">
                      <img 
                          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=100&auto=format&fit=crop" 
                          alt="Koreasste Logo" 
                          className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                      />
                  </div>
                  <span className="text-2xl md:text-3xl lg:text-4xl font-serif tracking-widest text-brand-dark group-hover:text-brand-terracotta transition-colors duration-300">
                    Koreasste
                  </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4 lg:space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <NavLink to="/products" label="Shop - Lifestyle" />
              <NavLink to="/beauwell" label="Shop - BEAUWELL" />
              <NavLink to="/about" label="About" />
              <NavLink to="/contact" label="Contact" />
            </div>

            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-brand-brown hover:text-brand-terracotta transition-colors hidden sm:block hover:scale-110 duration-300"
              >
                  <Search className="h-5 w-5" strokeWidth={1.5} />
              </button>

              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => isAuthenticated ? setIsUserMenuOpen(!isUserMenuOpen) : navigate('/login')}
                  className="text-brand-brown hover:text-brand-terracotta transition-colors hover:scale-110 duration-300 flex items-center gap-1"
                >
                    <UserIcon className="h-5 w-5" strokeWidth={1.5} />
                    {isAuthenticated && <span className="hidden lg:block text-[9px] uppercase tracking-widest font-bold">Account</span>}
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && isAuthenticated && (
                  <div className="absolute right-0 top-full mt-4 w-56 bg-white shadow-2xl border border-brand-peach/50 rounded-sm py-4 animate-fade-in z-50 overflow-hidden">
                    <div className="px-6 py-2 border-b border-brand-peach mb-2">
                        <p className="text-[10px] uppercase tracking-luxury text-brand-muted font-bold">Signed in as</p>
                        <p className="text-xs font-serif text-brand-dark italic truncate">{user?.firstName} {user?.lastName}</p>
                    </div>
                    <Link to="/profile" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-6 py-3 hover:bg-brand-base text-[10px] uppercase tracking-luxury text-brand-muted hover:text-brand-terracotta transition-colors font-bold">
                        <UserIcon className="w-4 h-4" strokeWidth={1.5} /> Profile Info
                    </Link>
                    <Link to="/orders" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-6 py-3 hover:bg-brand-base text-[10px] uppercase tracking-luxury text-brand-muted hover:text-brand-terracotta transition-colors font-bold">
                        <Package className="w-4 h-4" strokeWidth={1.5} /> My Orders
                    </Link>
                    <button 
                      onClick={() => { logout(); setIsUserMenuOpen(false); }} 
                      className="w-full flex items-center gap-3 px-6 py-3 hover:bg-red-50 text-[10px] uppercase tracking-luxury text-red-400 font-bold transition-colors mt-2"
                    >
                        <LogOut className="w-4 h-4" strokeWidth={1.5} /> Sign Out
                    </button>
                  </div>
                )}
              </div>

              <button onClick={openCart} className="relative group cursor-pointer focus:outline-none hover:scale-110 duration-300">
                <ShoppingBag className="h-5 w-5 text-brand-brown group-hover:text-brand-terracotta transition-colors" strokeWidth={1.5} />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-terracotta text-white text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center animate-bounce shadow-sm">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className={`absolute inset-0 flex items-center justify-center z-10 transition-all duration-300 ${isSearchOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4 pointer-events-none'}`}>
             <form onSubmit={handleSearch} className="w-full max-w-2xl px-4 flex items-center gap-4">
                 <Search className="w-5 h-5 text-brand-muted flex-shrink-0" />
                 <input 
                    ref={searchInputRef}
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search collection..."
                    className="flex-1 bg-transparent border-b border-brand-brown/20 py-2 text-brand-dark font-serif italic text-lg focus:outline-none focus:border-brand-terracotta transition-colors placeholder:text-brand-muted/40"
                 />
                 <button 
                    type="button" 
                    onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                    }} 
                    className="p-1 hover:text-brand-terracotta transition-colors flex-shrink-0"
                 >
                    <X className="w-5 h-5" />
                 </button>
             </form>
          </div>
        </div>

        <div
          className={`md:hidden bg-brand-base absolute w-full border-b border-brand-peach overflow-hidden transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
            isOpen ? 'max-h-[700px] opacity-100 shadow-xl' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 py-8 space-y-4 flex flex-col items-center">
             <form onSubmit={handleSearch} className="w-full relative mb-4">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..." 
                  className="w-full bg-brand-peach/30 border-b border-brand-muted/20 py-2 pl-2 pr-8 text-sm focus:outline-none focus:border-brand-terracotta"
                />
                <button type="submit" className="absolute right-2 top-2 text-brand-muted">
                  <Search className="w-4 h-4" />
                </button>
             </form>
            <Link to="/products" onClick={() => setIsOpen(false)} className="text-xs uppercase tracking-luxury text-brand-brown hover:text-brand-terracotta transition-colors">Shop - Lifestyle</Link>
            <Link to="/beauwell" onClick={() => setIsOpen(false)} className="text-xs uppercase tracking-luxury text-brand-brown hover:text-brand-terracotta transition-colors">Shop - BEAUWELL</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-xs uppercase tracking-luxury text-brand-brown hover:text-brand-terracotta transition-colors">About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="text-xs uppercase tracking-luxury text-brand-brown hover:text-brand-terracotta transition-colors">Contact</Link>
            <div className="w-12 h-[1px] bg-brand-peach my-2"></div>
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="text-xs uppercase tracking-luxury text-brand-terracotta font-bold">Profile Settings</Link>
                <Link to="/orders" onClick={() => setIsOpen(false)} className="text-xs uppercase tracking-luxury text-brand-muted">Order History</Link>
                <button onClick={() => { logout(); setIsOpen(false); }} className="text-xs uppercase tracking-luxury text-red-400 font-bold mt-2">Sign Out</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-xs uppercase tracking-luxury text-brand-terracotta font-bold">Sign In / Register</Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;