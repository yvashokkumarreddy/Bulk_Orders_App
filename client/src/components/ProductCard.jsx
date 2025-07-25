import React from 'react';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr>
          <th className="border px-4 py-2">Image</th>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Price</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td className="border px-4 py-2">
              <img src={product.image} alt={product.name} className="h-16" />
            </td>
            <td className="border px-4 py-2">{product.name}</td>
            <td className="border px-4 py-2">${product.price}</td>
            <td className="border px-4 py-2">
              <button onClick={() => onEdit(product)} className="text-blue-600 mr-2">Edit</button>
              <button onClick={() => onDelete(product.id)} className="text-red-600">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
