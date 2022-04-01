 const SalesServices = require('../services/salesServices');

const getAll = async (req, res) => {
  try {
    const productList = await SalesServices.getAll();
    const { status, result } = productList;
    return res.status(status).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, sales } = await SalesServices.getById(id);
  res.status(status).json(sales);
};

module.exports = {
  getAll,
  getById,
};