// src/components/OrderTable.jsx
import { useState, useEffect } from 'react';
import StatusBadge from './StatusBadge';

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/orders');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left">Order ID</th>
            <th className="px-6 py-3 text-left">Customer</th>
            <th className="px-6 py-3 text-left">Product</th>
            <th className="px-6 py-3 text-left">Quantity</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4">{order.id}</td>
              <td className="px-6 py-4">{order.customerName}</td>
              <td className="px-6 py-4">{order.productName}</td>
              <td className="px-6 py-4">{order.quantity}</td>
              <td className="px-6 py-4">
                <StatusBadge status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
