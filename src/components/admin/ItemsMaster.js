import React, { useState, useEffect } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Set up an axios interceptor to include the token in every request
axios.interceptors.request.use(
  config => {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      const user = JSON.parse(userToken);
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const ItemsMaster = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const result = await axios.get('https://localhost:44335/api/items');
      setItems(result.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleOpen = (item) => {
    setCurrentItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentItem(null);
    setOpen(false);
  };

  const handleCreateOrUpdateItem = async (event) => {
    event.preventDefault();
    const form = event.target;
    const itemData = {
      Name: form.name.value,
      Price: parseFloat(form.price.value),
    };

    try {
      if (currentItem) {
        await axios.put(`https://localhost:44335/api/items/${currentItem.itemId}`, itemData);
      } else {
        await axios.post('https://localhost:44335/api/items', itemData);
      }
      handleClose();
      fetchItems();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`https://localhost:44335/api/items/${itemId}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => handleOpen(null)}>Add Item</Button>
      <TableContainer component={Paper}>
        <Table aria-label="items table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.itemId}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(item)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteItem(item.itemId)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Item Form Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentItem ? 'Edit Item' : 'Add Item'}</DialogTitle>
        <DialogContent>
          <form id="item-form" onSubmit={handleCreateOrUpdateItem}>
            <TextField
              margin="dense"
              id="name"
              label="Item Name"
              fullWidth
              variant="outlined"
              defaultValue={currentItem?.name}
              required
            />
            <TextField
              margin="dense"
              id="price"
              label="Price"
              type="number"
              fullWidth
              variant="outlined"
              defaultValue={currentItem?.price}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="item-form" color="primary">
            {currentItem ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ItemsMaster;
