// In src/api/axios.js

import axios from 'axios';

const API = axios.create({
  baseURL: 'https://localhost:7273/',
});

API.interceptors.request.use((config) => {
  // Assuming you're storing your token in localStorage
  const token = localStorage.getItem('token');
  if (token) {
    config.headers["Authorization"] = 'Bearer ' + token;
  }
  return config;
}, (error) => {
  console.log('Failed to intercept request', error);
  return Promise.reject(error);
});

export default API;
