import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

// 🔒 Auth header helper
export const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  if (!token || token === 'null' || token === 'undefined') {
    console.warn('No valid token found in localStorage');
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const fetchMyOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/my-orders`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error.response || error);
    throw new Error('Failed to fetch user orders');
  }
};

// ➕ Add Order
export const addOrder = async (orderDetails) => {
  try {
    const response = await axios.post(API_URL, orderDetails, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    console.log('Order placed successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error.response || error);
    throw new Error('Failed to place order');
  }
};

// 🔍 Fetch by ID
export const fetchOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw new Error('Failed to fetch order');
  }
};

// 📦 Admin: Fetch all
export const fetchAllOrders = async () => {
  const response = await axios.get(`${API_URL}`);
  console.log(response.data)
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders');
  }
};


// 🔁 Admin: Update status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(`${API_URL}/${orderId}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error('Failed to update order status');
  }
};

// ✅ Fetch orders for logged-in user
// Fetch orders of the current user
export const fetchUserOrders = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/orders/my-orders`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    return res.data;
  } catch (error) {
    console.error('Failed to fetch user orders:', error);
    throw new Error('Unable to fetch your orders');
  }
};


// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/orders';

// // Helper to get auth token header
// const getAuthHeader = () => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     console.error('No valid token found in localStorage');
//     return {};
//   }
//   return {
//     Authorization: `Bearer ${token}`
//   };
// };

// // Add New Order
// export const addOrder = async (orderDetails) => {
//   try {
//     const response = await axios.post(API_URL, orderDetails, {
//       headers: {
//         'Content-Type': 'application/json',
//         ...getAuthHeader(),
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error placing order:', error.response || error);
//     throw new Error('Failed to place order');
//   }
// };

// // Get All Orders (Admin)
// export const fetchAllOrders = async () => {
//   try {
//     const response = await axios.get(API_URL, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching all orders:', error.response || error);
//     throw new Error('Failed to fetch orders');
//   }
// };

// // Get Order By ID (User)
// export const fetchOrderById = async (orderId) => {
//   try {
//     const response = await axios.get(`${API_URL}/${orderId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching order:', error.response || error);
//     throw new Error('Failed to fetch order');
//   }
// };

// // Get User's Own Orders
// export const fetchMyOrders = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/my-orders`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user orders:', error.response || error);
//     throw new Error('Failed to fetch user orders');
//   }
// };

// // Add this inside orderService.jsx
// export const fetchUserOrders = async () => {
//   const token = localStorage.getItem('authToken');

//   if (!token) {
//     console.error('No valid token found in localStorage');
//     throw new Error('User not authenticated');
//   }

//   try {
//     const response = await axios.get('http://localhost:5000/api/orders/user', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user orders:', error);
//     throw new Error('Failed to fetch user orders');
//   }
// };


// // Update Order Status (Admin)
// export const updateOrderStatus = async (orderId, status) => {
//   try {
//     const response = await axios.put(`${API_URL}/${orderId}`, { status }, {
//       headers: {
//         'Content-Type': 'application/json',
//         ...getAuthHeader(),
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error updating order status:', error.response || error);
//     throw new Error('Failed to update order status');
//   }
// };
