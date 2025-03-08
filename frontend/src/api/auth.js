import api from './api';

// Login
export const login = async (credentials) => {
  const response = await api.post('/users/login/', credentials); // Django endpoint for login
  return response.data;
};

// Register
export const register = async (userData) => {
  const response = await api.post('/users/register/', userData); // Django endpoint for registration
  return response.data;
};

// Logout
export const logout = async () => {
  const response = await api.post('/auth/logout/'); // Django endpoint for logout
  return response.data;
};

