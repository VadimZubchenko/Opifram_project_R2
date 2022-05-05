const express = require('express');
const router = express.Router();
const orderService = require('../services/order');

router.get('/', async (req, res) => res.json(await orderService.getOrders()));
router.get('/:id', async (req, res) => res.json(await orderService.getOrder(req.params.id)));
router.post('/', async (req, res) => res.json(await orderService.createOrder(req.body)));
router.put('/:id', async (req, res) => res.json(await orderService.updateOrder(req.params.id, req.body)));
router.delete('/:id', async (req, res) => res.json(await orderService.deleteOrder(req.params.id)));

module.exports = router;