import React, { createContext, useEffect, useState } from 'react';
import { restoreSession, logout as authLogout, logoutAll as authLogoutAll } from '../auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
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
    setUserData({});
  };

  const logoutAll = async () => {
    await authLogoutAll();
    setIsAuthenticated(false);
    setUserData({});
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout, logoutAll, userData, setUserData }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
