import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, ChevronRight, ShoppingBag, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Order } from '../types';
import { api } from '../services/api';

const OrderHistory: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const userOrders = await api.getMyOrders(user._id);
          setOrders(userOrders);
        } catch (err) {
          console.error("Failed to load orders", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-brand-base min-h-screen pt-32 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-terracotta animate-spin mb-4" />
        <p className="text-brand-muted font-serif italic">Retrieving your collection history...</p>
      </div>
    );
  }

  return (
    <div className="bg-brand-base min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            <h1 className="text-2xl font-serif text-brand-dark mb-8 italic">My Account</h1>
            <nav className="flex flex-col gap-1">
              <Link to="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-white text-brand-muted text-xs uppercase tracking-luxury transition-all">
                Profile Info
              </Link>
              <button className="flex items-center gap-3 px-4 py-3 bg-white text-brand-terracotta text-xs uppercase tracking-luxury font-bold border-l-2 border-brand-terracotta">
                <Package className="w-4 h-4" /> Order History
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="bg-white p-20 text-center border border-brand-peach/50 rounded-sm shadow-sm">
                  <ShoppingBag className="w-12 h-12 text-brand-peach mx-auto mb-6" strokeWidth={1} />
                  <p className="text-brand-muted italic font-serif text-lg mb-8">You haven't placed any orders yet.</p>
                  <Link to="/products" className="bg-brand-dark text-white px-10 py-4 uppercase text-[10px] font-bold tracking-luxury hover:bg-brand-terracotta transition-all inline-block">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-white p-8 border border-brand-peach/50 shadow-sm hover:shadow-md transition-all rounded-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-brand-peach pb-6">
                      <div>
                        <p className="text-[10px] uppercase tracking-luxury text-brand-muted mb-1 font-bold">Order #{order._id}</p>
                        <p className="text-sm font-serif text-brand-dark italic">{new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-luxury text-brand-muted mb-1 font-bold">Status</p>
                          <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-brand-peach/20 text-brand-terracotta'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-luxury text-brand-muted mb-1 font-bold">Total</p>
                          <p className="text-sm font-bold text-brand-dark">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover border border-brand-peach" />
                          <div className="flex-1">
                            <h4 className="text-xs font-serif text-brand-dark">{item.name}</h4>
                            <p className="text-[10px] text-brand-muted uppercase">Qty: {item.quantity}</p>
                          </div>
                          <span className="text-xs font-medium text-brand-muted">₹{item.price.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-brand-peach flex justify-end">
                      <Link to={`/product/${order.items[0].id}`} className="text-[10px] uppercase tracking-luxury text-brand-terracotta font-bold flex items-center gap-2 hover:underline">
                        Order Details <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderHistory;