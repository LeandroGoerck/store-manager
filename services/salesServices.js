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

// sale on Service:  [ { productId: 1, quantity: 9 }, { productId: 2, quantity: 19 } ]
// saleItem:  { productId: 1, quantity: 9 }
// saleItem:  { productId: 2, quantity: 19 }

const createNewSale = async (sale) => {
  let id = 0;
  await Promise.all(sale.map(async (item) => {
    const productFound = await SalesModels.getById(item.productId);
    if (!productFound) throw ERR.PRODUCT_NOT_FOUNT;
  }));
console.log('All products exists');
  await Promise.all(sale.map(async (item) => {
    console.log(item.productId, item.quantity);
    id = await SalesModels.createNewSale(item.productId, item.quantity);
  }));
console.log('Added the sale');

  return {
    status: 201,
    newSale: {
      id,
      itemsSold: sale,
    },
  };
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
