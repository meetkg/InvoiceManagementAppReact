import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Box, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InvoiceList = ({ invoices }) => {
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.quantity * item.itemDetails.price, 0);
  };

  const generatePDF = (invoice) => {
    const doc = new jsPDF();
    const tableColumn = ["Item", "Quantity", "Price"];
    const tableRows = [];

    invoice.invoiceItems.forEach(item => {
      const itemData = [
        item.itemDetails.name,
        item.quantity,
        `$${item.itemDetails.price.toFixed(2)}`
      ];
      tableRows.push(itemData);
    });

    // Add Invoice and Vendor Details
    doc.setFontSize(16);
    doc.text(`Invoice #${invoice.invoiceId}`, 14, 15);
    doc.setFontSize(12);
    doc.text(`Vendor: ${invoice.vendorDetails.firstName} ${invoice.vendorDetails.lastName}`, 14, 25);
    doc.text(`Email: ${invoice.vendorDetails.email}`, 14, 30);
    doc.setFontSize(10);
    doc.text(`Date: ${invoice.date}`, 14, 40);
    doc.text(`Due Date: ${invoice.dueDate}`, 14, 45);
    doc.text(`Total: $${calculateTotal(invoice.invoiceItems).toFixed(2)}`, 14, 50);

    // Generate Table
    doc.autoTable(tableColumn, tableRows, { startY: 55 });
    doc.save(`invoice-${invoice.invoiceId}.pdf`);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Invoices
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="invoices table">
          <TableHead>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoiceId}>
                <TableCell>{invoice.invoiceId}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>
                  {invoice.isPaid ? <FontAwesomeIcon icon={faCheckCircle} color="green" /> : <FontAwesomeIcon icon={faTimesCircle} color="red" />}
                </TableCell>
                <TableCell>{invoice.vendorDetails.firstName} {invoice.vendorDetails.lastName} ({invoice.vendorDetails.email})</TableCell>
                <TableCell>${calculateTotal(invoice.invoiceItems).toFixed(2)}</TableCell>
                <TableCell>
                  {invoice.invoiceItems.map(item => (
                    <div key={item.invoiceItemId}>
                      {item.itemDetails.name} - Quantity: {item.quantity} - Price: ${item.itemDetails.price.toFixed(2)}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <Button onClick={() => generatePDF(invoice)}>
                    <FontAwesomeIcon icon={faFilePdf} />
                  </Button>
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
