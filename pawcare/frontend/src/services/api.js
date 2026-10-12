import axios from 'axios';

let rawUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api')
  .trim()
  .replace(/^['"]+|['"]+$/g, '')
  .replace(/\/+$/, '');

// Ensure http:// or https:// protocol is present
if (rawUrl && !/^https?:\/\//i.test(rawUrl)) {
  rawUrl = `https://${rawUrl}`;
}

// Ensure /api suffix is present
if (!rawUrl.endsWith('/api')) {
  rawUrl = `${rawUrl}/api`;
}

const API_URL = rawUrl;
console.log('[PawCare API] Base URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pawcare_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('pawcare_token');
      localStorage.removeItem('pawcare_user');
      window.dispatchEvent(new Event('pawcare_auth_unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default api;
