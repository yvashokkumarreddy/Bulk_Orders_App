import React, { useEffect, useState } from 'react';
import { fetchAllProducts } from '../services/productService'; // Assuming you have this service to fetch products
import StatusBadge from './StatusBadge'; // Assuming you already have the StatusBadge component

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAllProducts(); // Service function to fetch products
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border-b">Product Name</th>
            <th className="px-4 py-2 border-b">Price</th>
            <th className="px-4 py-2 border-b">Image</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2 border-b">{product.name}</td>
                <td className="px-4 py-2 border-b">${product.price}</td>
                <td className="px-4 py-2 border-b">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover" />
                </td>
                <td className="px-4 py-2 border-b">
                  <StatusBadge status={product.status} />
                </td>
                <td className="px-4 py-2 border-b">
                  {/* Add your action buttons, e.g., edit, delete */}
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                  <button className="ml-4 text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
