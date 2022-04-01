const express = require('express');
const rescue = require('express-rescue');
const SalesController = require('../controllers/salesController');

const router = express.Router();

router.route('/')
  .get(rescue(SalesController.getAll));
  
router.get('/:id', rescue(SalesController.getById));

module.exports = router;
