// src/components/admin/AdminPage.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import UserManagement from './UserManagement';
import ItemsMaster from './ItemsMaster';
import RoleManagement from './RoleManagement';
import { Button, Box, Typography, Container, Paper, Divider } from '@mui/material';

const AdminPage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="lg">
      <Box my={4} textAlign="center">
        <Typography variant="h2" gutterBottom>
          Admin Dashboard
        </Typography>

        <Button onClick={handleLogout} variant="contained" color="secondary">
          Logout
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          User Management
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <UserManagement />
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Items Management
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <ItemsMaster />
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Role Management
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <RoleManagement />
      </Paper>
    </Container>
  );
};

export default AdminPage;
