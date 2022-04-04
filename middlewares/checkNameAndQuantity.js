const ERR = require('../services/errorMessages');

const checkNameAndQuantity = (req, _res, next) => {
  const { name, quantity} = req.body;
  if (!name) throw ERR.NAME_IS_REQUIRED;
  if (!quantity) throw ERR.QUANTITY_IS_REQUIRED;
  if (name.length < 5) throw ERR.NAME_LENGTH;
  if (quantity < 0 && typeof quantity === 'number') throw ERR.QUANTITY_MUST_BE_GREATER_THAN_0;
  next();
}
module.exports = checkNameAndQuantity;