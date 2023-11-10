import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ItemList from './ItemList';
import SelectedItems from './SelectedItems';
import ClientSelector from './ClientSelector';
import InvoiceList from './InvoiceList';
import { Box, Button, Container, Paper, Typography, Divider } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const VendorPage = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [invoices, setInvoices] = useState([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    fetchItems();
    fetchInvoices();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://localhost:44335/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('https://localhost:44335/api/invoices/vendor');
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleAddItem = (item) => {
    setSelectedItems(prevItems => {
      // Check if the item is already in the selectedItems
      const existingItemIndex = prevItems.findIndex(i => i.itemId === item.itemId);
  
      if (existingItemIndex > -1) {
        // If the item already exists, update its quantity
        return prevItems.map((i, index) => 
          index === existingItemIndex ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // If the item is new, add it to the list
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };
  

  const handleSelectClient = (clientId) => {
    setSelectedClientId(clientId);
  };

  const handleRemoveItem = (index) => {
    setSelectedItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const handleSubmitInvoice = async () => {
    if (!selectedClientId) {
      alert('Please select a client.');
      return;
    }

    const invoiceData = {
      Date: new Date().toISOString(),
      ClientId: selectedClientId,
      InvoiceItems: selectedItems.map(({ itemId, quantity }) => ({ ItemId: itemId, Quantity: quantity }))
    };

    try {
      await axios.post('https://localhost:44335/api/invoices', invoiceData);
      setSelectedItems([]);
      fetchInvoices(); // Fetch the latest invoices
      alert('Invoice created successfully');
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  const handleMarkInvoicePaid = async (invoiceId) => {
    try {
      await axios.post(`https://localhost:44335/api/invoices/${invoiceId}/markpaid`);
      fetchInvoices(); // Refresh the invoices list
    } catch (error) {
      console.error('Error marking invoice as paid:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4} textAlign="center">
        <Typography variant="h2" gutterBottom>
          Vendor Dashboard
        </Typography>
        <Button onClick={handleLogout} variant="contained" color="secondary">
          Logout
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Create New Invoice
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <ItemList items={items} onAddItem={handleAddItem} />
        <SelectedItems selectedItems={selectedItems} onRemoveItem={handleRemoveItem} />
        <ClientSelector onSelectClient={handleSelectClient} />
        <Box textAlign="center" sx={{ mt: 2, mb: 3 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmitInvoice}
            sx={{ width: 'auto', px: 3 }}
          >
            Submit Invoice
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Your Invoices
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <InvoiceList invoices={invoices} onMarkPaid={handleMarkInvoicePaid} />
      </Paper>
    </Container>
  );
};

export default VendorPage;
