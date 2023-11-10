import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons';

const InvoiceList = ({ invoices, onMarkPaid }) => {
  const calculateTotal = invoiceItems => invoiceItems.reduce((total, item) => total + item.quantity * item.item.price, 0);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="invoices table">
          <TableHead>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map(invoice => (
              <TableRow key={invoice.invoiceId}>
                <TableCell>{invoice.invoiceId}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>${calculateTotal(invoice.invoiceItems)}</TableCell>
                <TableCell>
                  {invoice.isPaid ? <FontAwesomeIcon icon={faCheckCircle} color="green" /> : <FontAwesomeIcon icon={faClock} color="orange" />}
                </TableCell>
                <TableCell>
                  {!invoice.isPaid && (
                    <Button variant="outlined" color="primary" onClick={() => onMarkPaid(invoice.invoiceId)}>
                      Mark as Paid
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InvoiceList;
