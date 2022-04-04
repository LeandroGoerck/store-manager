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
  console.log('newSale: ', newSale);
  res.status(status).json(newSale);
};

const updateSale = async (id, sale) => {
  // validateSale(sale);
  const updatedSale = await SalesServices.updateSale(id, sale);
  return {
    status: 200,
    updatedSale,
  };
};

module.exports = {
  getAll,
  getById,
  createNewSale,
  updateSale,
};