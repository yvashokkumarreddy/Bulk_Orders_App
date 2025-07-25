import React, { useEffect, useState } from 'react';
import { fetchAllProducts } from '../services/productService';
import { useCart } from '../context/CartContext';

const Catalogue = () => {
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchAllProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  // Get the quantity of an item in the cart
  const getCartQuantity = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => {
        const quantity = getCartQuantity(product.id);

        return (
          <div key={product.id} className="border rounded-lg p-4 shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="h- w-full object-cover rounded"
            />
            <h3 className="text-lg font-bold mt-2">{product.name}</h3>
            <p className="text-gray-700">Rs.{product.price.toFixed(2)}</p>

            {/* Display quantity controls if item is in the cart */}
            {quantity > 0 ? (
              <div className="flex items-center space-x-2 mt-4">
                <button
                  onClick={() =>
                    quantity === 0
                      ? removeFromCart(product.id)
                      : updateQuantity(product.id, quantity - 10)
                  }
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 10)}
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  +
                </button>
                <h3 className="text-lg font-bold mt-2">KGs</h3>
              </div>
            ) : (
              <button
                onClick={() => addToCart({ ...product, id: product.id })}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Catalogue;
