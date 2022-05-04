const Product = require('../models/product');
const { parseNumber, parseString } = require('../utils');

const getProducts = async () => {
  return await Product.find({});
};

const getProduct = async (id) => {
  return await Product.findById(id);
};

const createProduct = async (data) => {

  const newProduct = new Product({
    name: parseString(data.name),
    description: parseString(data.description),
    price: parseNumber(data.price),
    quantity: parseNumber(data.quantity),
    image: parseString(data.image)
  });

  return await newProduct.save();
};

const updateProduct = async (id, data) => {
    
  const updatedData = {
    name: parseString(data.name),
    description: parseString(data.description),
    price: parseNumber(data.price),
    quantity: parseNumber(data.quantity),
    image: parseString(data.image)
  };

  return await Product.findByIdAndUpdate(id, { ...updatedData }, { new: true });
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };