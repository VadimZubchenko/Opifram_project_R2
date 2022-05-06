const Product = require('../models/productModel');
const { toProduct, toProductEntry } = require('../utils');

const getProducts = async () => {
  const products = await Product.find({});
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

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };