const express = require('express');
const { extractToken } = require('../middleware');
const router = express.Router();
const orderService = require('../services/order');

router.get('/', async (req, res) => res.json(await orderService.getOrders()));
router.get('/:id', async (req, res) => res.json(await orderService.getOrder(req.params.id)));
router.get('/user/:id', async (req, res) => res.json(await orderService.getOrdersByUserId(req.params.id)));

router.post('/', extractToken, async (req, res) => {
  const userId = req.userId;
  const data = req.body;
  const orders = await orderService.createOrders(userId, data);
  res.json(orders);
});

router.delete('/:id', async (req, res) => res.json(await orderService.deleteOrder(req.params.id)));

module.exports = router;