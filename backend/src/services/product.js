const Product = require('../models/product');
const { toProduct } = require('../utils');

const getProducts = async () => await Product.find({});
const getProduct = async (id) => await Product.findById(id);
const createProduct = async (data) => await new Product(toProduct(data)).save();
const updateProduct = async (id, data) => await Product.findByIdAndUpdate(id, { ...toProduct(data) }, { new: true });
const deleteProduct = async (id) => await Product.findByIdAndDelete(id);

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };