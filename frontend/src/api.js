// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});

export const login = (username, password) => {
  return api.post('/login', { username, password });
};

export const logout = () => {
  return api.get('/logout');
};