const express = require('express');
const { checkPermission, authenticate } = require('../middleware');
const router = express.Router();
const productService = require('../services/productService');

router.get('/', async (req, res) => {
  const products = await productService.getProducts();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await productService.getProduct(req.params.id);
  res.json(product);
});

router.post('/', authenticate, checkPermission, async (req, res) => {
  const createdProduct = await productService.createProduct(req.body);
  res.json(createdProduct);
});

router.put('/:id', authenticate, checkPermission, async (req, res) => {
  const updatedProduct = await productService.updateProduct(req.params.id, req.body);
  res.json(updatedProduct);
});

router.delete('/:id', authenticate, checkPermission, async (req, res) => {
  const deletedProduct = await productService.deleteProduct(req.params.id);
  res.json(deletedProduct);
});

router.post('/search', authenticate, async (req, res) => {
  const foundProducts = await productService.searchProducts(req.body);
  res.json(foundProducts);
});

module.exports = router;