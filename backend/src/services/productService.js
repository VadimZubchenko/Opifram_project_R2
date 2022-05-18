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
  
  const searchTerms = () => {
    validateStringProperty('term', data.term);
    const keys = data.term.trim().split(' ');
    const list = [];
    keys.forEach(key => {
      const regex = new RegExp(key, 'i');
      list.push({'name': regex});
    });
    return list;
  };

  const foundProducts = await Product.aggregate([{$match: { $or: searchTerms() }}]).sort({createdAt: -1});
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