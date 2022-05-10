const express = require('express');
const { extractToken, checkPermission } = require('../middleware');
const router = express.Router();
const orderService = require('../services/orderService');

router.get('/', checkPermission, async (req, res) => res.json(await orderService.getOrders()));
router.get('/:id', checkPermission, async (req, res) => res.json(await orderService.getOrder(req.params.id)));
router.get('/user/:id', checkPermission, async (req, res) => res.json(await orderService.getOrdersByUserId(req.params.id)));
router.post('/', extractToken, async (req, res) => res.json(await orderService.createOrder(req.userId, req.body)));
router.delete('/:id', checkPermission, async (req, res) => res.json(await orderService.deleteOrder(req.params.id)));

module.exports = router;