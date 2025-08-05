import axios from 'axios';
import { getAccessToken, setAccessToken, getRefreshToken, setRefreshToken } from './utils/memory';
import { logout } from './auth';

const instance = axios.create({
  baseURL: 'https://backend-7yb8.onrender.com/',
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Authorization interceptor
instance.interceptors.request.use(
  async config => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor: 401 code errors refreshing token
instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // If it is 401 and we didn't try refreshing yet
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/token/refresh/') &&
      !originalRequest.url.includes('/token/')
    ) {

      originalRequest._retry = true;
      isRefreshing = true;

      if (isRefreshing) {
        // Requests queue while access token is being updated
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      try {
        
        const refresh = await getRefreshToken();
        // Get new access token
        const res = await instance.post('/token/refresh/', { refresh });
        const newAccess = res.data.access;
        if (res.data.refresh) {
          await setRefreshToken(res.data.refresh); 
        }

        // Save token in fast short term memory
        setAccessToken(newAccess);

        // Update header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        processQueue(null, newAccess);
        return instance(originalRequest);
      } catch (refreshError) {
        processQueue(err, null);
        // Automatic logout if refreshing fails
        logout();
        Alert.alert("Expired Session", "Try login again.");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Other error type
    return Promise.reject(error);
  }
);

export default instance;
