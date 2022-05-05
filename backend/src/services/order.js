const Order = require('../models/order');
const { toOrder } = require('../utils');

const getOrders = async () => await Order.find({});
const getOrder = async (id) => await Order.findById(id);
const createOrder = async (data) => await new Order(toOrder(data)).save();
const updateOrder = async (id, data) => await Order.findByIdAndUpdate(id, { ...toOrder(data) }, { new: true });
const deleteOrder = async (id) => await Order.findByIdAndDelete(id);

module.exports = { getOrders, getOrder, createOrder, updateOrder, deleteOrder };