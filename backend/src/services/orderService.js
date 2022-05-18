const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const { formatPrice, toOrder, toShoppingCartData, validateStringProperty } = require('../utils');
const User = require('../models/userModel');

const getOrders = async () => {
  const orders = await Order.find({}).populate('user').populate('products.product').sort({ createdAt: -1 });
  return orders.map(order => toOrder(order));
};

const getOrdersByUserId = async (userId) => {
  const orders = await Order.find({ user: userId }).populate('user').populate('products.product');
  return orders.map(order => toOrder(order));
};

const getOrder = async (id) => {
  const order = await Order.findById(id).populate('user').populate('products.product');
  return toOrder(order);
};

const createOrder = async (userId, data) => {
  const shoppingCartData = toShoppingCartData(data);

  const order = new Order({
    user: userId,
    products: [],
    status: 'WAITING_FOR_SHIPMENT'
  });

  let sum = 0;

  for (const item of shoppingCartData) {
    //TODO: Need to check that item.amount does not exceed product.quantity
    const product = await Product.findById(item.product);
    order.products.push({ product: product.id, amount: item.amount, price: product.price });
    sum += product.price * item.amount;
    await product.updateOne({ quantity: product.quantity - item.amount });
  }

  order.sum = formatPrice(sum);
  const savedOrder = await order.save();
  const populatedOrder = await Order.findById(savedOrder.id).populate('user').populate('products.product');
  return toOrder(populatedOrder);
};

const markAsSent = async (id) => {
  const updatedOrder = await Order.findByIdAndUpdate(id, { sentAt: new Date(), status: 'SENT' }, { new: true }).populate('user').populate('products.product');
  return toOrder(updatedOrder);
};

const deleteOrder = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id).populate('user').populate('products.product');
  return toOrder(deletedOrder);
};

const searchOrders = async (data) => {
  
  const searchBy = () => {
    validateStringProperty('name', data.name);
    const keys = data.name.trim().split(' ');
    const list = [];
    keys.forEach(key => {
      const regex = new RegExp(key, 'i');
      list.push({ 'user.firstName': { $regex : regex }}, { 'user.lastName': { $regex : regex }});
    });
    return list;
  };

  const results = await Order.aggregate([
    { $lookup: {
      from: User.collection.name,
      localField: 'user',
      foreignField: '_id',
      as: 'user'
    }},
    {$unwind: '$user'},
    {$match: { $or: searchBy() }}
  ]).sort({ createdAt: -1 });

  const populatedOrders = [];

  for (const result of results) {
    const order = await Order.findById(result._id).populate('user').populate('products.product');
    populatedOrders.push(order);
  }

  return populatedOrders.map(order => toOrder(order));
};

module.exports = {
  getOrders,
  getOrdersByUserId,
  getOrder,
  createOrder,
  deleteOrder,
  markAsSent,
  searchOrders
};