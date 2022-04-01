const ERR = require('./errorMessages');
const ProductsModels = require('../models/productsModels');

const isValid = (name, quantity) => {
  if (!name || typeof name !== 'string') return false;
  if (!quantity || typeof quantity !== 'number') return false;

  return true;
};

const create = async ({ name, quantity }) => {
  const isProductValid = isValid(name, quantity);

  if (!isProductValid) return false;

  const { id } = await ProductsModels.create({ name, quantity });

  return {
    id,
  };
};

const getAll = async () => {
  const result = await ProductsModels.getAll();
  return {
    status: 200,
    result,
  };
};

const checkProduct = (product) => {
  if (!product) {
    throw ERR.PRODUCT_NOT_FOUNT;
  }
};

const getById = async (id) => {
  const product = await ProductsModels.getById(id);
  checkProduct(product);
  return {
    status: 200,
    product,
  };
};

module.exports = {
  create,
  getAll,
  getById,
};