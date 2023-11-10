// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'https://localhost:44335/auth/';

const signup = async (userData, role) => {
  return axios.post(`${API_URL}register`, {
    Email: userData.email,
    Password: userData.password,
    FirstName: userData.firstName,
    LastName: userData.lastName,
    Role: role
  });
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}login`, {
    Email: email,
    Password: password
  });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const changePassword = async (username, oldPassword, newPassword) => {
  return axios.post(`${API_URL}Auth/change-password`, { username, oldPassword, newPassword });
};

const deleteAccount = async (username, password) => {
  return axios.post(`${API_URL}Auth/delete-account`, { username, password });
};

const AuthService = {
  signup,
  login,
  logout,
  changePassword,
  deleteAccount,
};

export default AuthService;
