const SalesModels = require('../models/salesModels');

const getAll = async () => {
  const result = await SalesModels.getAll();
  return {
    status: 200,
    result,
  };
};

const getById = async (id) => {
  const product = await SalesModels.getById(id);
  return {
    status: 200,
    product,
  };
};

module.exports = {
  getAll,
  getById,
};
