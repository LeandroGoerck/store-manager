const ERR = require('../services/errorMessages');

const checkProductId = (productId) => {
  if (!productId) throw ERR.PRODUCT_ID_IS_REQUIRED;
};

const checkQuantity = (quantity) => {
  if (!quantity) throw ERR.QUANTITY_IS_REQUIRED;
  if (quantity <= 0 && typeof quantity === 'number') throw ERR.QUANTITY_MUST_BE_GREATER_THAN_0;
};

const checkProductIdAndQuantity = (req, _res, next) => {
  console.log('middleware', req.body);
  req.body.forEach((element) => {
    const { productId, quantity } = element;
    checkProductId(productId);
    checkQuantity(quantity);
  });
  next();
};

module.exports = checkProductIdAndQuantity;