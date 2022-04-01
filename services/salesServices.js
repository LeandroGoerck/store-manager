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

module.exports = {
  getAll,
  getById,
};
