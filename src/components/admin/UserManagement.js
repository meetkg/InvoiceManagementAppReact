import React, { useState, useEffect } from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const result = await axios.get('https://localhost:44335/users');
      setUsers(result.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleOpen = (user) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentUser(null);
    setOpen(false);
  };

  const handleCreateOrUpdateUser = async (event) => {
    event.preventDefault();
    const form = event.target;
    const user = {
      Email: form.email.value,
      FirstName: form.firstName.value,
      LastName: form.lastName.value,
      Role: form.role.value,
    };
  
    // Include Password only when creating a new user
    if (!currentUser) {
      user.Password = form.password.value;
    }
  
    try {
      if (currentUser) {
        // When updating, send all fields that are editable
        await axios.put(`https://localhost:44335/users/${currentUser.id}`, user);
      } else {
        // For create, include all necessary fields
        await axios.post('https://localhost:44335/users', user);
      }
      handleClose();
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://localhost:44335/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => handleOpen(null)}>Add User</Button>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.roles.join(', ')}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(user)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

<Dialog open={open} onClose={handleClose}>
  <DialogTitle>{currentUser ? 'Edit User' : 'Add User'}</DialogTitle>
  <DialogContent>
    <form id="user-form" onSubmit={handleCreateOrUpdateUser}>
      <TextField
        margin="dense"
        id="email"
        label="Email Address"
        type="email"
        fullWidth
        variant="outlined"
        defaultValue={currentUser?.email}
        required
      />
      {!currentUser && ( // Conditionally render the password field
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          required
        />
      )}
      <TextField
        margin="dense"
        id="firstName"
        label="First Name"
        fullWidth
        variant="outlined"
        defaultValue={currentUser?.firstName}
        required
      />
      <TextField
        margin="dense"
        id="lastName"
        label="Last Name"
        fullWidth
        variant="outlined"
        defaultValue={currentUser?.lastName}
        required
      />
      <TextField
        margin="dense"
        id="role"
        label="Role"
        fullWidth
        variant="outlined"
        defaultValue={currentUser?.roles[0]} // Assuming the first role is the primary one
        required
      />
    </form>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button type="submit" form="user-form">{currentUser ? 'Update' : 'Create'}</Button>
  </DialogActions>
</Dialog>

{/* ... rest of the component ... */}

    </>
  );
};

export default UserManagement;
