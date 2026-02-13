import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, User as UserIcon, Mail, Lock, Phone } from 'lucide-react';

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await signup(firstName, lastName, email, password, phone);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-base pt-32 pb-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <span className="text-brand-terracotta uppercase tracking-[0.3em] text-[10px] mb-4 block font-bold">Join the House</span>
          <h1 className="text-4xl font-serif text-brand-dark italic mb-4">Create Account</h1>
          <div className="w-12 h-[1px] bg-brand-terracotta/30 mx-auto"></div>
        </div>

        <div className="bg-white p-10 shadow-2xl border border-brand-peach/50 rounded-sm">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs tracking-wider uppercase border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-luxury text-brand-muted mb-2 font-bold">First Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3.5 w-4 h-4 text-brand-muted/50" />
                <input
                  required
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-brand-base border-b border-brand-brown/10 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-terracotta transition-colors"
                  placeholder="John"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-luxury text-brand-muted mb-2 font-bold">Last Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3.5 w-4 h-4 text-brand-muted/50" />
                <input
                  required
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-brand-base border-b border-brand-brown/10 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-terracotta transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-luxury text-brand-muted mb-2 font-bold">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-brand-muted/50" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-base border-b border-brand-brown/10 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-terracotta transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-luxury text-brand-muted mb-2 font-bold">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-brand-muted/50" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-brand-base border-b border-brand-brown/10 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-terracotta transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-luxury text-brand-muted mb-2 font-bold">Phone (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-4 h-4 text-brand-muted/50" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-brand-base border-b border-brand-brown/10 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-terracotta transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              className="w-full bg-brand-dark text-white py-4 uppercase text-xs font-bold tracking-luxury hover:bg-brand-terracotta transition-all flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Register Now'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-brand-muted font-light tracking-wide">
          Already have an account? {' '}
          <Link to="/login" className="text-brand-terracotta font-bold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;