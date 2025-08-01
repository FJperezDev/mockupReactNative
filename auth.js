import * as SecureStore from 'expo-secure-store';
import instance from './api';
import { getAccessToken, setAccessToken } from './utils/memory';

export const login = async (email, password) => {

  try {
    const res = await instance.post('/token/', { email, password });
    const { access, refresh } = res.data;

    if(!access || !refresh) throw new Error('Tokens not arrived')

    setAccessToken(access);
    await SecureStore.setItemAsync('refresh', JSON.stringify(refresh));
    console.log('Login succesful');
  } catch (error) {
    console.warn('Login error:', error.response?.data || error.message);
    throw error;
  }
};

export const logout = async (setUserData) => {

  console.log('Logout succesful');
  if(setUserData) setUserData({})
  await SecureStore.deleteItemAsync('refresh');
  setAccessToken(null);
};

export const register = async (data) => {
  try {
    const res = await instance.post('/register/', data);
    return res.data;
  } catch (err) {
    console.warn('Register error:', err.response?.data || err.message);
    throw err;
  }
};

export const refreshAccessToken = async () => {
  try {
    const refreshRaw = await SecureStore.getItemAsync('refresh');
    if (!refreshRaw) throw new Error('No refresh token saved');

    const refresh = JSON.parse(refreshRaw);

    const res = await instance.post('/token/refresh/', { refresh });
    const newAccess = res.data.access;

    if (!newAccess) throw new Error('Access token not received');

    setAccessToken(newAccess);
    return newAccess;
  } catch (err) {
    console.warn('Refreshing access token error:', err.response?.data || err.message);
    throw err;
  }
};

export const restoreSession = async () => {
  try {
    await refreshAccessToken(); // si falla, se atrapará
    return true;
  } catch (err) {
    console.warn("Couldn't restore session");
    return false;
  }
};