import * as Keychain from 'react-native-keychain';
import { setAccessToken } from './utils/memory';
import instance from './api';

export const login = async (email, password) => {
    
  console.error('Login :', email, password);
  const res = await instance.post('/token/', {email, password});
  console.log('Login response:', res.data);
  const { refresh, access } = res.data;

  setAccessToken(access);
  await Keychain.setGenericPassword('refresh', refresh);
};

export const logout = async () => {
  await Keychain.resetGenericPassword();
  setAccessToken(null);
};

export const refreshAccessToken = async () => {
  const credentials = await Keychain.getGenericPassword();
  if (!credentials) throw new Error('No refresh token');

  const res = await axios.post('/token/refresh/', {
    refresh: credentials.password,
  });

  const newAccess = res.data.access;
  setAccessToken(newAccess);
  return newAccess;
};
