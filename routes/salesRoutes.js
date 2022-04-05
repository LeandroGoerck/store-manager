const express = require('express');
const rescue = require('express-rescue');
const SalesController = require('../controllers/salesController');
const checkProductIdAndQuantity = require('../middlewares/checkProductIdAndQuantity');

const router = express.Router();

router.route('/')
  .get(rescue(SalesController.getAll))
  .post(checkProductIdAndQuantity, rescue(SalesController.createNewSale));
  
router.route('/:id')
  .get(rescue(SalesController.getById))
  .put(checkProductIdAndQuantity, rescue(SalesController.updateSale))
  .delete(rescue(SalesController.deleteById));

module.exports = router;
