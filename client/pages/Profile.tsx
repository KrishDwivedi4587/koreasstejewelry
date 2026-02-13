import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, LogOut, Package, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');
    
    try {
      // Note: Update profile API call not implemented yet
      // For now, just update local state
      setMessage('Profile update feature coming soon.');
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (!user) return null;

  return (
    <div className="bg-brand-base min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            <h1 className="text-2xl font-serif text-brand-dark mb-8 italic">My Account</h1>
            <nav className="flex flex-col gap-1">
              <button className="flex items-center gap-3 px-4 py-3 bg-white text-brand-terracotta text-xs uppercase tracking-luxury font-bold border-l-2 border-brand-terracotta">
                <User className="w-4 h-4" /> Profile Info
              </button>
              <Link to="/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-white text-brand-muted text-xs uppercase tracking-luxury transition-all">
                <Package className="w-4 h-4" /> Order History
              </Link>
              <button onClick={logout} className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-400 text-xs uppercase tracking-luxury transition-all mt-8">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white p-10 shadow-sm border border-brand-peach/50 rounded-sm">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-serif text-brand-dark">Profile Details</h2>
                <button 
                  onClick={() => {
                    setIsEditing(!isEditing);
                    setError('');
                  }}
                  className="text-[10px] uppercase tracking-luxury text-brand-terracotta font-bold hover:underline"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {message && (
                <div className="mb-6 p-4 bg-green-50 text-green-600 text-[10px] uppercase tracking-luxury border border-green-100 font-bold animate-fade-in">
                  {message}
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 text-[10px] uppercase tracking-luxury border border-red-100 font-bold animate-fade-in">
                  {error}
                </div>
              )}

              <form onSubmit={handleUpdate} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-luxury text-brand-muted font-bold">First Name</label>
                    {isEditing ? (
                      <input
                        required
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="bg-brand-base border-b border-brand-brown/10 py-3 px-4 text-sm focus:outline-none focus:border-brand-terracotta transition-colors"
                      />
                    ) : (
                      <div className="flex items-center gap-3 py-3 border-b border-brand-brown/5">
                        <User className="w-4 h-4 text-brand-terracotta/50" />
                        <span className="text-sm text-brand-dark">{user?.firstName}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-luxury text-brand-muted font-bold">Last Name</label>
                    {isEditing ? (
                      <input
                        required
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="bg-brand-base border-b border-brand-brown/10 py-3 px-4 text-sm focus:outline-none focus:border-brand-terracotta transition-colors"
                      />
                    ) : (
                      <div className="flex items-center gap-3 py-3 border-b border-brand-brown/5">
                        <User className="w-4 h-4 text-brand-terracotta/50" />
                        <span className="text-sm text-brand-dark">{user?.lastName}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-luxury text-brand-muted font-bold">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-brand-base border-b border-brand-brown/10 py-3 px-4 text-sm focus:outline-none focus:border-brand-terracotta transition-colors"
                      />
                    ) : (
                      <div className="flex items-center gap-3 py-3 border-b border-brand-brown/5">
                        <Mail className="w-4 h-4 text-brand-terracotta/50" />
                        <span className="text-sm text-brand-dark">{user?.phone || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-luxury text-brand-muted font-bold">Email Address</label>
                    <div className="flex items-center gap-3 py-3 border-b border-brand-brown/5 opacity-60">
                      <Mail className="w-4 h-4 text-brand-terracotta/50" />
                      <span className="text-sm text-brand-dark">{user?.email}</span>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <button 
                    disabled={isLoading}
                    className="bg-brand-dark text-white px-10 py-4 uppercase text-[10px] font-bold tracking-luxury hover:bg-brand-terracotta transition-all shadow-lg active:scale-95 flex items-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                    {isLoading ? 'Processing...' : 'Save Changes'}
                  </button>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;