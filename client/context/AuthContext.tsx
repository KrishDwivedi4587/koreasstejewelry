import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { api } from '../services/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('koreasste_user');
    if (token && savedUser) {
      try {
        const parsed = JSON.parse(savedUser) as User;
        setUser(parsed);
        api.setAuthToken(token);
      } catch {
        localStorage.removeItem('koreasste_user');
        localStorage.removeItem('authToken');
      }
    }
    setIsLoading(false);
  }, []);

  const persistUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('koreasste_user', JSON.stringify(userData));
  };

  const login = async (email: string, password: string) => {
    const data = await api.login(email, password);
    // Strip token from user object before storing
    const { token, ...userWithoutToken } = data as any;
    if (token) {
      api.setAuthToken(token);
    }
    persistUser(userWithoutToken as User);
  };

  const signup = async (firstName: string, lastName: string, email: string, password: string, phone?: string) => {
    const data = await api.register(firstName, lastName, email, password, phone);
    const { token, ...userWithoutToken } = data as any;
    if (token) {
      api.setAuthToken(token);
    }
    persistUser(userWithoutToken as User);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('koreasste_user');
    localStorage.removeItem('koreasste_cart_guest');
    api.clearAuthToken();
  };

  const updateProfile = async (firstName?: string, lastName?: string, phone?: string, address?: User['address']) => {
    if (!user?._id) return;
    const updated = await api.updateMe(user._id, { firstName, lastName, phone, address });
    // The API returns { success, data } — extract user from data if present
    const updatedUser = updated?.data ?? updated;
    persistUser({ ...user, ...updatedUser });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
