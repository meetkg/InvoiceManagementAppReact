// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    setCurrentUser(user);
  }
  setIsLoading(false);
  console.log('Current user set in context:', user); // Debugging line
}, []);


  const login = async (email, password) => {
    const response = await AuthService.login(email, password);
    setCurrentUser(response);
    return response;
  };

  const signup = async (userData, role) => {
    const response = await AuthService.signup(userData, role);
    return response;
  };

  const logout = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  const contextValue = {
    currentUser,
    isLoading,
    login,
    logout,
    signup,
    // Include any other context functions here
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!isLoading ? children : "Loading..."}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
