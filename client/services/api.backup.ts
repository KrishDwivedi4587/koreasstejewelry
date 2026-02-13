import { User, Product, Order, CartItem, PaymentDetails } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  private setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  private clearToken() {
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
    return data.data;
  }

  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: this.getHeaders(false),
      body: JSON.stringify({ email, password })
    });
    const data = await this.handleResponse<any>(response);
    // Store token if needed (backend doesn't send token, but you might add it)
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

  // --- CART API ---

  async getCart(userId: string) {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}`, {
      headers: this.getHeaders()
    });
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  async addToCart(userId: string, productId: string, quantity: number) {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}/add`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ productId, quantity })
    });
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  async updateCartItem(userId: string, productId: string, quantity: number) {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}/item`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ productId, quantity })
    });
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  async removeFromCart(userId: string, productId: string) {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}/remove`, {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify({ productId })
    });
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  async clearCart(userId: string) {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  // --- ORDERS API ---

  async createOrder(userId: string, shippingAddress: any, paymentMethod: string, items: CartItem[]) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        userId,
        shippingAddress,
        paymentMethod,
        items
      })
    });
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  async getMyOrders(userId: string) {
    const response = await fetch(`${API_BASE_URL}/orders?userId=${userId}`, {
      headers: this.getHeaders()
    });
    const data = await this.handleResponse<any>(response);
    return data.data;
  }

  async getOrderById(orderId: string) {
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
}

export const api = new ApiService();
