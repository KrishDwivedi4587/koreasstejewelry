import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  LayoutDashboard, Package, ShoppingBag, Users, LogOut,
  TrendingUp, AlertCircle, Loader2, Edit2, Trash2, Plus, X, CheckCircle
} from 'lucide-react';

const ADMIN_EMAIL = 'admin@koreasste.com';
const ADMIN_PASSWORD = 'Koreasste@admin060580';

type Tab = 'dashboard' | 'products' | 'orders' | 'users';

const statusColors: Record<string, string> = {
  confirmed: 'bg-blue-50 text-blue-600',
  pending: 'bg-yellow-50 text-yellow-700',
  shipped: 'bg-purple-50 text-purple-600',
  delivered: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-500',
};

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  const [editProduct, setEditProduct] = useState<any>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', image: '', description: '', stock: '' });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === ADMIN_EMAIL && loginPassword === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid admin credentials');
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    const load = async () => {
      setLoading(true);
      try {
        const [s, p, o, u] = await Promise.all([
          api.getAdminStats().catch(() => null),
          api.getProducts().catch(() => []),
          api.getAdminOrders().catch(() => []),
          api.getAdminUsers().catch(() => []),
        ]);
        setStats(s);
        setProducts(p || []);
        setOrders(o || []);
        setUsers(u || []);
      } catch (e) { /* silent */ }
      finally { setLoading(false); }
    };
    load();
  }, [isLoggedIn]);

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      await api.adminDeleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
      showToast('Product deleted');
    } catch (e: any) { showToast(e.message); }
  };

  const handleSaveEdit = async () => {
    if (!editProduct) return;
    try {
      const updated = await api.adminUpdateProduct(editProduct._id, {
        name: editProduct.name,
        price: Number(editProduct.price),
        category: editProduct.category,
        image: editProduct.image,
        description: editProduct.description,
        stock: Number(editProduct.stock),
      });
      setProducts(prev => prev.map(p => p._id === editProduct._id ? (updated || editProduct) : p));
      setEditProduct(null);
      showToast('Product updated');
    } catch (e: any) { showToast(e.message); }
  };

  const handleAddProduct = async () => {
    try {
      const created = await api.adminCreateProduct({
        name: newProduct.name,
        price: Number(newProduct.price),
        category: newProduct.category,
        image: newProduct.image,
        description: newProduct.description,
        stock: Number(newProduct.stock),
      } as any);
      setProducts(prev => [created, ...prev]);
      setShowAddProduct(false);
      setNewProduct({ name: '', price: '', category: '', image: '', description: '', stock: '' });
      showToast('Product added');
    } catch (e: any) { showToast(e.message); }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await api.adminUpdateOrderStatus(orderId, status);
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, orderStatus: status, status } : o));
      showToast('Order status updated');
    } catch (e: any) { showToast(e.message); }
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-serif text-white italic mb-2">Koreasste</h1>
            <p className="text-white/50 text-xs uppercase tracking-luxury">Admin Panel</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-8 backdrop-blur-sm">
            {loginError && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 text-red-300 text-xs rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> {loginError}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-luxury text-white/50 mb-2">Email</label>
                <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required
                  className="w-full bg-white/10 border border-white/20 text-white p-3 rounded text-sm focus:outline-none focus:border-brand-terracotta transition-colors placeholder-white/30"
                  placeholder="admin@koreasste.com" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-luxury text-white/50 mb-2">Password</label>
                <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required
                  className="w-full bg-white/10 border border-white/20 text-white p-3 rounded text-sm focus:outline-none focus:border-brand-terracotta transition-colors placeholder-white/30"
                  placeholder="••••••••••" />
              </div>
              <button type="submit"
                className="w-full bg-brand-terracotta text-white py-3 rounded uppercase text-xs font-bold tracking-luxury hover:bg-brand-terracotta/80 transition-all">
                Sign In to Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className="bg-white p-6 rounded-lg border border-brand-peach/50 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-luxury text-brand-muted font-bold">{label}</p>
          <p className="text-2xl font-bold text-brand-dark">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-base flex">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-[200] bg-brand-dark text-white px-5 py-3 rounded-lg shadow-xl text-sm flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-green-400" /> {toast}
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark flex-shrink-0 flex flex-col min-h-screen">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-serif text-white italic">Koreasste</h1>
          <p className="text-white/40 text-[10px] uppercase tracking-luxury mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {([
            { tab: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { tab: 'products', label: 'Products', icon: Package },
            { tab: 'orders', label: 'Orders', icon: ShoppingBag },
            { tab: 'users', label: 'Users', icon: Users },
          ] as const).map(({ tab, label, icon: Icon }) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs uppercase tracking-luxury transition-all ${activeTab === tab ? 'bg-brand-terracotta text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg text-xs uppercase tracking-luxury transition-all">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-brand-terracotta animate-spin" />
            </div>
          )}

          {/* DASHBOARD */}
          {activeTab === 'dashboard' && !loading && (
            <div className="space-y-8">
              <h2 className="text-2xl font-serif text-brand-dark">Dashboard Overview</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Package} label="Total Products" value={stats?.totalProducts ?? products.length} color="bg-brand-peach text-brand-terracotta" />
                <StatCard icon={Users} label="Total Users" value={stats?.totalUsers ?? users.length} color="bg-blue-50 text-blue-500" />
                <StatCard icon={ShoppingBag} label="Total Orders" value={stats?.totalOrders ?? orders.length} color="bg-purple-50 text-purple-500" />
                <StatCard icon={TrendingUp} label="Revenue (₹)" value={`₹${(stats?.totalRevenue ?? 0).toLocaleString('en-IN')}`} color="bg-green-50 text-green-600" />
              </div>

              {stats?.ordersByStatus && (
                <div className="bg-white p-6 rounded-lg border border-brand-peach/50 shadow-sm">
                  <h3 className="text-sm font-bold text-brand-dark mb-4">Orders by Status</h3>
                  <div className="flex gap-3 flex-wrap">
                    {Object.entries(stats.ordersByStatus).map(([s, c]: any) => (
                      <div key={s} className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${statusColors[s] || 'bg-gray-50 text-gray-600'}`}>
                        {s}: {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {orders.length > 0 && (
                <div className="bg-white rounded-lg border border-brand-peach/50 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-brand-peach/50">
                    <h3 className="text-sm font-bold text-brand-dark">Recent Orders</h3>
                  </div>
                  <div className="divide-y divide-brand-peach/30">
                    {orders.slice(0, 5).map(order => (
                      <div key={order._id} className="p-4 flex justify-between items-center">
                        <div>
                          <p className="text-xs font-mono text-brand-dark">{order._id}</p>
                          <p className="text-[10px] text-brand-muted">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${statusColors[order.orderStatus || order.status] || 'bg-gray-50'}`}>
                            {order.orderStatus || order.status}
                          </span>
                          <span className="text-sm font-bold text-brand-dark">₹{order.totalAmount?.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PRODUCTS */}
          {activeTab === 'products' && !loading && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif text-brand-dark">Products ({products.length})</h2>
                <button onClick={() => setShowAddProduct(true)}
                  className="flex items-center gap-2 bg-brand-dark text-white px-5 py-2.5 rounded text-xs uppercase tracking-luxury hover:bg-brand-terracotta transition-all">
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>

              {showAddProduct && (
                <div className="bg-white border border-brand-peach/50 rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-brand-dark">Add New Product</h3>
                    <button onClick={() => setShowAddProduct(false)}><X className="w-5 h-5 text-brand-muted" /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[['name', 'Product Name'], ['price', 'Price (₹)'], ['category', 'Category'], ['stock', 'Stock'], ['image', 'Image URL']].map(([k, lbl]) => (
                      <div key={k} className={k === 'image' ? 'col-span-2' : ''}>
                        <label className="block text-[10px] uppercase tracking-luxury text-brand-muted mb-1">{lbl}</label>
                        <input value={(newProduct as any)[k]} onChange={e => setNewProduct(p => ({ ...p, [k]: e.target.value }))}
                          className="w-full border border-brand-brown/20 p-2 text-sm focus:outline-none focus:border-brand-terracotta rounded" />
                      </div>
                    ))}
                    <div className="col-span-2">
                      <label className="block text-[10px] uppercase tracking-luxury text-brand-muted mb-1">Description</label>
                      <textarea value={newProduct.description} onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))} rows={3}
                        className="w-full border border-brand-brown/20 p-2 text-sm focus:outline-none focus:border-brand-terracotta rounded resize-none" />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={handleAddProduct} className="bg-brand-dark text-white px-5 py-2 text-xs uppercase tracking-luxury rounded hover:bg-brand-terracotta transition-all">Save Product</button>
                    <button onClick={() => setShowAddProduct(false)} className="border border-brand-brown/20 px-5 py-2 text-xs uppercase tracking-luxury rounded hover:bg-brand-base transition-all">Cancel</button>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-lg border border-brand-peach/50 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-brand-base">
                    <tr className="text-left text-[10px] uppercase tracking-luxury text-brand-muted">
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Stock</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-peach/30">
                    {products.map(p => (
                      <tr key={p._id} className="hover:bg-brand-base/50 transition-colors">
                        {editProduct?._id === p._id ? (
                          <>
                            <td className="px-4 py-3"><input value={editProduct.name} onChange={e => setEditProduct((ep: any) => ({ ...ep, name: e.target.value }))} className="border border-brand-brown/20 px-2 py-1 text-sm rounded w-full" /></td>
                            <td className="px-4 py-3"><input value={editProduct.category} onChange={e => setEditProduct((ep: any) => ({ ...ep, category: e.target.value }))} className="border border-brand-brown/20 px-2 py-1 text-sm rounded w-24" /></td>
                            <td className="px-4 py-3"><input type="number" value={editProduct.price} onChange={e => setEditProduct((ep: any) => ({ ...ep, price: e.target.value }))} className="border border-brand-brown/20 px-2 py-1 text-sm rounded w-24" /></td>
                            <td className="px-4 py-3"><input type="number" value={editProduct.stock} onChange={e => setEditProduct((ep: any) => ({ ...ep, stock: e.target.value }))} className="border border-brand-brown/20 px-2 py-1 text-sm rounded w-16" /></td>
                            <td className="px-4 py-3 flex gap-2">
                              <button onClick={handleSaveEdit} className="bg-brand-dark text-white px-3 py-1 text-xs rounded hover:bg-brand-terracotta transition-all">Save</button>
                              <button onClick={() => setEditProduct(null)} className="border border-brand-brown/20 px-3 py-1 text-xs rounded hover:bg-brand-base transition-all">Cancel</button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded border border-brand-peach" onError={e => (e.currentTarget.style.display = 'none')} />
                                <span className="font-medium text-brand-dark text-xs">{p.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-brand-muted text-xs">{p.category}</td>
                            <td className="px-4 py-3 font-bold text-brand-dark text-xs">₹{p.price?.toLocaleString('en-IN')}</td>
                            <td className="px-4 py-3 text-brand-muted text-xs">{p.stock ?? '—'}</td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <button onClick={() => setEditProduct({ ...p })} className="p-1.5 text-brand-muted hover:text-brand-terracotta transition-colors"><Edit2 className="w-4 h-4" /></button>
                                <button onClick={() => handleDeleteProduct(p._id)} className="p-1.5 text-brand-muted hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ORDERS */}
          {activeTab === 'orders' && !loading && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-brand-dark">Orders ({orders.length})</h2>
              <div className="bg-white rounded-lg border border-brand-peach/50 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-brand-base">
                    <tr className="text-left text-[10px] uppercase tracking-luxury text-brand-muted">
                      <th className="px-4 py-3">Order ID</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Items</th>
                      <th className="px-4 py-3">Total</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-peach/30">
                    {orders.map(o => (
                      <tr key={o._id} className="hover:bg-brand-base/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-brand-dark">{o._id.slice(-12)}</td>
                        <td className="px-4 py-3 text-xs text-brand-muted">{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                        <td className="px-4 py-3 text-xs text-brand-muted">{o.items?.length ?? 0} item(s)</td>
                        <td className="px-4 py-3 font-bold text-xs text-brand-dark">₹{o.totalAmount?.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${statusColors[o.orderStatus || o.status] || 'bg-gray-50'}`}>
                            {o.orderStatus || o.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <select value={o.orderStatus || o.status || 'confirmed'} onChange={e => handleUpdateOrderStatus(o._id, e.target.value)}
                            className="border border-brand-brown/20 text-xs p-1 rounded focus:outline-none focus:border-brand-terracotta bg-white">
                            {['pending','confirmed','shipped','delivered','cancelled'].map(s => (
                              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {orders.length === 0 && <p className="text-center text-brand-muted py-12 text-sm italic">No orders yet.</p>}
              </div>
            </div>
          )}

          {/* USERS */}
          {activeTab === 'users' && !loading && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-brand-dark">Registered Users ({users.length})</h2>
              <div className="bg-white rounded-lg border border-brand-peach/50 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-brand-base">
                    <tr className="text-left text-[10px] uppercase tracking-luxury text-brand-muted">
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Phone</th>
                      <th className="px-4 py-3">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-peach/30">
                    {users.map((u: any) => (
                      <tr key={u._id} className="hover:bg-brand-base/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-brand-dark text-xs">{u.firstName} {u.lastName}</td>
                        <td className="px-4 py-3 text-brand-muted text-xs">{u.email}</td>
                        <td className="px-4 py-3 text-brand-muted text-xs">{u.phone || '—'}</td>
                        <td className="px-4 py-3 text-brand-muted text-xs">{u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {users.length === 0 && <p className="text-center text-brand-muted py-12 text-sm italic">No registered users yet.</p>}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
