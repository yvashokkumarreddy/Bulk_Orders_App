import React, { useState } from 'react';
import axios from 'axios';

const ManageProducts = () => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    price: '',
    imageUrl: '',
  });

  const handleInputChange = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/products', productDetails)
      .then(() => {
        alert('Product added successfully');
      })
      .catch(error => {
        console.error('Error adding product', error);
      });
  };

  return (
    <div className="manage-products">
      <h1 className="text-center text-2xl font-bold my-4">Manage Products</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={productDetails.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={productDetails.price}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={productDetails.imageUrl}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ManageProducts;
