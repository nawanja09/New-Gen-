import axios from "axios";

// Create New Product
const createProduct = async (formData) => {
  const response = await axios.post(`http://localhost:5000/api/products`, formData);
  return response.data;
};

// Get all products
const getProducts = async () => {
  const response = await axios.get(`http://localhost:5000/api/products`);
  return response.data;
};

// Delete a Product
const deleteProduct = async (id) => {
  const response = await axios.delete(`http://localhost:5000/api/products` + id);
  return response.data;
};
// Get a Product
const getProduct = async (id) => {
  const response = await axios.get(`http://localhost:5000/api/products` + id);
  return response.data;
};
// Update Product
const updateProduct = async (id, formData) => {
  const response = await axios.patch(`http://localhost:5000/api/products/${id}`, formData);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};

export default productService;
