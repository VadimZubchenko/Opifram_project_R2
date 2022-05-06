const Order = require('../models/order');
const Product = require('../models/product');
const { toOrder, formatPrice } = require('../utils');

const getOrders = async () => {
  const orders = await Order.find({}).populate('user').populate('product');
  return orders.map(order => toOrder(order));
};

const getOrdersByUserId = async (userId) => {
  const orders = await Order.find({ user: userId }).populate('user').populate('product');
  return orders.map(order => toOrder(order));
};

const getOrder = async (id) => {
  const order = await Order.findById(id).populate('user').populate('product');
  return toOrder(order);
};

const createOrders = async (userId, data) => {

  //Create order
  const order = new Order({
    user: userId,
    products: [],
    status: 'WAITING_FOR_SHIPMENT'
  });

  let sum = 0;

  //Loop every product
  for (const item of data) {

    //TODO: Need to check that item.amount does not exceed product quantity ( = there must be atleast same amount of products in stock than what is ordered)

    //Find product
    const product = await Product.findById(item.product);

    //Add product to orders
    order.products.push({ product: product.id, amount: item.amount });

    //Add price to total sum
    sum += formatPrice(product.price * item.amount);

    //Update product quantity
    await product.updateOne({ quantity: (product.quantity - item.amount) });
  }

  //Set total sum
  order.sum = sum;

  //Save order
  const savedOrder = await order.save();

  //Populate order
  const populatedOrder = await Order.findById(savedOrder.id).populate('user').populate('products.product');
  return populatedOrder;
};

const deleteOrder = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id).populate('user').populate('product');
  return toOrder(deletedOrder);
};

module.exports = { getOrders, getOrdersByUserId, getOrder, createOrders, deleteOrder };