import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://backend-7yb8.onrender.com/',
  timeout: 10000,
  // baseURL: 'http://localhost:8081/',
});