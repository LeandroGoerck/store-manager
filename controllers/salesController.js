const SalesServices = require('../services/salesServices');

const getAll = async (req, res) => {
  const productList = await SalesServices.getAll();
  const { status, result } = productList;
  return res.status(status).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, sales } = await SalesServices.getById(id);
  res.status(status).json(sales);
};

const createNewSale = async (req, res) => {
  const sale = req.body;
  const { status, newSale } = await SalesServices.createNewSale(sale);
  res.status(status).json(newSale);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const itemUpdated = await SalesServices.updateSale(id, sale);
  res.status(200).json(itemUpdated);
  console.log('itemUpdated', itemUpdated);
};

module.exports = {
  getAll,
  getById,
  createNewSale,
  updateSale,
};