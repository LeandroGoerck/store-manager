const express = require('express');
const rescue = require('express-rescue');
const SalesController = require('../controllers/salesController');

const router = express.Router();

router.route('/')
  .get(rescue(SalesController.getAll))
  .post(rescue(SalesController.createNewSale));
  
router.route('/:id')
  .get(rescue(SalesController.getById))
  .put(rescue(SalesController.updateSale));

module.exports = router;
