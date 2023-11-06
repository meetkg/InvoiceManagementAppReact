// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {jwtDecode} from 'jwt-decode'; // Corrected import for jwt-decode
import API from '../api/axios';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      API.post('/Auth/token', values)
        .then((response) => {
          const { token } = response.data;
          localStorage.setItem('token', token);
          console.log('Token stored:', token);

          const decodedToken = jwtDecode(token);
          console.log('Decoded token:', decodedToken);

          // Correctly extract the role from the decoded token
          const roleClaimUrl = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
          const userRole = decodedToken[roleClaimUrl];

          // Redirect based on role
          switch (userRole) {
            case 'Admin':
              navigate('/admin');
              break;
            case 'Vendor':
              navigate('/vendor');
              break;
            case 'Client':
              navigate('/client');
              break;
            default:
              setError(`Unknown role: ${userRole}`);
          }
        })
        .catch((error) => {
          setError(error.response?.data?.message || 'An error occurred during login');
          console.error('Login error:', error.response || error.message);
        });
    },
  });

  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={formik.handleSubmit}>
        <input
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div> : null}
        <input
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
