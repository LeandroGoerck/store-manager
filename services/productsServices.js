const ERR = require('./errorMessages');
const ProductsModels = require('../models/productsModels');

const isValid = (name, quantity) => {
  if (!name || typeof name !== 'string') return false;
  if (!quantity || typeof quantity !== 'number') return false;

  return true;
};

const checkIfNameExists = (name) => {
  if (!name) {
    throw ERR.NAME_IS_REQUIRED;
  }
};

const checkNameLength = (name) => {
  if (name.length < 5) {
    throw ERR.NAME_LENGTH;
  }
};

const checkIfQuantityExists = (quantity) => {
  if (!quantity) {
    throw ERR.QUANTITY_IS_REQUIRED;
  }
};

const checkQuantity = (quantity) => {
  if (quantity < 0) {
    throw ERR.QUANTITY_MUST_BE_GREATER_THAN_0;
  }
};

const create = async ({ name, quantity }) => {
  const isProductValid = isValid(name, quantity);
  // checkIfNameExists(name);
  // checkNameLength(name);
  // checkIfQuantityExists(quantity);
  // checkQuantity(quantity);
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

const checkId = (id) => {
  if (!id) {
    throw ERR.PRODUCT_NOT_FOUNT;
  }
};

const updateProduct = async (id, name, quantity) => {
  // checkId(id);
  // checkProductIsValid(name, quantity);
  const updatedProduct = await ProductsModels.updateProduct(id, name, quantity);
  return {
    status: 200,
    updatedProduct,
  };
};

module.exports = {
  create,
  getAll,
  getById,
  updateProduct,
};