const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const { formatPrice, toOrder, toShoppingCartData, toOrderUpdateEntry } = require('../utils');

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

const updateOrder = async (id, data) => {
  const orderUpdateEntry = toOrderUpdateEntry(data);
  const updatedOrder = await Order.findByIdAndUpdate(id, orderUpdateEntry, {new: true});
  return toOrder(updatedOrder);
};

const sendOrder = async (id) => {
  const updatedOrder = await Order.findByIdAndUpdate(id, { sentAt: new Date(), status: 'SENT' }, { new: true });
  return toOrder(updatedOrder);
};

const deleteOrder = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id).populate('user').populate('products.product');
  return toOrder(deletedOrder);
};

module.exports = {
  getOrders,
  getOrdersByUserId,
  getOrder,
  updateOrder,
  createOrder,
  deleteOrder,
  sendOrder
};