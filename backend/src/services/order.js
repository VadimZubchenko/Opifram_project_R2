const Order = require('../models/order');
const Product = require('../models/product');
const { toOrder, toProduct, formatPrice } = require('../utils');

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
  const successfulOrders = [];
  const failedOrders = [];

  for (const item of data) {
    const product = await Product.findById(item.product);
    
    //If amount exceedes quantity, push to failed list and continue
    if (product.quantity - item.amount < 0) {
      failedOrders.push({ reason: 'Amount exceeded quantity', product: toProduct(product) });
      continue;
    } else {
    
      //Calculate and format total price
      const sum = formatPrice(product.price * item.amount);

      //Create order
      const order = new Order({
        user: userId,
        product: product.id,
        amount: item.amount,
        sum: sum,
        status: 'WAITING_FOR_SHIPMENT'
      });

      //Update product quantity
      await product.update({ quantity: (product.quantity - item.amount) });
    
      //Save order
      const savedOrder = await order.save();

      //Populate order
      const populatedOrder = await Order.findById(savedOrder.id).populate('user').populate('product');
    
      //Push to completed list
      successfulOrders.push(toOrder(populatedOrder));
    }
  }

  return { successful: successfulOrders, failed: failedOrders };
};

const deleteOrder = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id).populate('user').populate('product');
  return toOrder(deletedOrder);
};

module.exports = { getOrders, getOrdersByUserId, getOrder, createOrders, deleteOrder };