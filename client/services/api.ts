import { User, Product, Order, CartItem } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  setAuthToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearAuthToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  private getHeaders(includeAuth = true) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }
    return response.json();
  }

  // --- USERS API ---

  async register(firstName: string, lastName: string, email: string, password: string, phone?: string) {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: this.getHeaders(false),
      body: JSON.stringify({ firstName, lastName, email, password, phone })
    });
    const data = await this.handleResponse<any>(response);
    if (data.data?.token) {
      this.setAuthToken(data.data.token);
    }
    return data.data;
  }

  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: this.getHeaders(false),
      body: JSON.stringify({ email, password })
    });
    const data = await this.handleResponse<any>(response);
    if (data.data?.token) {
      this.setAuthToken(data.data.token);
    }
    return data.data;
  }

  async getMe(userId: string) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: this.getHeaders()
    });
    return this.handleResponse<any>(response);
  }

  async updateMe(userId: string, updates: { firstName?: string; lastName?: string; phone?: string; address?: any }) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(updates)
    });
    return this.handleResponse<any>(response);
  }

  // --- PRODUCTS API ---

  async getProducts(category?: string): Promise<Product[]> {
    let url = `${API_BASE_URL}/products`;
    if (category && category !== 'All') {
      url += `?category=${encodeURIComponent(category)}`;
    }
    const response = await fetch(url);
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  async getProduct(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(query)}`);
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  // --- ORDERS API ---

  async createOrder(userId: string, shippingAddress: any, paymentMethod: string, items: CartItem[], totals?: any) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        userId,
        shippingAddress,
        paymentMethod,
        items,
        totals
      })
    });
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  async getMyOrders(userId: string): Promise<Order[]> {
    const response = await fetch(`${API_BASE_URL}/orders?userId=${userId}`, {
      headers: this.getHeaders()
    });
    const data = await this.handleResponse<any>(response);
    return data.data ?? [];
  }

  async getOrderById(orderId: string): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      headers: this.getHeaders()
    });
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  async updateOrderStatus(orderId: string, status: string) {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ status })
    });
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  async cancelOrder(orderId: string) {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
      method: 'PUT',
      headers: this.getHeaders()
    });
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  // --- PAYMENTS API ---

  async createPaymentIntent(items: CartItem[], shippingMethod: string) {
    const response = await fetch(`${API_BASE_URL}/payments/create-intent`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ items, shippingMethod })
    });
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  async verifyPayment(paymentData: any) {
    const response = await fetch(`${API_BASE_URL}/payments/verify`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(paymentData)
    });
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  // --- ADMIN API ---

  async getAdminStats() {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: this.getHeaders()
    });
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  async getAdminUsers() {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: this.getHeaders()
    });
    const data = await this.handleResponse<any>(response);
    return data.data ?? [];
  }

  async getAdminOrders() {
    const response = await fetch(`${API_BASE_URL}/admin/orders`, {
      headers: this.getHeaders()
    });
    const data = await this.handleResponse<any>(response);
    return data.data ?? [];
  }

  async adminUpdateProduct(id: string, updates: Partial<Product>) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(updates)
    });
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  async adminDeleteProduct(id: string) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  async adminCreateProduct(product: Omit<Product, '_id'>) {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(product)
    });
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  async adminUpdateOrderStatus(orderId: string, status: string) {
    const response = await fetch(`${API_BASE_URL}/admin/orders/${orderId}/status`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ status })
    });
    const data = await this.handleResponse<any>(response);
    return data.data;
  }
}

export const api = new ApiService();