import axios from 'axios';

const eventAxios = axios.create({
  baseURL: 'http://localhost:8000/event', // Adjust to your backend
});

eventAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Or however you store auth token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default eventAxios;