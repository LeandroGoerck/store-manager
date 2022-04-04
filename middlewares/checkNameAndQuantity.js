const ERR = require('../services/errorMessages');

const checkName = (name) => {
  if (!name) throw ERR.NAME_IS_REQUIRED;
  if (name.length < 5) throw ERR.NAME_LENGTH;
};

const checkQuantity = (quantity) => {
  if (quantity === undefined) throw ERR.QUANTITY_IS_REQUIRED;
  if (quantity <= 0 && typeof quantity === 'number') throw ERR.QUANTITY_MUST_BE_GREATER_THAN_0;
};

const checkNameAndQuantity = (req, _res, next) => {
  const { name = '', quantity } = req.body;
  checkName(name);
  checkQuantity(quantity);
  next();
};

module.exports = checkNameAndQuantity;