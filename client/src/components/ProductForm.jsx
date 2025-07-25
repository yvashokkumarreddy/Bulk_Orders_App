// src/components/ProductForm.jsx
import { useState } from 'react';

function ProductForm({ product = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    name: product.name || '',
    price: product.price || '',
    image: product.image || '', // optional, used for editing
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('image', formData.image);

    const response = await fetch('http://localhost:5000/products', {
      method: product.id ? 'PUT' : 'POST', // Use PUT if editing an existing product
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: data,
    });

    if (response.ok) {
      alert(product.id ? 'Product updated' : 'Product added');
      onSubmit();
    } else {
      alert('Error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{product.id ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500"
        >
          {product.id ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
