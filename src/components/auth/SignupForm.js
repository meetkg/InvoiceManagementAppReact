// src/components/auth/SignupForm.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box
} from '@mui/material';

const SignupForm = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'Client',
  });
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(userData, userData.role);
      navigate(`/login`);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };
  const navigateToLogin = () => {
    navigate('/login'); 
  };
  return (
    <Box
    sx={{
      maxWidth: 400,
      mx: 'auto',
      mt: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Typography variant="h4" gutterBottom>
      Sign Up
    </Typography>
    <Box component="form" noValidate sx={{ width: '100%' }} onSubmit={handleSubmit}>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        required
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        required
      />
      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={userData.firstName}
        onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
        required
      />
      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={userData.lastName}
        onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
        required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            value={userData.role}
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
            label="Role"
          >
            <MenuItem value="Client">Client</MenuItem>
            <MenuItem value="Vendor">Vendor</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        </FormControl>
        <Button 
          type="submit" 
          fullWidth 
          variant="contained" 
          sx={{ mt: 3, mb: 2, bgcolor: 'primary.main' }} // Adjust the button color if needed
        >
          Sign Up
        </Button>

        <Typography variant="body2">
        Already have an account?{' '}
        <Button onClick={navigateToLogin} underline="hover">
        Log in
        </Button>
      </Typography>
      </Box>
    </Box>
  );
};

export default SignupForm;
