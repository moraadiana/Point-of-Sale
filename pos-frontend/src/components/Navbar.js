import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left-aligned title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          POS System
        </Typography>

        {/* Navigation links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/products">
            Products
          </Button>
          <Button color="inherit" component={Link} to="/sales">
            Sales
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
