import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, LogOut, Package, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();

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
      await updateProfile(firstName, lastName, phone);
      setMessage('Profile updated successfully.');
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setIsLoading(false);
      setTimeout(() => { setMessage(''); setError(''); }, 4000);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
    setPhone(user?.phone || '');
    setError('');
  };

  if (!user) return null;

  const inputClass = "bg-brand-base border-b border-brand-brown/10 py-3 px-4 text-sm focus:outline-none focus:border-brand-terracotta transition-colors w-full";

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
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-[10px] uppercase tracking-luxury text-brand-terracotta font-bold hover:underline"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    onClick={handleCancel}
                    className="text-[10px] uppercase tracking-luxury text-brand-muted font-bold hover:underline"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {message && (
                <div className="mb-6 p-4 bg-green-50 text-green-600 text-[10px] uppercase tracking-luxury border border-green-100 font-bold flex items-center gap-2 animate-fade-in">
                  <CheckCircle className="w-4 h-4" /> {message}
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 text-[10px] uppercase tracking-luxury border border-red-100 font-bold flex items-center gap-2 animate-fade-in">
                  <AlertCircle className="w-4 h-4" /> {error}
                </div>
              )}

              <form onSubmit={handleUpdate} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                  {/* First Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-luxury text-brand-muted font-bold">First Name</label>
                    {isEditing ? (
                      <input required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} />
                    ) : (
                      <div className="flex items-center gap-3 py-3 border-b border-brand-brown/5">
                        <User className="w-4 h-4 text-brand-terracotta/50" />
                        <span className="text-sm text-brand-dark">{user.firstName}</span>
                      </div>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-luxury text-brand-muted font-bold">Last Name</label>
                    {isEditing ? (
                      <input required type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} />
                    ) : (
                      <div className="flex items-center gap-3 py-3 border-b border-brand-brown/5">
                        <User className="w-4 h-4 text-brand-terracotta/50" />
                        <span className="text-sm text-brand-dark">{user.lastName}</span>
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-luxury text-brand-muted font-bold">Phone Number</label>
                    {isEditing ? (
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="+91 XXXXXXXXXX" />
                    ) : (
                      <div className="flex items-center gap-3 py-3 border-b border-brand-brown/5">
                        <Phone className="w-4 h-4 text-brand-terracotta/50" />
                        <span className="text-sm text-brand-dark">{user.phone || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  {/* Email (read-only) */}
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-luxury text-brand-muted font-bold">Email Address</label>
                    <div className="flex items-center gap-3 py-3 border-b border-brand-brown/5 opacity-60">
                      <Mail className="w-4 h-4 text-brand-terracotta/50" />
                      <span className="text-sm text-brand-dark">{user.email}</span>
                      <span className="text-[9px] bg-brand-peach text-brand-muted px-2 py-0.5 uppercase tracking-wide">Cannot change</span>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-brand-dark text-white px-10 py-4 uppercase text-[10px] font-bold tracking-luxury hover:bg-brand-terracotta transition-all shadow-lg active:scale-95 flex items-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? <><Loader2 className="w-3 h-3 animate-spin" /> Saving...</> : 'Save Changes'}
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