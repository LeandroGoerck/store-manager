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

const createNewSale = async (req, res) => {
  const sale = req.body;
  const { status, newSale } = await SalesServices.createNewSale(sale);
  res.status(status).json(newSale);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const itemUpdated = await SalesServices.updateSale(id, sale);
  console.log('itemUpdated', itemUpdated);
  res.status(200).json(itemUpdated);
};

module.exports = {
  getAll,
  getById,
  createNewSale,
  updateSale,
};