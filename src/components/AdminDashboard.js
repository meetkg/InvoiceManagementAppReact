// In src/components/AdminDashboard.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Function to fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await API.get('/users');
      setUsers(response.data);
    } catch (error) {
      // Handle error: if unauthorized, redirect to login
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
      console.error('Failed to fetch users', error);
    }
  };

  // Effect to fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to add a new role - Placeholder for your implementation
  const addNewRole = (roleName) => {
    // Implement role addition logic here
  };

  // Function to create a new user - Placeholder for your implementation
  const createNewUser = (userData) => {
    // Implement user creation logic here
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Manage Users</h2>
      {users.map(user => (
        <div key={user.id}>
          {user.username} - {user.role}
          {/* Add more user details and management features here */}
        </div>
      ))}
      {/* Add forms or UI components to add roles and create new users */}
    </div>
  );
};

export default AdminDashboard;
