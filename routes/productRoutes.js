const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, deleteProduct } = require('../controllers/productController');

// Fetch all products and display on the homepage
router.get('/', getAllProducts);

// Insert a new product
router.post('/product', createProduct);

// Delete a product
router.post('/product/:id/delete', deleteProduct);

module.exports = router;
