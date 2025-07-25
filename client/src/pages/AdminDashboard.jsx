import React, { useState, useEffect } from 'react';
import ProductTable from '../components/ProductTable';
import axios from 'axios';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('price', formData.price);
    if (formData.image) {
      form.append('image', formData.image);
    }

    const token = localStorage.getItem('authToken');

    try {
      if (editingProduct) {
        await axios.put(
          `http://localhost:5000/api/products/${editingProduct.id}`,
          form,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert('Product updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/products', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Product added successfully!');
      }

      setFormData({ name: '', description: '', price: '', image: null });
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product!');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: null,
    });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('authToken');
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Product deleted successfully!');
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product!');
      }
    }
  };

  return (
    <div className="admin-dashboard p-6">
      <h1 className="text-center text-2xl font-bold my-4">Admin Dashboard</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {editingProduct ? 'Edit Product' : 'Add Product'}
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            required
            className="border p-2"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border p-2"
          />
          <input
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            type="number"
            placeholder="Price"
            required
            className="border p-2"
          />
          <input
            name="image"
            type="file"
            onChange={handleInputChange}
            className="border p-2"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4">
            {editingProduct ? 'Update' : 'Add'} Product
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
