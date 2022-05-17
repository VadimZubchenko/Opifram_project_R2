const Product = require('../models/productModel');
const { toProduct, toProductEntry, validateStringProperty } = require('../utils');

const getProducts = async () => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  return products.map(product => toProduct(product));
};

const getProduct = async (id) => {
  const product = await Product.findById(id);
  return toProduct(product);
};

const createProduct = async (data) => {
  const productEntry = toProductEntry(data);
  const newProduct = new Product(productEntry);
  const savedProduct = await newProduct.save();
  return toProduct(savedProduct);
};

const updateProduct = async (id, data) => {
  const productData = toProductEntry(data);
  const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
  return toProduct(updatedProduct);
};

const deleteProduct = async (id) => {
  const deletedProduct = await Product.findByIdAndDelete(id);
  return toProduct(deletedProduct);
};

const searchProducts = async (data) => {
  const productName = validateStringProperty('name', data.name);
  const regex = new RegExp(productName, 'i');
  const foundProducts = await Product.find({ name: regex });
  return foundProducts.map(product => toProduct(product));
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
};