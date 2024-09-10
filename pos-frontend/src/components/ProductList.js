import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import NewProductModal from './NewProductModal';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8001/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 'bold', color: '#333' }}>
        Inventory List
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon style={{ color: '#666' }} />
            </InputAdornment>
          ),
          style: { height: 45 },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
          },
        }}
      />

      {/* New Product Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={openModal}
        sx={{
          marginTop: '20px',
          marginBottom: '20px',
          backgroundColor: '#3f51b5',
          borderRadius: '8px',
          padding: '10px 20px',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#303f9f',
          },
        }}
      >
        Add New Product
      </Button>

      {/* Product Table */}
      <TableContainer component={Paper} sx={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id} hover sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Component */}
      {modalIsOpen && (
        <NewProductModal isOpen={modalIsOpen} onRequestClose={closeModal} />
      )}
    </div>
  );
}

export default ProductList;
