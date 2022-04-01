const express = require('express');
const rescue = require('express-rescue');
const ProductsController = require('../controllers/productsController');

const router = express.Router();

router.route('/')
  .get(rescue(ProductsController.getAll))
  .post(rescue(ProductsController.create));
  
router.get('/:id', rescue(ProductsController.getById));

module.exports = router;