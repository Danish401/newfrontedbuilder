import axios from 'axios';

// Change this URL to point to your backend's route
const API = axios.create({ baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/auth` });

// Add authorization token to requests
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const signUp = (formData) => API.post('/signup', formData);
export const logIn = (formData) => API.post('/login', formData);
export const googleLogin = () => API.get('/auth/google');
