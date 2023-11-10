import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import InvoiceList from './InvoiceList';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Container, Select, MenuItem } from '@mui/material';

const ClientPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [allInvoices, setAllInvoices] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'paid', 'unpaid'
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const applyFilterAndSort = useCallback(() => {
    let filteredInvoices = [...allInvoices];

    if (filter === 'paid') {
      filteredInvoices = filteredInvoices.filter(invoice => invoice.isPaid);
    } else if (filter === 'unpaid') {
      filteredInvoices = filteredInvoices.filter(invoice => !invoice.isPaid);
    }

    // Sort by due date, with unpaid invoices at the top
    filteredInvoices.sort((a, b) => {
      if (a.isPaid === b.isPaid) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return a.isPaid ? 1 : -1;
    });

    setInvoices(filteredInvoices);
  }, [allInvoices, filter]);

  useEffect(() => {
    applyFilterAndSort();
  }, [applyFilterAndSort]);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('https://localhost:44335/api/invoices/client');
      setAllInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="lg">
      <Box my={4} textAlign="center">
        <Typography variant="h2" gutterBottom>
          Client Dashboard
        </Typography>
        <Button onClick={handleLogout} variant="contained" color="secondary">
          Logout
        </Button>
      </Box>

      <Box mb={3}>
        <Select
          value={filter}
          onChange={handleChangeFilter}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          variant="outlined"
        >
          <MenuItem value="all">All Invoices</MenuItem>
          <MenuItem value="paid">Paid Invoices</MenuItem>
          <MenuItem value="unpaid">Unpaid Invoices</MenuItem>
        </Select>
      </Box>

      <InvoiceList invoices={invoices} />
    </Container>
  );
};

export default ClientPage;