import axiosInstance from './axiosInstance';

// Get all products
export const fetchAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/products');
    return response.data;  // Return the fetched data
  } catch (error) {
    console.error("Error fetching products: ", error.message);
    throw new Error('Error fetching products');
  }
};

// Add a new product
export const addProduct = async (productData) => {
  try {
    const response = await axiosInstance.post('/products', productData);
    return response.data;  // Return the added product data
  } catch (error) {
    console.error("Error adding product: ", error.message);
    throw new Error('Error adding product');
  }
};

// Update a product
export const updateProduct = async (productId, productData) => {
  try {
    const response = await axiosInstance.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product: ", error.message);
    throw new Error('Error updating product');
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product: ", error.message);
    throw new Error('Error deleting product');
  }
};
