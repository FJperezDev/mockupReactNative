import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://backend-gg6c.onrender.com/',
  timeout: 10000,
  // baseURL: 'http://localhost:8081/',
});