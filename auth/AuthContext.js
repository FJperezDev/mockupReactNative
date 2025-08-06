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
    
    await authLogin(email, password);
    setIsAuthenticated(true);
    setLoading(false);
    
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

  const getLoggedUserInfo = async () => {
    if(isAuthenticated){
      try{
        const res = await instance.get("/account/profile");
        setUserData(res.data);
        return res.data;
      }catch(err){
        console.error("Error fetching logged user data: ", err);
        return null;
      }
    }
  }

  const getUsersList = async (isAdminNow = isAdmin) => {

    if(isAdminNow){
      try {
        const res = await instance.get("/users/");
        setUsers(res.data);
        return res.data;
      } catch (err) {
        console.error("Error fetching users list: ", err);
        setUsers([]);
        return null;
      }
    }else{
      setUsers([]);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      // User profile
      const profile = await getLoggedUserInfo();
      const isAdminNow = profile['role'] !== 'user'
      
      setIsAuthenticated(true);
      setIsAdmin(isAdminNow);
      await getUsersList(isAdminNow);
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
    <AuthContext.Provider value={{ login, logout, logoutAll, isAuthenticated, isAdmin, setUserData, userData, onRefresh, refreshing,  getUsersList, users }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
