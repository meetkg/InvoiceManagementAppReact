import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Box, Paper, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const SelectedItems = ({ selectedItems, onRemoveItem }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Selected Items
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {selectedItems.length === 0 ? (
          <Typography variant="subtitle1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            No items selected
          </Typography>
        ) : (
          <List>
            {selectedItems.map((item, index) => (
              <ListItem 
                key={index}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => onRemoveItem(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                }
              >
                <ListItemText primary={`${item.name} - Quantity: ${item.quantity}`} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default SelectedItems;
