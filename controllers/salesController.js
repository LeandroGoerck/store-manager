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
  try {
    const { id } = req.params;
    const { status, product } = await SalesServices.getById(id);
    return res.status(status).json(product);
  } catch (err) {
    console.log('err: ', err);
    return res.status(400).send(err.message);
  }
};

module.exports = {
  getAll,
  getById,
};