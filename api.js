import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { getAccessToken, setAccessToken } from './utils/memory';

const instance = axios.create({
  baseURL: 'https://backend-7yb8.onrender.com/',
});

// Interceptor para añadir Authorization si hay token
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

// 👉 Interceptor de RESPONSE: manejar errores 401 y refrescar token
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si es 401 y no hemos intentado refrescar ya
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
        // Obtener nuevo access token
        const res = await instance.post('/token/refresh/', { refresh });
        const newAccess = res.data.access;

        // Guardar nuevo token en memoria
        setAccessToken(newAccess);

        // Actualizar header y reintentar petición original
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // Logout automático si falla el refresh
        await SecureStore.deleteItemAsync('refresh');
        setAccessToken(null);
        return Promise.reject(refreshError);
      }
    }

    // Otro tipo de error
    return Promise.reject(error);
  }
);

export default instance;
