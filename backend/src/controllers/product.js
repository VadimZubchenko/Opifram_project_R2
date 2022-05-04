const express = require('express');
const router = express.Router();
const productService = require('../services/product');

router.get('/', async (req, res) => {
    const products = await productService.getProducts();
    res.json(products);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const product = await productService.getProduct(id);
    res.json(product);
});

router.post('/', async (req, res) => {
    const body = req.body;
    const newProduct = await productService.createProduct(body);
    res.json(newProduct);
});

router.put('/:id', async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const updatedProduct = await productService.updateProduct(id, body);
    res.json(updatedProduct);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const deletedProduct = await productService.deleteProduct(id);
    res.json(deletedProduct);
});

module.exports = router;