const ERR = require('../services/errorMessages');

const checkNameAndProductId = (req, _res, next) => {
  const { name, productId } = req.body;
  if (!name) throw ERR.NAME_IS_REQUIRED;
  if (name.length < 5) throw ERR.NAME_LENGTH;
  if (!productId) throw ERR.PRODUCT_ID_IS_REQUIRED;
  next();
};
module.exports = checkNameAndProductId;