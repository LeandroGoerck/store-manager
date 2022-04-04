const ERR = require('./errorMessages');
const ProductsModels = require('../models/productsModels');

const create = async ({ name, quantity }) => {
  const productFound = await ProductsModels.findByName(name);
  console.log('productFound', productFound, productFound.length);
  if (productFound.length) {
    throw ERR.PRODUCT_ALREADY_EXISTS;
  }  
  const { id } = await ProductsModels.create({ name, quantity });
  console.log({ id, name, quantity });
  return { id, name, quantity };
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