const ERR = require('../services/errorMessages');

const checkName = (req, _res, next) => {
  const { name } = req.body;
  if (!name) throw ERR.NAME_IS_REQUIRED;
  if (name.length < 5) throw ERR.NAME_LENGTH;
  next();
};

module.exports = checkName;