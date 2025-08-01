import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { getAccessToken, setAccessToken } from './utils/memory';

const instance = axios.create({
  baseURL: 'https://backend-7yb8.onrender.com/',
});

// Authorization interceptor
instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: 401 code errors refreshing token
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If it is 401 and we didn't try refreshing yet
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/token/refresh/') &&
      !originalRequest.url.includes('/token/')
    ) {
      try {
        originalRequest._retry = true;
        const refreshRaw = await SecureStore.getItemAsync('refresh');
        const refresh = JSON.parse(refreshRaw);
        // Get new access token
        const res = await instance.post('/token/refresh/', { refresh });
        const newAccess = res.data.access;

        // Save token in fast short term memory
        setAccessToken(newAccess);

        // Update header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // Automatic logout if refreshing fails
        await SecureStore.deleteItemAsync('refresh');
        setAccessToken(null);
        return Promise.reject(refreshError);
      }
    }

    // Other error type
    return Promise.reject(error);
  }
);

export default instance;
