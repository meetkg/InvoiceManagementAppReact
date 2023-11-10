import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, Box, Paper, Typography } from '@mui/material';

const ClientSelector = ({ onSelectClient }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('https://localhost:44335/users/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <Box sx={{ mb: 3 }}>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Select Client
        </Typography>

        <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
          <InputLabel>Select Client</InputLabel>
          <Select
            label="Select Client"
            onChange={e => onSelectClient(e.target.value)}
            defaultValue=""
          >
            <MenuItem value="" disabled>
              Select a client
            </MenuItem>
            {clients.map(client => (
              <MenuItem key={client.id} value={client.id}>
                {client.firstName} {client.lastName} ({client.email})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default ClientSelector;
