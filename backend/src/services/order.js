const Order = require('../models/order');
const Product = require('../models/product');
const { formatPrice, toOrder, toShoppingCartData } = require('../utils');

const getOrders = async () => {
  const orders = await Order.find({}).populate('user').populate('products.product');
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
  const orderEntry = toShoppingCartData(data);

  //Create order
  const order = new Order({
    user: userId,
    products: [],
    status: 'WAITING_FOR_SHIPMENT'
  });

  let sum = 0;

  //Loop every shopping cart item
  for (const item of orderEntry) {

    //TODO: Need to check that item.amount does not exceed product quantity ( = there must be atleast same amount of products in stock than what is ordered)

    //Find product
    const product = await Product.findById(item.product);

    //Add product to orders
    order.products.push({ product: product.id, amount: item.amount });

    //Add products total price to sum
    sum += product.price * item.amount;

    //Update product quantity
    await product.updateOne({ quantity: (product.quantity - item.amount) });
  }

  //Format and set total sum
  order.sum = formatPrice(sum);

  //Save order
  const savedOrder = await order.save();

  //Populate order
  const populatedOrder = await Order.findById(savedOrder.id).populate('user').populate('products.product');
  return toOrder(populatedOrder);
};

const deleteOrder = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id).populate('user').populate('products.product');
  return toOrder(deletedOrder);
};

module.exports = { getOrders, getOrdersByUserId, getOrder, createOrder, deleteOrder };