const express = require('express');
const { checkPermission } = require('../middleware');
const router = express.Router();
const productService = require('../services/productService');

router.get('/', async (req, res) => res.json(await productService.getProducts()));
router.get('/:id', async (req, res) => res.json(await productService.getProduct(req.params.id)));
router.post('/', checkPermission, async (req, res) => res.json(await productService.createProduct(req.body)));
router.put('/:id', checkPermission, async (req, res) => res.json(await productService.updateProduct(req.params.id, req.body)));
router.delete('/:id', checkPermission, async (req, res) => res.json(await productService.deleteProduct(req.params.id)));

module.exports = router;