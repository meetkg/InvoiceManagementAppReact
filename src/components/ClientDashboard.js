// In src/components/ClientDashboard.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const ClientDashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  // Function to fetch invoices for the client
  const fetchInvoices = async () => {
    try {
      const response = await API.get('/invoices/client');
      setInvoices(response.data);
    } catch (error) {
      // Handle error: if unauthorized, redirect to login
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
      console.error('Failed to fetch invoices', error);
    }
  };

  // Effect to fetch invoices on component mount
  useEffect(() => {
    fetchInvoices();
  }, []);

  // Function to download an invoice - Placeholder for your implementation
  const downloadInvoice = (invoiceId) => {
    // Implement invoice download logic here
  };

  return (
    <div>
      <h1>Client Dashboard</h1>
      <h2>Your Invoices</h2>
      {invoices.map(invoice => (
        <div key={invoice.id}>
          Invoice #{invoice.id}
          {/* Add more invoice details and a download button */}
        </div>
      ))}
    </div>
  );
};

export default ClientDashboard;
