import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('lifelink_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await api.login(email, password);
      if (data.token) {
        localStorage.setItem('lifelink_token', data.token);
        localStorage.setItem('lifelink_user', JSON.stringify(data));
        setUser(data);
      }
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const data = await api.register(userData);
      if (data.token) {
        localStorage.setItem('lifelink_token', data.token);
        localStorage.setItem('lifelink_user', JSON.stringify(data));
        setUser(data);
      }
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('lifelink_token');
    localStorage.removeItem('lifelink_user');
    setUser(null);
  };

  // Quick Demo Login switches for easy evaluation
  const loginAsDemo = async (role) => {
    if (role === 'admin') {
      await login('admin@lifelink.org', 'password123');
    } else if (role === 'requester') {
      await login('requester@lifelink.org', 'password123');
    } else {
      await login('sarah.j@example.com', 'password123');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loginAsDemo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
