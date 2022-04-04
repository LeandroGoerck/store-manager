const ERR = require('../services/errorMessages');

const checkProductId = (req, _res, next) => {
  const { productId } = req.body;
  if (!productId) throw ERR.PRODUCT_ID_IS_REQUIRED;
  next();
};

module.exports = checkProductId;