import React, { useState, useEffect } from 'react';
import { fetchOrderById, fetchAllOrders} from '../services/orderService';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [error, setError] = useState('');

  const handleTrackOrder = async () => {
    setError('');
    try {
      const data = await fetchOrderById(orderId);
      setOrderDetails(data);
    } catch (err) {
      setError('Order not found or error fetching order');
      setOrderDetails(null);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await fetchAllOrders();
        setUserOrders(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Track Your Order</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="p-2 border rounded w-64"
        />
        <button
          onClick={handleTrackOrder}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Track
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {orderDetails && (
        <div className="mt-4 border p-4 rounded bg-gray-100">
          <h3 className="font-semibold">Order Details</h3>
          <p><strong>ID:</strong> {orderDetails.id}</p>
          <p><strong>Status:</strong> {orderDetails.status}</p>
          <p><strong>Total:</strong> ${orderDetails.total}</p>
        </div>
      )}

      <hr className="my-6" />

      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {userOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {userOrders.map((order) => (
            <li key={order.id} className="border p-4 rounded bg-white">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ${order.total}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrackOrder;
