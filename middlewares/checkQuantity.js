const ERR = require('../services/errorMessages');

const checkQuantity = (req, _res, next) => {
  const { quantity } = req.body;
  if (!quantity || typeof quantity !== 'number') throw ERR.QUANTITY_IS_REQUIRED;
  if (quantity < 0 || typeof quantity !== 'number') throw ERR.QUANTITY_MUST_BE_GREATER_THAN_0;
  next();
};

module.exports = checkQuantity;