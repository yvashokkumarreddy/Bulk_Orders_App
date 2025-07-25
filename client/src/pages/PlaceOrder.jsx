import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../services/orderService';
import { FaTrashAlt } from 'react-icons/fa';

const PlaceOrder = () => {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const navigate= useNavigate();
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setBuyerInfo({ ...buyerInfo, [e.target.name]: e.target.value });
  };

  const handleDelete = (productId) => {
    removeFromCart(productId);  // Remove item from cart
  };

 const handleSubmit = async (event) => {
  event.preventDefault();

  const { name, phone: contact, address } = buyerInfo;
  if (!name || !contact || !address) {
    setMessage('Please fill in all fields');
    return;
  }

  try {
    setLoading(true);

    const orderDetails = {
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      })),
      name,
      contact,
      address
    };

    const res = await addOrder(orderDetails);
    alert("Order placed successfully!");
    navigate('/track-order'); 
    clearCart()
  } catch (error) {
    console.error("Order failed:", error.message);
    alert(error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Review & Place Order</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Add items to place an order.</p>
      ) : (
        <>
          <div className="space-y-6 mb-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-gray-500">
                      <span className="font-bold text-black">Qty: </span>{item.quantity} x 
                      <span className="font-bold text-gray-1000">Rs.{item.price}</span>
                    </p>
                  </div>
                </div>
                <div className="font-medium">Rs.{(item.price * item.quantity).toFixed(2)}</div>
                <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                  <FaTrashAlt size={20} />
                </button>
              </div>
            ))}

            <div className="text-right text-xl font-bold">
              Total: Rs.{totalPrice.toFixed(2)}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 border-t pt-6">
            <h3 className="text-xl font-semibold">Enter Buyer Details</h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={buyerInfo.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={buyerInfo.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={buyerInfo.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <textarea
              name="address"
              placeholder="Delivery Address"
              value={buyerInfo.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            {message && <p className="text-sm text-blue-600">{message}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default PlaceOrder;
