const express = require('express');
const rescue = require('express-rescue');
const ProductsController = require('../controllers/productsController');

const router = express.Router();

router.route('/')
  .get(rescue(ProductsController.getAll))
  .post(rescue(ProductsController.create));
  
router.route('/:id')
  .get(rescue(ProductsController.getById))
  .put(rescue(ProductsController.updateProduct));

module.exports = router;