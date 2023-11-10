import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const RoleManagement = () => {
    const [roles, setRoles] = useState([]);
    const [open, setOpen] = useState(false);
    const [roleName, setRoleName] = useState('');
    const [editingRole, setEditingRole] = useState(null);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get('https://localhost:44335/roles');
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const handleOpen = (role = null) => {
        setEditingRole(role);
        setRoleName(role ? role.name : '');
        setOpen(true);
    };

    const handleClose = () => {
        setEditingRole(null);
        setRoleName('');
        setOpen(false);
    };

    const handleCreateOrUpdateRole = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const data = JSON.stringify({ name: roleName });

        try {
            if (editingRole) {
                await axios.put(`https://localhost:44335/roles/${editingRole.id}`, data, config);
            } else {
                await axios.post('https://localhost:44335/roles', data, config);
            }
            handleClose();
            fetchRoles();
        } catch (error) {
            console.error('Error saving role:', error);
        }
    };

    const handleDeleteRole = async (id) => {
        try {
            await axios.delete(`https://localhost:44335/roles/${id}`);
            fetchRoles();
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    };

    return (
        <>
            <Button variant="contained" onClick={() => handleOpen()}>Add Role</Button>
            <TableContainer component={Paper}>
                <Table aria-label="roles table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Role Name</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roles.map((role) => (
                            <TableRow key={role.id}>
                                <TableCell>{role.name}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleOpen(role)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteRole(role.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Role Form Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editingRole ? 'Edit Role' : 'Add Role'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Role Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreateOrUpdateRole}>{editingRole ? 'Update' : 'Create'}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default RoleManagement;
