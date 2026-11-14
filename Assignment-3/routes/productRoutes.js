const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getLowStockProducts,
  getInventorySummary,
  getProductById,
  updateProduct,
  updateStock,
  deleteProduct
} = require('../controllers/productController');

// ============================================================================
// CRITICAL: Specific sub-resource routes (/low-stock, /summary) MUST be defined
// BEFORE parameterized routes (/:id). Otherwise, Express matches "low-stock"
// or "summary" as an ":id" parameter, triggering CastError.
// ============================================================================

// Low-Stock alert route
router.get('/low-stock', getLowStockProducts);

// Inventory aggregation summary route
router.get('/summary', getInventorySummary);

// Base CRUD routes for collection
router.route('/')
  .get(getAllProducts)
  .post(createProduct);

// Specific stock adjustment route
router.patch('/:id/stock', updateStock);

// Base CRUD routes for individual product by ID
router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;

