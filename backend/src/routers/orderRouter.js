const express = require('express');
const { authenticate, checkPermission } = require('../middleware');
const router = express.Router();
const orderService = require('../services/orderService');

router.get('/', authenticate, checkPermission, async (req, res) => {
  const orders = await orderService.getOrders();
  res.json(orders);
});

router.get('/:id', authenticate, checkPermission, async (req, res) => {
  const order = await orderService.getOrder(req.params.id);
  res.json(order);
});

router.get('/user/:id', authenticate, checkPermission, async (req, res) => {
  const userOrders = await orderService.getOrdersByUserId(req.params.id);
  res.json(userOrders);
});

router.post('/', authenticate, async (req, res) => {
  const createdOrder = await orderService.createOrder(req.userId, req.body);
  res.json(createdOrder);
});

router.put('/send/:id', authenticate, checkPermission, async (req, res) => {
  const sentOrder = await orderService.markAsSent(req.params.id);
  res.json(sentOrder);
});

router.delete('/:id', authenticate, checkPermission, async (req, res) => {
  const deletedOrder = await orderService.deleteOrder(req.params.id);
  res.json(deletedOrder);
});

router.post('/search', authenticate, checkPermission, async (req, res) => {
  const foundOrders = await orderService.searchOrders(req.body);
  res.json(foundOrders);
});

module.exports = router;