const express = require('express');
const rescue = require('express-rescue');
const ProductsController = require('../controllers/productsController');
const checkNameAndQuantity = require('../middlewares/checkNameAndQuantity');

const router = express.Router();

router.route('/')
  .get(rescue(ProductsController.getAll))
  .post(checkNameAndQuantity, rescue(ProductsController.createNewProduct));
  
router.route('/:id')
  .get(rescue(ProductsController.getById))
  .put(checkNameAndQuantity, rescue(ProductsController.updateProduct))
  .delete(rescue(ProductsController.deleteById));

module.exports = router;