import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product', err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <button onClick={() => navigate('/admin')} className="mb-4 bg-blue-500 text-white px-3 py-1 rounded">← Back</button>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img src={product.image[0]} alt={product.name} className="w-64 my-4" />
      <p className="text-lg">{product.description}</p>
      <p className="mt-2"><strong>Price:</strong> ${product.price}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
    </div>
  );
};

export default ProductDetail;
