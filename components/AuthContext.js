import React, { createContext, useEffect, useState } from 'react';
// import * as SecureStore from 'expo-secure-store';
import { restoreSession, logout as authLogout } from '../auth';
// import { setAccessToken } from '../utils/memory';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    const success = await restoreSession();
    setIsAuthenticated(success);
    setLoading(false);
  };

  const logout = async () => {
    await authLogout();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
