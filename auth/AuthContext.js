import React, { createContext, useEffect, useState } from 'react';
import { login as authLogin, logout as authLogout, logoutAll as authLogoutAll, instance } from './sessionApi';
import { restoreSession } from './auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState([]);

  const checkSession = async () => {
    const success = await restoreSession();
    setIsAuthenticated(success);
    setLoading(false);
  };

  const login = async (email, password) => {
    const user = await authLogin(email, password);

    setUserData(user);
    setIsAuthenticated(true);
    setLoading(false);
    setIsAdmin(user['role'] !== 'user');
    
  };

  const logout = async () => {
    await authLogout();
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserData({});
  };

  const logoutAll = async () => {
    await authLogoutAll();
    setIsAdmin(false);
    setIsAuthenticated(false);
    setUserData({});
  };

  const tryGetUsersList = async () => {

    if(isAdmin){
      try {
        const res = await instance.get("/users/");
        setUsers(res.data);
      } catch (err) {
        console.warn("Error fetching users:", err);
      }
    }else{
      console.warn("Non authorized user:", err);
      alert("Non Authorized user");
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);

      // User profile
      const profileRes = await instance.get("/account/profile");
      setUserData(profileRes.data);

      if(isAdmin){
        const usersRes = await instance.get("/users/");
        setUsers(usersRes.data);
      }else{
        setUsers([]);
      }

    } catch (err) {
      console.warn("Error refreshing users:", err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, logoutAll, userData, setUserData, isAdmin, onRefresh, refreshing,  tryGetUsersList, users }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
