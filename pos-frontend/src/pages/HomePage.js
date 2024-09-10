import React from 'react';
import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the POS System
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Sales Summary</Typography>
            {/* Example summary data */}
            <Typography>Total Sales: $5,000</Typography>
            <Typography>Number of Transactions: 150</Typography>
            <Typography>Top Selling Product: Product A</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Inventory Summary</Typography>
            {/* Example inventory data */}
            <Typography>Products in Stock: 500</Typography>
            <Typography>Low Stock Alerts: 5 items</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Quick Actions</Typography>
            <Button component={Link} to="/new-sale" variant="contained" color="primary" fullWidth>
              Create New Sale
            </Button>
            <Button component={Link} to="/products" variant="contained" color="secondary" fullWidth style={{ marginTop: 10 }}>
              Add New Product
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Box mt={3}>
        <Typography variant="h6">Recent Activity</Typography>
        {/* Example recent activity */}
        <Paper style={{ padding: 20, marginTop: 10 }}>
          <Typography variant="h6">Recent Sales</Typography>
          {/* List recent sales */}
          <Typography>Sale #1234 - $50</Typography>
          <Typography>Sale #1235 - $30</Typography>
        </Paper>

        <Paper style={{ padding: 20, marginTop: 10 }}>
          <Typography variant="h6">Recent Products</Typography>
          {/* List recent products */}
          <Typography>Product X added</Typography>
          <Typography>Product Y updated</Typography>
        </Paper>
      </Box>
    </div>
  );
}

export default HomePage;
