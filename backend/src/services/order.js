const Order = require('../models/order');
const { toOrder, toOrderEntry } = require('../utils');

const getOrders = async () => {
  const orders = await Order.find({}).populate('user').populate('product');
  return orders.map(order => toOrder(order));
};

const getOrder = async (id) => {
  const order = await Order.findById(id).populate('user').populate('product');
  return toOrder(order);
};

const createOrder = async (data) => {
  const orderEntry = toOrderEntry(data);
  const newOrder = new Order(orderEntry);
  const savedOrder = await newOrder.save();
  const populatedOrder = await Order.findById(savedOrder._id).populate('user').populate('product');
  return toOrder(populatedOrder);
};

const deleteOrder = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id).populate('user').populate('product');
  return toOrder(deletedOrder);
};

module.exports = { getOrders, getOrder, createOrder, deleteOrder };