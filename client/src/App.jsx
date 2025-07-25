import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Catalogue from './pages/Catalogue';
import ManageProducts from './pages/ManageProducts';  // Import ManageProducts
import ManageOrders from './pages/ManageOrders';     // Import ManageOrders
import PlaceOrder from './pages/PlaceOrder';
import TrackOrder from './pages/TrackOrder';
import AdminDashboard from './pages/AdminDashboard';
import ProductDetail from './components/ProductView';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/product/:id" element={<ProductDetail />} /> {/* This handles the product view */}
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/manage-orders" element={<ManageOrders />} />
      </Routes>
    </Router>
  );
};

export default App;
