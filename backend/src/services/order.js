const Order = require('../models/order');
const { toOrder } = require('../utils');

const getOrders = async () => {
  const orders = await Order.find({}).populate('user').populate('product');
  return orders.map(order => toOrder(order));
};

const getOrder = async (id) => {
  const order = await Order.findById(id).populate('user').populate('product');
  return toOrder(order);
};

const createOrder = async () => {
  // Loop data array which contains {userId, productId, count}
  // Find product by id
  // Calculate total price product.price * count
  // Create a new order sand save it
  // Push the newly created order into new array
  // Finally return array which contains all orders
};

const updateOrder = async () => {};

const deleteOrder = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id).populate('user').populate('product');
  return toOrder(deletedOrder);
};

module.exports = { getOrders, getOrder, createOrder, updateOrder, deleteOrder };