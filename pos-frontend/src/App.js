import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import SalePage from './pages/SalePage';
import Navbar from './components/Navbar';
import SaleItemForm from './components/SaleItemForm';
import ReceiptPage from './pages/ReceiptPage';
import PaymentSummary from './components/PaymentSummary';
import NewProductModal from './components/NewProductModal';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/sales" element={<SalePage />} />
        <Route path="/payment-summary" element={<PaymentSummary />} />
        <Route  path="/new-sale" element={<SaleItemForm />} />
        <Route path="/receipt/:saleId" element={<ReceiptPage />} />
        <Route path='/new-product' element={<NewProductModal />}/>
      </Routes>
    </Router>
  );
}


export default App;
