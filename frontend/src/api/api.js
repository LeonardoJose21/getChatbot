import axios from 'axios';

// Base Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Django backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to add token to request headers if authenticated
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); // Store your token in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
