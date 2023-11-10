// src/components/auth/LoginForm.js
import React, { useState, useContext  } from 'react';
import { jwtDecode } from "jwt-decode";
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await login(email, password);
      if (response && response.token) {
        localStorage.setItem('user', JSON.stringify(response));
        const decoded = jwtDecode(response.token);
        console.log(decoded);
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        if (role === 'Admin') {
          navigate('/admin');
        } else if (role === 'Vendor') {
          navigate('/vendor');
        } else {
          navigate('/client');
        }
      }
    } catch (e) {
      setError('Invalid login credentials');
    }
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto', 
        mt: 8,   
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mb: 2 }} fullWidth>
          Login
        </Button>
      </form>
      <Typography variant="body2">
        Don't have an account?{' '}
        <Button onClick={navigateToSignup} underline="hover">
          Sign up
        </Button>
      </Typography>
    </Box>
  );
};

export default LoginForm;
