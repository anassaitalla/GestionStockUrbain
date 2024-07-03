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

// export const getProtectedData = () => {
//   return api.get('/api/protected-data');
// };