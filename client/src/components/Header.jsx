import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to ='/'><h1 className="text-xl font-semibold">Bulk Orders</h1></Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/place-order" className="hover:text-gray-200">Place Order</Link>
          <Link to="/track-order" className="hover:text-gray-200">Track Order</Link>
          <Link to="/admin" className="hover:text-gray-200">Admin</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
