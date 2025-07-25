// src/pages/ManageOrders.jsx
import React, { useEffect, useState } from 'react';
import { fetchAllOrders, updateOrderStatus } from '../services/orderService';
import StatusBadge from '../components/StatusBadge'; // Assuming StatusBadge is the component you use to show order statuses

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all orders on component mount
  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      try {
        const data = await fetchAllOrders(); // Fetch all orders using the service
        setOrders(data); // Set the fetched orders into state
      } catch (err) {
        setError('Failed to fetch orders');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  const handleStatusUpdate = async (orderId, status) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, status); // Update order status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? { ...order, status: updatedOrder.status } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Manage Orders</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customerName}</td>
                <td className="px-4 py-2">{order.productName}</td>
                <td className="px-4 py-2">{order.quantity}</td>
                <td className="px-4 py-2">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-4 py-2">
                  {order.status !== 'Delivered' && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'In Progress')}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      In Progress
                    </button>
                  )}
                  {order.status !== 'Delivered' && (
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'Delivered')}
                      className="bg-green-500 text-white px-3 py-1 rounded ml-2"
                    >
                      Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;

