const ERR = require('../services/errorMessages');

const checkProductIdAndQuantity = (req, _res, next) => {
  const { productId, quantity } = req.body;
  if (quantity === undefined && productId) throw ERR.QUANTITY_IS_REQUIRED;
  if (!productId && quantity) throw ERR.PRODUCT_ID_IS_REQUIRED;
  if (quantity === undefined && !productId) throw ERR.QUANTITY_IS_REQUIRED;
  if (quantity < 0 || typeof quantity === 'number') throw ERR.QUANTITY_MUST_BE_GREATER_THAN_0;
  next();
};

module.exports = checkProductIdAndQuantity;