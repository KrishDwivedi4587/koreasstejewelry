
import React, { createContext, useContext, useState, ReactNode } from 'react';
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

  const login = async (email: string, password: string) => {
    const data = await api.login(email, password);
    setUser(data);
  };

  const signup = async (firstName: string, lastName: string, email: string, password: string, phone?: string) => {
    const data = await api.register(firstName, lastName, email, password, phone);
    setUser(data);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const updateProfile = async (firstName?: string, lastName?: string, phone?: string, address?: any) => {
    if (!user || !user._id) return;
    const updated = await api.updateMe(user._id, { firstName, lastName, phone, address });
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
