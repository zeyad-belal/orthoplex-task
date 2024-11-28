import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_APP_API;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear auth state
      Cookies.remove('token');
      localStorage.removeItem('user');
      
      // Redirect to login
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Auth endpoints
export const authApi = {
  login: (credentials) => api.post('/users/login', credentials),
  signup: (userData) => api.post('/users/signup', userData),
  logout: () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
  },
};

// User endpoints
export const userApi = {
  getCurrentUser: () => api.get('/users/me'),
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
};

export default api;
