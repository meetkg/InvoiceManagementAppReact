import React from 'react';
import { List, ListItem, ListItemText, Button, Typography, Box, Paper, Divider } from '@mui/material';

const ItemList = ({ items, onAddItem }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Available Items
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {items.length === 0 ? (
          <Typography variant="subtitle1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            No items available
          </Typography>
        ) : (
          <List>
            {items.map(item => (
              <ListItem 
                key={item.itemId}
                secondaryAction={
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => onAddItem(item)}
                  >
                    Add
                  </Button>
                }
              >
                <ListItemText primary={`${item.name} - $${item.price.toFixed(2)}`} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default ItemList;
