const ERR = require('./errorMessages');
const SalesModels = require('../models/salesModels');

const snakeToCamelObj = (sale) => (
  {
    saleId: sale.sale_id,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }
);

const snakeToCamelSale = (sale) => (
  {
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }
);

const getAll = async () => {
  const result = await SalesModels.getAll();
  const finalResult = result.map((o) => (snakeToCamelObj(o))); 
  return {
    status: 200,
    result: finalResult,
  };
};

const checkSales = (sales) => {
  if (!sales.length) {
    throw ERR.SALE_NOT_FOUNT;
  }
};

const getById = async (id) => {
  const sales = await SalesModels.getById(id);
  const finalSales = sales.map((sale) => (snakeToCamelSale(sale))); 
  checkSales(finalSales);
  if (finalSales.length) {
    return {
      status: 200,
      sales: finalSales,
    };
  }
};

const checkIfQuantityExists = (quantity) => {
  if (!quantity) {
    throw ERR.QUANTITY_IS_REQUIRED;
  }
};

const checkIfProductIdExists = (productId) => {
  if (!productId) {
    throw ERR.PRODUCT_ID_IS_REQUIRED;
  }
};

const checkQuantityValue = (quantity) => {
  if (quantity < 0) {
    throw ERR.QUANTITY_MUST_BE_GREATER_THAN_0;
  }
};

const createNewSale = async ({ quantity, productId }) => {
  checkIfProductIdExists(productId);
  checkIfQuantityExists(quantity);
  checkQuantityValue(quantity);
  const productFound = getById(productId);
  if (productFound.length) {
    const newSale = await SalesModels.createNewSale({ quantity, productId });
    return {
      status: 200,
      newSale,
    };
  }
};

const updateSale = async (id, sale) => {
  // validateSale(sale);
  const updatedSale = await SalesModels.updateSale(id, sale);
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
